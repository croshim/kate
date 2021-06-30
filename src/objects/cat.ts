import { IImageConstructor } from '../interfaces/image';

export class Cat extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.setScale(0.15);
    this.setOrigin(0, 0);
    // this.setSize(50, 50);

    this.scene.physics.world.enable(this);
    // this.body.setGravityY(-200);
    this.body.allowGravity = false;
    this.body.setVelocityX(-200);
    this.body.setSize(200, 200);
    // this.body.setSize(20, 20);

    this.scene.add.existing(this);
  }
}