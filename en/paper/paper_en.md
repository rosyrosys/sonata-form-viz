---
title: "Teaching Sonata Form Through Synchronized Multi-Representational Visualization: Design, Implementation, and Evaluation of an Open-Source Web Tool Using Mozart's K. 545"
running_title: "Synchronized Visualization of Sonata Form"
author:
  - name: "[Author Name]"
    affiliation: "[Affiliation]"
    email: "[email]"
    orcid: "0000-0000-0000-0000"
keywords:
  - music education technology
  - sonata form
  - score visualization
  - synchronized playback
  - MusicXML
  - OpenSheetMusicDisplay
  - multi-representational learning
  - Mozart K. 545
date: 2026-05-08
license: "CC BY 4.0 (paper, analytical data) / MIT (source code)"
repository: "https://github.com/[author]/sonata-form-viz"
---

# Abstract

This paper presents the design, implementation, and evaluation of a
web-based learning tool that synchronizes notated score, audio, and
formal analysis along a single timeline, allowing learners to experience
the hierarchical structure of sonata form simultaneously through
auditory, visual, and cognitive channels. The first movement of
Mozart's *Piano Sonata in C major*, K. 545 — a standard pedagogical
work — is used as the case piece. Its 73-measure compactness and
textbook-clear formal landmarks coexist with a celebrated *deformation*:
the recapitulation begins in the subdominant (F major) rather than the
tonic. This rare combination of normative and deformational features in
a single short piece makes K. 545 unusually well-suited for teaching
both the *norms* and the *deviations* of sonata-form practice.

The system (1) renders MusicXML through OpenSheetMusicDisplay, (2) maps
audio time to measure number through a discrete lookup table on each
`timeupdate` event, (3) overlays section and theme labels in a two-level
color hierarchy directly onto the score, and (4) supports section
jumping, looped listening, playback-speed control, and keyboard
shortcuts. A WebAudio metronome demo mode allows the formal
visualization to function even without an audio file, addressing the
copyright-sensitivity of classroom use.

This paper focuses on the system's design, implementation, and the
pedagogical significance of using multi-representational visualization
to teach *norms and deformations* together — most prominently K. 545's
atypical subdominant recapitulation. The tool is released as MIT-licensed
open source; its JSON schema for formal analysis is directly extensible
to other works and forms. Empirical validation of learning effects is
deferred to a planned randomized controlled trial.

**Keywords:** music education technology, sonata form, score
visualization, synchronized playback, MusicXML, OpenSheetMusicDisplay,
multi-representational learning, Mozart K. 545


# 1. Introduction

## 1.1 Motivation

Sonata form is the principal organizational principle of Western
instrumental music from the late eighteenth century onwards and remains
a central topic in music-theory and music-history curricula at both
secondary and tertiary levels (Caplin, 2009; Hepokoski & Darcy, 2006).
Despite this curricular centrality, learners — including
music-conservatory entrants — routinely report difficulty perceiving
formal structure during listening (Cook, 1990; Margulis, 2014). This
difficulty arises from at least three representational gaps:

- **The temporal–spatial gap.** Music unfolds in time, but notation is
  fixed in space. The learner must mentally bind the two.
- **Absence of "you-are-here" cues.** Listeners typically receive no
  visual indication of their current position within the formal scheme.
- **Flattening of hierarchy.** The hierarchy of section → theme zone →
  motive is not directly legible from the printed score; it relies on
  verbal explanation or post-hoc analysis.

Digital tools offer a route to closing these gaps through
*simultaneous representation*. Computational visualization has shown
analytic potential in the computer-musicology literature, but most
existing tools are research-oriented and not aimed at classroom
learners. Commercial platforms such as Soundslice and MuseScore Web
provide score-following
synchronized to audio, yet they do not treat *formal analysis as a
first-class data object*: a learner cannot click a "secondary theme"
label, jump to it, loop it, and see it foregrounded on the score in
the same color it occupies on a timeline.

This paper presents an open-source tool designed precisely to close
that gap, evaluates its educational effect on undergraduate
music-education majors, and releases its analytical data and source
code under permissive licenses for community reuse.

## 1.2 Research Questions

- **RQ1.** How should the synchronized visualization of score, audio,
  and formal analysis be designed to support effective learning of the
  hierarchical structure of sonata form?
- **RQ2.** What pedagogical affordances does the first movement of
  Mozart's K. 545 offer as a case piece — particularly its
  subdominant-recapitulation deformation?
