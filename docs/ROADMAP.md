# Roadmap

Statuses describe working repository code, not planned ambition.

## M0 — Definition (complete)

- [x] Product proposition, audience and scope.
- [x] Anti-slop and authenticity principles.
- [x] Architecture direction and three MVP concepts.

## M1 — Specification foundation (complete)

- [x] Typed, renderer-independent slide specification.
- [x] Deterministic validation of required fields and element identifiers.
- [x] Source-reference and image provenance checks.
- [x] Chart data status, numeric values and source requirements.
- [x] Diagram node and relationship validation.
- [x] Unit tests for valid and invalid specifications.
- [x] CLI validation of the three concept briefs.

## M2 — First rendering proof (in progress)

- [x] Generate a 3-slide editable PowerPoint proof from JSON briefs.
- [x] Use native text, shapes, custom bar elements, diagram nodes and connectors.
- [x] Render and commit PNG previews for visual review.
- [ ] Generalise composition logic beyond the three proof concepts.
- [ ] Add image slots backed by source and rights metadata.
- [ ] Add automated geometry/overflow checks and slide-level preview comparison.

## M3 — Editable PowerPoint renderer (in progress)

- [x] Establish PptxGenJS integration and export a working PPTX.
- [x] Preserve core text and diagram elements as editable PowerPoint objects.
- [ ] Support arbitrary slide specs and more layout archetypes.
- [ ] Add native PowerPoint charts and tables for supported chart/table forms.
- [ ] Add export inspection and compatibility tests across PowerPoint/LibreOffice.

## M4 — Quality loop (planned)

- [ ] Deterministic geometry, overflow and contrast checks.
- [ ] Repetition and similarity checks across a complete deck.
- [ ] Claim-to-source and asset-to-licence consistency checks.
- [ ] Rendered critique and repair cycle.
- [ ] Blind human evaluation against comparable tools.

## M5 — Deck-level intelligence (planned)

- [ ] Narrative continuity and pacing engine.
- [ ] Deck DNA and design memory.
- [ ] Asset search, curation, provenance and rights workflow.
- [ ] Specialist review workflow and correction dataset.
- [ ] General presentation generation beyond the initial proof concepts.
