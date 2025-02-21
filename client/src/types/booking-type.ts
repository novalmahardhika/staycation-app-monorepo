import { User } from './auth-type'
import { BaseType } from './base-type'
import { HomestayDetail } from './homestay-type'
import { Payment } from './payment-type'

type Detail = {
  firstName: string
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
  detail?: Detail | null
}

export type BookingDetail = Booking & {
  payment: Payment
  homestay: HomestayDetail
}

export type BookingApi = {
  id: string
  clientSecret: string
}
