import { Outlet } from 'react-router-dom'
import Navbar from '../navbar'
import Footer from '../footer'

export default function MainLayout() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='container flex-col flex-1 py-10 mt-10 space-y-16 sm:mt-14'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
