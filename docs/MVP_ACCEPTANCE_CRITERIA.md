# MVP acceptance criteria

The first PPD proof is limited to three slide concepts. The current sample deck demonstrates basic editable output; it does not yet meet the full release standard below.

## Concept 01 — Editorial opener

**Goal:** Demonstrate disciplined art direction and typographic hierarchy without depending on synthetic hero imagery.

Acceptance criteria:

- One clear message and one primary focal point.
- Strong headline hierarchy and deliberate whitespace.
- No decorative icon set, invented logo, arbitrary gradient or filler shape.
- Main headline and supporting labels remain editable in PowerPoint.
- Optional photography has a recorded source and usage-rights status.

## Concept 02 — Data storytelling

**Goal:** Turn evidence into a visual argument rather than a generic dashboard card.

Acceptance criteria:

- Every quantitative claim has a source reference, date/period and unit.
- Chart scales and labels accurately represent the underlying values.
- Illustrative values are visibly identified as synthetic and cannot be mistaken for observed data.
- An annotation explains why the evidence matters.
- Chart elements are native/editable where the chart form supports it.
- Placeholder or unverified numbers are not allowed in a presentation marked final.

## Concept 03 — Technical architecture

**Goal:** Communicate a complex system through a precise, readable and editable diagram.

Acceptance criteria:

- Every node and relationship is represented in the source specification.
- Every connector endpoint resolves to a declared node; cycles are rejected or intentionally supported.
- Branching paths and convergence are laid out without connector collisions.
- Diagram labels, nodes and connectors remain editable PowerPoint objects.
- The diagram is validated against the implemented system description before publication.

## Shared release gate

A concept is not considered production-ready until:

1. Its source specification passes deterministic validation.
2. The rendered slide has been visually inspected at presentation size.
3. Content, numbers and sources have been verified.
4. No critical overflow, clipping, unreadable text or accidental overlap remains.
5. The PPTX opens and important elements can be edited.
6. The PDF export is checked against the approved preview.
7. A real preview and sample output are available for review.

The current three-slide proof meets only part of this gate. It is an implementation milestone, not a claim that all release criteria are satisfied.
