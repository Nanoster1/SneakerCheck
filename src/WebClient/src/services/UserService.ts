import { AxiosResponse } from 'axios'
import { IUser } from '../models/IUser'
import apiClient from './client'

export async function getUserProfile(): Promise<AxiosResponse<IUser>> {
  return apiClient.get<IUser>('/users.json')
}
