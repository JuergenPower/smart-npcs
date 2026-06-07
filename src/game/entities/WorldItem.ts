import Phaser from 'phaser';
import { Item } from '../../types/types';
import { Player } from './Player';

export class WorldItem {

    sprite: Phaser.Physics.Arcade.Sprite;
    item: Item;

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
}