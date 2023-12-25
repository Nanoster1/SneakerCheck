import { AxiosResponse } from 'axios'
import IInstructionPreview from '../models/IInstructionPreview'
import IInstruction from '../models/IInstruction'
import apiClient from './client'

export async function getInstructions(): Promise<AxiosResponse<IInstructionPreview[]>> {
  return apiClient.get<IInstructionPreview[]>('/instructionsPreview.json')
}

export async function getInstruction(id: string): Promise<AxiosResponse<IInstruction[]>> {
  return apiClient.get<IInstruction[]>('/FullInstructions.json')
}
