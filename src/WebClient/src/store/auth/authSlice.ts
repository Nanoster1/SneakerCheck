import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'

const initialState: AuthState = {
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ jwtToken: string }>) => {
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload?.jwtToken?.toString());
      state.token = action.payload.jwtToken
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      localStorage.removeItem('token')
    }
  }
})

export const { login, logout } = authSlice.actions
