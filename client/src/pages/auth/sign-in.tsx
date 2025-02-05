import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  signInDefaultValues,
  signInSchema,
  SignInSchema,
} from '@/schemas/auth-schema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/ui/custom-field'
import { useZodForm } from '@/hooks/use-zod-form'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/use-auth'

export default function SignInPage() {
  const { signIn } = useAuth()
  const form = useZodForm(signInSchema, signInDefaultValues)

  const onSubmitHandler = (value: SignInSchema) => {
    signIn(value)
  }

  return (
    <Card className='w-full max-w-[420px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign In.</CardTitle>
        <CardDescription>lorem ipsum dolor sit amet.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
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

            <div className='grid gap-4 mt-3'>
              <Link to='#' className='text-sm text-end '>
                Forgot your password ?
              </Link>
              <Button className='w-full'>Login</Button>
              <Link
                to='/signUp'
                className='text-sm text-center hover:underline'
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
