import { BaseType } from './base-type'

export type HomestayAddress = BaseType & {
  zipCode: string
  city: string
  country: string
}

export type Detail = BaseType & {
  owner?: string
  images: string[]
  description?: string
  bedroom: number
  livingRoom: number
  bathroom: number
  kitchen: number
  airConditioner: number
  refrigerator: number
  television: number
  wifi: number
  swimmingPool: number
}

export type Homestay = BaseType & {
  id: string
  name: string
  image: string
  price: number
  discount?: number
  isPopular: boolean
  address: HomestayAddress
}

export type HomestayDetail = Homestay & {
  detail: Detail
}
