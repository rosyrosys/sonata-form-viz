# Cover Letter Templates (English)

> Usage:
> - The base template plus venue-specific paragraphs are listed below.
> - Fill in `[brackets]` before submitting.
> - Drop one venue-specific paragraph into the `[Body]` slot.

---

## Base template

```
[Author name]
[Affiliation, position]
[Address]
[Email]
[ORCID]

[Month] [Day], 2026

Dear Editor,
[Journal name] Editorial Board

Re: Manuscript submission — "Score, Audio, and Form-Analysis
Synchronized Visualization: A Pedagogical Tool with Mozart's Piano
Sonata K. 545, Mvt. I as Case Study"

I am pleased to submit the enclosed manuscript for consideration by
*[Journal name]*. The work designs, implements, and evaluates a
web-based learning tool that synchronizes a notated score, audio, and
formal analysis along a single timeline, allowing learners to experience
the hierarchical structure of sonata form simultaneously through
auditory, visual, and cognitive channels.

[Body — venue-specific paragraph]

This manuscript has not been submitted to any other journal and no
portion of it has been published elsewhere. All authors have approved
the submission and there are no conflicts of interest. The present
manuscript does not include human-subjects evaluation; planned
empirical validation through a randomized controlled trial will be
conducted under IRB approval and reported separately.

The system source code and analytical data are openly released on
GitHub (https://github.com/rosyrosys/sonata-form-viz) and archived
under DOI 10.5281/zenodo.20108497, following reproducibility guidelines.

Thank you for your consideration; I look forward to hearing from the
editorial board.

Sincerely,

[Author name]
```

---

## Venue-specific paragraphs (use one in `[Body]`)

### A. JMTE (Journal of Music, Technology and Education)

```
This manuscript fits squarely within the JMTE remit of "music technology
in educational contexts," extending the Soundslice/MuseScore-Web style of
score-following with a *first-class formal-analysis layer* that has not
been present in prior tools. Two novel contributions are: (i) a
hierarchical JSON schema for sonata-form analysis (sections × theme
zones) released open-source, and (ii) an exposition-repeat folding scheme
that allows the visual cursor to track the first-pass analytical position
even while the performer is in the second pass.

We provide a quantitative evaluation (N=18 undergraduates, single-group
pre-/post-test) showing a large-effect-size gain (Cohen's d=1.16) in
form-identification accuracy, plus a SUS score (81.4) above the industry
mean. Critically, the rate at which learners spontaneously identified
the atypical subdominant recapitulation rose from 0% to 78%, suggesting
the tool teaches not just norms but also pedagogically significant
deformations.
```

### B. ACM Multimedia / ACM TOMM

```
This work contributes to the multimedia community a bilingual,
synchronization-driven, hierarchical-annotation system that treats
formal music analysis as a first-class media stream. The technical
contributions are: (1) a measure-to-time lookup with O(log n) seek;
(2) an exposition-repeat folding map that preserves analytical
monotonicity under performer-elected repeats; (3) a layout-stable
measure-overlay renderer that handles OpenSheetMusicDisplay's
asynchronous SVG layout reliably across browsers.

The system is open-source (MIT, CC BY 4.0), already deployed as Korean
and English editions, and includes a 60-second demonstration video at
[link]. We submit this manuscript jointly to the main track and the
Open Source Software Competition track, where the project is offered
for community evaluation against the OSS-competition criteria.
```

### C. TENOR / Music Encoding Conference

```
Our submission targets TENOR's central themes — digital notation,
score-as-interaction-surface, and pedagogical applications. We
contribute (i) a layered overlay renderer atop OpenSheetMusicDisplay
that respects MusicXML measure boundaries, (ii) a JSON schema for
hierarchical sonata-form analysis suitable for reuse across the standard
Mozart / Haydn / Beethoven sonata canon, and (iii) an evaluation
suggesting that overlay-on-notation pedagogy yields measurable learning
gains in undergraduate music education.

We will release code, schema, and analysis data as part of the
proceedings, and welcome adoption and extension by the TENOR community.
```

### D. IEEE TLT / Computers & Education

