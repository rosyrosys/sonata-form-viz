# Analysis Template + Paper §6 Draft Skeleton

After both expert sessions are complete and transcripts ready:
1. **Score SUS** for each expert (see Worksheet A below).
2. **Code interview transcripts** thematically (Worksheet B).
3. **Compile design recommendations** (Worksheet C).
4. **Draft §6 of the manuscript** using the template at the bottom.

---

## Worksheet A — SUS scoring

| | Expert A | Expert B | Mean |
|---|---|---|---|
| Item 1 (raw → converted) | __ → __ | __ → __ | |
| Item 2 (raw → converted) | __ → __ | __ → __ | |
| Item 3 (raw → converted) | __ → __ | __ → __ | |
| Item 4 (raw → converted) | __ → __ | __ → __ | |
| Item 5 (raw → converted) | __ → __ | __ → __ | |
| Item 6 (raw → converted) | __ → __ | __ → __ | |
| Item 7 (raw → converted) | __ → __ | __ → __ | |
| Item 8 (raw → converted) | __ → __ | __ → __ | |
| Item 9 (raw → converted) | __ → __ | __ → __ | |
| Item 10 (raw → converted) | __ → __ | __ → __ | |
| **Σ converted** | __ | __ | |
| **SUS (Σ × 2.5)** | __ / 100 | __ / 100 | __ / 100 |

Scoring rule reminder (from file 04):
- Odd items: converted = raw − 1
- Even items: converted = 5 − raw

---

## Worksheet B — Thematic analysis (Braun & Clarke 2006)

### Step 1: Familiarisation

Read both transcripts through once without coding. Make
*impressionistic* notes:

**Expert A overall impression:**
> [free text]

**Expert B overall impression:**
> [free text]

### Step 2: Generate initial codes

Go through each transcript line-by-line. For each phrase that
addresses pedagogy, affordance, misconception, or design suggestion,
assign a short *initial code* (a few words).

Aim for 15–30 initial codes per transcript. Examples of code labels:

- `affordance_color_useful`
- `affordance_loop_critical`
- `misconception_color_overreliance`
- `misconception_wrong_key_framing`
- `design_request_annotation_mode`
- `design_request_teacher_view`
- `pedagogy_function_preserved_clear`
- `pedagogy_function_preserved_unclear`

Table (one row per code):

| Initial code | Expert | Excerpt (verbatim) | Source minute |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Step 3: Search for themes

Group the initial codes into 4–6 candidate themes. Themes are broader
than codes — they capture *patterns* in the data.

Example theme structure (use as starting point, not as constraint):

| Theme | Subsumed codes | Notes |
|---|---|---|
| **T1. Function-preserving claim lands** | `pedagogy_function_preserved_clear`, ... | Did both experts agree the I→V / IV→I parallel was visible? |
| **T2. Risks of color over-reliance** | `misconception_color_overreliance`, ... | What do experts foresee students might misunderstand? |
| **T3. Single-work depth justified** | from Q5 responses | How do experts position one work vs many? |
| **T4. Missing affordances** | `design_request_*` codes | What's not there but should be? |
| **T5. RCT design recommendations** | from Q6 responses | What variables should the next study measure/control? |

### Step 4: Review and define themes

For each theme:
- Two-sentence definition.
- 2–4 representative quotes (verbatim, with Expert label).
- Whether the theme is *shared* by both experts or *single-source*.

### Step 5: Write up

Use the §6 draft skeleton below.

---

## Worksheet C — Design recommendations

Extract every concrete design suggestion from both transcripts.

| # | Recommendation | Source (Expert A/B/both) | Action |
|---|---|---|---|
| 1 | [e.g. "Add annotation/memo mode for student notes on measures"] | A | Future-work in §6.3 |
| 2 | [e.g. "Soften auto-commentary wording to less definitive"] | both | Implement before submission |
| 3 | ... | | |
| 4 | ... | | |

For each: decide whether to implement *before submission* (small UI
changes) or record as *future work* in §6.3.

---

## Paper §6 Draft Skeleton

Copy the following structure into `paper_en.md` (and bilingual) once
data is in. Each `[FILL]` is a placeholder.

