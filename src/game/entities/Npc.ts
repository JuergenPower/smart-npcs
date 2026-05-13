import * as Phaser from 'phaser';
import { Interactable } from '../../types/Interactable';
import { Interaction } from '../../types/Interaction';

export class Npc implements Interactable {

    sprite: Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image;
    name: string;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
        this.name = name;
        this.sprite = scene.physics.add.staticSprite(x, y, 'npc');
        this.sprite.setInteractive();
        (this.sprite as any).npcRef = this;
        // this.sprite.setCollideWorldBounds(true);
    }

    update() {

    }

    getInteractions(): Interaction[] {
        return [
            {
                label: 'Talk',
                action: () => {
                    console.log('Talking to' + this.name);
                }
            },
            {
                label: 'Trade',
                action: () => {
                    console.log('Trading with ' + this.name);
                }
            }
        ];
    }
}