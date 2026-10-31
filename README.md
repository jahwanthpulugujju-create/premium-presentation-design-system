# PPD — Premium Presentation Design System

<p align="center">
  <img src="assets/ppd-banner.svg" alt="PPD — Premium Presentation Design System" width="100%" />
</p>

<p align="center"><strong>Presentations designed with intent. Not assembled from templates.</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/status-pre--alpha-d4ef70?style=flat-square&labelColor=121B20" alt="Pre-alpha" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PowerPoint-editable-CC4B3E?style=flat-square&logo=microsoftpowerpoint&logoColor=white" alt="Editable PowerPoint" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-e8e4d8?style=flat-square&labelColor=121B20" alt="MIT license" /></a>
  <a href="https://github.com/jahwanthpulugujju-create/premium-presentation-design-system/actions/workflows/ci.yml"><img src="https://github.com/jahwanthpulugujju-create/premium-presentation-design-system/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
</p>

<p align="center">
  <a href="#the-product">Product</a> ·
  <a href="#design-principles">Design principles</a> ·
  <a href="#what-is-implemented">Implementation</a> ·
  <a href="#the-first-three-concepts">MVP concepts</a> ·
  <a href="#development">Development</a>
</p>

---

## The product

**PPD (Premium Presentation Design System) is a quality-first system for creating original, visually distinctive and genuinely editable presentations.**

It treats presentation creation as a design process—not a single prompt-to-slides operation. The intended workflow analyses the audience and evidence, shapes the narrative, establishes a visual identity, composes each slide for its message, curates authentic visual assets, produces native PowerPoint objects and inspects the exported result.

Most automated slide tools optimise for the speed of the first draft. PPD is being developed around a different objective: **the quality of the finished presentation**.

> **Design the argument. Direct the visuals. Inspect every slide.**

## The problem we are addressing

Automated decks can become visually interchangeable: repeated card grids, decorative icons, invented logos, default gradients, irrelevant synthetic imagery and flattened diagrams. They may be quick to generate, but users still have to repair the narrative, visual hierarchy, factual details and editability.

PPD's design system is built to make those decisions explicit and testable.

## Design principles

| Principle | PPD rule |
|---|---|
| Narrative before layout | Understand the audience, purpose, evidence and argument before composing slides. |
| Art direction before decoration | Establish a deck-specific identity: typography, colour, grid, image treatment and visual rhythm. |
| Meaning before ornament | Do not add icons, fake logos, gradients or floating shapes merely to fill space. |
| Authentic visuals first | Prefer relevant, rights-cleared real imagery. AI-generated imagery is disabled by default in the product direction. |
| Composition, not template-filling | Match the composition to the information and communication task. |
| Editable by design | Preserve important text, diagrams, charts and shapes as native PowerPoint objects wherever practical. |
| Review before delivery | Render, inspect, critique, correct and verify the artifact before approval. |

## What is implemented

**Repository status: pre-alpha.** The following capabilities exist in the current codebase; they are not claims about the complete product vision.

- A renderer-independent TypeScript slide specification.
- Deterministic validation for required content, unique element IDs, source references, image provenance, chart data and diagram relationships.
- Policy checks for AI-generated imagery, decorative icons and editability requirements.
- Explicit chart data status: verified or illustrative. Synthetic data produces a warning and must be labelled.
- Three JSON concept briefs: editorial opener, data story and technical architecture.
- A focused PptxGenJS proof renderer for those three concepts.
- Native PowerPoint text, shapes, editable bar elements, diagram nodes and connectors in the generated proof.
- CLI commands for validating briefs and generating the three-slide deck.
- Unit tests and a GitHub Actions workflow for repeatable checks.

### Not implemented yet

- AI-powered brief analysis, research or narrative generation.
- Image discovery, asset ingestion, provenance and licence-verification integrations.
- General-purpose automatic layout and composition generation.
- Arbitrary slide-spec rendering beyond the three proof compositions.
- General native chart and table generation.
- PDF export and cross-renderer fidelity verification.
- Rendered visual critique, anti-slop detection and automatic repair.
- Multi-agent design review and learned design preferences.

**PPD is not yet a complete presentation generator.** The current implementation establishes a small, executable foundation: structured slide specifications can be validated and rendered into an editable PowerPoint proof. The broader design-intelligence system remains planned work.

