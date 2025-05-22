import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme.provider'
import { router } from './routes'

export function App() {
  return (
    <>
      <ThemeProvider storageKey='pizza-shop-theme' defaultTheme='dark'>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </>
  )
}
