import { UserDTO_JWT } from '../store/auth/types'

export interface UserDTO extends UserDTO_JWT{
  city: string
}
