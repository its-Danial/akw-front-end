import config from '@/config'
import { useUserStore } from '@/stores/user'
import axios, { type CreateAxiosDefaults } from 'axios'

export const Api = () => {
  const instanceConfig: CreateAxiosDefaults = {
    baseURL: config.api.baseUrl,
    headers: {}
  }

  if (useUserStore().isLoggedIn) {
    // @ts-ignore
    instanceConfig.headers.Authorization = `Bearer ${useUserStore().token}`
  }

  const instance = axios.create(instanceConfig)

  return instance
}
