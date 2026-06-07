import * as Phaser from 'phaser';
import { Interactable } from '../../types/interfaces';
import { Interaction } from '../../types/types';

export class Npc implements Interactable {

    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image;
    name: string;
    private interactionRange: number = 150;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
        this.name = name;
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, 'npc');
        this.sprite.setInteractive();
        (this.sprite as any).npcRef = this;
        this.sprite.body?.setCircle(32)
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

    canInteract(player: Phaser.Physics.Arcade.Sprite): boolean {
        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance <= this.interactionRange;
    }
}