<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import models from '../data/models.json'
import providers from '../data/providers.json'

const providerLabel = Object.fromEntries(providers.map((p) => [p.id, p.label]))

const INPUT_LABELS = {
  t2i: 'Text → Image', i2i: 'Image → Image',
  t2v: 'Text → Video', i2v: 'Image → Video', v2v: 'Video → Video', a2v: 'Audio → Video',
  tts: 'Text → Speech', sts: 'Speech → Speech', sfx: 'Sound FX', music: 'Music',
}

const query = ref('')
const mode = ref('all')
const provider = ref('all')

const modes = ['all', 'image', 'video', 'audio']

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return models.filter((m) => {
    if (mode.value !== 'all' && m.mode !== mode.value) return false
    if (provider.value !== 'all' && m.provider !== provider.value) return false
    if (q && !(`${m.name} ${m.id} ${m.provider}`.toLowerCase().includes(q))) return false
    return true
  })
})

function reset() { query.value = ''; mode.value = 'all'; provider.value = 'all' }
</script>

<template>
  <div class="catalog">
    <div class="catalog-controls">
      <input
        class="catalog-search"
        v-model="query"
        type="search"
        placeholder="Search 176 models — name, id, or provider…"
        aria-label="Search models"
      />
      <div class="catalog-pills">
        <button
          v-for="m in modes"
          :key="m"
          class="pill"
          :class="{ active: mode === m }"
          @click="mode = m"
        >{{ m === 'all' ? 'All modes' : m }}</button>
      </div>
      <select class="catalog-select" v-model="provider" aria-label="Filter by provider">
        <option value="all">All providers</option>
        <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.label }} ({{ p.count }})</option>
      </select>
    </div>

    <div class="catalog-meta">
      <span>{{ filtered.length }} model{{ filtered.length === 1 ? '' : 's' }}</span>
      <button v-if="query || mode !== 'all' || provider !== 'all'" class="reset" @click="reset">Clear filters</button>
    </div>

    <div class="catalog-grid">
      <a
        v-for="m in filtered"
        :key="m.id"
        class="model-card"
        :href="withBase(`/reference/providers/${m.provider}`)"
      >
        <div class="card-tags">
          <span class="tag" :class="`mode-${m.mode}`">{{ m.mode }}</span>
          <span class="tag io" :title="INPUT_LABELS[m.inputType] || m.inputType">{{ INPUT_LABELS[m.inputType] || m.inputType }}</span>
        </div>
        <div class="card-name">{{ m.name }}</div>
        <div class="card-id">{{ m.id }}</div>
        <div class="card-provider">{{ providerLabel[m.provider] || m.provider }}</div>
      </a>
    </div>

    <p v-if="!filtered.length" class="empty">No models match those filters.</p>
  </div>
</template>

<style scoped>
.catalog { margin-top: 8px; }
.catalog-controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px; }
.catalog-search {
  flex: 1 1 280px; min-width: 220px;
  padding: 9px 14px; border-radius: 8px;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
  font-size: 14px;
}
.catalog-search:focus { outline: none; border-color: var(--vp-c-brand-1); }
.catalog-pills { display: flex; gap: 6px; flex-wrap: wrap; }
.pill {
  text-transform: capitalize;
  padding: 7px 13px; border-radius: 999px; font-size: 13px; font-weight: 500;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
  cursor: pointer; transition: all .15s;
}
.pill:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-text-1); }
.pill.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }
.catalog-select {
  padding: 8px 12px; border-radius: 8px; font-size: 13px;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer;
}
.catalog-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; font-size: 13px; color: var(--vp-c-text-2); }
.reset { background: none; border: none; color: var(--vp-c-brand-1); cursor: pointer; font-size: 13px; padding: 0; }

.catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.model-card {
  display: block; padding: 16px; border-radius: 12px; text-decoration: none;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft);
  transition: border-color .15s, transform .15s; color: inherit;
}
.model-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.card-tags { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
.tag {
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .03em;
  padding: 3px 8px; border-radius: 999px; color: #fff;
}
.tag.mode-image { background: #10b981; }
.tag.mode-video { background: #3b82f6; }
.tag.mode-audio { background: #ec4899; }
.tag.io { background: transparent; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-border); text-transform: none; font-weight: 500; }
.card-name { font-weight: 600; font-size: 15px; color: var(--vp-c-text-1); }
.card-id { font-family: var(--vp-font-family-mono); font-size: 12px; color: var(--vp-c-text-3); margin-top: 2px; }
.card-provider { font-size: 13px; color: var(--vp-c-brand-1); margin-top: 8px; font-weight: 500; }
.empty { color: var(--vp-c-text-2); padding: 32px 0; text-align: center; }
</style>
