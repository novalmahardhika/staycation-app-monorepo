import { Outlet } from 'react-router-dom'
import Navbar from '../navbar'
import Footer from '../footer'

export default function MainLayout() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='container grid flex-1 gap-16 py-10 mt-14'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
