<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string; subtitle: string; actionLabel: string; loading: boolean }>()
const emit = defineEmits(['submit'])

const errorMessage = ref('')

const username = defineModel('username')
const password = defineModel('password')

const submitHandler = () => {
  if (!username.value && !password.value) {
    errorMessage.value = 'Please enter username and password'
  } else if (!username.value) {
    errorMessage.value = 'Please enter username'
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
          <div class="flex flex-col space-y-2">
            <label for="username">Username</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                id="username"
                placeholder="e.g danial"
                v-model="username"
                aria-describedby="username-help"
              />
            </InputGroup>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-key"></i>
              </InputGroupAddon>
              <InputText
                id="password"
                type="password"
                v-model="password"
                aria-describedby="password-help"
              />
            </InputGroup>
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
