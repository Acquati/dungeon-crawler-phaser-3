import { Lizard01AnimsKeys } from '../consts/AnimsKeys'

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  IDLE
}

const randomDirection = (exclude: Direction) => {
  const x = Phaser.Math.Between(0, 3)

  for (let i = 0; i <= 4; i += 1) {
    if (exclude === i) {
      if (x < i) {
        return x
      } else {
        return x + 1
      }
    }
  }

  return 4
}

// const randomDirection = (exclude: Direction) => {
//   let newDirection = Phaser.Math.Between(0, 4)
//   while (newDirection === exclude) {
//     newDirection = Phaser.Math.Between(0, 4)
//   }
//   return newDirection
// }

export default class Lizard01 extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT
  private speed = 50
  private moveEvent: Phaser.Time.TimerEvent
  // private idle = false
  // private timer = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    scene.physics.add.existing(this)
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(16, 16)
    body.onCollide = true

    // this.anims.play({
    //   key: Lizard01AnimsKeys.WalkSide,
    //   repeat: -1
    // })

    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    )

    this.moveEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.direction = randomDirection(this.direction)
      },
      loop: true
    })
  }

  destroy(fromScene?: boolean) {
    this.moveEvent.destroy()

    super.destroy(fromScene)
  }

  private handleTileCollision(
    gameObject: Phaser.GameObjects.GameObject,
    tile: Phaser.Tilemaps.Tile
  ) {
    if (gameObject !== this) {
      return
    }

    this.direction = randomDirection(this.direction)
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    // if (this.idle) {
    //   this.timer += delta
    //   if (this.timer >= 3000) {
    //     this.idle = false
    //     this.timer = 0
    //   }
    // }

    switch (this.direction) {
      case Direction.UP:
        this.setVelocity(0, -this.speed)
        this.anims.play(
          {
            key: Lizard01AnimsKeys.WalkSide
          },
          true
        )
        break

      case Direction.DOWN:
        this.setVelocity(0, this.speed)
        this.anims.play(
          {
            key: Lizard01AnimsKeys.WalkSide
          },
          true
        )
        break

      case Direction.LEFT:
        this.scaleX = -1
        this.body.offset.x = this.body.width * 2
        this.setVelocity(-this.speed, 0)
        this.anims.play(
          {
            key: Lizard01AnimsKeys.WalkSide
          },
          true
        )
        break

      case Direction.RIGHT:
        this.scaleX = 1
        this.body.offset.x = this.body.width
        this.setVelocity(this.speed, 0)
        this.anims.play(
          {
            key: Lizard01AnimsKeys.WalkSide
          },
          true
        )
        break

      case Direction.IDLE:
        this.setVelocity(0, 0)
        // this.idle = true
        this.anims.play(
          {
            key: Lizard01AnimsKeys.IdleSide
          },
          true
        )
        break
    }
  }
}
