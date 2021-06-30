export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  update(): void {
    this.scene.start('MenuScene');
  }

  preload(): void {
    this.load.pack('preload', '../../assets/pack.json', 'preload');
  }
}
