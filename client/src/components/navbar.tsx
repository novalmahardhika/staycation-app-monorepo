import Logo from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <header className='fixed w-full h-16 bg-white border-b shadow-sm'>
      <nav className='container flex items-center justify-between h-full'>
        <Logo href='/' />
        <span className='flex items-center h-full space-x-6'>
          <ItemNavbar href='#'>Home</ItemNavbar>
          <ItemNavbar href='#'>Browse by</ItemNavbar>
          <ItemNavbar href='#'>Stories</ItemNavbar>
          <ItemNavbar href='#'>Agents</ItemNavbar>
        </span>
      </nav>
    </header>
  )
}

type ItemNavbarProps = {
  children: ReactNode
  href: string
  className?: string
}

function ItemNavbar({ children, className, href }: ItemNavbarProps) {
  return (
    <Link
      to={href}
      className={cn(
        'text-[15px] text-slate-900 hover:text-blue-600 duration-200',
        className
      )}
    >
      {children}
    </Link>
  )
}
