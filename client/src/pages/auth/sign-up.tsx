import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InputField } from '@/components/ui/custom-field'
import { Form } from '@/components/ui/form'
import { useSignUpMutation } from '@/hooks/query/useMutation/use-auth-mutation'
import { useZodForm } from '@/hooks/use-zod-form'
import {
  signUpDefaultValues,
  SignUpSchema,
  signUpSchema,
} from '@/schemas/auth-schema'
import { Link } from 'react-router'
import { toast } from 'sonner'

export default function SignUpPage() {
  const form = useZodForm(signUpSchema, signUpDefaultValues)
  const { mutateAsync } = useSignUpMutation()

  const onSubmitHandler = (value: SignUpSchema) => {
    toast.promise(mutateAsync(value), {
      loading: 'Loading...',
      error: (err) => `Sign Up failed: ${err.message}`,
      success: () => {
        form.reset({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        })
        return `Sign Up successfully`
      },
    })
  }

  return (
    <Card className='w-full max-w-[420px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Up.</CardTitle>
        <CardDescription>lorem ipsum dolor sit amet.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className='flex flex-col md:flex-row md:space-x-3'>
              <InputField
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='Input your first name'
                type='text'
              />
              <InputField
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Input your last name'
                type='text'
              />
            </div>
            <InputField
              control={form.control}
              name='email'
              label='Email'
              placeholder='Input your correct email'
              type='text'
            />
            <InputField
              control={form.control}
              name='password'
              label='Password'
              placeholder='Input your correct password'
              type='password'
            />

            <div className='grid gap-4 mt-4'>
              <Button className='w-full'>Login</Button>
              <Link
                to='/signIn'
                className='text-sm text-center hover:underline'
              >
                Already have an account? Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
