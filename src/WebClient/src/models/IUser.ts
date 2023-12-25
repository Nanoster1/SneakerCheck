import { ICity } from './IRegion'
import IInstructionPreview from './IInstructionPreview'

export interface IUser {
  name: string
  surname: string
  city: ICity
  likedInstructions: IInstructionPreview[]
}
