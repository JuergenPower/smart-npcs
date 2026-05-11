import { Scene } from 'phaser';
import { Player } from '../entities/Player';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player!: Player;

    constructor ()
    {
        super('Game');
    }

    preload() 
    {
        this.load.image('player', '/assets/player.png');
    }

    create ()
    {
        // Add world visible bounds
        this.physics.world.setBounds(10, 10, 1000, 700);
        //this.cameras.main.setBounds(10, 10, 1000, 700);
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000);
        graphics.strokeRect(10, 10, 1000, 700);

        // Add player with attached camera
        this.player = new Player(this, 512, 384);

        this.cameras.main.startFollow(this.player.sprite, true);
    }

    update ()
    {
        this.player.update();
    }
}