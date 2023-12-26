import { MarkerAreaState } from 'markerjs2'



export interface Base64 {
  base64: string
}

export interface ImageBytes {
  bytes: string
  format: string
}

export interface IInstructionCard {
  originalPhotos: {
    original?: Base64
    fake?: Base64
  }
  fakeImage?: Base64
  editedPhotos: {
    original?: Base64
    fake?: Base64
  }
  markerState: {
    original?: MarkerAreaState
    fake?: MarkerAreaState
  }
  imageDescription: string
}

export interface IInstructionData {
  id?: string
  category: number
  shopId: string
  productName: string
  previewImage?: Base64
  description: string
  likes: number
  dislikes: number
}

export interface IInstructionDataSave {
  category: number
  shopId: string
  productName: string
  previewImage: ImageBytes
  description: string
  content: {
    originalImage: ImageBytes
    fakeImage: ImageBytes
    imageDescription: string
  }[]
  likes: number
  dislikes: number
}

export interface IInstructionDataDTO {
  id: string
  category: number
  shopId: string
  productName: string
  previewImageUrl: string
  description: string
  content: {
    originalImageUrl: string
    fakeImageUrl: string
    imageDescription: string
  }[]
  likes: number
  dislikes: number
}