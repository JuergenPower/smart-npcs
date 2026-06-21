import { Interaction } from './types';

export interface Interactable {
    sprite: Phaser.GameObjects.GameObject;
    getInteractions(): Interaction[];
    canInteract(player: Phaser.Physics.Arcade.Sprite): boolean;
}

export interface Item {
    id: string;
    name: string;
    getInteractions(): Interaction[];
}