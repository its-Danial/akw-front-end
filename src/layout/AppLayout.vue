<script setup lang="ts"></script>
<template>
  <NavBar />
  <main className="min-h-[calc(100vh-64px)] bg-muted/40 p-8 md:gap-8 md:p-10 md:px-16">
    <slot />
  </main>
</template>
