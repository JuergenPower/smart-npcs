import * as Phaser from 'phaser';
import { Inventory } from '../../systems/Inventory';

export class Player {

    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    inventory: Inventory;
    keys!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.body?.setCircle(32);
        this.sprite.setCollideWorldBounds(true);
        this.inventory = new Inventory();
        this.keys = scene.input.keyboard!.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        }) as typeof this.keys;
    }

    update() {

        const gameScene = this.scene as any;  
        if (gameScene.uiState.blocksMovement()) {
            this.sprite.setVelocity(0);
            return;
        }

        const speed = 200;
        this.sprite.setVelocity(0);

        if (this.keys.A.isDown) {
            this.sprite.setVelocityX(-speed);
        } 
        else if (this.keys.D.isDown) {
            this.sprite.setVelocityX(speed);
        }

        if (this.keys.W.isDown) {
            this.sprite.setVelocityY(-speed);
        } 
        else if (this.keys.S.isDown) {
            this.sprite.setVelocityY(speed);
        }
    }
}