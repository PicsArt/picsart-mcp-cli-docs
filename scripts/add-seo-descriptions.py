#!/usr/bin/env python3
"""Add a per-page `description` frontmatter to every docs page (idempotent).

Run from docs-site/:  python3 scripts/add-seo-descriptions.py
These descriptions drive the <meta name="description"> + OpenGraph/canonical tags
(the canonical/OG are injected centrally by transformPageData in config.ts).
"""
import os, re, json

SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(SRC, '.vitepress/theme/data')
providers = json.load(open(f'{DATA}/providers.json'))
models = json.load(open(f'{DATA}/models.json'))

DESC = {
    'index.md': "Picsart AI Playground — generate AI images, video & audio across 150+ models from 30+ providers (Sora, Veo, Kling, Flux, Nano Banana, ElevenLabs) via the web app, gen-ai CLI, MCP, or drop-in Skills for Claude, Cursor & ChatGPT.",
    'guide/introduction.md': "What Picsart AI Playground is and which surface — Playground, Skills, MCP, CLI, or API — fits your situation.",
    'guide/which-tool.md': "Decide which Picsart surface to use — AI Playground, Skills, MCP, CLI, or API — based on what you are trying to do.",
    'guide/installation.md': "Install the Picsart gen-ai CLI (npm or install script) and connect MCP and Skills to Claude Code, Cursor, Windsurf, ChatGPT, or Codex.",
    'guide/authentication.md': "Authenticate the Picsart gen-ai CLI and MCP with OAuth web login (gen-ai login) — no API keys.",
    'guide/cli-quickstart.md': "Generate AI images, video, and audio from your terminal with the Picsart gen-ai CLI — install, log in, and run your first generation. Scriptable and pipe-friendly.",
    'guide/mcp-quickstart.md': "Connect Picsart's AI catalog (150+ models) to Claude Code, Cursor, Windsurf, ChatGPT, or any MCP client and generate image, video, and audio as agent tools.",
    'guide/skills.md': "Drop-in Picsart Skills for Claude Code, Cursor, Windsurf, and ChatGPT — generate heroes, reels, and batch catalogs in plain English with 150+ AI models.",
    'guide/generating.md': "How generation works across image, video, and audio models — input types (t2i, i2v, tts), inputs, parameters, and outputs — in the Picsart CLI and MCP.",
    'guide/files-and-drive.md': "Save, upload, and organize AI-generated assets in Picsart Drive from the gen-ai CLI and MCP.",
    'guide/pricing.md': "Pay-per-generation credit pricing for Picsart's AI models — quote costs before you generate with the CLI or MCP. No subscriptions, no API keys.",
    'guide/batch.md': "Run many AI generations at once with the Picsart gen-ai CLI — manifests, from-directory, and agent-driven automation.",
    'reference/index.md': "The full Picsart AI model catalog — 150+ models from 30+ providers across image, video, audio, and text, usable from the gen-ai CLI and MCP.",
    'reference/image.md': "70 AI image generation models on Picsart — text-to-image, editing, inpainting, vector/SVG — Nano Banana, Flux, GPT Image, Recraft, Ideogram and more.",
    'reference/video.md': "74 AI video generation models on Picsart — text-to-video, image-to-video, and video editing — Sora, Veo, Kling, Seedance, Wan, Runway and more.",
    'reference/audio.md': "20 AI audio models on Picsart — text-to-speech, music, and sound effects — ElevenLabs, Gemini TTS, Lyria, MiniMax Music and more.",
    'reference/catalog.md': "Browse all 150+ Picsart AI models — search and filter image, video, and audio models for the gen-ai CLI and MCP.",
    'reference/providers/index.md': "All 31 AI model providers on Picsart — Google, OpenAI, Kling, ByteDance, ElevenLabs, Flux, Recraft and more — with CLI and MCP examples.",
}

# provider pages
by = {}
for m in models:
    by.setdefault(m['provider'], []).append(m)
for p in providers:
    names = [m['name'] for m in by.get(p['id'], [])][:3]
    DESC[f"reference/providers/{p['id']}.md"] = (
        f"{p['label']} AI models on Picsart — {p['count']} {'/'.join(p['modes'])} "
        f"model(s) including {', '.join(names)}. CLI + MCP examples, parameters, and official docs."
    )


def yaml_q(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


changed = 0
for rel, desc in DESC.items():
    path = os.path.join(SRC, rel)
    if not os.path.exists(path):
        print('  MISSING', rel)
        continue
    text = open(path).read()
    if re.search(r'^description:\s', text, re.M):
        continue  # idempotent
    line = 'description: ' + yaml_q(desc) + '\n'
    if text.startswith('---\n'):
        text = '---\n' + line + text[4:]
    else:
        text = '---\n' + line + '---\n\n' + text
    open(path, 'w').write(text)
    changed += 1

print(f'Added descriptions to {changed} pages ({len(DESC)} total mapped)')
