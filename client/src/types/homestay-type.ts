import { BaseType } from './base-type'

export type HomestayAddress = BaseType & {
  zipCode: string
  city: string
  country: string
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
