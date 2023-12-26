import { AxiosResponse } from 'axios'
import { workingApiClient } from './client'
import { IInstructionDataDTO, IInstructionDataSave } from '../pages/CreateInstruction/types'

export async function getInstructions(): Promise<AxiosResponse<IInstructionDataDTO[]>> {
  return workingApiClient.get<IInstructionDataDTO[]>('instruction/all')
}

export async function getInstruction(id: string): Promise<AxiosResponse<IInstructionDataDTO>> {
  return workingApiClient.get<IInstructionDataDTO>(`instruction/${id}`)
}

export async function postInstruction(instruction: IInstructionDataSave) {
  return workingApiClient.post('instruction', instruction)
}
