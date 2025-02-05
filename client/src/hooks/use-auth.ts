import { AuthContext } from '@/context/auth-context'
import { useContext } from 'react'

export function useAuth() {
  const { user, token, signIn, signOut } = useContext(AuthContext)

  return { user, token, signIn, signOut }
}
