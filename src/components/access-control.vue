<script setup lang="ts">
import { accessControl } from '@/services/authService'
import type { AccessControl } from '@/types'
import { computed, defineProps } from 'vue'

const props = defineProps<AccessControl>()

const hasAccess = computed(() =>
  accessControl({ permissionKey: props.permissionKey, role: props.role })
)
</script>

<template>
  <slot v-if="hasAccess" />
  <slot v-else name="fallback"></slot>
</template>
