import Phaser from 'phaser';
import { Inventory } from '../systems/Inventory';
import { Item } from '../types/interfaces'

export class InventoryUI {

    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private itemTexts: { text: Phaser.GameObjects.Text, item: Item }[] = [];
    private visible = false;
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, private inventory: Inventory) {

        this.scene = scene;
        this.container = scene.add.container(50, 50);
        this.container.setDepth(2000);
        this.container.setVisible(false);
        this.background = scene.add.rectangle(0, 0, 300, 400, 0x000000, 0.8)
            .setOrigin(0, 0);
        this.container.setScrollFactor(0);
        this.background.setScrollFactor(0);
        this.container.add(this.background);

        // Item text click handler
        this.scene.input.on('gameobjectdown', (pointer : Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, event: Phaser.Types.Input.EventData) => {
        
            const itemText = this.itemTexts.find(e => e.text === gameObject);
            if (!itemText) return;
            event.stopPropagation();
            const interactions = itemText.item.getInteractions();
            const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
            this.scene.input.emit('showInteractionMenu', {
                x: worldPoint.x,
                y: worldPoint.y,
                interactions
            });
        });
    }

    toggle() {
        this.visible = !this.visible;
        if (this.visible) {
            this.render();
        }
        this.container.setVisible(this.visible);
    }

    render() {

        this.itemTexts.forEach(i => i.text.destroy());
        this.itemTexts = [];
        const items = this.inventory.getItems();
        let y = 40;

        for (const item of items) {
            const text = this.scene.add.text(20, y, item.name, {
                color: '#fff',
                fontSize: '16px'
            });
            text.setInteractive();
            text.setScrollFactor(0);
            this.container.add(text);
            this.itemTexts.push({ text, item });
            y += 30;
        }
    }

    isOpen(): boolean {
            return this.visible;
        }
    }