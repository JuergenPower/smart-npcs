import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Npc } from '../entities/Npc';
import { InteractionMenu } from '../../ui/InteractionMenue';
import { DialogBox } from '../../ui/DialogBox';
import { UIState, UIStateType } from '../../systems/UIState'
import { WorldItem } from '../entities/WorldItem';
import { InventoryUI } from '../../ui/InventoryUI';
import { apple, wood } from '../entities/Items';
import { ShowInteractionMenuEvent } from '../../types/types';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player!: Player;
    npcArgus!: Npc;
    interactionMenu!: InteractionMenu;
    uiState!: UIState;
    dialogBox!: DialogBox;
    inventoryUI!: InventoryUI;

    constructor ()
    {
        super('Game');
    }

    preload() 
    {
        this.load.image('player', '/assets/player.png');
        this.load.image('npc', '/assets/npc.png');
        this.load.image('Wood', '/assets/rottedWood.png')
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

        // Add interactable world items
        const wood1 = new WorldItem(this, 600, 300, wood);

        // Add player with attached camera
        this.player = new Player(this, 512, 384);

        // Add UI
        this.dialogBox = new DialogBox(this, this.uiState);
        this.inventoryUI = new InventoryUI(this, this.player.inventory);

        // TEST TODO: remove this
        this.player.inventory.addItem(apple);
        // END TEST

        this.cameras.main.startFollow(this.player.sprite, true);

        // Add NPCs
        this.npcArgus = new Npc(this,700, 300, 'Argus');

        // Enable collision detection
        this.physics.add.collider(
            this.player.sprite,
            this.npcArgus.sprite
        );

        // key input handler
        this.input.keyboard!.on('keydown-I', () => {
            this.inventoryUI.toggle();
            if(this.inventoryUI.isOpen())
                this.uiState.open(UIStateType.INVENTORY)
            else
                this.uiState.close(UIStateType.INVENTORY)
        });

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
                
                const npcRef = (gameObject as any).npcRef;
                if(npcRef){
                    event.stopPropagation();
                    if(!npcRef.canInteract(this.player.sprite)){
                        console.log("Too far away.")
                        return;
                    }
                    const interactions = npcRef.getInteractions();
                    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                    this.uiState.open(UIStateType.INTERACTION_MENU);
                    this.interactionMenu.show(worldPoint.x, worldPoint.y, interactions);
                    return;
                }

                const worldItemRef = (gameObject as any).worldItemRef;
                if (worldItemRef) {
                    event.stopPropagation();
                    if(!worldItemRef.canInteract(this.player.sprite)){
                        console.log("Too far away.")
                        return;
                    }
                    worldItemRef.pickup(this.player);
                    if(this.uiState.hasState(UIStateType.INVENTORY))
                        this.inventoryUI.render();
                }
            }
        );

        this.input.on('showInteractionMenu', (data: ShowInteractionMenuEvent) => {
            this.interactionMenu.show(
                data.x,
                data.y,
                data.interactions
            );
        });

    }

    update ()
    {
        this.player.update();
    }
}