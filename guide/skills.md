---
description: "Install Picsart CLI workflow instructions in an agent with shell access."
---

# Skills

A skill supplies workflow instructions to an agent. It does not install an execution environment or authenticate a tool connection.

For Picsart CLI skills, the agent needs shell access to the machine where `gen-ai` is installed and authenticated. Check both from that environment:

```bash
gen-ai --version
gen-ai whoami
```

The version command verifies installation; `whoami` checks the CLI session. Neither generates media. See [Installation](/guide/installation) and [Authentication](/guide/authentication) if a check fails.

## Install the bundled CLI skills

For Claude Code, run:

```bash
gen-ai install-skills
gen-ai check-skills
```

In CLI 2.78.0, the default installation directory is `~/.claude/skills/`. The installer writes skill directories containing `SKILL.md`; placing a ZIP in that directory is not equivalent. Use `gen-ai install-skills --help` to inspect the destination option. Do not use `--force` unless you intend to replace existing skill files.

For another agent, first confirm its supported skill directory and format in that agent's documentation. The CLI's `--to` option accepts a custom destination, but a directory path alone does not establish host compatibility. Check the host's skill list after installation.

[The Picsart skills page](https://picsart.com/gen-ai-skills/) describes separately distributed skills. Their names and requirements can differ from the bundled CLI skills.

## Marketplace plugins are a separate installation path

The bundled CLI installer above copies skill files directly. If another guide distributes skills through a Claude Code plugin marketplace, adding that marketplace only registers its source. It does not install the plugin.

The [Picsart skills repository's installation guide](https://github.com/PicsArt/gen-ai-skills/blob/main/INSTALL.md) identifies `picsart@picsart` as the Claude Code plugin. To install that distribution from your terminal, complete both steps:

```bash
claude plugin marketplace add PicsArt/gen-ai-skills
claude plugin install picsart@picsart
```

Then open `/plugin` in Claude Code and check **Installed** to confirm the plugin is present and enabled. Registration alone is not a successful install. CLI-based skills still need the Picsart CLI and its own authenticated session; plugin installation is not proof that generation is ready.

The publisher's instructions and [Claude Code's plugin documentation](https://code.claude.com/docs/en/discover-plugins#install-from-your-shell) were checked September 30, 2026. Command syntax was inspected with Claude Code 2.1.278. This separate plugin distribution was not installed in a clean profile during the documentation review; the bundled CLI installer above was tested in the earlier audit.

## Verify a workflow

Ask the agent to inspect the schema for `flux-2-pro` without generating. Confirm that it actually runs the installed CLI or uses a connected Picsart tool. Then ask for a cost estimate before a generation task.

An attached ZIP can provide instructions in a chat, but does not let ChatGPT execute a local command. Use the [hosted ChatGPT connection](/guide/integrations/chatgpt) for Picsart tools there.

## Files and automation

CLI media generation normally downloads to `./output` and also attempts to save to Drive. These are separate destinations. See [Files and Drive](/guide/files-and-drive) for options and [Batch](/guide/batch) for JSON job manifests.

Model generation needs a network connection and authorized account. Skill text and some local schema checks can be read offline.
