<script setup lang="ts">
document.title = 'Projects — Ruidi Zhang'

const projects = [
  {
    name: 'matrix-visualizer',
    desc: 'Interactive matrix visualization tool for linear algebra',
    link: 'https://z-ready.github.io/matrix-visualizer/',
    source: 'https://github.com/Z-ready/matrix-visualizer',
    lang: 'JavaScript',
    color: '#f1e05a',
  },
  {
    name: 'ai-template',
    desc: 'AI project template for rapid ML/DL experimentation',
    link: 'https://github.com/Z-ready/ai-template',
    lang: 'Python',
    color: '#3572A5',
  },
  {
    name: 'MyChromeTheme',
    desc: 'Custom Chrome browser theme',
    link: 'https://github.com/Z-ready/MyChromeTheme',
    lang: 'Theme',
  },
  {
    name: 'practicalAI-cn',
    desc: 'Practical AI guide — from fundamentals to advanced',
    link: 'https://github.com/Z-ready/practicalAI-cn',
    lang: 'Jupyter Notebook',
    color: '#DA5B0B',
    note: 'Forked from MLEveryday/practicalAI-cn',
  },
]
</script>

<template>
  <h1 class="text-2.6rem font-700 tracking-tight mb-2 color-base">
    Projects
  </h1>
  <p class="op60 mb-6">
    Some things I've built.
  </p>

  <div class="flex flex-col gap-0.5">
    <a
      v-for="p in projects"
      :key="p.name"
      :href="p.link"
      target="_blank"
      class="block px-4 py-3 -mx-4 rounded-lg hover:bg-[#fafafa] dark:hover:bg-[#111] transition duration-150 op100!"
    >
      <div class="font-600 color-base">
        {{ p.name }}
      </div>
      <div class="text-sm color-muted mt-0.5">
        {{ p.desc }}
      </div>
      <div class="flex gap-2 mt-1.5 text-xs op50">
        <span
          v-if="p.color"
          class="w-2 h-2 rounded-full inline-block my-auto"
          :style="{ background: p.color }"
        />
        {{ p.lang }}
        <span v-if="p.note">&nbsp;&middot;&nbsp; {{ p.note }}</span>
        <template v-if="p.source">
          &nbsp;&middot;&nbsp;
          <a :href="p.source" target="_blank" class="op100!">Source</a>
        </template>
      </div>
    </a>
  </div>
</template>
