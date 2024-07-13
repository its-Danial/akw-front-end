<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleSignOut = async () => {
  console.log('signout')
  userStore.signOutUser()
  router.push({ name: 'login' })
}

const menu = ref()
const items = ref([{ label: 'Logout', icon: 'pi pi-sign-out', command: handleSignOut }])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<template>
  <nav
    className="sticky top-0 z-50 flex h-16 siz w-full items-center justify-between border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-16"
  >
    <RouterLink :to="{ name: 'home' }">
      <img src="/src/assets/black-logo.png" class="size-12" />
    </RouterLink>
    <div>
      <div @click="toggle" class="flex items-center space-x-2 cursor-pointer group">
        <Avatar
          :pt="{
            root: 'size-10 group-hover:shadow flex item-centre justify-centre bg-surface-300 rounded-full',
            icon: 'm-auto'
          }"
          icon="pi pi-user"
          shape="circle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <i class="pi pi-ellipsis-v" />
      </div>

      <Menu class="w-6" ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </nav>
</template>
