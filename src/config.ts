import Preloader from './scenes/Preloader'
import MainScene from './scenes/MainScene'

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Phaser 3 Typescript Template',
  url: '',
  version: '1.0',
  width: 800,
  height: 600,
  backgroundColor: '#0x3a404d',
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [Preloader, MainScene]
}

export default GameConfig
