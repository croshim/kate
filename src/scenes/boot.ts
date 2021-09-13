export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  update(): void {
    this.scene.start('MenuScene');
  }

  create(): void {

  }

  preload(): void {
    this.load.pack('preload', 'assets/pack.json', 'preload');
  }
}
