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
import DateRangePicker from './date-range-picker'

// Input Custom Field
type InputProps = InputHTMLAttributes<HTMLInputElement>

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
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
          {label && <FormLabel>{label}</FormLabel>}
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
            <DateRangePicker
              date={field.value}
              className={className}
              valueClassName={valueClassName}
              onSelect={field.onChange}
              disabled={{ before: new Date() }}
              numberOfMonths={2}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
