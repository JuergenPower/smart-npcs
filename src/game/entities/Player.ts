import Phaser from 'phaser';

export class Player {
    sprite: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    update() {
        const speed = 200;

        this.sprite.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-speed);
        } 
        else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-speed);
        } 
        else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(speed);
        }
    }
}