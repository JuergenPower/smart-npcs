import Phaser from 'phaser';
import { UIState, UIStateType } from '../systems/UIState';

export class DialogBox {

    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private titleText: Phaser.GameObjects.Text;
    private bodyText: Phaser.GameObjects.Text;
    private closeButton: Phaser.GameObjects.Text;
    private uiState: UIState;

    constructor(scene: Phaser.Scene, uiState: UIState) {

        this.uiState = uiState;
        this.container = scene.add.container(0, 0);
        this.container.setDepth(2000);
        this.container.setVisible(false);

        this.background = scene.add.rectangle(
            50,
            500,
            924,
            200,
            0x000000,
            0.9
        ).setOrigin(0, 0).setScrollFactor(0);

        this.titleText = scene.add.text(70, 520, '', {
            color: '#ffff00',
            fontSize: '24px'
        }).setScrollFactor(0);

        this.bodyText = scene.add.text(70, 570, '', {
            color: '#ffffff',
            fontSize: '20px',
            wordWrap: { width: 850 }
        }).setScrollFactor(0);

        this.closeButton = scene.add.text(820, 650, 'Goodbye', {
            color: '#ff9999',
            fontSize: '20px',
            backgroundColor: '#222222',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        })
        .setInteractive()
        .setScrollFactor(0)
        .on('pointerdown', () => {
            this.hide();
        });

        this.container.add([
            this.background,
            this.titleText,
            this.bodyText,
            this.closeButton
        ]);
    }

    show(title: string, text: string) {
        this.titleText.setText(title);
        this.bodyText.setText(text);
        this.container.setVisible(true);
        this.uiState.open(UIStateType.DIALOG);
    }

    hide() {
        this.container.setVisible(false);
        this.uiState.close(UIStateType.DIALOG);
    }
}