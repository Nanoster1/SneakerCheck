import React from 'react'
import AppRouter from './components/AppRouter'
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector'
import { login } from './store/auth/authSlice'

const App = () => {
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  if (token) dispatch(login({ token }))

  return <AppRouter />
}

export default App