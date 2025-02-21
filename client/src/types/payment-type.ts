import { BaseType } from './base-type'

export const STATUS_PAYMENT = [
  'requires_payment_method',
  'requires_action',
  'amount_capturable_updated',
  'succeeded',
  'processing',
  'payment_failed',
  'canceled',
  'requires_capture',
  'requires_confirmation',
] as const

export type StatusPayment = (typeof STATUS_PAYMENT)[number]

export type Payment = BaseType & {
  stripeId: string
  amount: number
  currency: 'usd'
  status: StatusPayment
}
