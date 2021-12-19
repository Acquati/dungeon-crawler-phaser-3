import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import { FauneKeys, Lizard01Keys } from '../consts/AnimsKeys'
import { debugDraw } from '../utils/debug'
import playerMovement from '../utils/playerMovement'

export default class MainScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Arcade.Sprite
  private lizard01!: Phaser.Physics.Arcade.Sprite
  private speed = 100

  constructor() {
    super({ key: SceneKeys.MainScene })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    const map = this.make.tilemap({ key: TextureKeys.Dungeon01 })
    const tileset = map.addTilesetImage(
      TextureKeys.DungeonTiles,
      TextureKeys.DungeonTiles,
      16,
      16
    )
    map.createLayer('ground', tileset)
    const wallsLayer = map.createLayer('walls', tileset)
    wallsLayer.setCollisionByProperty({ collides: true })
    debugDraw(wallsLayer, this)

    this.lizard01 = this.physics.add.sprite(480, 80, TextureKeys.Lizard01)
    this.lizard01.body.setSize(16, 16)
    this.lizard01.play({
      key: Lizard01Keys.IdleSide,
      repeat: -1
    })

    this.player = this.physics.add.sprite(48, 80, TextureKeys.Faune)
    this.player.body.setSize(16, 16)
    this.player.play(FauneKeys.IdleDown)

    const upperWallsLayer = map.createLayer('upper-walls', tileset)
    upperWallsLayer.setCollisionByProperty({ collides: true })
    debugDraw(upperWallsLayer, this)

    this.physics.add.collider(this.player, [wallsLayer, upperWallsLayer])

    this.cameras.main.startFollow(this.player, true)
  }

  update(t: number, dt: number) {
    if (!this.cursors || !this.player) {
      return
    }

    playerMovement(this.cursors, this.player, this.speed)
  }
}
