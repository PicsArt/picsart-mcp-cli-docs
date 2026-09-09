---
description: "Connect Picsart to Replit Agent — add the MCP server from the Integrations panel and generate images, video, and audio inside any Replit project."
---

# Replit

Replit connects to MCP servers over HTTPS rather than as a local process. Picsart is not yet listed in Replit's built-in integration library, so you add it as a **personal MCP server** using a URL.

## Prerequisites

A Picsart account with credits and an API key.

Get your API key from [picsart.com/settings](https://picsart.com/settings) — the key is used as an `Authorization` header (see below). This is the same credential used by the [SDK and REST API](/guide/authentication).

## Add Picsart as a personal MCP server

1. In the Replit left sidebar, click **Integrations**.
2. At the top right, click **Add custom**, then **+ Add personal MCP server**.
3. In the dialog, fill in:
   - **Display name:** `Picsart gen-ai`
   - **MCP Server URL:** `https://server.smithery.ai/@picsart/picsart-gen-ai/mcp`
4. Expand **Advanced settings**, click **+ Add header**, and add:
   - **Name:** `Authorization`
   - **Value:** `Bearer YOUR_API_KEY`
5. Click **Test & save**.

Replace `YOUR_API_KEY` with your key from [picsart.com/settings](https://picsart.com/settings).

::: tip Personal vs workspace server
A personal MCP server is only visible to you. If you want every member of a Replit workspace to have access, use **Add workspace MCP server** instead and follow the same steps.
:::

## Verify the connection

After saving, open the Replit AI Agent panel and ask:

> *"List available Picsart image models."*

The agent should call `picsart_list_models` and return results. If it shows an error, double-check the Authorization header value and that the URL is copied exactly.

## Use it

Once connected, describe what you want to generate in plain English in the Replit Agent:

- *"Generate a product shot on a white background using Flux 2 Pro, 1:1."*
- *"Create a 9:16 teaser video from this image URL with Seedance 2.0."*
- *"How many credits does a Veo 3.1 video at 8 seconds cost? Quote me before generating."*
- *"Remove the background from this product image."*

Replit Agent calls the Picsart tools and returns result URLs directly in the conversation.

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool list and a recommended generation flow.

## Troubleshooting

**"Test & save" fails with a connection error.**

Verify the MCP Server URL is entered exactly as shown, with no trailing slash or extra characters.

**The connection saves but tools do not appear in the agent.**

Reload the Replit page. The tool list is loaded when the agent starts, not dynamically.

**Generation fails with "unauthorized" or "invalid credentials".**

Check that the `Authorization` header value starts with `Bearer ` (note the space) and that the key is the full API key string from [picsart.com/settings](https://picsart.com/settings), not an OAuth token.

**I do not see an Integrations option in the sidebar.**

Integrations is available in Replit with an active workspace. If the sidebar shows New, Import, Projects, Routines, Library, and Security but not Integrations, make sure you are inside a Replit workspace (not on the home dashboard).

## FAQ

**Why is Picsart not in Replit's integration library?**

Replit's native library lists first-party connectors. Picsart is added as a personal MCP server, which works identically — it just requires the manual URL entry above.

**Do I need to install the gen-ai CLI in my Replit project?**

No. The hosted MCP endpoint at Smithery runs the server remotely. Your Replit project connects to it over HTTPS; there is nothing to install locally.

**Can other collaborators in my workspace use it?**

If you add it as a personal server, only you can use it. To share it with your workspace, choose **Add workspace MCP server** from the **Add custom** dropdown instead.

**Does this use the same credits as the CLI?**

Yes. All Picsart surfaces — CLI, MCP, SDK, and the hosted endpoint — draw from the same account and the same credit balance.

**What is the difference between the API key used here and `gen-ai login`?**

On your local machine, the CLI and MCP use OAuth web login (`gen-ai login`). The hosted Replit connection uses an API key bearer token — the same credential as the SDK and REST API. Both draw from the same account and credit balance. See [Authentication](/guide/authentication).

## Start creating

::: tip Ready to generate?
[Open Replit](https://replit.com){ .btn-primary target="_blank" rel="noopener" }
:::
