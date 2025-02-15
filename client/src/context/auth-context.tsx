import { useLocalStorage } from '@/hooks/use-local-storage'
import { SignInSchema } from '@/schemas/auth-schema'
import { AuthSignIn, User } from '@/types/auth-type'
import { api, ResponseApi } from '@/utils/api'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

type AuthContextType = {
  user: User | null
  token: string | null
  signIn: (payload: SignInSchema) => Promise<void>
  signOut: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  signIn: async () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setItem, removeItem, getItem } = useLocalStorage()
  const [token, setToken] = useState<string | null>(getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (token) {
      fetchUser()
    }

    return () => setUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const signIn = async (payload: SignInSchema) => {
    const response = api<ResponseApi<AuthSignIn>>('/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    toast.promise(response, {
      loading: 'Loading...',
      success: 'Login successful!',
      error: (err) => `Login failed: ${err.message}`,
    })

    try {
      const res = await response
      const accessToken = res.data.accessToken
      setToken(accessToken)
      setItem('token', accessToken)
    } catch (error) {
      console.log(error)
    }
  }
  const signOut = () => {
    removeItem('token')
    setToken(null)
    setUser(null)
    window.location.reload()
  }

  const fetchUser = async () => {
    try {
      const res = await api<ResponseApi<User>>('/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
