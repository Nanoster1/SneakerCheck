export type UserRole = 'User' | 'Seller'

export interface User {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
}

export interface UserDTO_JWT {
  id: string
  role: "Seller" | "Customer"
  name: string
}

export interface AuthState {
  isLoggedIn: boolean
  token?: string
  user?: UserDTO_JWT
}
