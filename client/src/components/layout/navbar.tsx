import Logo from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export default function Navbar() {
  return (
    <header className=' h-16 border-b shadow-sm'>
      <nav className=' h-full flex items-center max-w-7xl mx-auto px-3 justify-between'>
        <Logo />
        <span className='flex h-full items-center space-x-3'>
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
    <a
      href={href}
      className={cn(
        'text-[15px] text-blue-950 hover:text-blue-600 duration-200',
        className
      )}
    >
      {children}
    </a>
  )
}
