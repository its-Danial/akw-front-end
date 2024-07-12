<script setup lang="ts">
import Card from 'primevue/card'
import type { DropdownChangeEvent } from 'primevue/dropdown'
import { ref } from 'vue'

const products = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }
]
const sortKey = ref()
const sortOrder = ref()
const sortField = ref()
const sortOptions = ref([
  { label: 'Newest to Oldest', value: 'new' },
  { label: 'Oldest to Newest', value: '!new' }
])
const onSortChange = (event: DropdownChangeEvent) => {
  const value = event.value.value
  const sortValue = event.value

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1
    sortField.value = value.substring(1, value.length)
    sortKey.value = sortValue
  } else {
    sortOrder.value = 1
    sortField.value = value
    sortKey.value = sortValue
  }
}
</script>

<template>
  <Card :pt="{ content: 'pa-0' }" class="h-full">
    <template #content>
      <DataView
        :value="products"
        :pt="{ header: 'py-4 bg-transparent' }"
        :sortOrder="sortOrder"
        :sortField="sortField"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Date"
              @change="onSortChange($event)"
            />
            <h1 class="text-2xl font-semibold tracking-tight text-gray-400">Your Entries</h1>
            <Button icon="pi pi-plus" label="Create New Entry" outlined />
          </div>
        </template>
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div
                class="flex flex-column sm:flex-row sm:items-center py-4 gap-3"
                :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
              >
                <div class="md:w-[10rem]">
                  <img
                    class="block xl:block mx-auto rounded-md w-full"
                    :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
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
                      <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                    </div>
                  </div>
                  <div class="flex flex-column md:items-end gap-5">
                    <Button icon="pi pi-trash" outlined aria-label="delete" severity="danger" />
                    <Button icon="pi pi-file-edit" label="Edit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
