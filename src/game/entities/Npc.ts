import * as Phaser from 'phaser';
import { Interactable } from '../../types/Interactable';
import { Interaction } from '../../types/Interaction';

export class Npc implements Interactable {

    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image;
    name: string;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
        this.name = name;
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, 'npc');
        this.sprite.setInteractive();
        (this.sprite as any).npcRef = this;
        // this.sprite.setCollideWorldBounds(true);
    }

    update() {

    }

    getGreeting(): string {
        return 'Hello traveler.';
    }

    getInteractions(): Interaction[] {
        return [
            {
                label: 'Talk',
                action: () => {
                    const gameScene = this.scene as any;
                    gameScene.dialogBox.show(
                        this.name,
                        this.getGreeting()
                    );
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