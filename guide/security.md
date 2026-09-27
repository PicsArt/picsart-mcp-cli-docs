---
description: "Picsart platform security: TLS 1.2+, AES-256 at rest, SOC 2 compliance, HackerOne vulnerability disclosure, and API key best practices."
---

# Security

This page covers the security controls in place for the Picsart gen-ai platform. It is intended for developers evaluating enterprise integration and for security teams reviewing the platform before onboarding.

## Data in transit

All data transmitted between clients and the Picsart API uses TLS 1.2 or higher. Connections that do not meet this minimum are rejected.

## Data at rest

Data stored on the platform is encrypted at rest using AES-256 on Google Cloud Storage.

## Compliance

**SOC 2**

Picsart is SOC 2 compliant. Certification is renewed annually.

**Penetration testing**

Third-party penetration tests are conducted twice per year.

**Vulnerability disclosure**

Picsart operates an active vulnerability disclosure program on HackerOne at [hackerone.com/picsart](https://hackerone.com/picsart). Security researchers are encouraged to report findings through this program.

## Result URL expiry

Generated result URLs expire 24 hours after creation. URLs are also designed to resist brute-force enumeration. Download or store any results your application needs before the URL expires.

## API key security

**Rotation**

Monthly rotation is recommended to limit the window of exposure if a key is ever leaked.

**Revocation**

Keys can be revoked immediately from your account dashboard. If a key was accidentally committed to a repository or otherwise exposed, revoke it before rotating to a replacement.

**API Secret**

Your API Secret is separate from your API key. It must remain server-side at all times and must never appear in client-side code, browser requests, or public repositories.

## OAuth2

OAuth2 support is currently in development and not yet available. The SDK and REST API authenticate with an API key (bearer token); the CLI and MCP use OAuth web login via `gen-ai login`.

## FAQ

**What happens to my images after processing?**

Result URLs expire 24 hours after generation. After expiry, the URL is no longer accessible. For details on data retention and usage policies, refer to the [Picsart Privacy Policy](https://picsart.com/privacy-policy).

**Where is data stored?**

Data is stored on Google Cloud Storage with AES-256 encryption at rest.

**How do I report a vulnerability?**

Submit findings through the Picsart HackerOne program at [hackerone.com/picsart](https://hackerone.com/picsart).
