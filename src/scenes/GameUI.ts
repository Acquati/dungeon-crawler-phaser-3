import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import EventKeys from '../consts/EventKeys'
import { sceneEvents } from '../events/EventCenter'

export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group

  constructor() {
    super({ key: SceneKeys.GameUI })
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image
    })

    this.hearts.createMultiple({
      key: TextureKeys.UIHeartFull,
      setXY: {
        x: 10,
        y: 10,
        stepX: 16
      },
      quantity: 3
    })

    sceneEvents.on(
      EventKeys.PlayerHealthChanged,
      this.handlePlayerHealthChanged,
      this
    )

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(
        EventKeys.PlayerHealthChanged,
        this.handlePlayerHealthChanged,
        this
      )
    })
  }

  private handlePlayerHealthChanged(health: number) {
    this.hearts.children.each((gameObject, index) => {
      const hearth = gameObject as Phaser.GameObjects.Image

      if (index < health) {
        hearth.setTexture(TextureKeys.UIHeartFull)
      } else {
        hearth.setTexture(TextureKeys.UIHeartEmpty)
      }
    })
  }
}
