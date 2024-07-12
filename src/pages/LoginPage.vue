<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const username = ref('')
const password = ref('')
const loading = ref(false)

const submitHandler = async () => {
  await userStore.registerUser(username.value, password.value)

  router.push({ name: 'home' })
}
</script>
<template>
  <AuthForm
    title="Login"
    subtitle="Entre your credentials below to login to your account."
    actionLabel="Login"
    :loading
    v-model:username="username"
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
