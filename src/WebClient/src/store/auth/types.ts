export type UserRole = 'User' | 'Seller'

export interface AuthState {
  isLoggedIn: boolean
  token?: string
}
