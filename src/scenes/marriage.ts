export class MarriageScene extends Phaser.Scene {
  private titleBitmapText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: 'MarriageScene'
    });
  }

  init(): void {

  }

  create(): void {
    this.titleBitmapText = this.add.bitmapText(
      0,
      350,
      'font',
      'WILL YOU MARRY ME?',
      30
    );

    this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.titleBitmapText.width
    );
  }

  update(): void {

  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}