```markdown
# 6. Preliminary Expert Review

Empirical validation of the tool's pedagogical claims through a
full randomized controlled trial is reserved for follow-up work
(see §6.3 / 6.4). As a *preliminary* validation, we conducted
two structured expert-review sessions with music-education
specialists, following the standard cognitive-walkthrough
methodology (Wharton et al., 1994) augmented with the System
Usability Scale (Brooke, 1996) and a semi-structured interview.

## 6.1 Method

Two domain experts (Expert A: [FILL anonymized one-line
background], Expert B: [FILL]) participated in individual
60-minute sessions. Each session comprised (1) 10 minutes of
self-exploration of the tool, (2) a 30-minute structured walk-
through of the §5 classroom lesson plan with the expert acting
as the teacher, (3) the 10-item SUS, and (4) a 15-minute
semi-structured interview covering pedagogical fidelity, affordance
value, perceived risks of student misconception, missing
affordances, single-work depth versus multi-piece breadth, and
recommendations for the planned RCT.

Interview audio was transcribed by the author and analysed using
the thematic analysis approach of Braun and Clarke (2006). The
SUS items were translated to Korean by the author following
Brooke's (1996) original wording; expert participants reviewed
the Korean phrasing before administration for any ambiguities.
The study was treated as expert evaluation rather than
human-subjects research; consequently no formal IRB approval was
required by the host institution, though both experts gave written
informed consent for anonymous reporting and audio recording.

## 6.2 SUS results

**Table 4.** SUS scores for the two expert reviewers.

| | Expert A | Expert B | Mean |
|---|---|---|---|
| SUS score (0–100) | [FILL] | [FILL] | [FILL] |

[FILL: 1–2 sentence interpretation. *Avoid* citing the
"industry mean" framing — expert SUS distributions differ from
learner distributions. Report the raw scores and note that they
are reported only as one input among several. e.g., "Both raw
scores fell in the [range] band; we report them as one of
several inputs, recognising that SUS norms derived from learner
samples may not transfer to an expert-evaluator sample."]

## 6.3 Themes from the interviews

The interview transcripts yielded [FILL n] themes through
inductive coding.

### 6.3.1 [Theme 1 title, e.g. "Function-preserving framing lands"]

[FILL: 2–4 sentences with verbatim quote from Expert A or B,
or both. Quote format: > "[quote]" — Expert A.]

### 6.3.2 [Theme 2 title]

[FILL]

### 6.3.3 [Theme 3 title]

[FILL]

### 6.3.4 [Theme 4 title — design recommendations summary]

[FILL: synthesise Worksheet C. Distinguish recommendations
implemented before submission from those recorded as future
work in §6.4 (which becomes the new "Limitations and Future
Work" — old §6.3 renumbered).]

## 6.4 Implications for the planned RCT

The expert review yielded three concrete refinements to the
planned RCT design (originally outlined in the previous §6.3):

1. [FILL: e.g. "Add a confidence-rating measure alongside
   form-identification accuracy, per Expert [X]'s
   recommendation that ..."]
2. [FILL]
3. [FILL]

These refinements will be incorporated into the trial protocol
prior to IRB submission and pre-registration on OSF.io.

## 6.5 Limitations of the expert review

A two-expert sample is informative but not representative; the
findings reported here function as *design-stage validation*
rather than as a substitute for the planned learner-facing RCT.
Expert evaluation also captures professional judgment about
*projected* student experience, not actual student experience.
The themes reported in §6.3 should therefore be read as
hypotheses to be tested in the RCT rather than as confirmed
findings about learner outcomes.
```

---

## Notes on writing §6

- **Word budget:** §6 should add ~600–900 words to the manuscript.
  Combined with the trimmed abstract (201) and trimmed §8 (165),
  the manuscript total will still be well within TISMIR's 8,000-word
  limit (current ≈ 6,300 + ~700 new = ~7,000).

- **Renumbering:** the existing §6.3 "Limitations and Future Work"
  becomes §6.4 *or* §7. Decide once §6 content is written.

- **Author voice:** keep the "We" voice consistent with the rest of
  the manuscript. Even though there's only one author, "We" is
  conventional in academic prose and is what we use elsewhere.

- **What NOT to claim:** do *not* claim the expert SUS reflects
  learner SUS. Do *not* claim the qualitative findings generalise.
  Do *not* over-interpret a small sample. The whole section's
  framing is *preliminary expert review*, and that humility is what
  makes it a credible addition rather than over-reach.
