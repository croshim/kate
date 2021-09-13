import { Whale } from '../objects/whale';
import { Rollton } from '../objects/rollton';
import { Cat } from '../objects/cat';
import { Score } from '../objects/score';
export class GameScene extends Phaser.Scene {
  private backgroundGround: Phaser.GameObjects.TileSprite;
  private backgroundFishes: Phaser.GameObjects.TileSprite;
  private backgroundSeaweed: Phaser.GameObjects.TileSprite;

  private score: Score;
  private whale: Whale;
  private rolltons: Phaser.GameObjects.Group;
  private cats: Phaser.GameObjects.Group;
  
  private WIN_SCORE = 1;

  private timer: Phaser.Time.TimerEvent;
  private catsTimer: Phaser.Time.TimerEvent;

  private dimensions;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  init(): void {
    const { canvas } = this.sys.game;
    // this.registry.set('score', 0);
    this.dimensions = canvas.getBoundingClientRect();
  }

  create(): void {
    const { width, height } = this.scale;

    this.add.image(width * 0.5, height * 0.5, 'background_1');

    this.backgroundFishes = this.add
      .tileSprite(0, height, 0, 0, 'background_2')
      .setDisplaySize(width, height)
      .setOrigin(0, 1);

    this.backgroundSeaweed = this.add
      .tileSprite(0, height, 0, 0, 'background_4')
      .setDisplaySize(width, height)
      .setOrigin(0, 1);

    this.backgroundGround = this.add
      .tileSprite(0, height, 0, 0, 'background_7')
      .setDisplaySize(width, height)
      .setOrigin(0, 1);

    this.score = new Score(this, this.sys.canvas.width / 2 - 14, 30, '0');
    this.whale = new Whale({ scene: this, x: 50, y: 100, key: 'whale' });
    
    this.cats = this.add.group({});
    this.rolltons = this.add.group({});

    this.timer = this.time.addEvent({
      delay: 8_000,
      callback: this.addRolltons,
      callbackScope: this,
      loop: true,
    });

    this.catsTimer = this.time.addEvent({
      delay: 4_000,
      callback: this.addCats,
      callbackScope: this,
      loop: true,
    });
  }

  update(): void {
    this.backgroundGround.tilePositionX += 1.5;
    this.backgroundFishes.tilePositionX += -2;
    this.backgroundSeaweed.tilePositionX += 3;

    this.whale.update();

    this.physics.overlap(
      this.whale,
      this.cats,
      function() {
        this.scene.start('MenuScene');
      },
      null,
      this,
    )

    this.physics.overlap(
      this.whale,
      this.rolltons,
      function (whale, rollton) {
        rollton.destroy();
        this.whale.grow();
        this.score.plusOne();
      },
      null,
      this
    );

    if (this.score.getScore() >= this.WIN_SCORE) {
      this.scene.start('MarriageScene');
    }
  }

  private addRolltons(): void {
    const { width, height } = this.dimensions;
    const minHeight = height;
    const y = Phaser.Math.Between(0, minHeight);

    this.addRollton(width, y, 1);
  }

  private addRollton(x: number, y: number, frame: number): void {
    this.rolltons.add(
      new Rollton({
        scene: this,
        x: x,
        y: y,
        frame: frame,
        texture: 'rollton',
      })
    );
  }

  private addCats(): void {
    const { width, height } = this.dimensions;
    const minHeight = height;
    const y = Phaser.Math.Between(0, minHeight);

    this.addCat(width, y, 1);
  }

  private addCat(x: number, y: number, frame: number): void {
    this.cats.add(
      new Cat({
        scene: this,
        x: x,
        y: y,
        frame: frame,
        texture: `cat_${Phaser.Math.Between(1, 2)}`,
      })
    );
  }

}
