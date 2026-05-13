import Phaser from 'phaser';
import { Interaction } from '../types/Interaction';

export class InteractionMenu {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private texts: Phaser.GameObjects.Text[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.container = this.scene.add.container(0, 0).setVisible(false);

        this.background = this.scene.add.rectangle(0, 0, 120, 10, 0x000000, 0.8)
            .setOrigin(0, 0);

        this.container.add(this.background);
    }

    show(x: number, y: number, interactions: Interaction[]) {
        this.clear();

        this.container.setVisible(true);
        this.container.setPosition(x, y);
        this.container.setDepth(1000);

        let offsetY = 5;

        interactions.forEach((interaction) => {
            const text = this.scene.add.text(5, offsetY, interaction.label, {
                color: '#ffffff',
                fontSize: '14px'
            })
            .setInteractive()
            .on('pointerdown', () => {
                interaction.action();
                this.hide();
            });

            this.container.add(text);
            this.texts.push(text);

            offsetY += 20;
        });

        this.background.height = offsetY;
        this.background.width = 120;
    }

    hide() {
        this.container.setVisible(false);
        this.clear();
    }

    private clear() {
        this.texts.forEach(t => t.destroy());
        this.texts = [];
    }
}