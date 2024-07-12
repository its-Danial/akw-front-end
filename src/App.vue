<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

const layout = shallowRef(null)

watch(
  () => route.meta.layout,
  (newLayoutName) => {
    layout.value = defineAsyncComponent(() => import(`./layout/${newLayoutName}.vue`))
  }
)
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style></style>
