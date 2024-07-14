<script setup lang="ts">
import UserPosts from '@/components/posts/UserPosts.vue'
import entriesService from '@/services/entriesService'
import type { Entry } from '@/types'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const entries = ref<Entry[]>()

const setEntries = async (order = 'desc') => {
  entries.value = (await (await entriesService.getEntries({ order })).data).entries
}

onBeforeMount(async () => {
  setEntries()
})

const handleDeleteClick = async (entryId: number) => {
  entries.value = entries.value!.filter((entry) => entry.id != entryId)
}
const handleEditClick = (entryId: number) => {
  router.push({ name: 'create-entry', query: { id: entryId } })
}

const handleSortOrderChange = (newOrder: string) => {
  setEntries(newOrder)
}
</script>

<template>
  <main>
    <UserPosts
      v-if="entries"
      :entries
      @click:delete="handleDeleteClick"
      @click:edit="handleEditClick"
      @change:sortOrder="handleSortOrderChange"
    />
  </main>
</template>
