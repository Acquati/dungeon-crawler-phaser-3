import Preloader from './scenes/Preloader'
import MainScene from './scenes/MainScene'

const windowWidth = Math.round(window.innerWidth)
const windowHeight = Math.round(window.innerHeight)

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Phaser 3 Typescript Template',
  url: '',
  version: '1.0',
  width: windowWidth / 2,
  height: windowHeight / 2,
  backgroundColor: '#000000',
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  pixelArt: true,
  scene: [Preloader, MainScene],
  scale: {
    zoom: 2
  }
}

export default GameConfig
