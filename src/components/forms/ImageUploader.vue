<script setup lang="ts">
import type { ImageFile } from '@/types'
import type { FileUploadSelectEvent } from 'primevue/fileupload'

const emit = defineEmits(['submit'])

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  emit('submit', event.files[0])
}
</script>

<template>
  <FileUpload name="upload-image" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
    <template #header="{ chooseCallback, clearCallback, files }">
      <div class="flex flex-wrap justify-end items-center flex-1 space-x-4">
        <Button
          :disabled="files.length > 0"
          @click="chooseCallback()"
          icon="pi pi-images"
          rounded
          outlined
        />
        <Button
          @click="clearCallback()"
          icon="pi pi-times"
          rounded
          outlined
          severity="danger"
          :disabled="!files || files.length === 0"
        />
      </div>
    </template>
    <template #content="{ files }: { files: ImageFile[] }">
      <div v-if="files.length > 0">
        <div
          class="m-0 px-6 flex flex-col border border-surface-300 dark:border-surface-700 items-center gap-3"
        >
          <div>
            <img
              role="presentation"
              :alt="files[0].name"
              :src="files[0].objectURL"
              width="100"
              height="50"
            />
          </div>
          <span class="font-semibold">{{ files[0].name }}</span>
        </div>
      </div>
    </template>
    <template #empty>
      <div class="flex items-center justify-center flex-col">
        <i
          class="pi pi-cloud-upload border-2 rounded-full p-5 text-8xl text-surface-400 dark:text-surface-600 border-surface-400 dark:border-surface-600"
        />
        <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
      </div>
    </template>
  </FileUpload>
</template>
