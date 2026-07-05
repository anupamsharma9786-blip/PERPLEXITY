import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './app.routes'
import { useAuth } from '../features/auth/hooks/useAuth'
import { use } from 'react'

const App = () => {
  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetMe()

  },[])
  return (
    <RouterProvider router={AppRoutes}/>
  )
}

export default App