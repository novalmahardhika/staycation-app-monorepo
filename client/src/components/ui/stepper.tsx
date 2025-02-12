import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { ReactNode } from 'react'

type StepperProps = {
  currentIndex: number
}

export function Stepper({ currentIndex }: StepperProps) {
  return (
    <span className='relative flex items-center justify-between w-56'>
      {Array.from({ length: 3 }).map((_, index) =>
        index + 1 < currentIndex || currentIndex === 3 ? (
          <FinishStep key={`step-${index}`} />
        ) : (
          <ActiveStep
            key={`step-${index}`}
            isActive={currentIndex === index + 1}
          >
            {index + 1}
          </ActiveStep>
        )
      )}
      <span className='absolute w-full h-0.5 bg-gray-200 -z-10'></span>
    </span>
  )
}

type ActiveStepProps = {
  children: ReactNode
  isActive?: boolean
}

function ActiveStep({ children, isActive }: ActiveStepProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-12 h-12 text-gray-500 bg-gray-200 border rounded-full',
        {
          'w-14 h-14 bg-white': isActive,
        }
      )}
    >
      <div
        className={cn('flex items-center justify-center w-12 h-12 text-2xl', {
          'bg-gray-200 border rounded-full': isActive,
        })}
      >
        {children}
      </div>
    </div>
  )
}

function FinishStep() {
  return (
    <div className='flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400'>
      <Check size={32} color='#ffffff' strokeWidth={3} />
    </div>
  )
}
