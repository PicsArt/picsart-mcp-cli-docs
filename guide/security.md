---
description: "Handle Picsart credentials, asset URLs, and security reports."
---

# Security

Keep API credentials and CLI session files outside source control. Supply automation credentials through a secret store, and remove access when a runner or integration no longer needs it.

## Credentials

The CLI and hosted MCP use separate authorization flows. See [Authentication](/guide/authentication). Do not copy a personal credentials file into a shared repository or embed bearer tokens in documentation examples.

If a credential is exposed, revoke it through the service that issued it and update affected integrations. Logging out of the CLI does not unset environment credentials.

## Media URLs

Drive access and asset-URL access are different controls. Treat generated URLs as potentially usable by anyone who receives them. Do not rely on undocumented expiry times to protect confidential content.

For retention and processing terms, consult the [Picsart Privacy Policy](https://picsart.com/privacy-policy). For enterprise compliance evidence, obtain the current report and product scope from Picsart rather than treating this documentation as a certification statement.

## Report a vulnerability

Use the reporting route in the [Picsart Security Policy](https://picsart.com/security-policy). Include reproduction steps and affected product details, without posting credentials or private media publicly.
