<script setup lang="ts">
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    class="op50 hover:op100 transition duration-200 cursor-pointer outline-none bg-transparent border-none text-inherit p-0"
    title="Toggle theme"
    @click="toggleDark()"
  >
    <div v-if="isDark" i-ri-sun-line />
    <div v-else i-ri-moon-line />
  </button>
</template>
