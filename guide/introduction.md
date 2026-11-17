---
description: "Generate and edit media with Picsart from a terminal, agent, or application."
---

# Introduction

Picsart provides models for image, video, audio, and text tasks. These docs explain how to use them from the `gen-ai` CLI, a hosted MCP connection, or an application.

Choose a starting point:

- [CLI quickstart](/guide/cli-quickstart) for terminal commands and scripts.
- [MCP quickstart](/guide/mcp-quickstart) for tools inside an AI agent.
- [SDK](/guide/sdk) or [REST API](/guide/rest-api) for application code.
- [AI Playground](https://picsart.com/ai-playground/) for a browser interface.

A [skill](/guide/skills) supplies instructions to an agent. It still needs access to the CLI or connected tools to perform a task.

## Choose a model

Browse the [model catalog](/reference/catalog), then inspect that model's required inputs. An image-to-video model might need a starting frame; a motion-control model can also need a reference video. Names alone do not establish input compatibility.

The reference uses a versioned SDK snapshot. CLI and hosted MCP catalogs can differ. [Authentication](/guide/authentication) is also configured separately for each interface.

Before generating, [validate the request and check its estimated cost](/guide/pricing). For automation, read [batch processing](/guide/batch) and [timeout recovery](/guide/rate-limits).
