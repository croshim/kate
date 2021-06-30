import { BootScene } from './scenes/boot';
import { MenuScene } from './scenes/menu';
import { GameScene } from './scenes/game';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Kate the Whale',
  type: Phaser.AUTO,

  scene: [BootScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    }
  },

  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },

  backgroundColor: '#98d687',
  render: { pixelArt: true, antialias: false }
};
