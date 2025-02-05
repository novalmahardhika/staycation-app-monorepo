import { useAuth } from '@/hooks/use-auth'
import { Outlet, useNavigate } from 'react-router'

export default function AuthLayout() {
  const { token } = useAuth()
  const navigate = useNavigate()

  console.log(token)

  if (token) {
    navigate('/')
  }

  return (
    <section className='flex items-center justify-center h-screen px-3'>
      <Outlet />
    </section>
  )
}
