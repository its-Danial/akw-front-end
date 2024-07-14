import { Api } from '@/utilities/api'

export default {
  getUsers() {
    return Api().get('/users')
  },
  updateUserPermission(userId: number, newPermission: object) {
    return Api().put(`/update-user/${userId}`, newPermission)
  }
}
