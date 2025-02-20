import { User } from './auth-type'
import { BaseType } from './base-type'
import { HomestayDetail } from './homestay-type'

type BookingDetail = {
  fistName: string
  lastName?: string
  email: string
  phone: string
}

export type Booking = BaseType & {
  startDate: Date
  endDate: Date
  totalDuration: string
  totalPrice: number
  bookedBy: User
  homestay: HomestayDetail
  detail?: BookingDetail | null
}

export type BookingApi = {
  id: string
  clientSecret: string
}
