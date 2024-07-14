<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string; subtitle: string; actionLabel: string; loading: boolean }>()
const emit = defineEmits(['submit'])

const errorMessage = ref('')

const email = defineModel('email')
const password = defineModel('password')

const submitHandler = () => {
  if (!email.value && !password.value) {
    errorMessage.value = 'Please enter email and password'
  } else if (!email.value) {
    errorMessage.value = 'Please enter email'
  } else if (!password.value) {
    errorMessage.value = 'Please enter password'
  } else {
    errorMessage.value = ''
    emit('submit')
  }
}
</script>
<template>
  <form @submit.prevent="submitHandler" class="w-full max-w-md">
    <Card class="w-full">
      <template #title>{{ title }}</template>
      <template #subtitle>
        <span class="text-sm text-gray-500">
          {{ subtitle }}
        </span>
      </template>
      <template #content>
        <div class="w-full flex flex-col space-y-4">
          <div class="flex flex-col space-y-1">
            <label for="email" class="font-medium text-sm">Email</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                id="email"
                type="email"
                placeholder="e.g danial"
                v-model="email"
                aria-describedby="email-help"
              />
            </InputGroup>
          </div>
          <div class="flex flex-col space-y-1">
            <label for="password" class="font-medium text-sm">Password</label>
            <Password
              id="password"
              type="password"
              v-model="password"
              toggleMask
              :feedback="false"
              aria-describedby="password-help"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col space-y-2">
          <p v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</p>
          <Button :label="actionLabel" :loading class="w-full" type="submit" />
          <slot name="extra-footer" />
        </div>
      </template>
    </Card>
  </form>
</template>
