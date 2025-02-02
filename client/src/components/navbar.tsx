import Logo from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Link } from 'react-router'
import { Button } from './ui/button'
import { LogIn, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'

export default function Navbar() {
  return (
    <header className='fixed z-50 w-full h-16 bg-white border-b shadow-sm'>
      <nav className='container flex items-center justify-between h-full'>
        <Logo href='/' />
        <span className='items-center hidden h-full space-x-6 md:flex'>
          <ItemNavbar href='#'>Home</ItemNavbar>
          <ItemNavbar href='#'>Browse by</ItemNavbar>
          <ItemNavbar href='#'>Stories</ItemNavbar>
          <ItemNavbar href='#'>Agents</ItemNavbar>
          <Button
            variant='outline'
            className='gap-0.5 font-medium tracking-wide text-blue-600 border-blue-600 hover:text-blue-800'
          >
            Login
            <LogIn />
          </Button>
        </span>

        {/* sidebar */}
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <Menu />
          </SheetTrigger>
          <SheetContent className='flex flex-col justify-between'>
            <SheetHeader className='space-y-7'>
              <Logo />
              <div className='flex flex-col items-start space-y-3'>
                <ItemNavbar href='#'>Home</ItemNavbar>
                <ItemNavbar href='#'>Browse by</ItemNavbar>
                <ItemNavbar href='#'>Stories</ItemNavbar>
                <ItemNavbar href='#'>Agents</ItemNavbar>
              </div>
            </SheetHeader>
            <SheetFooter>
              <Button
                variant='outline'
                className='gap-0.5 font-medium tracking-wide text-blue-600 border-blue-600 hover:text-blue-800 w-full'
              >
                Login
                <LogIn />
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
