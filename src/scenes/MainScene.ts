import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import DepthKeys from '../consts/DepthKeys'
import EventKeys from '../consts/EventKeys'
import { debugDraw } from '../utils/debug'
import Lizard01 from '../objects/Lizard01'
import Player from '../objects/Player'
import '../objects/Player'
import { sceneEvents } from '../events/EventCenter'
import Chest from '../objects/Chest'

export default class MainScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private lizards01!: Phaser.Physics.Arcade.Group
  private playerLizards01Collider!: Phaser.Physics.Arcade.Collider
  private flyingKnifes!: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: SceneKeys.MainScene })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.scene.run(SceneKeys.UserInterface)

    const map = this.make.tilemap({ key: TextureKeys.Dungeon01 })
    const tileset = map.addTilesetImage(
      TextureKeys.DungeonTiles,
      TextureKeys.DungeonTiles,
      16,
      16
    )
    map.createLayer('ground', tileset)
    const wallsLayer = map.createLayer('walls', tileset)
    wallsLayer.setDepth(DepthKeys.Walls)
    wallsLayer.setCollisionByProperty({ collides: true })
    debugDraw(wallsLayer, this)

    const chests = this.physics.add.staticGroup({
      classType: Chest
    })
    const chestsLayer = map.getObjectLayer('chests')
    chestsLayer.objects.forEach((chest) => {
      chests.get(chest.x, chest.y, TextureKeys.Chest)
    })

    this.flyingKnifes = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite
    })

    this.player = this.add.player(48, 80, TextureKeys.Faune)
    this.player.setFlyingKnifes(this.flyingKnifes)

    this.lizards01 = this.physics.add.group({
      classType: Lizard01
      // createCallback: (GameObject) => {
      //   const lizard01GameObject = GameObject as Lizard01
      //   lizard01GameObject.body.onCollide = true
      // }
    })

    this.lizards01.get(480, 80, TextureKeys.Lizard01)

    // this.lizard01 = this.physics.add.sprite(480, 80, TextureKeys.Lizard01)
    // this.lizard01.body.setSize(16, 16)
    // this.lizard01.anims.play({
    //   key: Lizard01Keys.IdleSide,
    //   repeat: -1
    // })

    const upperWallsLayer = map.createLayer('upper-walls', tileset)
    upperWallsLayer.setDepth(DepthKeys.UpperWalls)
    upperWallsLayer.setCollisionByProperty({ collides: true })
    debugDraw(upperWallsLayer, this)

    this.physics.add.collider(this.player, [wallsLayer, upperWallsLayer])
    this.physics.add.collider(this.lizards01, [wallsLayer, upperWallsLayer])
    this.physics.add.collider(
      this.flyingKnifes,
      [wallsLayer, upperWallsLayer],
      this.handleFlyingKnifesWallsCollision,
      undefined,
      this
    )

    this.physics.add.collider(
      this.player,
      chests,
      this.handlePlayerChestCollision,
      undefined,
      this
    )

    this.playerLizards01Collider = this.physics.add.collider(
      this.player,
      this.lizards01,
      this.handlePlayerLizard01Collision,
      undefined,
      this
    )

    this.physics.add.collider(
      this.flyingKnifes,
      this.lizards01,
      this.handleFlyingKnifesLizards01Collision,
      undefined,
      this
    )

    this.cameras.main.startFollow(this.player, true)
  }

  private handlePlayerChestCollision(
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const chest = object2 as Chest
    this.player.setChest(chest)
  }

  private handlePlayerLizard01Collision(
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const lizard01 = object2 as Lizard01

    const dx = this.player.x - lizard01.x
    const dy = this.player.y - lizard01.y

    const direction = new Phaser.Math.Vector2(dx, dy).normalize().scale(150)

    this.player.handleDamage(direction)

    sceneEvents.emit(EventKeys.PlayerHealthChanged, this.player.health)

    if (this.player.health <= 0) {
      this.playerLizards01Collider.destroy()
    }
  }

  private handleFlyingKnifesLizards01Collision(
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    // this.flyingKnifes.killAndHide(object1)
    this.flyingKnifes.remove(object1, true, true)

    const lizard01 = object2 as Lizard01

    lizard01.handleDamage()
  }

  private handleFlyingKnifesWallsCollision(
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    this.flyingKnifes.remove(object1, true, true)
  }

  update(time: number, delta: number) {
    if (!this.cursors || !this.player) return

    this.player.update(delta, this.cursors)
  }
}
