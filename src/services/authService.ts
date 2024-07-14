import { useUserStore } from '@/stores/user'
import type { AccessControl } from '@/types'
import { Api } from '@/utilities/api'

export const accessControl = ({ permissionKey, role }: AccessControl) => {
  const {
    user: { role: userRole },
    permission: userPermissions
  } = useUserStore()

  if (role) return role === userRole

  if (permissionKey) return !!userPermissions[permissionKey]
}

export default {
  register({ email, password }: { email: string; password: string }) {
    return Api().post('/register', { email, password })
  },
  login({ email, password }: { email: string; password: string }) {
    return Api().post('/login', { email, password })
  },
  logout() {
    return Api().delete('/logout')
  }
}
