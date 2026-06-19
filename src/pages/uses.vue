<script setup lang="ts">
document.title = 'Uses — Ruidi Zhang'

const groups = [
  {
    name: 'AI',
    items: [
      ['Focus', 'Computer vision, deep learning, and practical model experiments'],
      ['Frameworks', 'Python, PyTorch, Jupyter Notebook'],
      ['Assistants', 'GPT, Claude Code, and AI-assisted development workflows'],
    ],
  },
  {
    name: 'Development',
    items: [
      ['Frontend', 'Vue, Vite, UnoCSS'],
      ['Tools', 'Git, GitHub, VS Code-style editing, terminal workflows'],
      ['Learning style', 'Build small projects, document the process, iterate quickly'],
    ],
  },
  {
    name: 'Creative',
    items: [
      ['Photography', 'Street, campus, travel, and everyday visual observation'],
      ['Media', 'Photography and video as a way to document learning and life'],
    ],
  },
]
</script>

<template>
  <h1 class="text-2.6rem font-700 tracking-tight mb-2 color-base">
    Uses
  </h1>
  <p class="op60 mb-6">
    Tools, workflows, and interests behind how I learn and build.
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
        <div
          v-for="[label, value] in group.items"
          :key="label"
          class="px-4 py-3 -mx-4 rounded-lg hover:bg-[#fafafa] dark:hover:bg-[#111] transition duration-150"
        >
          <div class="font-600 color-base">
            {{ label }}
          </div>
          <div class="text-sm color-muted mt-0.5">
            {{ value }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
