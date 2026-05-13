import * as Phaser from 'phaser';

export class Player {

    sprite: Phaser.Physics.Arcade.Sprite;
    keys!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.keys = scene.input.keyboard!.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        }) as typeof this.keys;
    }

    update() {
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