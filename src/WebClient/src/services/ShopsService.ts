import { AxiosResponse } from 'axios'
import IShop, { IShopCreate } from '../models/IShop'
import { workingApiClient } from './client'

export async function getShops(): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.get<IShop[]>('/shop/all')
}

export async function getShop(id: string): Promise<AxiosResponse<IShop>> {
  return workingApiClient.get<IShop>(`/shop/${id}`)
}

export async function createShop(shop: IShopCreate): Promise<AxiosResponse<IShop[]>> {
  return workingApiClient.post('/shop', shop)
}

// export async function updateShop(id: string, shop: IShop): Promise<AxiosResponse<IShop[]>> {
//   return workingApiClient.put(`/Shop/update?id=${id}`, shop)
// }

export async function getSellerShop(sellerId: string): Promise<AxiosResponse<IShop>> {
  return workingApiClient.get(`/shop/seller/${sellerId}`)
}
//
// export async function deleteShop(id: string): Promise<AxiosResponse<IShop[]>> {
//   return workingApiClient.delete<number>(`/Shop/delete/id=${id}`)
// }
