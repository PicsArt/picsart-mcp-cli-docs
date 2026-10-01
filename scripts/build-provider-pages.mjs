#!/usr/bin/env node
// Rebuild model references from the checked-in, versioned SDK snapshot.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = JSON.parse(readFileSync(process.argv[2] ?? join(root, 'scripts/data/catalog.json'), 'utf8'))
const commands = JSON.parse(readFileSync(join(root, 'scripts/data/cli-commands.json'), 'utf8'))
const cliModels = JSON.parse(readFileSync(join(root, 'scripts/data/cli-models.json'), 'utf8')).models
const dir = join(root, 'reference/providers')
const code = value => '`' + String(value).replaceAll('|', '&#124;').replaceAll('`', '&#96;') + '`'
const kebab = key => key.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('_', '-').toLowerCase()
// CLI 2.78.0 parameter registry overrides; never infer a flag without checking it.
const overrides = {model:'model-version',imageUrls:'image',videoUrl:'video',audioUrl:'audio',voiceId:'voice',removeBackgroundNoise:'remove-bg-noise'}
function flags(p) {
 const base = overrides[p.key] ?? kebab(p.key)
 const names = p.kind === 'object' && Object.keys(p.fields ?? {}).length > 1
  ? Object.keys(p.fields).map(key => base + '-' + kebab(key)) : [base]
 return names.every(name => commands.generate.flags[name]) ? names : []
}
function values(p) {
 const parts = []
 if (p.kind === 'enum') parts.push(p.options.length > 12 ? `${p.options.length} choices; see descriptor below` : p.options.map(o=>code(o.id)).join(', '))
 if (p.kind === 'range') parts.push(`${p.min ?? 'unbounded'} to ${p.max ?? 'unbounded'}`, ...(p.step != null ? [`step ${p.step}`] : []))
 if (p.kind === 'file') parts.push(p.accept + ' input')
 if (p.kind === 'boolean') parts.push('true or false')
 if (p.kind === 'catalog') parts.push('Account-dependent ID; see catalog source below')
 if (p.kind === 'object') parts.push('Structured input; see descriptor below')
 if (p.minLength != null) parts.push(`minimum ${p.minLength} characters`)
 if (p.maxLength != null) parts.push(`maximum ${p.maxLength} characters`)
 if (p.array) parts.push(`array${p.array.min != null ? `; minimum ${p.array.min}` : ''}${p.array.max != null ? `; maximum ${p.array.max}` : ''}`)
 if (p.default != null && p.default !== '') parts.push('default ' + code(p.default))
 return parts.join('; ') || 'Text'
}
function exampleValue(p) {
 if(p.kind === 'text') return p.key === 'prompt' ? 'A quiet forest at sunrise' : 'REPLACE_WITH_VALID_ID'
 if(p.kind === 'enum') return p.default ?? p.options[0]?.id
 if(p.kind === 'range') return p.default ?? p.min ?? 1
 if(p.kind === 'boolean') return p.default ?? false
 if(p.kind === 'file') {const value = 'https://example.com/input.' + ({image:'jpg',video:'mp4',audio:'mp3'}[p.accept] ?? 'bin'); return p.array ? Array(Math.max(1,p.array.min ?? 1)).fill(value) : value}
 return undefined
}
function sample(m) {
 const params = {}
 for(const p of m.params) if(p.required || p.key === 'prompt') {const value=p.key === 'prompt' && m.mode === 'text' ? 'Describe a quiet forest at sunrise in two sentences.' : exampleValue(p); if(value===undefined || value==='REPLACE_WITH_VALID_ID') return null; params[p.key]=value}
 return params
}
const byProvider = new Map()
for(const model of catalog.models) {if(!byProvider.has(model.provider.id)) byProvider.set(model.provider.id, []);byProvider.get(model.provider.id).push(model)}
for(const [id,models] of byProvider) {
 const name=models[0].provider.name
 const modes=['image','video','audio','text'].filter(mode=>models.some(m=>m.mode===mode))
 const preferred=[...models].sort((a,b)=>Number(b.params.some(p=>p.key==='prompt'))-Number(a.params.some(p=>p.key==='prompt')))
 const selected=preferred.find(m=>cliModels[m.id] && !cliModels[m.id].disabled && sample(m)!==null && m.params.filter(p=>p.required).every(p=>flags(p).length===1))
 let examples=''
 if(selected) {
  const params=sample(selected)
  const quote=v=>JSON.stringify(String(v))
  const args=Object.entries(params).flatMap(([key,value])=>{const p=selected.params.find(p=>p.key===key);const flag=flags(p)[0];return (Array.isArray(value)?value:[value]).flatMap(v=>p.kind==='boolean'?[`--${v?'':'no-'}${flag}`]:[`--${flag}`,quote(v)])})
  const top=new Set(['prompt','aspectRatio','duration','resolution','count','imageUrls','videoUrl','generateAudio','negativePrompt'])
  const input={model:selected.id,prompt:params.prompt ?? ''}
  if(selected.mode !== 'text') input.async=true
  for(const [key,value] of Object.entries(params)) {if(top.has(key)) input[key]=value;else (input.extra ??= {})[key]=value}
  examples=`## Example\n\nFirst inspect the model without generating media:\n\n\`\`\`bash\ngen-ai models info ${selected.id} --json\ngen-ai validate -m ${selected.id} --schema\n\`\`\`\n\nThe following requests ${selected.mode === 'text' ? 'return text' : 'generate media'} and consume credits. Replace any \`example.com\` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.\n\n\`\`\`bash\ngen-ai generate -m ${selected.id} ${args.join(' ')}${selected.mode === 'text' ? '' : ' --download ./output'}\n\`\`\`\n\nEquivalent hosted MCP request:\n\n\`\`\`json\n${JSON.stringify({name:'picsart_generate',arguments:input},null,2)}\n\`\`\`\n\n${selected.mode === 'text' ? 'Text results are returned synchronously.' : 'If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.'}\n\n`
 }
 let text=`---\ndescription: ${JSON.stringify(name+' model IDs, parameters, and CLI and MCP usage on Picsart.')}\n---\n\n# ${name}\n\n**Modes:** ${modes.join(', ')} · **Models:** ${models.length}\n\nThis reference uses the \`@picsart/ai-sdk ${catalog.sdkVersion}\` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check \`picsart_model_catalog\` or \`gen-ai models info\` before submitting a request.\n\n## Models\n\n| ID | Name | Input type |\n|---|---|---|\n${models.map(m=>`| ${code(m.id)} | ${m.name} | ${code(m.inputType)} |`).join('\n')}\n\n${examples}## Parameters\n\nRequired inputs and defaults below describe the model, not every command that calls it. For example, \`gen-ai describe\` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in \`extra\`; see [the request format](/guide/mcp-quickstart).\n\n`
 for(const m of models) {
  text+=`### ${code(m.id)}\n\n${m.name}; input type ${code(m.inputType)}.\n\n| Parameter | CLI flag | Required | Type | Values and constraints |\n|---|---|---|---|---|\n${m.params.map(p=>`| ${code(p.key)} | ${(cliModels[m.id] && !cliModels[m.id].disabled && cliModels[m.id].params.some(c=>c.key===p.key) ? flags(p).map(f=>code('--'+f)).join(', ') : '') || 'Use SDK or MCP'} | ${p.required?'Yes':'No'} | ${p.kind} | ${values(p)} |`).join('\n')}\n\n<details>\n<summary>Full parameter descriptors</summary>\n\n\`\`\`json\n${JSON.stringify(m.params,null,2)}\n\`\`\`\n\n</details>\n\n`
  if(m.params.some(p=>p.kind==='catalog')) text+='Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.\n\n'
 }
 text+='## Pricing\n\n[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.\n'
 writeFileSync(join(dir,id+'.md'),text)
}
for(const file of readdirSync(dir).filter(f=>f.endsWith('.md') && f!=='index.md')) {
 const id=file.slice(0,-3)
 if(!byProvider.has(id)) writeFileSync(join(dir,file),`---\ndescription: ${JSON.stringify('Availability of '+id+' models in the current catalog snapshot.')}\n---\n\n# ${id[0].toUpperCase()+id.slice(1)}\n\nNo models from this provider appear in the \`@picsart/ai-sdk ${catalog.sdkVersion}\` snapshot used by this reference. This does not establish availability in other releases. Check the [model catalog](/reference/catalog) and your connected server before choosing a replacement.\n`)
}
console.log(`Generated ${byProvider.size} provider references from SDK ${catalog.sdkVersion}.`)
