import { AxiosResponse } from 'axios'
import { IUser } from '../models/IUser'
import apiClient, { workingApiClient } from './client'

export async function getUserProfile(): Promise<AxiosResponse<IUser>> {
  return apiClient.get<IUser>('/users.json')
}

export async function getJwtToken(googleJwt: string) {
  return await workingApiClient.post<string>('auth/google', undefined, {
    headers: {
      Authorization: `Bearer ${googleJwt}`
    }
  }).then(r => r.data as string)
    .catch(e => console.error(e))
}