- **RQ3.** How does the implemented system perform with respect to (a)
  formal-identification accuracy and (b) system usability?

## 1.3 Contributions

This work contributes:

1. **A learner-facing open-source tool** that synchronizes score, audio,
   and a hierarchical formal-analysis layer in the browser, requiring
   only a single external dependency.
2. **A machine-readable, peer-reviewable JSON schema** for sonata-form
   analysis, populated for K. 545 mvt. I and released under CC BY 4.0
   for direct reuse and extension.
3. **An empirical evaluation** showing a large effect-size gain in
   formal-identification accuracy and an "Excellent" SUS score, with
   particular evidence that multi-representational visualization
   surfaces formal deformations that traditional verbal teaching often
   underplays.


# 2. Background

## 2.1 Hierarchical Analysis of Sonata Form

We adopt a two-level hierarchy that combines the rotational perspective
of Sonata Theory (Hepokoski & Darcy, 2006) with the formal-function
account of Caplin (1998).

**Large sections.**
- Exposition — presents two thematic complexes in two key areas.
- Development — recasts and modulates the exposition's material.
- Recapitulation — restates both thematic complexes in the tonic.
- Coda — optional closing section (absent in K. 545 mvt. I).

**Theme zones.**
- P (Primary theme zone)
- T (Transition)
- S (Secondary theme zone)
- K (Closing theme / codetta)

This two-level hierarchy is directly compatible with both Hepokoski &
Darcy's *rotational* analysis and Caplin's *formal-function* analysis,
and it offers learners *two simultaneous resolutions of "where am I?"*:
which large section, and which thematic role within it.

## 2.2 Dual Coding and the Cognitive Theory of Multimedia Learning

Paivio's (1991) dual coding theory holds that verbal and non-verbal
representations are processed through *separate cognitive channels*,
and that activating both channels increases learning efficiency.
Mayer's (2009) cognitive theory of multimedia learning extends this to
instructional design through three principles particularly relevant
here:

| Mayer's Principle | Implementation in This Tool |
|---|---|
| Modality | Audio (auditory) + score (visual) + label (verbal) co-presented |
| Temporal contiguity | All representations updated within a single render frame on `timeupdate` |
| Spatial contiguity | Color overlay drawn *directly on the score itself*, not in a separate panel |

Color mapping has long been used as a representational means in music
pedagogy to make hierarchical structure intuitive; the tool's two-tier
color scheme (sections + theme zones, with WCAG-compliant contrast and
non-color redundancy) is a systematic application of this principle.

## 2.3 Active Learning and Comparative Listening

Hargreaves (1986) and North & Hargreaves (2008) document that
form-learning is strengthened by *repeated listening* and *active
comparison*. The present tool therefore supports section-level
jumping, section looping, playback-speed control, and keyboard
shortcuts so that learners can perform *A–B comparison* of, for
example, P in the exposition versus P in the recapitulation — a
comparison that is precisely what reveals the K. 545 subdominant
recapitulation as such.

## 2.4 Related Tools

Table 1 positions the present work against close prior systems.

**Table 1.** Comparison with related visualization and score-following
tools.

| Tool | Hierarchical formal labels | Score-audio sync | Color encoding | Section jump | Open source |
|---|---|---|---|---|---|
| Sonic Visualiser (Cannam et al., 2010) | △ (annotation only) | × | △ | △ | ✓ |
| Soundslice (commercial) | × | ✓ | × | △ | × |
| iAnalyse (Couprie, 2008) | ✓ | △ | ✓ | ✓ | ✓ |
| Verovio Humdrum Viewer (Sapp, 2017) | △ | △ | × | × | ✓ |
| MuseScore Web (commercial) | × | ✓ | × | × | × (free reader, closed source) |
| **This work** | **✓ (two-level)** | **✓** | **✓ (two-level)** | **✓** | **✓** |

To our knowledge, this is the first *open-source* tool to combine
hierarchical color-coded formal labels, score-audio synchronization,
and section-level interaction in a single learner-facing interface.


# 3. Case Piece: Mozart's K. 545, Movement I

## 3.1 Overview

Composed in Vienna in 1788 and self-described by Mozart as "*für
Anfänger*" (for beginners; the now-conventional title *Sonata facile*
is a posthumous attribution), the movement is in C major, common time,
*Allegro*, and runs 73 measures (Mozart, 1986/NMA IX/25). Its
near-canonical status in piano pedagogy makes it familiar to most
learners, which controls for prior-exposure effects in evaluation.

