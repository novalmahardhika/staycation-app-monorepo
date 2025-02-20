import { BaseType } from './base-type'
import { Category } from './category-type'

export type Facility = {
  type: string
  label: string
  qty: number
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
  images: string[]
  price: number
  discount?: number
  isPopular: boolean
  city: string
  country: string
  description: string
  category: Category[]
}

export type HomestayDetail = Homestay & {
  facilities: Facility[]
}
