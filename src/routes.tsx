import { createBrowserRouter } from 'react-router'

import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard></Dashboard>,
  },
  {
    path: '/login',
    element: <SignIn></SignIn>,
  },
])
