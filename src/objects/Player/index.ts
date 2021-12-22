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
  DAMAGE,
  DEAD
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private healthState = HealthState.IDLE
  private damageTimer = 0
  private speed = 100

  private _health = 3
  get health() {
    return this._health
  }

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
    if (this._health <= 0) {
      return
    }

    if (this.healthState === HealthState.DAMAGE) return

    this._health -= 1

    if (this._health <= 0) {
      this.healthState = HealthState.DEAD
      this.setVelocity(0, 0)
      this.setImmovable(true)
      this.anims.play({ key: FauneAnimsKeys.DieSide })
    } else {
      this.setVelocity(direction.x, direction.y)
      this.damageTimer = 0
      this.healthState = HealthState.DAMAGE
      this.setTint(0xff9999)
    }
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
          this.damageTimer = 0
          this.clearTint()
        }
        break
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (
      this.healthState === HealthState.DAMAGE ||
      this.healthState === HealthState.DEAD
    ) {
      return
    }

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
