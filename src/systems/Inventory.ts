import { Item } from '../types/interfaces';

export class Inventory {

    private items: Item[] = [];

    addItem(item: Item) {
        this.items.push(item);
        console.log('Added item:', item.name);
    }

    removeItem(item: Item) {
        this.items = this.items.filter(i => i !== item);
        console.log('Removed item:', item);
    }

    getItems(): Item[] {
        return this.items;
    }

    hasItem(itemId: string): boolean {
        return this.items.some(i => i.id === itemId);
    }
}