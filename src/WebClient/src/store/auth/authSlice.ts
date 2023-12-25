import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'

const initialState: AuthState = {
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.isLoggedIn = true
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      localStorage.removeItem('token')
    }
  }
})

export const { login, logout } = authSlice.actions
