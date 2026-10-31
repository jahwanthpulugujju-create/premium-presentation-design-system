# Architecture direction

## Core contract: structured slide specification

A slide should be represented as structured data before any renderer is involved. The specification records the slide's narrative purpose, main takeaway, visual intent, elements, constraints and evidence references.

This contract separates content and design decisions from the output format.

## Planned pipeline

1. **Input ingestion** — brief, source documents, data, reference decks and brand guidelines.
2. **Presentation intelligence** — audience, purpose, constraints, evidence and claim extraction.
3. **Narrative planning** — story arc, slide objectives, assertion-based titles and pacing.
4. **Art direction** — deck identity, typography, colour, grid, image treatment and visual motifs.
5. **Slide specification** — structured, renderer-independent description of each slide.
6. **Asset research** — authentic imagery, provenance, rights metadata and custom diagram assets.
7. **Composition** — content-aware layout candidates subject to spatial and typographic constraints.
8. **Rendering** — high-fidelity previews and native editable PowerPoint objects.
9. **Quality loop** — deterministic checks, rendered inspection, specialist critique and repair.
10. **Delivery** — verified PPTX, PDF, source notes and previews.

## Two-renderer principle

The long-term design uses one slide specification to feed two renderers:

- A visual renderer for accurate previews and PDF output.
- A PowerPoint renderer that constructs native text, shapes, charts, tables and connectors wherever practical.

The renderers must be tested against each other. A visual preview is not proof that the exported PowerPoint preserves editability or layout fidelity.

## Current implementation

The current repository includes only the initial TypeScript slide model and deterministic validator. No AI orchestration, asset integration, visual renderer or PowerPoint export has been implemented yet.