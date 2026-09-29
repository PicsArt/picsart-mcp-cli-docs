---
description: "Connect Picsart to ChatGPT with a developer-mode MCP app or Skills: generate images, video, and audio from ChatGPT conversations."
---

# ChatGPT

ChatGPT supports Picsart through MCP (a [developer-mode](https://developers.openai.com/api/docs/guides/developer-mode) app that connects to the hosted Picsart MCP server) and through Skills (as an attached file in a conversation or custom GPT).

## Prerequisites

1. A Picsart account with credits for generations.
2. A ChatGPT plan with developer mode: Plus, Pro, Business, Enterprise, or Edu, on the web. On Business and Enterprise workspaces, an admin may need to allow developer mode and custom MCP apps.

That is all for MCP: the server is hosted by Picsart and you sign in from ChatGPT. You do not need the gen-ai CLI or `gen-ai login`. Those are needed only for the [Skills method](#method-2-skills-via-attachment).

## Method 1: MCP

ChatGPT connects to remote MCP servers by URL. The Picsart MCP server is hosted at `https://api.picsart.com/gen-ai/mcp`, so there is nothing to run on your machine. See OpenAI's developer mode guide linked above for the current steps.

### Configure

1. In ChatGPT, open **Settings**, go to **Security and login**, and turn on **Developer mode**.
2. Open the apps page ([chatgpt.com/plugins](https://chatgpt.com/plugins)) and select the plus button to create a developer-mode app.
3. Fill in the app details:
   - **Name:** `Picsart`
   - **MCP server URL:** `https://api.picsart.com/gen-ai/mcp`
   - **Authentication:** OAuth
4. Confirm the developer-mode warning and create the app.

Menu names in ChatGPT change over time. If a label differs, follow OpenAI's guide linked above.

### Sign in to Picsart

After you create the app, ChatGPT opens a Picsart sign-in window. Sign in with your Picsart account and approve access. The app then appears under **Drafts** in your app settings.

### Use it

Start a conversation, open the plus menu in the composer, choose **Developer mode**, and select the Picsart app. Then ask:

- *"Generate a product image using Flux 2 Pro, white background, 1:1."*
- *"How many credits does a Veo 3.1 video cost at 8 seconds?"*
- *"Remove the background from this image URL."*

ChatGPT calls the Picsart tools, runs the generation, and returns the result URL. If ChatGPT does not pick the right tool, name it: *"Use the Picsart app's picsart_generate tool to..."*

## Method 2: Skills (via attachment)

::: info Skills need the gen-ai CLI
Skills run the `gen-ai` CLI on your machine. Before adding a skill, [install the CLI](/guide/installation) and run `gen-ai login` once. The MCP method does not need this.
:::

### Install

1. Download the skill ZIP from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. Attach the ZIP to a ChatGPT conversation, or include it in a Custom GPT's knowledge files.
3. ChatGPT reads the skill instructions and uses them when you describe a generation task.

### Use it

In the conversation:

- *"Generate three hero image concepts for a skincare brand in 16:9."*
- *"Create a 9:16 teaser video from this product image."*

ChatGPT reads the skill instructions and runs the corresponding `gen-ai` commands.

## Troubleshooting

**The Picsart sign-in window did not open.**

Allow pop-ups for chatgpt.com. Then open the Picsart app's details page in your app settings and connect it again.

**The Picsart tools do not appear in the conversation.**

Make sure you chose **Developer mode** from the composer's plus menu and selected the Picsart app. If the tools are still missing, open the app's details page in settings and refresh it to pull the current tool list.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Open the Picsart app's details page in settings, disconnect it, and connect again to sign in.

**Generation fails with "insufficient credits".**

Ask ChatGPT *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

ChatGPT connects to the Picsart server from OpenAI's side, but your browser must reach the Picsart sign-in page during sign-in. Ask your network admin to allow it.

## FAQ

**Does ChatGPT support MCP natively?**

Yes, through developer-mode apps that connect to remote MCP servers over HTTP. ChatGPT cannot run local MCP processes, and the Picsart server does not need one. Availability depends on your ChatGPT plan.

**Can I use the skill with a free ChatGPT account?**

The skill can be attached to conversations on any ChatGPT plan. However, running `gen-ai` commands requires a Picsart account with credits. The ChatGPT plan tier does not affect Picsart billing.

**Is the result URL private?**

Result URLs are time-limited signed URLs. Download or save them to Drive promptly. See [Files and Drive](/guide/files-and-drive).

## Start creating

Click below to open ChatGPT with a ready-to-run Picsart prompt. ChatGPT will call the Picsart tools once the app is connected and you confirm.

::: tip Ready to generate?
[Start creating in ChatGPT](https://chatgpt.com/?q=Use%20Picsart%20MCP%20to%20generate%20a%20photorealistic%20product%20shot%20on%20a%20white%20background%20with%20natural%20lighting%20using%20Flux%202%20Pro){ .btn-primary target="_blank" rel="noopener" }
:::
