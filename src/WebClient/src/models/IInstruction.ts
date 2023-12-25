import IInstructionPreview from './IInstructionPreview'
import IContent from './IContent'
import IComment from './IComment'

export default interface IInstruction extends IInstructionPreview {
  content: IContent[]
  comments: IComment[]
}
