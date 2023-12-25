import { MarkerAreaState } from 'markerjs2'

export interface IInstructionCard {
  id: number
  description: string
  editedPhotos: {
    original?: string
    fake?: string
  }
  originalPhotos: {
    original?: string
    fake?: string
  }
  markerState: {
    original?: MarkerAreaState
    fake?: MarkerAreaState
  }
}
