// Regenerates docs-site/public/og.png — the 1200x630 social-share card used for
// og:image / twitter:image (wired in .vitepress/config.ts).
//
// Run from the repo root (Playwright + chromium live in the root node_modules):
//   node docs-site/scripts/make-og-image.mjs
//
// Edit the HTML below and re-run to update the card. Keep it 1200x630.
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const outPath = join(here, '..', 'public', 'og.png')

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #f5f3f7;
    background: #0c0a12;
    background-image:
      radial-gradient(900px 520px at 84% -10%, rgba(217,70,168,0.55), transparent 60%),
      radial-gradient(700px 600px at 0% 115%, rgba(124,58,237,0.40), transparent 60%);
    padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .brand { display: flex; align-items: center; gap: 16px; }
  .dot { width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg, #ff4fbf, #d946a8 55%, #7c3aed); }
  .brand b { font-size: 30px; font-weight: 800; letter-spacing: -0.3px; }
  .brand span { font-size: 22px; color: #b9b2c7; font-weight: 500; margin-left: 4px; }
  h1 { font-size: 78px; line-height: 1.02; font-weight: 800; letter-spacing: -2.4px; }
  h1 em { font-style: normal;
    background: linear-gradient(120deg, #ff7ad0, #d946a8 60%, #a06bff);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  p.sub { font-size: 30px; color: #cdc6da; margin-top: 26px; max-width: 980px; line-height: 1.34; }
  .row { display: flex; align-items: center; justify-content: space-between; }
  .term { font-family: 'SF Mono', ui-monospace, Menlo, monospace; font-size: 23px;
    color: #ffc8ec; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    padding: 16px 22px; border-radius: 12px; }
  .term .p { color: #8b84a0; }
  .stats { display: flex; gap: 40px; text-align: right; }
  .stat b { display: block; font-size: 46px; font-weight: 800; letter-spacing: -1px; }
  .stat span { font-size: 20px; color: #b1aac1; }
</style></head><body>
  <div class="brand"><div class="dot"></div><b>Picsart</b><span>Developer Docs</span></div>
  <div>
    <h1>gen-ai <em>CLI · MCP · Skills</em></h1>
    <p class="sub">Generate image, video &amp; audio from your terminal or any AI agent — one id, every model.</p>
  </div>
  <div class="row">
    <div class="term"><span class="p">$</span> gen-ai generate -m flux-2-pro -p "a neon city"</div>
    <div class="stats">
      <div class="stat"><b>141</b><span>models</span></div>
      <div class="stat"><b>28</b><span>providers</span></div>
    </div>
  </div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: outPath, type: 'png' })
await browser.close()
console.log('Wrote', outPath)
