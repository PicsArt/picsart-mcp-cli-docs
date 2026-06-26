import { defineConfig } from 'vitepress'

// GitHub Pages base path. For a project page served at
// https://<org>.github.io/<repo>/ set DOCS_BASE=/<repo>/ at build time.
// For a user/org page or custom domain, leave it as '/'.
const base = process.env.DOCS_BASE || '/'

// Canonical origin for SEO (sitemap, canonical, OG urls). Override with
// DOCS_HOSTNAME when moving to a custom domain.
const HOSTNAME = process.env.DOCS_HOSTNAME || 'https://picsart.github.io'
const SITE_DESC =
  'Developer docs for the Picsart gen-ai CLI, MCP server, and Skills — generate image, video, and audio across 165 models from 31 providers in your terminal or any AI agent.'

const SOFTWARE_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Picsart gen-ai CLI & MCP',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Linux, Windows',
  description: SITE_DESC,
  url: HOSTNAME + base,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Pay-per-generation credits' },
  publisher: { '@type': 'Organization', name: 'Picsart', url: 'https://picsart.com' },
}

// One unified sidebar shown on every page, so the Providers and Model
// Reference are reachable from the guide pages too.
const sidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Authentication', link: '/guide/authentication' },
    ],
  },
  {
    text: 'Interfaces',
    items: [
      { text: 'CLI Quickstart', link: '/guide/cli-quickstart' },
      { text: 'MCP Quickstart', link: '/guide/mcp-quickstart' },
      { text: 'Skills (AI agents)', link: '/guide/skills' },
    ],
  },
  {
    text: 'Concepts',
    items: [
      { text: 'Generating media', link: '/guide/generating' },
      { text: 'Files & Drive', link: '/guide/files-and-drive' },
      { text: 'Pricing & Credits', link: '/guide/pricing' },
      { text: 'Batch & Automation', link: '/guide/batch' },
    ],
  },
  {
    text: 'Model Reference',
    items: [
      { text: 'Overview', link: '/reference/' },
      { text: 'Model Catalog', link: '/reference/catalog' },
      { text: 'Image generation', link: '/reference/image' },
      { text: 'Video generation', link: '/reference/video' },
      { text: 'Audio generation', link: '/reference/audio' },
      { text: 'Text & analysis', link: '/reference/text' },
    ],
  },
  {
    text: 'Providers',
    collapsed: false,
    items: [
      { text: 'All providers', link: '/reference/providers/' },
      { text: 'Anthropic', link: '/reference/providers/anthropic' },
      { text: 'Async', link: '/reference/providers/async' },
      { text: 'ByteDance', link: '/reference/providers/bytedance' },
      { text: 'Creatify', link: '/reference/providers/creatify' },
      { text: 'ElevenLabs', link: '/reference/providers/elevenlabs' },
      { text: 'Flux', link: '/reference/providers/flux' },
      { text: 'Google', link: '/reference/providers/google' },
      { text: 'Grok (xAI)', link: '/reference/providers/grok' },
      { text: 'Happy Horse', link: '/reference/providers/happyhorse' },
      { text: 'HeyGen', link: '/reference/providers/heygen' },
      { text: 'Hunyuan', link: '/reference/providers/hunyuan' },
      { text: 'Ideogram', link: '/reference/providers/ideogram' },
      { text: 'Kling', link: '/reference/providers/kling' },
      { text: 'LTX (Lightricks)', link: '/reference/providers/ltx' },
      { text: 'Luma', link: '/reference/providers/luma' },
      { text: 'MiniMax', link: '/reference/providers/minimax' },
      { text: 'OpenAI', link: '/reference/providers/openai' },
      { text: 'OVI', link: '/reference/providers/ovi' },
      { text: 'Picsart', link: '/reference/providers/picsart' },
      { text: 'Pika', link: '/reference/providers/pika' },
      { text: 'PixVerse', link: '/reference/providers/pixverse' },
      { text: 'Qwen (Alibaba)', link: '/reference/providers/qwen' },
      { text: 'Recraft', link: '/reference/providers/recraft' },
      { text: 'Reve', link: '/reference/providers/reve' },
      { text: 'Runway', link: '/reference/providers/runway' },
      { text: 'Seedance', link: '/reference/providers/seedance' },
      { text: 'Seedream', link: '/reference/providers/seedream' },
      { text: 'Topaz', link: '/reference/providers/topaz' },
      { text: 'VEED', link: '/reference/providers/veed' },
      { text: 'Videography', link: '/reference/providers/videography' },
      { text: 'Wan (Alibaba)', link: '/reference/providers/wan' },
    ],
  },
  {
    text: 'Changelog',
    link: '/changelog',
  },
]

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'Picsart CLI & MCP',
  description: SITE_DESC,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', '**/README.md'],
  sitemap: {
    hostname: HOSTNAME + base,
    // page urls are absolute (/guide/x); make them relative so the base subpath
    // in `hostname` is preserved when resolved.
    transformItems: (items) => items.map((i) => ({ ...i, url: i.url.replace(/^\//, '') })),
  },
  head: [
    ['meta', { name: 'theme-color', content: '#d946a8' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Picsart CLI & MCP' }],
    // Absolute social-share image (1200x630). Regenerate with
    // `node docs-site/scripts/make-og-image.mjs`.
    ['meta', { property: 'og:image', content: `${HOSTNAME}${base}og.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Picsart gen-ai CLI, MCP & Skills — 165 models, 31 providers' }],
    ['meta', { name: 'twitter:site', content: '@picsart' }],
    ['meta', { name: 'twitter:image', content: `${HOSTNAME}${base}og.png` }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(SOFTWARE_LD)],
  ],
  transformPageData(pageData) {
    const cleanPath = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const url = `${HOSTNAME}${base}${cleanPath}`
    const description = pageData.frontmatter.description || SITE_DESC
    const ogTitle = pageData.title || 'Picsart CLI & MCP'
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: ogTitle }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: ogTitle }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },
  themeConfig: {
    siteTitle: 'Picsart CLI & MCP',
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'CLI', link: '/guide/cli-quickstart' },
      { text: 'MCP', link: '/guide/mcp-quickstart' },
      { text: 'Skills', link: '/guide/skills' },
      { text: 'Models', link: '/reference/catalog' },
      { text: 'Providers', link: '/reference/providers/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Playground App ↗', link: 'https://picsart.com/ai-playground/' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PicsArt/picsart-mcp-cli-docs' },
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Built on @picsart/ai-sdk · gen-ai CLI · Picsart MCP · Skills',
      copyright: '© Picsart',
    },
    editLink: {
      pattern: 'https://github.com/PicsArt/picsart-mcp-cli-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