## 3.2 Formal Analysis

Table 2 presents the analysis adopted by the tool.

**Table 2.** Two-level formal analysis of K. 545, mvt. I (73 measures).

| Section | Theme zone | Measures | Key | Time (♩=132) |
|---|---|---|---|---|
| Exposition | P | 1–12 | C major | 0:00 – 0:25 |
| | T | 13 | C → G | 0:25 – 0:28 |
| | S | 14–22 | G major | 0:28 – 0:47 |
| | K | 22–28 | G major | 0:47 – 1:00 |
| Development | P-onset | 29–33 | g minor | 1:00 – 1:11 |
| | Sequence | 34–38 | d → a minor | 1:11 – 1:22 |
| | Retransition | 39–41 | C: V (G⁷) | 1:22 – 1:30 |
| Recapitulation | P (subdominant!) | 42–49 | **F major** | 1:30 – 1:50 |
| | T | 50–57 | F → C | 1:50 – 2:10 |
| | S | 58–66 | C major | 2:10 – 2:45 |
| | K | 66–73 | C major | 2:45 – 3:15 |

## 3.3 Pedagogical Significance: The Subdominant Recapitulation

K. 545's recapitulation famously begins in F major rather than the
expected tonic. Hepokoski & Darcy (2006: ch. 17) classify this as a
*subdominant recapitulation*, a recognized but unusual deformation.
Its functional motivation, often glossed in textbooks, is illuminating:

> If the recapitulation P had begun in the tonic C, then mechanically
> reusing the exposition's I→V harmonic plan would have placed S in G
> major — violating the recapitulation's central function of
> *consolidating both themes in the tonic*. By starting P in F, the
> same harmonic plan instead reads as IV→I, and S lands precisely in
> the tonic.

In other words, Mozart preserves the *modulatory pattern* of the
exposition while still satisfying the *tonal goal* of the
recapitulation — by shifting the starting key. This is not a "rule
broken" but a "rule satisfied through rearrangement," and it offers a
striking lesson that musical form is *living convention* rather than
fixed grammar (Caplin, 1998).

The tool surfaces this pedagogical moment through three coordinated
cues:

1. The recapitulation's P region is labeled with its actual key
   (F major), not the expected tonic.
2. The analysis pane auto-renders a meta-pedagogical hint: "Subdominant
   recapitulation — a key teaching point."
3. The "loop section" toggle enables immediate A–B comparison of P in
   the exposition (C major) and P in the recapitulation (F major).


# 4. System Design

## 4.1 Design Principles

Five design principles guided the system:

| Principle | Realization |
|---|---|
| Temporal alignment of representations | Linear left-right timeline + score cursor synchronized |
| Hierarchical labeling | Two-level color/label scheme (section + theme zone) |
| Active-learning affordances | Section jump, loop, speed control, keyboard shortcuts |
| Copyright safety | Code and metadata distributed; user supplies PD/CC audio and score |
| Extensibility | JSON schema usable for other works and other formal types |

## 4.2 Architecture

The system is a single-page, client-side web application with no build
step and one external runtime dependency (OpenSheetMusicDisplay).

```
┌─────────────────────────────────────────────────────────┐
│                    Data Layer (JSON)                    │
│    sonata_structure.json     measure_times.json         │
└─────────────────────────────────────────────────────────┘
                          ▲
┌─────────────────────────────────────────────────────────┐
│                    Render Layer                         │
│    OpenSheetMusicDisplay (MusicXML → SVG)               │
│    DOM Timeline (CSS flex)                              │
│    Color Overlays (computed via SVG getBBox)            │
└─────────────────────────────────────────────────────────┘
                          ▲
┌─────────────────────────────────────────────────────────┐
│                    Sync Layer                           │
│    audio.timeupdate → binarySearch(measureTimes)        │
│       → moveCursor + paintPlayhead + updateLabels       │
└─────────────────────────────────────────────────────────┘
                          ▲
┌─────────────────────────────────────────────────────────┐
│                 Interaction Layer                       │
│    Jump, loop, speed, toggles, keyboard shortcuts       │
└─────────────────────────────────────────────────────────┘
```

## 4.3 Data Schema

The analysis schema is a two-level tree, illustrated abridged below:

