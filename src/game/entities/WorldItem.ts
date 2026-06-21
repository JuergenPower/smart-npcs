import Phaser, { Scene } from 'phaser';
import { Item } from '../../types/interfaces';
import { Player } from './Player';
import { Interaction } from '../../types/types';
import { InventoryItem } from './InventoryItem';

export class WorldItem implements Item {

    id: string;
    name: string;
    sprite: Phaser.Physics.Arcade.Sprite;
    private interactionRange: number = 150;
    private player: Player;
    private scene: Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, itemName: string) {
        this.scene = scene;
        this.id = itemName;
        this.name = itemName;
        this.sprite = scene.physics.add.staticSprite(x, y, itemName);
        this.player = player;
        this.sprite.setInteractive();
        (this.sprite as any).worldItemRef = this;
    }

    pickup() {
        this.player.inventory.addItem(new InventoryItem(this.scene, this.player.inventory, this.name));
        this.sprite.destroy();
    }

    canInteract(player: Phaser.Physics.Arcade.Sprite): boolean {
        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= this.interactionRange;
    }

    getInteractions(): Interaction[] {
        return [
            {
                label: "Pick up",
                action: () => {
                    this.pickup();
                    this.scene.input.emit('inventoryUpdated');
                }
            }
        ];
    }
}