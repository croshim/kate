
export class Score extends Phaser.GameObjects.BitmapText {
  private score: number;

  constructor(scene, x, y, score) {
    super(scene, x, y, 'font', score);
    this.score = 0;
    this.scene.add.existing(this);
  }

  public getScore(): number {
    return this.score;
  }

  public plusOne() {
    this.score += 1;
    this.setText(`${this.score}`);
  }

  public updateScore(score: number) {
    this.score += score;
    this.setText(`${this.score}`);
  }
}