<script setup lang="ts">
const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="z-40">
    <RouterLink
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <div
        class="w-11 h-11 rounded-full bg-[#1a1a1a] dark:bg-[#eee] text-white dark:text-[#0a0a0a] flex items-center justify-center font-700 text-lg transition duration-200 hover:scale-105"
      >
        RZ
      </div>
    </RouterLink>

    <button
      title="Scroll to top"
      class="fixed right-3 bottom-3 w-10 h-10 rounded-full bg-base border border-base shadow-sm flex items-center justify-center transition duration-300 z-100 print:hidden hover:op100"
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
    >
      <div i-ri-arrow-up-line />
    </button>

    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/" title="Home">
          <span class="lt-md:hidden">Home</span>
          <div i-ri-home-2-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <a href="https://github.com/Z-ready" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-simple-icons-github />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}

.router-link-active {
  opacity: 1 !important;
}
</style>
