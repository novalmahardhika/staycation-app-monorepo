import { InputField } from '../ui/custom-field'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type FormBookingBiodataProps<T extends FieldValues> = {
  form: UseFormReturn<T>
}

export function FormBookingBiodata<T extends FieldValues>({
  form,
}: FormBookingBiodataProps<T>) {
  return (
    <div className='grid'>
      <InputField
        label='Fist Name'
        control={form.control}
        name={'firstName' as Path<T>}
        placeholder='Please input your first name'
      />
      <InputField
        label='Last Name'
        control={form.control}
        name={'lastName' as Path<T>}
        placeholder='Please input your last name'
      />
      <InputField
        label='Email Address'
        control={form.control}
        name={'email' as Path<T>}
        placeholder='Please input your email'
      />
      <InputField
        label='Phone Number'
        control={form.control}
        name={'phone' as Path<T>}
        placeholder='Please input your phone number'
        type='number'
      />
    </div>
  )
}
