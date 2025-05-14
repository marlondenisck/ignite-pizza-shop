import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInSchema = z.object({
  email: z.string().email('Email inválido'),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>()

  async function handleSignIn(data: SignInFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Sign in data:', data)
  }

  return (
    <>
      <title>Login | Pizza Shop</title>
      <div className='p-8'>
        <div className='flex w-[350px] flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Acessar Painel</h1>
            <p className='text-muted-foreground text-sm'>
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>
            <Button
              disabled={isSubmitting}
              className='w-full cursor-pointer disabled:cursor-not-allowed'
              type='submit'
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
