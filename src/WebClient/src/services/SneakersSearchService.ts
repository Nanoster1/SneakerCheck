import { AxiosResponse } from 'axios'
import { IModel } from '../models/IModel'
import apiClient from './client'

export async function getSneakersModels(): Promise<AxiosResponse<IModel[]>> {
  return apiClient.get<IModel[]>('/sneakersModels.json')
}
