<script setup lang="ts">
import { useRafFn } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)
const { width, height } = useWindowSize()
const isDark = useDark()

// Simple hash-based PRNG for 2D value noise
function hash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263 + 1013904223) | 0
  h = ((h ^ (h >> 13)) * 1274126177) | 0
  return ((h ^ (h >> 16)) >>> 0) / 4294967296
}

// Smooth 2D value noise
function noise(x: number, y: number): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)
  const n00 = hash(ix, iy)
  const n10 = hash(ix + 1, iy)
  const n01 = hash(ix, iy + 1)
  const n11 = hash(ix + 1, iy + 1)
  return n00 + sx * (n10 - n00) + sy * (n01 - n00 + sx * (n11 - n01 - n10 + n00))
}

// Sample the vector field angle at (x,y) for a given time t
function fieldAngle(x: number, y: number, t: number): number {
  const s = 0.0025
  return noise(x * s + t, y * s) * Math.PI * 4
}

let seedOff = 0
const SEED_SPACING = 38
const STEP_LEN = 2.5
const STEPS = 26

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const alpha = isDark.value ? 0.1 : 0.08
  ctx.clearRect(0, 0, w, h)

  seedOff += 0.3
  const startX = seedOff % SEED_SPACING
  const startY = (seedOff * 0.7) % SEED_SPACING

  for (let sx = startX; sx < w; sx += SEED_SPACING) {
    for (let sy = startY; sy < h; sy += SEED_SPACING) {
      let x = sx
      let y = sy
      ctx.beginPath()
      ctx.moveTo(x, y)

      for (let i = 0; i < STEPS; i++) {
        const angle = fieldAngle(x, y, t)
        x += Math.cos(angle) * STEP_LEN
        y += Math.sin(angle) * STEP_LEN

        // Fade near edges for a vignette feel
        const edgeFade = Math.min(
          1,
          x / 120,
          (w - x) / 120,
          y / 120,
          (h - y) / 120,
        )
        if (edgeFade <= 0)
          break

        if (i % 2 === 0)
          ctx.lineTo(x, y)
      }

      const strokeAlpha = alpha * (0.6 + noise(sx * 0.01, sy * 0.01) * 0.4)
      ctx.strokeStyle = isDark.value
        ? `rgba(255,255,255,${strokeAlpha})`
        : `rgba(0,0,0,${strokeAlpha})`
      ctx.lineWidth = isDark.value ? 1 : 0.8
      ctx.stroke()
    }
  }
}

onMounted(() => {
  const canvas = el.value!
  const ctx = canvas.getContext('2d')!

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width.value * dpr
    canvas.height = height.value * dpr
    canvas.style.width = `${width.value}px`
    canvas.style.height = `${height.value}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()
  watch([width, height], resize)

  const startTime = performance.now() / 1000
  useRafFn(() => {
    const t = (performance.now() / 1000 - startTime) * 0.04
    draw(ctx, width.value, height.value, t)
  })
})
</script>

<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden"
    style="z-index: -1"
  >
    <canvas ref="el" />
  </div>
</template>
