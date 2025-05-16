import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpSchema = z.object({
  restaurantName: z.string().min(3, 'Nome do restaurante deve ter pelo menos 3 caracteres'),
  managerName: z.string().min(3, 'Nome do gerente deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  email: z.string().email('Email inválido'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUp() {
  const natigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>()

  async function handleSignUp(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Restaurante cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => natigate('/login'),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar o estabelecimento')
    }
  }

  return (
    <>
      <title>Castro | Pizza Shop</title>
      <div className='p-8'>
        <Button asChild variant='secondary' className='absolute top-8 right-8'>
          <Link to='/login'>Fazer login</Link>
        </Button>

        <div className='flex w-[350px] flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Criar conta</h1>
            <p className='text-muted-foreground text-sm'>Seja um parceiro</p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
            <div className='space-y-2'>
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input id='restaurantName' type='text' {...register('restaurantName')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='managerName'>Seu nome</Label>
              <Input id='managerName' type='text' {...register('managerName')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Seu celular</Label>
              <Input id='phone' type='tel' {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className='w-full' type='submit'>
              Finalizar cadastro
            </Button>

            <p className='text-muted-foreground px-6 text-center text-sm leading-relaxed'>
              Ao continuar, você concorda com nossos{' '}
              <a href='' className='underline underline-offset-4'>
                termos de serviço
              </a>{' '}
              e{' '}
              <a href='' className='underline underline-offset-4'>
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
