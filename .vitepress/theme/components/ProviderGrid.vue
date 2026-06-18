<script setup>
import { withBase } from 'vitepress'
import providers from '../data/providers.json'

const MODE_ORDER = { image: 0, video: 1, audio: 2 }
const sorted = [...providers].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
</script>

<template>
  <div class="provider-grid">
    <a
      v-for="p in sorted"
      :key="p.id"
      class="provider-card"
      :href="withBase(`/reference/providers/${p.id}`)"
    >
      <div class="pc-head">
        <span class="pc-name">{{ p.label }}</span>
        <span class="pc-count">{{ p.count }}</span>
      </div>
      <div class="pc-modes">
        <span
          v-for="m in [...p.modes].sort((a,b)=>MODE_ORDER[a]-MODE_ORDER[b])"
          :key="m"
          class="pc-mode"
          :class="`mode-${m}`"
        >{{ m }}</span>
      </div>
      <span class="pc-link">View models →</span>
    </a>
  </div>
</template>

<style scoped>
.provider-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; margin-top: 8px; }
.provider-card {
  display: flex; flex-direction: column; gap: 12px;
  padding: 20px; border-radius: 14px; text-decoration: none; color: inherit;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft);
  transition: border-color .15s, transform .15s;
}
.provider-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-3px); }
.pc-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.pc-name { font-weight: 700; font-size: 17px; color: var(--vp-c-text-1); }
.pc-count {
  font-size: 12px; font-weight: 600; color: var(--vp-c-text-2);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-border);
  border-radius: 999px; padding: 2px 9px; white-space: nowrap;
}
.pc-modes { display: flex; gap: 6px; flex-wrap: wrap; }
.pc-mode {
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .03em;
  padding: 3px 8px; border-radius: 999px; color: #fff;
}
.pc-mode.mode-image { background: #10b981; }
.pc-mode.mode-video { background: #3b82f6; }
.pc-mode.mode-audio { background: #ec4899; }
.pc-link { font-size: 13px; font-weight: 500; color: var(--vp-c-brand-1); margin-top: auto; }
</style>
