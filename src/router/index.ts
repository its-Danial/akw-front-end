import HomePage from '@/pages/HomePage.vue'
import { useUserStore } from '@/stores/user'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric
} from 'vue-router'

const LoginPage = () => import('@/pages/LoginPage.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const AdminPage = () => import('@/pages/AdminPage.vue')
const CreateEntryPage = () => import('@/pages/CreateEntryPage.vue')

const permissionsGuard = (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) => {
  const { isLoggedIn, permission } = useUserStore()
  if (isLoggedIn && !!permission.canView) {
    return next()
  } else {
    next({ name: 'create-entry' })
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        layout: 'AppLayout'
      },
      beforeEnter: permissionsGuard
    },
    {
      path: '/create-entry',
      name: 'create-entry',
      component: CreateEntryPage,
      meta: {
        layout: 'AppLayout'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useUserStore()
  if (!['login', 'register'].includes(to.name as string) && !isLoggedIn) next({ name: 'login' })
  else next()
})