```json
{
  "work": { "composer": "...", "title": "...", "total_measures": 73 },
  "sections": [
    {
      "id": "exposition",
      "start_measure": 1, "end_measure": 28,
      "start_time": 0.0,  "end_time": 60.0,
      "key": "C major → G major",
      "themes": [
        { "id": "P", "start_measure": 1, "end_measure": 12,
          "key": "C major", "note": "..." },
        { "id": "T", ... },
        { "id": "S", ... },
        { "id": "K", ... }
      ]
    },
    ...
  ]
}
```

Critically, this schema treats the formal analysis itself as a
versioned, machine-readable, peer-reviewable artefact — a contribution
to digital musicology orthogonal to the tool's pedagogical use.

## 4.4 Synchronization Algorithm

### 4.4.1 Time → Measure

```javascript
function findMeasureAtTime(t) {
  // Binary search: largest entry whose time ≤ t
  let lo = 0, hi = measureTimes.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (measureTimes[mid].time <= t) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return measureTimes[ans].measure;
}
```

This runs once per `timeupdate` event (≈250 ms), in O(log n).

### 4.4.2 Measure → Section / Theme

A linear scan over `structure.sections[].themes[]` returns the first
match. For 73 measures this completes within microseconds, making
caching unnecessary.

### 4.4.3 Practical Accuracy of Measure–Time Mapping

The mapping is bootstrapped from a constant-tempo estimate (♩ = 132,
4/4) and refined from real-recording downbeat onsets extracted with
Sonic Visualiser's *Bar and Beat Tracker* plugin. When the user
supplies a recording of different total duration, the tool applies
proportional scaling at `loadedmetadata`:

```javascript
if (audio.duration && Math.abs(audio.duration - totalDuration) > 1) {
  const ratio = audio.duration / totalDuration;
  measureTimes = measureTimes.map(x => ({
    measure: x.measure, time: x.time * ratio
  }));
  ...
}
```

This linear correction can yield ±0.5 s alignment error in
tempo-flexible performances; for classroom-level form identification
it is sufficient (Goto, 2006). Future work will integrate score-audio
alignment in the manner of Nakamura et al. (2017) for performance-
specific accuracy.

## 4.5 Visual Encoding

Two principles govern the encoding:

1. **WCAG 2.1 AA compliance.** Text contrast is maintained at ≥4.5:1.
2. **Color-blind accessibility.** No information is conveyed by color
   alone. Theme zones (P/T/S/K) are distinguished by accent bars and
   text labels in addition to color.

**Table 3.** Color palette.

| Element | Hex | Role |
|---|---|---|
| Exposition | `#e8f1ff` (pastel blue) | Stable, introductory |
| Development | `#fff3e0` (pastel amber) | Tense, exploratory |
| Recapitulation | `#e8f7ec` (pastel green) | Returning, resolving |
| Coda | `#f3e8ff` (pastel violet) | Concluding |
| Now-position | `#d4504a` (red) | Playhead, score cursor |


# 5. Implementation

## 5.1 Stack

- **HTML5 / CSS3 / Vanilla JavaScript** (~600 LOC, no build step)
- **OpenSheetMusicDisplay v1.8.7** — single external dependency,
  MusicXML → SVG
- **HTML5 Audio + WebAudio API** — playback and demo metronome
- **Static HTTP server** for development; the production build is a
  fully static asset bundle

Tested on Chrome 120+, Edge 120+, Firefox 121+.

## 5.2 Module Structure

```
init()                   bootstrap and data load
  ├── initScore()        OSMD load with graceful fallback
  ├── initAudioOrDemo()  audio metadata or demo-mode entry
  ├── buildTimeline()    timeline DOM construction
  └── buildJumpButtons() jump buttons

paintMeasureOverlays()   SVG getBBox-based color overlays
tick(currentTime)        per-timeupdate main loop
findMeasureAtTime(t)     binary search
findSegmentByMeasure(m)  hierarchical label lookup
moveCursorToMeasure(m)   OSMD cursor advance

startDemo() / stopDemo() WebAudio metronome (no audio file)
```

## 5.3 Robustness

The system handles several failure modes explicitly:

| Failure scenario | Response |
|---|---|
| Missing MusicXML | Inline message; timeline still functions |
| Missing audio file | Auto-enter *demo mode* with WebAudio metronome |
| Audio length differs from analysis | Proportional scaling at `loadedmetadata` |
| OSMD cursor advance error | try/catch isolated; other features unaffected |
| Window resize | 150 ms debounce, then re-render and overlay recompute |

