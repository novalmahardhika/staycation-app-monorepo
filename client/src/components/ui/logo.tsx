import { cn } from '@/lib/utils'
import { Button } from './button'

type LogoProps = {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Button
      variant='ghost'
      className={cn('flex gap-0 text-2xl font-medium', className)}
    >
      <span className='text-blue-600'>Stay</span>
      <span className='text-blue-950'>cation</span>
    </Button>
  )
}

export default Logo
