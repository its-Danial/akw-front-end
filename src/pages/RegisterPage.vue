<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const submitHandler = async () => {
  try {
    loading.value = true
    await userStore.registerUser(email.value, password.value)
    router.push({ name: 'home' })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <AuthForm
    title="Register"
    subtitle="Entre your credentials below to register an account."
    actionLabel="Login"
    :loading
    v-model:email="email"
    v-model:password="password"
    @submit="submitHandler"
  >
    <template #extra-footer>
      <div class="flex justify-center">
        <RouterLink :to="{ name: 'login' }" class="text-sm">Already have an account?</RouterLink>
      </div>
    </template>
  </AuthForm>
</template>
<style lang=""></style>
