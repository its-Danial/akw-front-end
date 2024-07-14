<script setup lang="ts">
import config from '@/config'
import { accessControl } from '@/services/authService'
import entriesService from '@/services/entriesService'
import type { Entry } from '@/types'
import { formatTimeStamp } from '@/utilities/functions'
import Card from 'primevue/card'
import type { DropdownChangeEvent } from 'primevue/dropdown'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{ entries: Entry[] }>()

const emit = defineEmits(['click:delete', 'click:edit', 'change:sortOrder'])

const loader = ref({ delete: false, edit: false })
const sortKey = ref({ label: 'Newest to Oldest', value: 'desc' })
const sortOrder = ref('desc')

const sortOptions = [
  { label: 'Newest to Oldest', value: 'desc' },
  { label: 'Oldest to Newest', value: 'asc' }
]
const onSortChange = (event: DropdownChangeEvent) => {
  const newSortOrder = event.value.value

  if (newSortOrder === sortOrder.value) return
  sortOrder.value = event.value.value
  emit('change:sortOrder', sortOrder.value)
}

const handleDeleteClick = async (entryId: number) => {
  loader.value.delete = true
  try {
    await entriesService.deleteEntry(entryId)
    emit('click:delete', entryId)
  } catch (error) {
    console.log('error --->', error)
  } finally {
    loader.value.delete = false
  }
}
const handleEditClick = (entryId: number) => {
  emit('click:edit', entryId)
}
</script>

<template>
  <Card :pt="{ content: 'pa-0' }" class="h-full">
    <template #content>
      <DataView dataKey="entires" :value="entries" :pt="{ header: 'py-4 bg-transparent' }">
        <template #header>
          <div class="flex justify-between items-center">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Date"
              @change="onSortChange($event)"
            />
            <h1 class="text-2xl font-semibold tracking-tight text-gray-400">
              {{ accessControl({ permissionKey: 'canViewAll' }) ? 'All User' : 'Your' }} Entries
            </h1>
            <RouterLink :to="{ name: 'create-entry' }">
              <Button icon="pi pi-plus" label="Create New Entry" outlined />
            </RouterLink>
          </div>
        </template>
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items as Entry[]" :key="item.id" class="col-12">
              <div
                class="flex flex-column sm:flex-row sm:items-center py-4 gap-3"
                :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
              >
                <div class="md:w-[10rem]">
                  <img
                    class="block xl:block mx-auto rounded-md w-full"
                    :src="`${config.api.baseUrl}/${item.imagePath}`"
                    :alt="item.name"
                  />
                </div>
                <div
                  class="flex flex-column md:flex-row justify-between md:items-center flex-1 gap-4"
                >
                  <div class="flex flex-row md:flex-column justify-between items-start">
                    <div>
                      <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80 mb-1">
                        {{ item.name }}
                      </div>
                      <div class="font-medium text-secondary text-xs">
                        {{ formatTimeStamp(item.createdAt).date }}
                      </div>
                      <div class="font-medium text-secondary text-xs">
                        {{ formatTimeStamp(item.createdAt).time }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column md:items-end gap-5">
                    <AccessControl permissionKey="canDelete">
                      <Button
                        icon="pi pi-trash"
                        outlined
                        aria-label="delete"
                        severity="danger"
                        :loading="loader.delete"
                        @click="handleDeleteClick(item.id)"
                      />
                    </AccessControl>

                    <AccessControl permissionKey="canEdit">
                      <Button
                        icon="pi pi-file-edit"
                        label="Edit"
                        :loading="loader.edit"
                        @click="handleEditClick(item.id)"
                      />
                    </AccessControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="min-h-[calc(100vh-364px)] flex justify-center items-center">
            <p>No Entries Yet</p>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
