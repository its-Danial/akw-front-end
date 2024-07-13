<script setup lang="ts">
import type { ImageFile } from '@/types'
import { computed, ref } from 'vue'

const name = ref()
const image = ref()
const loading = ref()
const errorMsg = ref('')

const submitIsDisabled = computed(() => !name.value || !image.value)

const handleImageSelect = (file: ImageFile) => {
  image.value = file
}

const handleSubmit = () => {
  if (submitIsDisabled.value) {
    errorMsg.value = 'Please fill in the fields.'
    return
  }
  console.log('submit', name.value, image.value)
}
</script>
<template>
  <Toast />
  <form @submit.prevent="handleSubmit">
    <Card>
      <template #title> Create an Entry </template>
      <template #subtitle>
        <p class="text-sm text-gray-500">Enter data here to set it on the home screen</p>
      </template>
      <template #content>
        <div class="flex flex-col space-y-1 mb-4">
          <label for="name" class="font-medium tracking-tight">Name</label>
          <InputText
            v-model="name"
            id="name"
            placeholder="e.g Restaurant"
            aria-describedby="username-help"
          />
        </div>

        <ImageUploader @submit="handleImageSelect" />
      </template>
      <template #footer>
        <p v-if="errorMsg" class="text-sm text-red-400">{{ errorMsg }}</p>
        <div class="flex items-center justify-end">
          <Button :disabled="submitIsDisabled" label="Submit" type="submit" :loading />
        </div>
      </template>
    </Card>
  </form>
</template>
