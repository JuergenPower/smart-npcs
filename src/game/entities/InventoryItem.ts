import Phaser, { Scene } from 'phaser';
import { Item } from '../../types/interfaces';
import { Interaction } from '../../types/types';
import { Inventory } from '../../systems/Inventory';

export class InventoryItem implements Item {

    id: string;
    name: string;
    private scene: Scene;
    private inventory: Inventory;

    constructor(scene: Phaser.Scene, inventory: Inventory, itemName: string) {
        this.scene = scene;
        this.inventory = inventory;
        this.id = itemName;
        this.name = itemName;
    }

    getInteractions(): Interaction[] {
        return [
            {
                label: "Destroy",
                action: () => {
                    this.inventory.removeItem(this);
                    this.scene.input.emit('inventoryUpdated');
                }
            }
        ];
    }
}