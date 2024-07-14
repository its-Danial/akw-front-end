<script setup lang="ts">
import { accessControl } from '@/services/authService'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const email = ref('user2@email.com')
const password = ref('pass123456')
const loading = ref(false)

const submitHandler = async () => {
  try {
    loading.value = true
    await userStore.loginUser(email.value, password.value)

    if (accessControl({ role: 'admin' })) {
      router.push({ name: 'admin' })
    } else {
      router.push({ name: 'home' })
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <AuthForm
    title="Login"
    subtitle="Entre your credentials below to login to your account."
    actionLabel="Login"
    :loading
    v-model:email="email"
    v-model:password="password"
    @submit="submitHandler"
  >
    <template #extra-footer>
      <div class="flex justify-center">
        <RouterLink :to="{ name: 'register' }" class="text-sm">Create an account</RouterLink>
      </div>
    </template>
  </AuthForm>
</template>
<style lang=""></style>
