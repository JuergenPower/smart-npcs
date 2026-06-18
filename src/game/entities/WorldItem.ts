import Phaser from 'phaser';
import { Item } from '../../types/types';
import { Player } from './Player';

export class WorldItem {

    sprite: Phaser.Physics.Arcade.Sprite;
    item: Item;
    private interactionRange: number = 150;

    constructor(scene: Phaser.Scene, x: number, y: number, item: Item) {

        this.item = item;
        this.sprite = scene.physics.add.staticSprite(x, y, item.name);
        this.sprite.setInteractive();
        (this.sprite as any).worldItemRef = this;
    }

    pickup(player: Player) {

        player.inventory.addItem(this.item);
        this.sprite.destroy();
    }

    canInteract(player: Phaser.Physics.Arcade.Sprite): boolean {
        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= this.interactionRange;
    }
}