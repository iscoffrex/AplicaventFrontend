import { useContext } from 'react'
import { AuthContext } from './useAuthProvider'

export default function useAuth() {
    return useContext(AuthContext)
}