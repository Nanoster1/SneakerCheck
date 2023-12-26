import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User, UserDTO_JWT } from './types'



function base64UrlDecode(input: string) {
  // Заменяем символы Base64Url на стандартный Base64
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // Дополняем строку до длины, кратной четырем
  let padding = base64.length % 4;
  if (padding !== 0) {
    base64 += '='.repeat(4 - padding);
  }
  // Декодируем Base64 строку и обрабатываем UTF-8 символы
  return decodeURIComponent(escape(atob(base64)));
}

function parseJwt(token: string): UserDTO_JWT | undefined {
  try {
    // Разделяем JWT на составные части
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('The token is invalid');
    }
    const payload = JSON.parse(base64UrlDecode(parts[1])) as User;

    const id = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    const name = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    console.log({
      // @ts-ignore
      State: 'Проверка состояния токена',
      role: role,
      name: name,
      id: id
    })

    return {
      // @ts-ignore
      role: role,
      name: name,
      id: id
    }

  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return undefined;
  }
}


const token = localStorage.getItem('token')

const initialState: AuthState = {
  // синтаксис ругается...
  isLoggedIn: !!token,
  user: token ? parseJwt(token) : undefined,
  token: token ? token : undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ jwtToken: string }>) => {
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload?.jwtToken?.toString())
      state.user = parseJwt(action?.payload?.jwtToken)
      state.token = action.payload.jwtToken
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = undefined
      state.user = undefined
      localStorage.removeItem('token')
    }
  }
})

export const { login, logout } = authSlice.actions
