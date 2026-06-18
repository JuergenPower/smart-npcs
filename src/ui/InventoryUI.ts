import Phaser from 'phaser';
import { Inventory } from '../systems/Inventory';

export class InventoryUI {

    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private visible = false;

    constructor(scene: Phaser.Scene, private inventory: Inventory) {

        this.container = scene.add.container(50, 50);
        this.container.setDepth(2000);
        this.container.setVisible(false);
        this.background = scene.add.rectangle(0, 0, 300, 400, 0x000000, 0.8)
            .setOrigin(0, 0);

        this.text = scene.add.text(10, 10, '', {
            color: '#ffffff',
            fontSize: '16px'
        });

        this.container.setScrollFactor(0);
        this.background.setScrollFactor(0);
        this.text.setScrollFactor(0);

        this.container.add([
            this.background,
            this.text
        ]);
    }

    toggle() {
        this.visible = !this.visible;
        if (this.visible) {
            this.render();
        }
        this.container.setVisible(this.visible);
    }

    render() {

        const items = this.inventory.getItems();
        const lines = items.map(i => `- ${i.name}`);
        this.text.setText(
            'Inventory\n\n' + lines.join('\n')
        );
    }

    isOpen(): boolean {
        return this.visible;
    }
}