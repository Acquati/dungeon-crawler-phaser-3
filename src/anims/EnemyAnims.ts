import TextureKeys from '../consts/TextureKeys'

export const createLizard01Anims = (
  anims: Phaser.Animations.AnimationManager
) => {
  anims.createFromAseprite(TextureKeys.Lizard01)
}
