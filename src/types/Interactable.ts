import { Interaction } from './Interaction';

export interface Interactable {
    sprite: Phaser.GameObjects.GameObject;
    getInteractions(): Interaction[];
    canInteract(player: Phaser.Physics.Arcade.Sprite): boolean;
}