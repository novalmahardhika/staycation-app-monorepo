import { Outlet } from 'react-router'
import { NavbarBooking } from '../navbar-booking'

export default function BookingLayout() {
  return (
    <section>
      <NavbarBooking />
      <Outlet />
    </section>
  )
}
