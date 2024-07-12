import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ userData: { username: '' }, token: '' }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async registerUser(username: string, password: string) {
      console.log('registerUser', username, password)
      this.userData.username = username

      this.token = '123'
    },

    async loginUser(username: string, password: string) {
      console.log('loginUser', username, password)
      this.userData.username = username

      this.token = '123'
    }
  }
})
