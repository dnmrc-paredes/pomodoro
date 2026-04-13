import AuthContext from '@/contexts/AuthProvider'
import { useContext } from 'react'

export const useAuth = () => {
  const { user } = useContext(AuthContext)
  return { user }
}
