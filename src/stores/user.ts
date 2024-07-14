import authService from '@/services/authService'
import type { User } from '@/types'
import { defineStore } from 'pinia'

const AUTH_DATA = 'auth'

const DEFAULT_STATE: User = JSON.parse(localStorage.getItem(AUTH_DATA) as string) ?? {
  user: {
    id: 2,
    email: '',
    role: ''
  },
  permission: {
    canView: 0,
    canEdit: 0,
    canDelete: 0,
    canViewAll: 0
  },
  token: ''
}

export const useUserStore = defineStore('user', {
  state: () => DEFAULT_STATE,
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async registerUser(email: string, password: string) {
      const { user, permission, token } = (await authService.register({ email, password })).data
      this.user = user
      this.permission = permission
      this.token = token
    },
    async loginUser(email: string, password: string) {
      const data = (await authService.login({ email, password })).data
      localStorage.setItem(AUTH_DATA, JSON.stringify(data))
      this.user = data.user
      this.permission = data.permission
      this.token = data.token
    },
    async logoutUser() {
      await authService.logout()
      this.user = DEFAULT_STATE.user
      this.permission = DEFAULT_STATE.permission
      this.token = DEFAULT_STATE.token
      localStorage.removeItem(AUTH_DATA)
    }
  }
})
