# Security policy

PPD is an early-stage local project. Please do not publish credentials, API keys, private source material or personally identifiable information in issues or pull requests.

## Reporting a vulnerability

For a vulnerability that could expose secrets, compromise a user's machine or affect a deployed service, contact the repository maintainer privately through the GitHub profile rather than opening a public issue.

Include the affected component, impact, reproduction steps and any suggested mitigation. Do not include live credentials in the report.

## Current scope

The repository currently contains a local TypeScript slide-specification model, deterministic validator and a focused PptxGenJS proof renderer. It does not run a hosted service, store user uploads or connect to external AI/image providers. The renderer writes files locally; do not feed it untrusted scripts or executable content.