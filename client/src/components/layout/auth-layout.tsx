import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function AuthLayout() {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [navigate, token])

  return (
    <section className='flex items-center justify-center h-screen px-3'>
      <Outlet />
    </section>
  )
}
