import Preloader from './scenes/Preloader'
import MainScene from './scenes/MainScene'
import UserInterface from './scenes/UserInterface'

const windowWidth = Math.floor(window.innerWidth / 2)
const windowHeight = Math.floor(window.innerHeight / 2)

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Phaser 3 Typescript Template',
  url: '',
  version: '1.0',
  width: windowWidth,
  height: windowHeight,
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
  scene: [Preloader, MainScene, UserInterface],
  scale: {
    zoom: 2
  }
}

export default GameConfig
