import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar, CalendarProps } from './calendar'
import { SelectRangeEventHandler } from 'react-day-picker'

type DateRangeType = {
  from?: Date
  to?: Date
}

type DateRangePickerProps = {
  date: DateRangeType
  onSelect: SelectRangeEventHandler
  className?: string
  valueClassName?: string
} & Omit<CalendarProps, 'mode' | 'selected'>

export default function DateRangePicker({
  date,
  className,
  valueClassName,
  onSelect,
  ...props
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon />
          {!date || !date.from || !date.to ? (
            <span className={cn('w-full', valueClassName)}>Pick a date</span>
          ) : (
            <span className={cn('w-full', valueClassName)}>
              {format(date.from, 'dd LLL yy')} - {format(date.to, 'dd LLL yy')}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={date.from}
          selected={{ from: date.from, to: date.to }}
          onSelect={onSelect}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
