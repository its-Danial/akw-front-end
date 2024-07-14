<script setup lang="ts">
import config from '@/config'
import entriesService from '@/services/entriesService'
import type { Entry, ImageFile } from '@/types'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const name = ref('')
const image = ref()
const loading = ref(false)
const errorMsg = ref('')

const existingImage = ref()

const submitIsDisabled = computed(() => !name.value || !image.value)

const router = useRouter()
const {
  query: { id: existingArticleId }
} = useRoute()

onBeforeMount(async () => {
  if (!existingArticleId) return

  const entry = (
    await (
      await entriesService.getEntries({ entryId: existingArticleId as string })
    ).data
  ).entries as Entry

  name.value = entry.name
  existingImage.value = { name: entry.name, imagePath: `${config.api.baseUrl}/${entry.imagePath}` }
})

const handleImageSelect = (file: ImageFile) => {
  image.value = file
}

const handleSubmit = async () => {
  if (submitIsDisabled.value) {
    errorMsg.value = 'Please fill in the fields.'
    return
  }

  try {
    loading.value = true
    const formData = new FormData()

    formData.append('name', name.value)
    formData.append('image', image.value)

    if (existingArticleId) {
      await entriesService.updateEntry(existingArticleId as string, formData)
    } else {
      await entriesService.createEntry(formData)
    }

    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
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

        <ImageUploader
          :existingImage
          @submit="handleImageSelect"
          @clearExistingImage="existingImage = null"
        />
      </template>
      <template #footer>
        <p v-if="errorMsg" class="text-sm text-red-400">{{ errorMsg }}</p>
        <div class="flex items-center justify-end">
          <Button :disabled="submitIsDisabled" label="Submit" type="submit" :loading="loading" />
        </div>
      </template>
    </Card>
  </form>
</template>
