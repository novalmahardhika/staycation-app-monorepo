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
    <section className='flex flex-col  justify-center h-screen px-3 max-w-[430px] mx-auto'>
      <Outlet />
    </section>
  )
}
