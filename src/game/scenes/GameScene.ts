import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Npc } from '../entities/Npc';
import { InteractionMenu } from '../../ui/InteractionMenue';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player!: Player;
    npc1!: Npc;
    interactionMenu!: InteractionMenu;
    menuOpen!: boolean;

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
        this.interactionMenu = new InteractionMenu(this);
        this.menuOpen = false;
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
        this.npc1 = new Npc(this,700, 300, 'Argus');

        // Enable collision detection
        this.physics.add.collider(
            this.player.sprite,
            this.npc1.sprite
        );

        // click input handler
        this.input.on('pointerdown', () => {
            if (this.menuOpen){
                this.interactionMenu.hide();
                this.menuOpen = false;
            }
            console.log('pointerdown event triggered') 
        });

        this.input.on(
            'gameobjectdown',
            (
                pointer : Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.GameObject,
                event: Phaser.Types.Input.EventData
            ) => 
            {
                const npc = (gameObject as any).npcRef;
                if (npc) {
                    const interactions = npc.getInteractions();
                    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                    this.menuOpen = true;
                    this.interactionMenu.show(worldPoint.x, worldPoint.y, interactions);
                }
                console.log('gameobjectdown event triggered')
                event.stopPropagation();
            }
        );

    }

    update ()
    {
        this.player.update();
    }
}