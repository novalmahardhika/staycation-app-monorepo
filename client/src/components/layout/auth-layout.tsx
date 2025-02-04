import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <section className='flex items-center justify-center h-screen px-3'>
      <Outlet />
    </section>
  )
}
