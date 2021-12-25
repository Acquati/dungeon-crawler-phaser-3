import DepthKeys from '../consts/DepthKeys'
import { ChestAnimsKeys } from '../consts/AnimsKeys'

export default class Chest extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    this.setOrigin(0, 1)
    this.setDepth(DepthKeys.Items)
    this.anims.play(ChestAnimsKeys.Idle)
  }

  open() {
    if (this.anims.currentAnim.key === ChestAnimsKeys.Open) {
      return 0
    }

    this.play(ChestAnimsKeys.Open)
    return Phaser.Math.Between(1, 5)
  }
}
