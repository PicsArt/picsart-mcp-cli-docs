---
layout: home
description: "Use Picsart models from a terminal, an AI agent, or an application."
hero:
  name: Picsart CLI and MCP
  text: Generate and edit media
  tagline: Commands, model parameters, and connection guides for your tools and applications.
  actions:
    - theme: brand
      text: CLI quickstart
      link: /guide/cli-quickstart
    - theme: alt
      text: Connect an agent
      link: /guide/mcp-quickstart
    - theme: alt
      text: Model catalog
      link: /reference/catalog
features:
  - title: Terminal and scripts
    details: Install the CLI, inspect model inputs, and run a generation or JSON batch.
    link: /guide/cli-quickstart
  - title: Agent tools
    details: Connect to hosted MCP, authenticate, and validate a request before generating.
    link: /guide/integrations/
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

## Start with a free check

After [installing the CLI](/guide/installation), confirm it is available and inspect a model schema:

```bash
gen-ai --version
gen-ai validate -m flux-2-pro --schema
```

Neither command generates media. Continue with the [CLI quickstart](/guide/cli-quickstart) to authenticate and check pricing, or follow the [MCP quickstart](/guide/mcp-quickstart) to connect an agent.

For a browser interface, open [AI Playground](https://picsart.com/ai-playground/). For application code, choose the [SDK](/guide/sdk) or [REST API](/guide/rest-api).
