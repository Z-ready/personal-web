<script setup lang="ts">
document.title = 'Projects — Ruidi Zhang'

const projects = [
  {
    name: 'matrix-visualizer',
    desc: 'Visualize matrix transformations for learning linear algebra',
    link: 'https://z-ready.github.io/matrix-visualizer/',
    source: 'https://github.com/Z-ready/matrix-visualizer',
    lang: 'JavaScript',
    color: '#f1e05a',
  },
  {
    name: 'ai-template',
    desc: 'Starter structure for quickly testing ML/DL ideas',
    link: 'https://github.com/Z-ready/ai-template',
    lang: 'Python',
    color: '#3572A5',
  },
  {
    name: 'MyChromeTheme',
    desc: 'A small Chrome theme experiment around everyday interface personalization',
    link: 'https://github.com/Z-ready/MyChromeTheme',
    lang: 'Theme',
  },
  {
    name: 'practicalAI-cn',
    desc: 'Notebook-based AI learning notes and practical examples in Chinese',
    link: 'https://github.com/Z-ready/practicalAI-cn',
    lang: 'Jupyter Notebook',
    color: '#DA5B0B',
    note: 'Forked from MLEveryday/practicalAI-cn',
  },
]

const groups = [
  {
    name: 'Current Focus',
    items: projects.filter(p => ['matrix-visualizer', 'ai-template'].includes(p.name)),
  },
  {
    name: 'Learning Notes',
    items: projects.filter(p => ['practicalAI-cn'].includes(p.name)),
  },
  {
    name: 'Creative Tools',
    items: projects.filter(p => ['MyChromeTheme'].includes(p.name)),
  },
]
</script>

<template>
  <h1 class="text-2.6rem font-700 tracking-tight mb-2 color-base">
    Projects
  </h1>
  <p class="op60 mb-6">
    A small index of things I've built or explored.
  </p>

  <div class="flex flex-col gap-6">
    <section
      v-for="group in groups"
      :key="group.name"
    >
      <h2 class="text-sm tracking-wider uppercase op40 mb-2 font-600">
        {{ group.name }}
      </h2>

      <div class="flex flex-col gap-0.5">
        <article
          v-for="p in group.items"
          :key="p.name"
          class="block px-4 py-3 -mx-4 rounded-lg hover:bg-[#fafafa] dark:hover:bg-[#111] transition duration-150"
        >
          <div class="font-600 color-base">
            <a :href="p.link" target="_blank" rel="noopener noreferrer">
              {{ p.name }}
            </a>
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
              <a
                :href="p.source"
                target="_blank"
                rel="noopener noreferrer"
                class="op100!"
              >
                Source
              </a>
            </template>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
