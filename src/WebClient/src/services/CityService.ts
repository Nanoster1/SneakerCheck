import { AxiosResponse } from 'axios'
import ICity from '../models/IRegion'
import apiClient from './client'

export async function getRegions(): Promise<AxiosResponse<ICity[]>> {
  return apiClient.get<ICity>('/cities.json')
}
