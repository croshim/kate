export class Whale extends Phaser.GameObjects.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  private jumpKey: Phaser.Input.Keyboard.Key;
  private isDead: boolean;

  private GROW_FACTOR = 1.02;
  private ACCELERATION = 200;
  private MAX_SPEED = 600;

  public getIsDead(): boolean {
    return this.isDead;
  }

  public setIsDead(isDead: boolean): void {
    this.isDead = isDead; 
  }

  public grow() {
    const { scale } = this;
    this.setScale(scale * this.GROW_FACTOR);
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.setScale(1);
    this.setOrigin(0, 0);

    this.isDead = false;

    this.scene.physics.world.enable(this);
    // this.body.allowGravity = false;
    this.body.setGravityY(1500);
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);

    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNames('whale'),
      frameRate: 30,
      repeat: -1
    });

    this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.scene.add.existing(this);

    this.play('swim');
  }

  update() {
    const angle = this.body.velocity.y / (this.MAX_SPEED * 2);
    this.angle = angle * 25;

    if (this.jumpKey.isDown || this.scene.input.activePointer.isDown) {
      this.body.acceleration.y += -this.ACCELERATION;
    } else if (this.y >= 600) {
      this.body.acceleration.y += -this.ACCELERATION;
    } else {
      this.body.acceleration.y = 0;
    }
    
    if (this.y + this.height > this.scene.sys.canvas.height) {
      this.isDead = true;
    }
  }
}