## The first three concepts

The first milestone focuses on three different composition problems instead of a large library of generic templates.

| Concept | What it demonstrates | Specification |
|---|---|---|
| **01 — Editorial opener** | Distinctive typography, hierarchy and restrained composition without synthetic hero imagery. | [01-cinematic-opener.json](examples/three-concepts/01-cinematic-opener.json) |
| **02 — Data storytelling** | A visual argument with explicit units, interpretation and data provenance. | [02-data-storytelling.json](examples/three-concepts/02-data-storytelling.json) |
| **03 — Technical architecture** | A process diagram with validated relationships and editable PowerPoint objects. | [03-technical-architecture.json](examples/three-concepts/03-technical-architecture.json) |

The data-storytelling example intentionally uses illustrative values. They are demonstration data, not measured industry statistics. The architecture example describes the target pipeline, not a claim that every subsystem is already implemented.

## Architecture

The long-term system uses a **shared structured slide specification** as its source of truth. Preview/PDF and native PowerPoint renderers should consume the same content and design decisions, reducing divergence between what was approved and what is delivered.

~~~mermaid
flowchart TD
  A[Brief, source material, data] --> B[Presentation intelligence]
  B --> C[Narrative specification]
  C --> D[Deck art direction]
  D --> E[Structured slide specification]
  E --> F[Asset research and curation]
  E --> G[Content-aware composition]
  F --> H[Preview and PPTX renderers]
  G --> H
  H --> I[Rendered inspection]
  I --> J{Quality gates pass?}
  J -- No --> K[Critique and repair]
  K --> G
  J -- Yes --> L[Verified output]
~~~

The current repository implements the slide specification, deterministic validation and a focused PowerPoint renderer. The other stages represent the target architecture. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Repository structure

~~~text
.
├── .github/                  # CI, issue templates and PR template
├── assets/                   # PPD visual identity
├── docs/                     # Vision, architecture, standards and roadmap
├── examples/three-concepts/  # Three structured slide briefs
├── src/
│   ├── cli/                  # Validate briefs and build the proof deck
│   ├── core/                 # Slide contract, validator and tests
│   ├── design/               # Initial design tokens
│   └── renderers/pptx/       # Focused editable PowerPoint renderer
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── package.json
~~~

## Development

### Requirements

- Node.js 20 or later
- npm

### Install

~~~bash
git clone https://github.com/jahwanthpulugujju-create/premium-presentation-design-system.git
cd premium-presentation-design-system
npm install
~~~

### Validate the concept briefs

~~~bash
npm run typecheck
npm test
npm run validate:examples
~~~

### Generate the editable PowerPoint proof

~~~bash
npm run build:demo
~~~

The command writes the three-slide deck to `artifacts/ppd-three-concept-proof.pptx`. The renderer currently supports the three explicit proof compositions; it does not yet perform AI-driven layout selection or arbitrary deck generation.

### Run all checks

~~~bash
npm run check
~~~

## Engineering and design standards

- [Product vision](docs/PRODUCT_VISION.md) — problem, audience and product principles.
- [Architecture](docs/ARCHITECTURE.md) — shared slide model and renderer boundaries.
- [Design quality standard](docs/DESIGN_QUALITY_STANDARD.md) — visual and content rules.
- [Design reference method](docs/DESIGN_REFERENCE_METHOD.md) — learn principles without copying protected expression.
- [MVP acceptance criteria](docs/MVP_ACCEPTANCE_CRITERIA.md) — requirements for the first three proof concepts.
- [Quality model](docs/QUALITY_MODEL.md) — evaluation dimensions and hard rejection rules.
- [Roadmap](docs/ROADMAP.md) — implementation status and milestones.
- [Implementation log](docs/IMPLEMENTATION_LOG.md) — development notes.

## Contributing

The project is early-stage. Contributions should improve design quality, editability, traceability or verification—not add decorative complexity. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Changes to slide output should include rendered evidence.

## Status

PPD is an independent, pre-alpha project. Implementation is progressing in small, verifiable increments. Roadmap items remain unchecked until working code and reviewable output exist.

## License

PPD is released under the [MIT License](LICENSE). Third-party assets, fonts and reference materials retain their own licences and terms.
