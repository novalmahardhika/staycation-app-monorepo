import { BaseType } from './base-type'

export type User = BaseType & {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
  role: 'USER' | 'ADMIN'
  phone: string
  address: string
}

export type AuthSignIn = {
  accessToken: string
}
