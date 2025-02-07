import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Input } from './input'
import { InputHTMLAttributes } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './calendar'

// Input Custom Field
type InputProps = InputHTMLAttributes<HTMLInputElement>

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
} & InputProps

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...inputProps} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Date Range Picker Custom Field
type DateRangePickerFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  className?: string
  valueClassName?: string
  description?: string
}

export function DateRangePickerField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  description,
  valueClassName,
}: DateRangePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    className
                  )}
                >
                  <CalendarIcon />
                  {!field.value || !field.value.from || !field.value.to ? (
                    <span className={cn('w-full', valueClassName)}>
                      Pick a date
                    </span>
                  ) : (
                    <span className={cn('w-full', valueClassName)}>
                      {format(field.value.from, 'dd LLL yy')} -{' '}
                      {format(field.value.to, 'dd LLL yy')}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={field.value.from}
                  selected={{ from: field.value.from, to: field.value.to }}
                  onSelect={(value) => {
                    field.onChange(value)
                  }}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
