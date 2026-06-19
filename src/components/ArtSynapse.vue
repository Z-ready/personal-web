<script setup lang="ts">
import { useRafFn } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)
const { width, height } = useWindowSize()
const isDark = useDark()

interface KP {
  x: number; y: number
  vx: number; vy: number
  r: number
  speed: number
  edges: number[]
}

let kps: KP[] = []
const COUNT = 100
const MATCH_DIST = 130
const MAX_EDGES = 2

function init(w: number, h: number) {
  kps = []
  for (let i = 0; i < COUNT; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.05 + Math.random() * 0.20
    kps.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 2 + Math.random() * 3,
      speed,
      edges: [],
    })
  }
}

function rebuildEdges() {
  for (const k of kps) k.edges = []
  for (let i = 0; i < kps.length; i++) {
    const cand: { j: number; d: number }[] = []
    for (let j = 0; j < kps.length; j++) {
      if (i === j) continue
      const d = Math.hypot(kps[i].x - kps[j].x, kps[i].y - kps[j].y)
      if (d < MATCH_DIST) cand.push({ j, d })
    }
    cand.sort((a, b) => a.d - b.d)
    kps[i].edges = cand.slice(0, MAX_EDGES).map(c => c.j)
  }
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)
  const kpAlpha = isDark.value ? 0.25 : 0.18
  const lineAlpha = isDark.value ? 0.12 : 0.08

  // Movement: pure Brownian wander with per-kp speed
  for (const k of kps) {
    const steer = (Math.random() - 0.5) * 0.06
    const cos = Math.cos(steer), sin = Math.sin(steer)
    const nvx = k.vx * cos - k.vy * sin
    const nvy = k.vx * sin + k.vy * cos
    // Normalize to constant speed
    const mag = Math.sqrt(nvx * nvx + nvy * nvy)
    k.vx = (nvx / mag) * k.speed
    k.vy = (nvy / mag) * k.speed
    k.x += k.vx
    k.y += k.vy

    // Bounce at soft boundary
    const m = 50
    if (k.x < m) { k.x = m; k.vx = Math.abs(k.vx) }
    if (k.x > w - m) { k.x = w - m; k.vx = -Math.abs(k.vx) }
    if (k.y < m) { k.y = m; k.vy = Math.abs(k.vy) }
    if (k.y > h - m) { k.y = h - m; k.vy = -Math.abs(k.vy) }
  }

  rebuildEdges()

  // Draw edges
  const drawn = new Set<string>()
  for (let i = 0; i < kps.length; i++) {
    for (const j of kps[i].edges) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (drawn.has(key)) continue
      drawn.add(key)
      const d = Math.hypot(kps[i].x - kps[j].x, kps[i].y - kps[j].y)
      const fade = Math.max(0, 1 - d / MATCH_DIST)
      ctx.strokeStyle = isDark.value
        ? `rgba(255,255,255,${(lineAlpha * fade).toFixed(3)})`
        : `rgba(0,0,0,${(lineAlpha * fade).toFixed(3)})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(kps[i].x, kps[i].y)
      ctx.lineTo(kps[j].x, kps[j].y)
      ctx.stroke()
    }
  }

  // Draw keypoints
  for (const k of kps) {
    const deg = k.edges.length / MAX_EDGES
    const a = kpAlpha * (0.5 + deg * 0.5)
    ctx.strokeStyle = isDark.value
      ? `rgba(255,255,255,${a.toFixed(3)})`
      : `rgba(0,0,0,${a.toFixed(3)})`
    ctx.lineWidth = 0.5
    const cr = k.r
    ctx.beginPath()
    ctx.moveTo(k.x - cr, k.y); ctx.lineTo(k.x + cr, k.y)
    ctx.moveTo(k.x, k.y - cr); ctx.lineTo(k.x, k.y + cr)
    ctx.stroke()
    ctx.fillStyle = isDark.value
      ? `rgba(255,255,255,${a.toFixed(3)})`
      : `rgba(0,0,0,${a.toFixed(3)})`
    ctx.beginPath()
    ctx.arc(k.x, k.y, k.r * 0.3, 0, Math.PI * 2)
    ctx.fill()
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
    init(width.value, height.value)
  }

  resize()
  watch([width, height], resize)

  useRafFn(() => { draw(ctx, width.value, height.value) })
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