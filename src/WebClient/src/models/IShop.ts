export interface Social {
  url: string
  name: string
}

export interface IShopCreate {
  id?: string
  name: string
  city: string
  address: string
  description: string
  icon: {
    bytes: string,
    format: string
  },
  shopUrls: Social[]
  rating?: number
}

export default interface IShop {
  id?: string
  sellerId: string
  name: string
  city: string
  address: string
  description: string
  icon: {
    bytes: string,
    format: string
  },
  iconUrl?: string
  shopUrls: Social[]
  rating?: number
}