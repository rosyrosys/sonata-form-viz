# Cover Letter, TISMIR Tools & Datasets Submission

*[For the final upload, fill in the bracketed author details below.
The manuscript file itself is intentionally blinded; the cover letter
may be non-blinded since it is read only by the editorial team.]*

---

**[Author Name]**
**[Affiliation, Position]**
**[Address]**
**[Email]**
**ORCID:** [0000-0000-0000-0000]

**[Month] [Day], 2026**

Dear TISMIR Editors,

We submit the enclosed manuscript for consideration as a **Tools-and-
Datasets contribution**. The work presents an open-source, web-based
visualization that synchronizes a notated MusicXML score, audio
playback, and a two-level formal-analysis schema on a single
timeline, demonstrated on the first movement of Mozart's Piano
Sonata in C major, K. 545.

The submission directly extends two lines of work previously
published in this journal:

1. **Allegraud, Bigo, Feisthauer, Giraud, Groult, Leguy, and Levé
   (2019, *TISMIR* 2(1):82–96)** on automated sonata-form structure
   learning over a Mozart string-quartet corpus. Where their
   contribution targets automatic detection on a corpus of 32
   movements, ours targets *learner-facing visualization* on a
   single canonical work; the underlying analytic categories are
   compatible and the JSON schema we release is intentionally
   interoperable with their annotation conventions.

2. **Ballester, Bacot, Bigo, and colleagues (2025, *TISMIR*
   8(1):121–139)** on the Dezrann web platform for synchronized
   annotation. Where Dezrann places annotation labels alongside a
   waveform-and-score view, our tool *paints the score itself*
   with measure-level color overlays computed from the SVG
   rendering. The two systems are complementary web-interactive
   instruments, with our system specialized for learner-facing
   pedagogy of formal hierarchy in a single work.

The technical contributions are:

- **(i)** an open MusicXML pipeline using OpenSheetMusicDisplay
  with a measure-level color overlay computed via SVG `getBBox`;
- **(ii)** an exposition-repeat-folding map that preserves
  analytical monotonicity under performer-elected repeats, a
  practical edge case in score-audio alignment underrepresented
  in the prior literature;
- **(iii)** a hierarchical JSON schema for sonata-form analysis
  released CC BY 4.0, instantiated for K. 545 and directly
  extensible to other works in the repertoire.

The analytical contribution centers on K. 545's celebrated
subdominant recapitulation: the tool surfaces, in real time, the
precise functional logic by which Mozart preserves the
exposition's modulation pattern while redirecting it from I → V
to IV → I. We argue that this kind of multi-representational
visualization, when specialized to a single work's most
pedagogically rich moment, makes form-functional reasoning newly
accessible to undergraduate learners.

The source code (MIT license) is available at
https://github.com/rosyrosys/sonata-form-viz and the v0.1.0
release is archived at https://doi.org/10.5281/zenodo.20108497.
A live deployment that bundles a Public Domain reference
recording (Robin Alciatore, via Musopen/Wikimedia Commons) is
available for reviewer use at
https://rosyrosys.github.io/sonata-form-viz/, Korean and English
editions are linked from the landing page.

The present manuscript does not include human-subjects
evaluation. Empirical validation of the predicted learning
effects is deferred to a planned randomized controlled trial,
which will be conducted under appropriate institutional review
board approval and reported separately. The present submission
limits its claims to system design, the exposition-repeat
folding technique, the analytical case study, and the
pedagogical scenario the tool affords. We believe this scope is
appropriate to the Tools-and-Datasets track and ask that the
manuscript be considered as a contribution to the open-tool
layer of the digital-musicology stack.

This manuscript has not been submitted to any other journal and
no portion of it has been published elsewhere. All authors have
approved the submission and there are no competing interests.

Thank you for your consideration.

Sincerely,

**[Author Name]**
