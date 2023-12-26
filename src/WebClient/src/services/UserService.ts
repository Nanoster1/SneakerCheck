import { AxiosResponse } from 'axios'
import { UserDTO } from '../models/IUser'
import { workingApiClient } from './client'

export async function getUserProfile(): Promise<AxiosResponse<UserDTO>> {
  return workingApiClient.get<UserDTO>('user/info')
}

export async function getJwtToken(googleJwt: string) {
  return await workingApiClient.post<string>('auth/google', undefined, {
    headers: {
      Authorization: `Bearer ${googleJwt}`
    }
  }).then(r => r.data as string)
    .catch(e => console.error(e))
}

export async function becomeSeller() {
  const newToken = await workingApiClient.patch<string>('auth/request-seller-role')
  return newToken.data
}

export async function changeUserCity(city: string) {
  await workingApiClient.patch<string>('user/change-city', {
    newCity: city
  })
}