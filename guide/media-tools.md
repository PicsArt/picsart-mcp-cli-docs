---
title: "Picsart Media Studio"
description: "Build videos, slideshows and captioned clips from your own footage and ready-made templates, just by asking — Picsart Media Studio assembles the piece and renders it for you."
---

# Picsart Media Studio

**Picsart Media Studio** lets you build videos and images by asking for them in plain language.
You supply the material — your own clips and photos, some text, a template you like — and your
assistant assembles it and renders the finished file.

It works in **Claude**, in **ChatGPT**, and in other assistants that support connectors. This
page uses Claude for the setup examples because it is the most common, but nothing here is specific
to it.

Everything Media Studio makes is built from what you give it and the templates, effects and fonts it
offers. If you want an image or a video created from a written description instead, that is the
[Picsart MCP server](/guide/mcp-quickstart) — a different connector, with its own tools.

::: tip Two separate connectors
Media Studio and the Picsart MCP server are added separately and do different things. Connecting
one does not connect the other.
:::

## What you can ask for

- Join several clips into one video, with a transition at each cut
- Build a slideshow or a title card from a ready-made template
- Put captions, titles or a name strip over footage you already have
- Turn the speech in a video into text
- Reframe a wide video for a phone screen, keeping the subject in shot
- Get a grid of preview thumbnails so you can see how a video is coming along

## How it works

Your assistant works the way a person would in an editing app, one step at a time:

1. **It gets your material in.** Ask it to open the uploader and drop in a file from your computer,
   or let it browse **Picsart Drive** — the file storage that comes with your Picsart account.
2. **It builds the piece.** It stacks up the parts — a background clip, some text, a logo — and
   sets when each one appears. Starting from one of the ready-made templates is usually quicker
   than describing a layout from scratch, so it helps to ask what templates are available.
3. **It shows you a preview.** Ask to see preview thumbnails before committing to a final render.
   Checking at this point is free and catches most surprises.
4. **It renders the file.** You get a video or image you can play, download, or save to your Drive.

Two things worth knowing as you go:

- **Ask which fonts are available** before asking for styled text. Media Studio has its own font
  list, and a font that isn't on it comes out blank.
- **Nothing is saved as you work.** The piece stays in the conversation until it renders, so it
  helps to keep to one thread while building something.

## What you need

- A **Picsart account** — you sign in when you connect.
- **Credits** on that account. Some operations use them.

## Connect

Media Studio runs on Picsart's servers, so there is nothing to install. You add it once and sign in
with your Picsart account.

The server address is:

```
https://api.picsart.com/connectors/media-tools/mcp
```

**In Claude** — add it from the connector directory, or go to Settings → Connectors and add it with
the address above. A browser window opens for you to sign in to Picsart, and the tools show up in
your next conversation.

**On a Claude Team or Enterprise plan**, connectors are added for the whole organization rather
than per person. If you see *"Contact an organization owner to install connectors"*, ask whoever
administers your Claude organization to add it.

**In Claude Code**:

```bash
claude mcp add --transport http picsart-media-studio https://api.picsart.com/connectors/media-tools/mcp
```

Sign-in happens the first time you use it. Check it is connected with `/mcp`.

**In any other app that supports connectors** — add a connector using the address above. The
app will walk you through signing in to Picsart. Wording varies between apps, but it is usually
under a Connectors, Integrations or Tools setting.

## Try it

Three things to ask for, in rising order of ambition. The first works on a brand-new account.

**Make a title card**

> *"Show me the title-card templates, make one that reads 'Summer Collection' with a subtitle
> underneath, show me a preview, then render it as an image."*

It will look through the templates, fill one in, show you a thumbnail to check, and render the
finished picture.

<small>Uses `picsart_media_list_scene_templates`, `picsart_media_apply_scene_template`,
`picsart_media_contact_sheet` and `picsart_media_export`.</small>

**Caption a video from your computer**

> *"Open the uploader so I can add a video, then write out what's said in it and put the captions
> on screen."*

It opens the drop area, transcribes the speech once you have added the file, lays the captions over
the video, and renders it.

<small>Uses `picsart_media_upload`, `picsart_media_transcribe`, `picsart_media_patch_scene` and
`picsart_media_export`.</small>

**Reframe something already in your Drive**

> *"Find the most recent video in my Picsart Drive and tell me how long it is and what size it is."*

A good first thing to try if you already keep files in Picsart Drive. Nothing is created and
nothing is spent.

<small>Uses `picsart_media_drive_list` and `picsart_media_probe_media`.</small>

::: tip If you're not sure how to phrase something
Just ask — *"what can Picsart Media Studio do?"* or *"how would you join two videos with Media
Studio?"*. It can look up the recommended steps for common jobs and tell you.
:::

## What you'll see

Two of the tools open a panel in the conversation instead of replying with text:

- **The uploader** — a drop area for files from your computer, plus a tab for picking something
  already in your Picsart Drive.
- **The result** — a player for the finished video or image, with buttons to download it or save it
  to your Drive.

## Support

Media Studio works with Claude, ChatGPT and other assistants that support connectors, and is built
on the open [Model Context Protocol](https://modelcontextprotocol.io) standard.

For anything to do with your Picsart account or credits, use the support options in your Picsart
account.

## More

- **[What you can do](/guide/media-studio/tools)** — every tool, and what each one is for
- **[Troubleshooting](/guide/media-studio/troubleshooting)** — what to do when something doesn't work
