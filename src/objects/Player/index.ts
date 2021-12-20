import { FauneAnimsKeys } from '../../consts/AnimsKeys'
import playerMovement from './playerMovement'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      player(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Player
    }
  }
}

enum HealthState {
  IDLE,
  DAMAGE
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private healthState = HealthState.IDLE
  private damageTimer = 0
  private speed = 100

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.anims.play(FauneAnimsKeys.WalkDown)
  }

  handleDamage(direction: Phaser.Math.Vector2) {
    if (this.healthState === HealthState.DAMAGE) return

    this.setVelocity(direction.x, direction.y)
    this.setTint(0xff9999)
    this.healthState = HealthState.DAMAGE
    this.damageTimer = 0
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    switch (this.healthState) {
      case HealthState.IDLE:
        break

      case HealthState.DAMAGE:
        this.damageTimer += delta
        if (this.damageTimer >= 250) {
          this.healthState = HealthState.IDLE
          this.clearTint()
          this.damageTimer = 0
        }
        break
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.healthState === HealthState.DAMAGE) return

    playerMovement(cursors, this, this.speed)
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'player',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Player(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    )

    sprite.body.setSize(16, 16)

    return sprite
  }
)
