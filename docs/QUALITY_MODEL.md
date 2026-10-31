# Quality model

PPD should not treat a single model-generated score as proof that a presentation is excellent. The quality model combines hard release gates, task-specific evaluation and human review.

## Evaluation dimensions

Use a 0–4 scale for each dimension: 0 = absent or broken, 1 = weak, 2 = adequate with visible problems, 3 = strong, 4 = exceptional for the task.

| Dimension | What reviewers evaluate |
|---|---|
| Narrative and purpose | Clear audience, objective, argument, progression and ending. |
| Composition | Focal point, hierarchy, spatial balance, whitespace and content-aware layout. |
| Typography | Readability, hierarchy, line breaks, scale, alignment and consistency. |
| Evidence and accuracy | Traceable claims, correct units, honest uncertainty and accurate charts. |
| Visual authenticity | Relevant images, provenance, rights status and absence of synthetic filler. |
| Editability | Important text, diagrams, charts and tables are native editable objects. |
| Deck coherence | A consistent design identity with intentional variation and no monotonous repetition. |

Weights should be calibrated on real evaluation data, not treated as universal truths. The initial prototype should report dimension-level findings and avoid publishing a composite score until human reviewers have validated the rubric.

## Hard rejection rules

A deck cannot be approved while any of these conditions remain:

- A material claim or number is unsupported, misstated or contradicted by its source.
- A visual asset is restricted, untraceable where provenance is required, or presented deceptively.
- Required content is clipped, unreadable or missing.
- A chart uses invalid values, units or a misleading scale.
- Diagram relationships are broken or semantically inaccurate.
- The PowerPoint does not open or key objects are flattened despite an editability requirement.
- The exported file materially differs from the reviewed rendering.

## Review protocol

1. Evaluate each slide individually against its stated objective.
2. Evaluate the whole deck for narrative pacing, visual rhythm and consistency.
3. Run deterministic checks for structure, numeric validity, sources, contrast and geometry.
4. Render PPTX/PDF outputs and inspect at normal presentation size.
5. Run a critical review that actively searches for generic layouts, filler, repetition and unsupported claims.
6. Ask human reviewers to compare anonymised decks against the same brief.
7. Record edits and reasons so corrections can inform future iterations.

## What a score cannot prove

A high score cannot prove originality, factual truth, audience impact or legal rights by itself. Those require reference checks, source verification and human judgement. Benchmark performance should be measured with blind pairwise comparisons and the amount of manual correction required to reach an acceptable result.
