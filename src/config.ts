import Preloader from './scenes/Preloader'
import MainScene from './scenes/MainScene'

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Phaser 3 Typescript Template',
  url: '',
  version: '1.0',
  width: 400,
  height: 250,
  backgroundColor: '#0x3a404d',
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  scene: [Preloader, MainScene],
  scale: {
    zoom: 2
  }
}

export default GameConfig
