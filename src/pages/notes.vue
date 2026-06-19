<script setup lang="ts">
document.title = 'Notes — Ruidi Zhang'

const topics = [
  {
    name: 'Computer Vision',
    desc: 'Image understanding, model training, datasets, and visual experiments.',
  },
  {
    name: 'AI Engineering',
    desc: 'Practical workflows for building, testing, and shipping AI ideas.',
  },
  {
    name: 'Learning Log',
    desc: 'Short notes from courses, projects, tools, and experiments.',
  },
]
</script>

<template>
  <h1 class="text-2.6rem font-700 tracking-tight mb-2 color-base">
    Notes
  </h1>
  <p class="op60 mb-6">
    A lightweight place for learning notes and project reflections.
  </p>

  <div class="flex flex-col gap-0.5">
    <article
      v-for="topic in topics"
      :key="topic.name"
      class="px-4 py-3 -mx-4 rounded-lg hover:bg-[#fafafa] dark:hover:bg-[#111] transition duration-150"
    >
      <div class="font-600 color-base">
        {{ topic.name }}
      </div>
      <div class="text-sm color-muted mt-0.5">
        {{ topic.desc }}
      </div>
    </article>
  </div>
</template>
