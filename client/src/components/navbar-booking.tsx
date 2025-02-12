import Logo from './ui/logo'

export function NavbarBooking() {
  return (
    <header className='h-16 mb-10 bg-white border-b shadow-sm'>
      <nav className='flex items-center justify-center h-full'>
        <Logo href='/' />
      </nav>
    </header>
  )
}
