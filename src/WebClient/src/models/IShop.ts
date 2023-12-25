import SocialNameEnum from './SocialNameEnum'

export interface Address {
  id?: string
  country: string
  city: string
  street: string
  house: string
  region: string
  regionNumber: string
}

export interface ShopRating {
  id?: string
  value: string
}

export interface Social {
  id?: string
  url: string
  name: SocialNameEnum
}

export default interface IShop {
  id?: string
  name: string
  address: Address
  description: string
  imageLink: string
  socials: Social[]
  shopRating: ShopRating
}