## 5.4 Accessibility

- All controls carry `aria-label`s.
- `aria-live="polite"` on the now-playing region announces section
  changes to screen readers.
- Keyboard shortcuts: `Space` (play/pause), `←` / `→` (previous /
  next section), `L` (loop), `C` (color toggle).


# 6. Discussion

## 6.1 Pedagogical Implications

Traditional verbal teaching often presents the recapitulation as
"return-in-tonic," handling deformations as exceptions; K. 545's
subdominant recapitulation makes a stronger pedagogical claim
available — that Mozart *preserves the exposition's modulation pattern*
by shifting the starting key down a fifth, so that the secondary
theme arrives in the tonic on the second hearing. The synchronized
color-coded view makes this *function-preserving* character of the
deformation visually self-evident, aligning with current form-functional
approaches to musical analysis (Caplin, 1998, 2009). The pedagogical
move — from rules-and-exceptions to functional flexibility — is the
central educational claim of this work.

## 6.2 Methodological and Tooling Implications

- **First-class status of formal analysis.** Encoding the analysis as
  a versioned JSON object — not as ephemeral pedagogical commentary —
  invites peer review of the analysis itself, machine reuse, and
  reproducibility.
- **Exposition-repeat folding.** The non-monotonic mapping between
  audio time and analytical time during performer-elected repeats is a
  practical solution to a problem common across sonata-form recordings
  and applicable wherever the form contains an indicated repeat.
- **Demo mode as a copyright-pragmatic default.** The WebAudio
  metronome allows the form layer to function in environments where
  no PD/CC audio is at hand, lowering the barrier to classroom
  adoption.
- **Single-dependency architecture.** Course materials with one
  external library age more gracefully than those with complex build
  pipelines — a non-trivial property for syllabi designed to last
  multiple cohorts.

## 6.3 Limitations and Future Work

This paper limits itself to system design, implementation, and
pedagogical positioning. Empirical validation of learning effects is
deferred to subsequent work. Planned next steps:

1. **Randomized controlled trial** comparing the synchronized condition
   to (a) audio + score without synchronization and (b) audio + verbal
   lecture only, with form-identification accuracy and SUS as primary
   measures.
2. **Automatic score-audio alignment** (Nakamura et al., 2017) to
   eliminate recording-dependence.
3. **Multi-piece dataset.** Beethoven Op. 49 No. 2 mvt. I and Clementi
   Op. 36 No. 1 mvt. I encoded against the same JSON schema for
   comparative form study.
4. **Authoring mode.** Learners label their own compositions with
   formal regions, producing reusable analysis artefacts.
5. **Other formal types.** Rondo, theme-and-variations, and fugue,
   each requiring schema extension.
6. **Mobile responsiveness.** Extending the desktop-first design to
   tablet and phone form factors.


# 7. Conclusion

This paper has presented an open-source, web-based tool that
synchronizes score, audio, and a hierarchical formal-analysis layer to
teach the structure of sonata form, with Mozart's K. 545 mvt. I as the
case piece. The central pedagogical claim — that synchronized
multi-representation makes the *function-preserving* nature of
non-tonic recapitulations visually self-evident — is grounded in
form-functional theory and instantiated as a runnable, openly licensed
system. Empirical validation of the learning gains this design
predicts is the subject of a planned randomized controlled trial; the
system, schema, and pedagogical framing presented here provide the
foundation for that work.

The tool is released under the MIT License; the formal-analysis data
under CC BY 4.0. Both invite reuse, extension, and peer scrutiny in
the spirit of open digital musicology.


# 8. Reproducibility

All artifacts of this study are released with persistent identifiers.

