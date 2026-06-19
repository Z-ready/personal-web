<script setup lang="ts">
document.title = 'Gallery — Ruidi Zhang'

const photos: {
  title: string
  src: string
  location?: string
  year?: string
}[] = []
</script>

<template>
  <h1 class="text-2.6rem font-700 tracking-tight mb-2 color-base">
    Gallery
  </h1>
  <p class="op60 mb-6">
    Photography from campus, travel, street scenes, and everyday visual notes.
  </p>

  <div
    v-if="photos.length"
    class="grid gap-4 sm:grid-cols-2"
  >
    <figure
      v-for="photo in photos"
      :key="photo.src"
      class="m-0"
    >
      <img
        :src="photo.src"
        :alt="photo.title"
        class="w-full rounded-lg border border-base object-cover aspect-4/3"
        loading="lazy"
      >
      <figcaption class="mt-2 text-sm color-muted">
        <span class="color-base font-500">{{ photo.title }}</span>
        <span v-if="photo.location"> · {{ photo.location }}</span>
        <span v-if="photo.year"> · {{ photo.year }}</span>
      </figcaption>
    </figure>
  </div>

  <div
    v-else
    class="px-4 py-4 -mx-4 rounded-lg border border-base color-soft"
  >
    <div class="font-600 color-base">
      Photos coming soon
    </div>
    <p class="text-sm color-muted mt-1">
      Add image files under <code>public/photos/</code>, then register them in this page's photo list.
    </p>
  </div>
</template>
