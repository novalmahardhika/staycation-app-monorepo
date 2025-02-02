import { cn } from '@/lib/utils'
import { Link } from 'react-router'

type LogoProps = {
  className?: string
  href?: string
}

const Logo = ({ className, href }: LogoProps) => {
  return (
    <Link
      to={href || '#'}
      className={cn('flex gap-0 text-2xl font-medium', className)}
    >
      <span className='text-blue-600'>Stay</span>
      <span className='text-blue-950'>cation.</span>
    </Link>
  )
}

export default Logo