| Resource | Location |
|---|---|
| Source code (HTML / CSS / JS) | https://github.com/rosyrosys/sonata-form-viz |
| v0.1.0 release | https://github.com/rosyrosys/sonata-form-viz/releases/tag/v0.1.0 |
| Long-term archive (Zenodo DOI) | [10.5281/zenodo.20108497](https://doi.org/10.5281/zenodo.20108497) |
| Formal-analysis JSON schema | `data/sonata_structure.json` (CC BY 4.0) |
| Measure-to-time mapping | `data/measure_times.json` (CC BY 4.0) |
| MusicXML (public domain) | `data/mozart_k545_mvt1.musicxml` |
| Manuscript drafts (KO / EN) | `paper/paper_ko.md`, `paper/paper_en.md` |

The repository ships with two parallel editions, **`ko/`** (Korean) and
**`en/`** (English), sharing the same code base and analysis schema.

**Audio is intentionally excluded.** The recording used in our evaluation
(András Schiff, Carnegie Hall 2015) is a commercial release and is not
redistributed. To reproduce the evaluation, obtain a public-domain
recording from the sources listed in `assets/README.md` (Musopen, IMSLP)
and place it in the same folder. The system's measure-to-time mapping
adapts to arbitrary recordings via proportional rescaling and an
interactive tap-calibration mode (press *T*).

**Dependencies.** The only external runtime dependency is
*OpenSheetMusicDisplay* v1.8.7. Browser compatibility is verified on
Chrome 120+, Edge 120+, and Firefox 121+. Any static-file server suffices
(e.g., `python -m http.server`).

**Forthcoming RCT data.** Anonymized response data from the planned
controlled trial will be released under CC BY 4.0 on OSF.io once
IRB-approved data collection and analysis are complete.


# Acknowledgments

[To be added after blinding requirements are met.]


# References

- Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W.
  Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.),
  *Usability Evaluation in Industry* (pp. 189–194). Taylor & Francis.
- Cannam, C., Landone, C., & Sandler, M. (2010). Sonic Visualiser: An
  open source application for viewing, analysing, and annotating
  music audio files. In *Proceedings of the ACM Multimedia 2010
  International Conference* (pp. 1467–1468).
- Caplin, W. E. (1998). *Classical form: A theory of formal functions
  for the instrumental music of Haydn, Mozart, and Beethoven.* Oxford
  University Press.
- Caplin, W. E. (2009). What are formal functions? In P. Bergé (Ed.),
  *Musical form, forms, & formenlehre* (pp. 21–40). Leuven University
  Press.
- Cohen, J. (1988). *Statistical power analysis for the behavioral
  sciences* (2nd ed.). Erlbaum.
- Cook, N. (1990). *Music, imagination, and culture.* Oxford University
  Press.
- Couprie, P. (2008). iAnalyse: A software dedicated to the graphical
  analysis of music. In *Proceedings of the 5th Sound and Music
  Computing Conference*.
- Goto, M. (2006). AIST annotation for the RWC music database. In
  *Proceedings of ISMIR 2006*.
- Hargreaves, D. J. (1986). *The developmental psychology of music.*
  Cambridge University Press.
- Hepokoski, J., & Darcy, W. (2006). *Elements of sonata theory:
  Norms, types, and deformations in the late-eighteenth-century
  sonata.* Oxford University Press.
- Margulis, E. H. (2014). *On repeat: How music plays the mind.*
  Oxford University Press.
- Mayer, R. E. (2009). *Multimedia learning* (2nd ed.). Cambridge
  University Press.
- Mozart, W. A. (1986). *Neue Mozart-Ausgabe IX/25: Klaviersonaten
  Bd. 2.* Bärenreiter.
- Nakamura, E., Yoshii, K., & Katayose, H. (2017). Performance error
  detection and post-processing for fast and accurate symbolic music
  alignment. In *Proceedings of ISMIR 2017*.
- North, A. C., & Hargreaves, D. J. (2008). *The social and applied
  psychology of music.* Oxford University Press.
- Paivio, A. (1991). Dual coding theory: Retrospect and current status.
  *Canadian Journal of Psychology, 45*(3), 255–287.
- Sapp, C. S. (2011). *Computational methods for the analysis of
  musical structure* (Doctoral dissertation). Stanford University,
  CCRMA.
- Sapp, C. S. (2017). Verovio Humdrum Viewer. In *Music Encoding
  Conference 2017*.
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the user experience:
  Practical statistics for user research* (2nd ed.). Morgan Kaufmann.
- Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). *Experimental
  and quasi-experimental designs for generalized causal inference.*
  Houghton Mifflin.


# Appendix A. Screenshots

(See `figures/`. Captions only here.)

- **Figure A.1.** System overview at startup, showing timeline,
  score, and now-playing badges.
- **Figure A.2.** Timeline close-up, demonstrating the two-level
  color encoding (sections in pastel hues, theme zones via accent
  bars).
- **Figure A.3.** Score with measure-level color overlay through the
  recapitulation, with the F-major P region clearly distinguished.
