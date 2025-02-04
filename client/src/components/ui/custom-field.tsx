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

// Input Custom Field
type InputProps = InputHTMLAttributes<HTMLInputElement>

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
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
