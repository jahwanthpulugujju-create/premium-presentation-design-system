# Contributing to PPD

PPD is in pre-alpha. Contributions should strengthen the product's core promise: presentations that are original, clear, visually considered and editable.

## Before opening an issue

- Search existing issues to avoid duplicates.
- Describe the user problem, not only a proposed implementation.
- Include a minimal reproduction or a concrete slide example when relevant.
- Distinguish an implemented behaviour from a proposed feature.

## Pull request expectations

- Keep changes focused and explain the design or engineering decision.
- Add or update tests for validation behaviour.
- Update documentation when product behaviour or project status changes.
- Do not add screenshots, sample exports or benchmark claims that were not produced by the repository.
- Preserve source and licence information for third-party visual assets.

## Design contribution principles

- Prefer meaningful visual communication over decoration.
- Do not add icons, gradients, shadows, cards or stock imagery by default.
- Do not reproduce a reference deck or designer's distinctive expression.
- Make important output objects editable where practical.
- Explain how a proposed quality check can be evaluated.

## Development checks

```bash
npm install
npm run check
```
