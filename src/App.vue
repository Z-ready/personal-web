<script setup lang="ts">
const route = useRoute()
const showFlow = Math.random() > 0.5
</script>

<template>
  <ArtFlow v-if="showFlow" />
  <ArtSynapse v-else />
  <NavBar />
  <main class="max-w-170 mx-auto px-7 py-10 of-x-hidden">
    <div class="slide-enter-content">
      <RouterView />
    </div>
    <Footer :key="route.path" />
  </main>
</template>
