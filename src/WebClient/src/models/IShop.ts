export interface Social {
  url: string
  name: string
}

export default interface IShop {
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