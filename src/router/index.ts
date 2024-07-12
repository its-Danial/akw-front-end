import HomePage from '@/pages/HomePage.vue'
import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const LoginPage = () => import('@/pages/LoginPage.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const AdminPage = () => import('@/pages/AdminPage.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        layout: 'AppLayout'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        layout: 'AuthLayout'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        layout: 'AuthLayout'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: {
        layout: 'AppLayout'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!['login', 'register'].includes(to.name as string) && !useUserStore().isLoggedIn)
    next({ name: 'login' })
  else next()
})