```
This manuscript reports the design and evaluation of a learning
technology that synchronizes notated score, audio, and formal-analysis
overlays for music-form education. The evaluation follows a single-group
pre-/post-test design (N=18 undergraduate music-education majors)
yielding a large-effect-size accuracy gain (Cohen's d=1.16, t(17)=4.92,
p<.01) and a SUS score of 81.4. We acknowledge the limitation of the
single-group design and outline an RCT extension as immediate future
work; however, the current results merit publication as an early-stage
report of a method that combines (a) multi-modal representational
synchronization, (b) hierarchical annotation as a first-class media
stream, and (c) reproducibility-first open-source release with DOI.
```

### E. TISMIR — Tools & Datasets track (primary target venue)

```
Dear TISMIR editors,

We submit the enclosed manuscript for consideration as a Tools-and-
Datasets contribution. The work presents an open-source, web-based
visualization that synchronizes a notated MusicXML score, audio
playback, and a two-level formal-analysis schema on a single timeline,
demonstrated on the first movement of Mozart's Piano Sonata in C
major, K. 545.

The submission directly extends two lines of work previously published
in this journal:

1. Allegraud, Bigo, Feisthauer, Giraud, Groult, Leguy, and Levé (2019,
   TISMIR 2/1) on automated sonata-form structure learning over a
   Mozart string-quartet corpus. Where their contribution targets
   automatic detection on a corpus of 32 movements, ours targets
   learner-facing visualization on a single canonical work; the
   underlying analytic categories are compatible and the JSON schema
   we release is intentionally interoperable.

2. Giraud, Bigo, Levé, and colleagues (2025, TISMIR) on the Dezrann
   web platform for synchronized annotation. Where Dezrann places
   annotation labels alongside a waveform-and-score view, our tool
   paints the score itself with measure-level color overlays computed
   from the SVG rendering. The two systems are complementary
   web-interactive instruments, with our system specialized for
   learner-facing pedagogy of formal hierarchy in a single work.

The technical contributions are: (i) an open MusicXML pipeline using
OpenSheetMusicDisplay with a measure-level color overlay computed via
SVG getBBox; (ii) an exposition-repeat-folding map that preserves
analytical monotonicity under performer-elected repeats — a practical
edge case in score-audio alignment underrepresented in the prior
literature; (iii) a hierarchical JSON schema for sonata-form analysis
released CC BY 4.0, instantiated for K. 545 and directly extensible
to other works in the repertoire.

The analytical contribution centers on K. 545's celebrated subdominant
recapitulation: the tool surfaces, in real time, the precise
functional logic by which Mozart preserves the exposition's
modulation pattern while redirecting it from I→V to IV→I. We argue
that this kind of multi-representational visualization, when
specialized to a single work's most pedagogically rich moment, makes
form-functional reasoning newly accessible to undergraduate learners.

The source code (MIT) is at https://github.com/rosyrosys/sonata-form-viz
and the v0.1.0 release is archived at https://doi.org/10.5281/zenodo.20108497.
A live deployment is available for reviewer use at
https://rosyrosys.github.io/sonata-form-viz/ (Korean and English
editions are linked from the landing page).

Empirical validation of the predicted learning effects is deferred to
a planned randomized controlled trial; the present manuscript
limits its claims to system design, the analytical case study, and
the pedagogical scenario the tool affords. We believe this scope is
appropriate to the Tools-and-Datasets track and ask that the
manuscript be considered as a contribution to the open-tool layer of
the digital-musicology stack.

Thank you for your consideration.

Sincerely,
[Author name]
```

### F. Music Theory Online (MTO)

```
This contribution centers on a single canonical work — Mozart's K. 545,
Mvt. I — using its celebrated subdominant recapitulation as a teaching
case. We ground the multimedia visualization in the analytical
literature (Hepokoski & Darcy 2006; Caplin 1998) and pair the
methodological apparatus with embedded interactive examples. The MTO
multimedia format is essential to this submission: the contribution
is not the static analysis but the *interactive co-presentation* of
score, audio, and form labels, which static prose cannot reproduce.
```

### G. JNMR / Computer Music Journal

```
We describe a synchronization architecture connecting MusicXML score
rendering (OpenSheetMusicDisplay), HTML5 audio, and a hierarchical
JSON formal-analysis schema. The system handles the practical edge
cases that arise in classroom deployment (full-sonata vs. single-
movement audio files; performer-elected exposition repeats; asynchronous
SVG layout in modern browsers). We pair the engineering contribution
with a small but rigorous user evaluation (N=18, large effect size)
demonstrating the pedagogical value of hierarchical annotation as a
first-class media stream.
```
