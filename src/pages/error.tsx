import { Link, useRouteError } from 'react-router'

import { env } from '@/env'

export function Error() {
  const error = useRouteError() as Error

  // Podemos adicionar um log para o erro aqui, se necessário
  // Sentry ou datadog

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <h1 className='text-4xl font-bold'>Whoops, algo aconteceu...</h1>
      <p className='text-accent-foreground'>
        Um erro aconteceu na aplicação, por favor tente novamente mais tarde.
      </p>
      {(env.MODE === 'test' || env.MODE === 'development') && (
        <pre>pi{error?.message || JSON.stringify(error)}</pre>
      )}
      <p className='text-accent-foreground'>
        Voltar para o{' '}
        <Link to='/' className='text-sky-600 dark:text-sky-400'>
          Dashboard
        </Link>
      </p>
    </div>
  )
}
