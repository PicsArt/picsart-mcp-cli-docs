#!/usr/bin/env node
// Open every built page in Chromium, check local links/anchors, and exercise the catalog.
// Start `npm run preview -- --host 127.0.0.1` first, then:
// node scripts/check-site.mjs http://127.0.0.1:4173/ /tmp/docs-browser-report.json
import { chromium } from 'playwright'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:4173/')
const root = resolve('.vitepress/dist')
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)])
const routes = files(root).filter(p=>p.endsWith('.html') && !p.endsWith('/404.html')).map(p=>relative(root,p))
const browser = await chromium.launch({ executablePath: process.env.DOCS_BROWSER_EXECUTABLE || undefined })
const page = await browser.newPage({ viewport: {width:1440,height:1000} })
let current;const errors=[];const pages=[];const targets=new Map()
async function ready() {
 await page.waitForFunction(() => Boolean(document.querySelector('#app')?.__vue_app__))
 await page.evaluate(() => document.fonts.ready)
}
async function cardCount(count) {
 await page.waitForFunction(n => document.querySelectorAll('.model-card').length === n, count)
}
page.on('response', response=>{if(response.status()>=400 && new URL(response.url()).origin===origin.origin)errors.push({page:current,error:`HTTP ${response.status()}: ${response.url()}`})})
page.on('pageerror', error=>errors.push({page:current,error:error.message}))
for(const route of routes) {
 current=route
 if(pages.length % 20 === 0)console.log(`Opening page ${pages.length+1}/${routes.length}: ${route}`)
 const url=new URL(route,origin)
 const response=await page.goto(url.href,{waitUntil:'domcontentloaded'})
 await page.locator('main, .VPHome').first().waitFor({state:'visible'})
 await ready()
 if(response.status()!==200)errors.push({page:route,error:'HTTP '+response.status()})
 const result=await page.evaluate(()=>({title:document.title,headings:[...document.querySelectorAll('main h1, .VPHome h1')].map(e=>e.textContent),text:document.querySelector('main, .VPHome')?.innerText.length??0,ids:[...document.querySelectorAll('[id]')].map(e=>e.id),links:[...document.querySelectorAll('a[href]')].map(e=>e.href),overflow:document.documentElement.scrollWidth>innerWidth+2}))
 if(!result.text || !result.title || !result.headings.length)errors.push({page:route,error:'Missing page title or main content'})
 if(result.overflow)errors.push({page:route,error:'Horizontal page overflow'})
 const key=url.pathname.replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'')
 targets.set(key,new Set(result.ids));pages.push({route,title:result.title,heading:result.headings,links:result.links})
}
let localLinks=0
for(const p of pages)for(const href of p.links){
 const u=new URL(href)
 if(u.origin!==origin.origin || !u.pathname.startsWith(origin.pathname))continue
 if(/\.(?:png|svg|ico|txt|json|css|js)$/.test(u.pathname))continue
 const key=u.pathname.replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'')
 localLinks++
 if(!targets.has(key))errors.push({page:p.route,error:'Missing local route '+u.pathname})
 else if(u.hash && !targets.get(key).has(decodeURIComponent(u.hash.slice(1))))errors.push({page:p.route,error:'Missing anchor '+u.pathname+u.hash})
}
if(process.argv[3])writeFileSync(process.argv[3],JSON.stringify({pages:pages.map(({links,...p})=>p),localLinks,errors,interactiveChecks:'pending'},null,2)+'\n')
await page.goto(new URL('reference/catalog.html',origin).href,{waitUntil:'domcontentloaded'})
await ready()
await page.getByRole('button',{name:'text',exact:true}).click()
const models=JSON.parse(readFileSync('.vitepress/theme/data/models.json'))
const expected=models.filter(m=>m.mode==='text').length
await cardCount(expected)
if(await page.locator('.model-card').count()!==expected)errors.push({page:'catalog',error:'Text filter count differs'})
const badges=await page.locator('.mode-text').evaluateAll(elements=>elements.map(e=>({bg:getComputedStyle(e).backgroundColor,fg:getComputedStyle(e).color})))
if(badges.some(b=>b.bg==='rgba(0, 0, 0, 0)' || b.fg===b.bg))errors.push({page:'catalog',error:'Text badge unreadable'})
await page.getByRole('searchbox',{name:'Search models'}).fill('zz-no-such-model')
await cardCount(0)
if(await page.locator('.model-card').count()!==0)errors.push({page:'catalog',error:'Search filter does not narrow results'})
await page.getByRole('button',{name:'Clear filters',exact:true}).click()
await cardCount(models.length)
if(await page.locator('.model-card').count()!==models.length)errors.push({page:'catalog',error:'Reset failed'})
for(const theme of ['light','dark']) {
 await page.evaluate(t=>document.documentElement.classList.toggle('dark',t==='dark'),theme)
 await page.waitForTimeout(350)
 if(process.env.DOCS_SCREENSHOT_DIR)await page.screenshot({path:join(process.env.DOCS_SCREENSHOT_DIR,`catalog-${theme}.png`)})
}
for(const width of [390,768]) {
await page.setViewportSize({width,height:844})
for(const route of ['index.html','guide/mcp-quickstart.html','reference/providers/anthropic.html','reference/catalog.html']){
 await page.goto(new URL(route,origin).href,{waitUntil:'domcontentloaded'})
 await ready()
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))errors.push({page:route,error:`Page overflow at ${width}px`})
}
}
await browser.close()
const report={pages:pages.map(({links,...p})=>p),localLinks,errors,textModels:expected}
if(process.argv[3])writeFileSync(process.argv[3],JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({pages:pages.length,localLinks,textModels:expected,errors},null,2))
process.exitCode=errors.length?1:0
