import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import { debugDraw } from '../utils/debug'

export default class MainScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Arcade.Sprite

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

    this.player = this.physics.add.sprite(48, 80, TextureKeys.Faune)
    this.player.body.setSize(16, 16)
    this.player.play('idle-down')

    const upperWallsLayer = map.createLayer('upper-walls', tileset)
    upperWallsLayer.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.player, [wallsLayer, upperWallsLayer])

    this.cameras.main.startFollow(this.player, true)
  }

  update(t: number, dt: number) {
    if (!this.cursors || !this.player) {
      return
    }

    const speed = 100

    if (this.cursors.right?.isDown) {
      this.player.scaleX = 1
      this.player.body.offset.x = this.player.body.width / 2

      this.player.setVelocity(speed, 0)
      this.player.play({ key: 'walk-side' }, true)
    } else if (this.cursors.left?.isDown) {
      this.player.scaleX = -1
      this.player.body.offset.x = 16 + this.player.body.width / 2

      this.player.setVelocity(-speed, 0)
      this.player.play({ key: 'walk-side' }, true)
    } else if (this.cursors.up?.isDown) {
      this.player.setVelocity(0, -speed)
      this.player.play({ key: 'walk-up' }, true)
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocity(0, speed)
      this.player.play({ key: 'walk-down' }, true)
    } else {
      const parts = this.player.anims.currentAnim.key.split('-')
      parts[0] = 'idle'
      this.player.setVelocity(0, 0)
      this.player.play(parts.join('-'))
    }
  }
}
