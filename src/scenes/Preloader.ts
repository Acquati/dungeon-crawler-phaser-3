import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader })
  }

  preload() {
    this.load.image(TextureKeys.DungeonTiles, 'tiles/dungeon-tiles.png')
    this.load.tilemapTiledJSON(TextureKeys.Dungeon, 'tiles/dungeon-01.json')
  }

  create() {
    this.scene.start(SceneKeys.MainScene)
  }
}
