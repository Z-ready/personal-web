import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-[#0a0a0a]',
      'color-base': 'text-[#1a1a1a] dark:text-[#eee]',
      'color-soft': 'text-[#555] dark:text-[#aaa]',
      'color-muted': 'text-[#999] dark:text-[#666]',
      'border-base': 'border-[#e5e5e5] dark:border-[#222]',
    },
    [/^slide-enter-(\d+)$/, ([_, n]) => ({ '--enter-stage': n })],
  ],
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetWind(),
  ],
  transformers: [transformerDirectives()],
})
