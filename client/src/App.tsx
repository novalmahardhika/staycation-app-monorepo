import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import MainLayout from './components/layout/main-layout'
import AuthLayout from './components/layout/auth-layout'
import SignInPage from './pages/auth/sign-in'
import SignUpPage from './pages/auth/sign-up'
import HomestayDetailPage from './pages/homestay-detail-page'
import HomestayPage from './pages/homestays'
import BookingLayout from './components/layout/booking-layout'
import BookingPage from './pages/booking-page'
import BookingPaymentPage from './pages/booking-payment-page'
import BookingSuccessPage from './pages/booking-success-page'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='homestays' element={<HomestayPage />} />
        <Route path='homestays/:id' element={<HomestayDetailPage />} />
      </Route>

      <Route path='/bookings' element={<BookingLayout />}>
        <Route path=':id' element={<BookingPage />} />
        <Route path=':id/payment' element={<BookingPaymentPage />} />
        <Route path=':id/success' element={<BookingSuccessPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='signIn' element={<SignInPage />} />
        <Route path='signUp' element={<SignUpPage />} />
      </Route>
    </Routes>
  )
}

export default App
