import { Lizard01Keys } from '../consts/AnimsKeys'

export default class Lizard01 extends Phaser.Physics.Arcade.Sprite {
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

    this.anims.play({
      key: Lizard01Keys.IdleSide,
      repeat: -1
    })
  }
}
