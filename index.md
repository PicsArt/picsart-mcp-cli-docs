---
layout: home
description: "Use Picsart models from a terminal, an AI agent, or an application."
hero:
  name: Picsart CLI and MCP
  text: Generate and edit media
  tagline: Connect your assistant, check model inputs, and review an estimate before generating. Generation consumes Picsart credits.
  actions:
    - theme: brand
      text: Choose an assistant
      link: /guide/integrations/
    - theme: alt
      text: CLI quickstart
      link: /guide/cli-quickstart
    - theme: alt
      text: Model catalog
      link: /reference/catalog
features:
  - title: Agent tools
    details: Connect to hosted MCP, authenticate, and validate a request before generating.
    link: /guide/integrations/
  - title: Terminal and scripts
    details: Install the CLI, inspect model inputs, and run a generation or JSON batch.
    link: /guide/cli-quickstart
  - title: Application code
    details: Use the TypeScript SDK or follow the HTTP API reference for your language.
    link: /guide/sdk
  - title: Model reference
    details: Browse a versioned catalog and check required inputs, defaults, and limits.
    link: /reference/
  - title: Errors and recovery
    details: Handle authentication failures, rate limits, and jobs that outlive a client timeout.
    link: /guide/rate-limits
  - title: Security
    details: Protect credentials and understand asset access and deployment requirements.
    link: /guide/security
---

## Connect, verify, then create

Choose your [assistant and connection guide](/guide/integrations/), complete Picsart sign-in, then ask:

> Use Picsart to show the parameters for flux-2-pro. Do not generate anything.

A schema response is a free check. Also confirm the host reports a signed-in connection; a connection link or tool listing alone does not prove authorization. Hosted MCP needs no Picsart CLI installation.

Generation consumes Picsart credits. [Review pricing and estimate limits](/guide/pricing) before your first request; the setup check does not include a free generation or establish your client's subscription eligibility.

## Starter requests

Use an assistant prompt to prepare one output and review its estimate before generating:

- [Prepare a still image](/guide/mcp-quickstart#still-image): one ceramic-cup image at 4:3.
- [Prepare a short video](/guide/mcp-quickstart#short-video): a five-second fox clip.
- [Prepare spoken audio](/guide/mcp-quickstart#spoken-audio): a short welcome message.

These are example requests, not a gallery of completed results. The [MCP quickstart](/guide/mcp-quickstart) explains validation, approval, and how to retrieve the resulting asset.

## Use the terminal or an application

Follow the [CLI quickstart](/guide/cli-quickstart) for installation and terminal commands, the [TypeScript SDK guide](/guide/sdk) for application code, or the [REST API guide](/guide/rest-api) for HTTP workflows.

For a browser-based creation tool, [open AI Playground](https://picsart.com/ai-playground/).
