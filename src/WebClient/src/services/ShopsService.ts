import { AxiosResponse } from 'axios'
import IShop from '../models/IShop'
import { workingApiClient } from './client'

export async function getShops(): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.get<IShop[]>('/Shop/getList/10')
}

export async function getShop(id: string): Promise<AxiosResponse<IShop>> {
  return workingApiClient.get<IShop>(`/Shop/get/${id}`)
}

export async function createShop(shop: IShop): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.post<number>('/shop', shop)
}

export async function updateShop(id: string, shop: IShop): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.put<number>(`/Shop/update?id=${id}`, shop)
}

export async function deleteShop(id: string): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.delete<number>(`/Shop/delete/id=${id}`)
}
