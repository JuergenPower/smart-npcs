import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Npc } from '../entities/Npc';
import { InteractionMenu } from '../../ui/InteractionMenue';
import { DialogBox } from '../../ui/DialogBox';
import { UIState, UIStateType } from '../../systems/UIState'

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player!: Player;
    npcArgus!: Npc;
    interactionMenu!: InteractionMenu;
    uiState!: UIState;
    dialogBox!: DialogBox;

    constructor ()
    {
        super('Game');
    }

    preload() 
    {
        this.load.image('player', '/assets/player.png');
        this.load.image('npc', '/assets/npc.png');
    }

    create ()
    {
        this.uiState = new UIState();
        this.interactionMenu = new InteractionMenu(this, this.uiState);
        // Add world visible bounds
        this.physics.world.setBounds(10, 10, 1000, 700);
        //this.cameras.main.setBounds(10, 10, 1000, 700);
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000);
        graphics.strokeRect(10, 10, 1000, 700);

        // Add player with attached camera
        this.player = new Player(this, 512, 384);
        this.cameras.main.startFollow(this.player.sprite, true);

        // Add NPCs
        this.npcArgus = new Npc(this,700, 300, 'Argus');

        // Enable collision detection
        this.physics.add.collider(
            this.player.sprite,
            this.npcArgus.sprite
        );

        // click input handler
        this.input.on('pointerdown', () => {
            if (this.uiState.hasState(UIStateType.INTERACTION_MENU)){
                this.interactionMenu.hide();
                this.uiState.close(UIStateType.INTERACTION_MENU);
            }
        });

        this.input.on(
            'gameobjectdown',
            (
                pointer : Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.GameObject,
                event: Phaser.Types.Input.EventData
            ) => 
            {
                event.stopPropagation();
                const npc = (gameObject as any).npcRef;
                if(!npc) return;
                if(!npc.canInteract(this.player.sprite)){
                    console.log("Too far away.")
                    return;
                }
                const interactions = npc.getInteractions();
                const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                this.uiState.open(UIStateType.INTERACTION_MENU);
                this.interactionMenu.show(worldPoint.x, worldPoint.y, interactions);
            }
        );

        this.dialogBox = new DialogBox(this, this.uiState);

    }

    update ()
    {
        this.player.update();
    }
}