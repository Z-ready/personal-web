<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <NavBar />
  <main class="max-w-170 mx-auto px-7 py-10 of-x-hidden">
    <div class="slide-enter-content">
      <RouterView />
    </div>
    <Footer :key="route.path" />
  </main>
</template>
