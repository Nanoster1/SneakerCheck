import IShop from './IShop'

export default interface IInstructionPreview {
  instructionId: string
  modelName: string
  description: string
  previewImageUrl: string
  shop: IShop
  likes: number
  dislikes: number
}
