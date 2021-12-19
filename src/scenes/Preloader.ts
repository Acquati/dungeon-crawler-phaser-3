import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import { createLizard01Anims } from '../anims/EnemyAnims'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader })
  }

  preload() {
    this.load.image(TextureKeys.DungeonTiles, 'tiles/dungeon-tiles.png')
    this.load.tilemapTiledJSON(
      TextureKeys.Dungeon01,
      'dungeons/dungeon-01.json'
    )
    this.load.aseprite(
      TextureKeys.Faune,
      'characters/faune.png',
      'characters/faune.json'
    )
    this.load.aseprite(
      TextureKeys.Lizard01,
      'enemies/lizard01.png',
      'enemies/lizard01.json'
    )
  }

  create() {
    this.anims.createFromAseprite(TextureKeys.Faune)
    createLizard01Anims(this.anims)

    this.scene.start(SceneKeys.MainScene)
  }
}
