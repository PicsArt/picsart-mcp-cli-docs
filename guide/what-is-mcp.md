---
description: "Understand how an MCP connection gives an agent access to Picsart tools."
---

# What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io/) standardizes how an AI application discovers and calls external tools. Other tool interfaces exist; MCP supplies a shared connection format.

When you connect Picsart, the client reads tool names, descriptions, and input schemas. The agent can then inspect a model, validate a request, submit a generation, and retrieve the result using those tools. Your host controls which tools are enabled and when approval is required.

Picsart's server is hosted remotely. It requires a client with compatible HTTP transport and authentication support. Connecting does not install a local CLI or give the server unrestricted access to your computer. See [local file inputs](/guide/local-files) for supported upload methods.

A skill is a set of instructions for the agent; MCP is a tool connection. You may use them together. Start with the [MCP quickstart](/guide/mcp-quickstart) and the [guide for your host](/guide/integrations/).
