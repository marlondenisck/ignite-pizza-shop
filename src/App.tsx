import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { router } from './routes'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  )
}
