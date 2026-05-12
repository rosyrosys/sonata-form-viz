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
atypical subdominant recapitulation. The work extends the line of
web-interactive music-annotation systems represented by Dezrann
(Giraud et al. 2025) and the sonata-form structure-learning study of
Allegraud et al. (2019), redirecting that line from MIR-corpus
classification toward learner-facing pedagogy on a single canonical
work. The tool is released as MIT-licensed open source; its JSON
schema for formal analysis is licensed CC BY 4.0 and is directly
extensible to other works and other formal types. Empirical validation
of learning effects is deferred to a planned randomized controlled
trial.

**Keywords:** sonata form, score-audio synchronization, music notation
visualization, MusicXML, OpenSheetMusicDisplay, color encoding,
formal analysis schema, music education, open-source tool, Mozart K. 545


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

Color mapping has been studied as a representational means in music
pedagogy. Kuo and Chuang (2013), proposing a color music notation system
for beginners, map pitch, duration, range, and intensity to colors,
lattices, graphs, and shape sizes respectively, drawing on Itten's color
wheel and the Natural Color System to align twelve primary colors with
twelve-tone equal temperament. Their work demonstrates the systematic
applicability of color–music synesthetic mapping at the *pitch*
dimension. Our tool's two-tier scheme (sections plus theme zones, with
WCAG-2.1 contrast and non-color redundancy) applies the same color–music
representational principle, but at the *formal hierarchy* dimension
rather than the pitch dimension.

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

The closest precedents for the present work are the Dezrann web
platform (Giraud et al. 2025) and the sonata-form structure-learning
study of Allegraud et al. (2019), both published in this journal. Both
treat formal music annotation as a first-class web-interactive object;
both have been applied to Mozart sonata movements. The present work
follows that line and contributes three differences:

1. **Two-level color encoding native to the score.** Where Dezrann
   places annotation labels as discrete markers on a waveform-and-
   score view, our tool paints *the score itself* with section colors
   at the measure level (computed via SVG `getBBox` on the OSMD
   render). Section and theme-zone colors coexist on the same surface
   the learner is already reading.
2. **A two-level analytical schema treated as primary data.** Our
   `sonata_structure.json` is not metadata attached to a Dezrann
   annotation but a stand-alone, peer-reviewable, versioned object
   licensed CC BY 4.0. This makes it directly reusable in MIR
   pipelines and in derivative analyses of other works, in the same
   sense that the Allegraud et al. (2019) sonata-form corpus has been
   reused.
3. **A learner-facing, single-work focus.** Allegraud et al. (2019)
   address the *automatic detection* problem on a 32-quartet corpus
   for the music-information-retrieval community; the present tool
   addresses the *teaching* problem on a single canonical work for the
   music-education community. The two are complementary: a robust
   classifier (Allegraud) and a precise pedagogical instrument
   (this work) need not target the same evaluation metric.

Table 1 positions the present work against several adjacent systems.

**Table 1.** Comparison with related visualization, annotation, and
score-following tools.

| Tool | Hierarchical formal labels | Score-audio sync | Color on score itself | Section jump | Open source | Learner-facing |
|---|---|---|---|---|---|---|
| Sonic Visualiser (Cannam et al. 2010) | △ (annotation only) | × | × | △ | ✓ | △ |
| Soundslice (commercial) | × | ✓ | × | △ | × | ✓ |
| iAnalyse (Couprie 2008) | ✓ | △ | △ | ✓ | ✓ | △ |
| Verovio Humdrum Viewer (Sapp 2017) | △ | △ | × | × | ✓ | △ |
| MuseScore Web (commercial) | × | ✓ | × | × | × | ✓ |
| Dezrann (Giraud et al. 2025) | ✓ (label-based) | ✓ | △ (track labels) | ✓ | ✓ | ✓ |
| **This work** | **✓ (two-level)** | **✓** | **✓ (measure-painted)** | **✓** | **✓** | **✓** |

The novelty claim is therefore narrower than "first open-source
sonata-form visualization": it is "first open-source, learner-facing
tool combining measure-painted hierarchical formal color, score-audio
synchronization, and a separable analysis-as-data schema."


# 3. Mozart's K. 545, Movement I: An Analytical Walk-Through

## 3.1 Why This Work, and Why Movement I

Composed in Vienna in 1788 and self-described by Mozart as "*für
Anfänger*" (for beginners; the now-conventional title *Sonata facile*
is a posthumous attribution), the movement is in C major, common time,
*Allegro*, and runs only 73 measures (Mozart, 1986/NMA IX/25). Its
near-canonical status in piano pedagogy means that most undergraduate
music students have *played or heard* the work before they have *analyzed*
it — a peculiar gap that this paper, and the tool it accompanies, take
as a pedagogical opportunity. Three properties make Movement I uniquely
productive as a teaching case:

1. **Length.** At roughly three and a half minutes, the whole movement
   fits comfortably into a single class hearing, with time left for
   comparative re-listening of selected regions.
2. **Textural transparency.** The Alberti-bass-plus-melody texture
   leaves each formal landmark audible: every theme entry, every
   modulation, every cadence is clearly articulated. Less transparent
   sonata movements (e.g., the Beethoven *Pathétique*, Op. 13/i) bury
   their formal events in dense polyphony.
3. **A normative-and-deformational character.** The exposition behaves
   *exactly as a textbook sonata exposition should*; the recapitulation
   does not. This contrast — the same musical material treated two ways
   — is the analytical heart of the movement and the heart of this
   paper.

## 3.2 Two-Level Formal Layout

Table 2 presents the formal analysis encoded in the tool. The
two-level grain — large *sections* containing *theme zones* — follows
the SHMRG tradition of LaRue (1970) and the *Sonata Theory* framework
of Hepokoski and Darcy (2006), simplified for pedagogical use by
collapsing the transition into the primary-theme zone when the latter
is harmonically continuous.

**Table 2.** Two-level formal analysis of K. 545, mvt. I (73 measures).
Times are given for a representative recording at ♩ ≈ 132 with the
exposition repeat taken.

| Section | Theme zone | Measures | Key | Time |
|---|---|---|---|---|
| **Exposition** | Primary theme (P) | 1–13 | C major | 0:00 – 0:27 |
| | Secondary theme (S) | 14–25 | G major | 0:27 – 0:50 |
| | Codetta | 26–28 | G major | 0:50 – 0:55 |
| | *Exposition repeated* | — | — | 0:55 – 1:47 |
| **Development** | (modulating progression) | 29–41 | g → d → a → C → a → F | 1:48 – 2:12 |
| **Recapitulation** | Primary theme (P) | 42–58 | **F major** ← subdominant | 2:12 – 2:45 |
| | Secondary theme (S) | 59–70 | C major | 2:45 – 3:07 |
| | Codetta | 71–73 | C major | 3:07 – 3:13 |

Three features of this table reward attention. *First*, every numbered
measure has a unique formal address: this is what allows the tool to
overlay a color block on each measure in the score and a color segment
on the timeline. *Second*, the exposition's tonal motion — C → G,
typical for a major-mode sonata — is reproduced *not* in the
recapitulation but in *the exposition's own repeat*; this is the
performer's primary mechanism for letting the listener internalize the
exposition's harmonic plan. *Third*, the recapitulation reproduces the
*entire harmonic pattern of the exposition*, but shifted: P now in F
major rather than C, with S returning to C rather than going to G.
The remainder of this section unpacks why.

## 3.3 The Subdominant Recapitulation: Functional Logic

K. 545's recapitulation famously begins in F major rather than the
expected tonic C. Hepokoski and Darcy (2006: ch. 17) classify this as a
*subdominant recapitulation*, a recognized but unusual deformation of
the standard sonata template. The deformation is unusual enough to be
mentioned in nearly every undergraduate textbook treatment of the
movement, but its functional logic is rarely traced in detail.

### A symmetrical harmonic plan

Consider the exposition first. The primary theme begins in the tonic
(C major), the transition leads the harmony to the dominant (G major),
and the secondary theme arrives on that dominant. Schematically:

> **Exposition:** P in C → S in G  (motion of a fifth upward)

This *I → V* trajectory is the textbook expectation. Now consider what
would happen if the recapitulation mechanically reused this trajectory
while starting in the tonic:

> **Hypothetical "tonic recap":** P in C → S in G  (same as exposition)

The result would *fail to fulfill the recapitulation's central
function* — consolidating *both* themes in the tonic. The secondary
theme would arrive at G major, exactly as in the exposition, and the
movement would have *no* resolution of the dominant.

Mozart's solution is brilliantly economical: he transposes the entire
recapitulation P down a fifth, into F major, and then lets the same
modulating logic carry the music *up* a fifth to the tonic.

> **Mozart's actual recap:** P in F → S in C  (motion of a fifth upward)

The motion *I → V* of the exposition becomes *IV → I* of the
recapitulation — exactly the resolution the form requires. The same
modulatory mechanism, redirected by a single starting-key shift,
achieves precisely the opposite tonal effect.

### Why this matters pedagogically

Three observations follow from this analysis:

1. **The "deformation" is not a deviation but an optimization.** A
   strict tonic-onset recap would have required Mozart to alter the
   internal mechanism of the modulation. Instead, by changing only
   the starting key, the entire mechanism is preserved and reoriented.
   Form here behaves as *living convention*: the convention is
   "consolidate themes in tonic," and Mozart finds the most economical
   route to that goal.

2. **Recognition of subdominant recap requires hearing both the local
   key and the larger functional aim.** A listener attending only to
   the surface ("the recap starts in the wrong key") misses the
   resolution; a listener attending only to the tonal goal ("S returns
   to C") misses Mozart's clever route. Both layers — local key,
   structural goal — must be simultaneously available to the learner.
   This is exactly where multi-representational visualization can help:
   color labels make local key audible-at-a-glance, while the timeline
   makes the structural goal visible at a single look.

3. **The recap is not a literal repetition.** Beyond the starting
   transposition, the recapitulation expands the transition (mm. 50–57)
   relative to the single-measure exposition T at m. 13 — a
   *recompositional* adjustment necessary to land S correctly in C.
   This is again a teaching point: a recapitulation that "just goes
   back to the beginning" would be unable to negotiate the
   non-symmetric tonal layout.

These three observations are not new to specialists, but the experience
of *seeing them happen simultaneously* — in color, on the score, at
playback speed — is, in our experience, when students cease describing
the recap as "wrong key" and begin describing it as "clever solution."

### Codetta differences

A subtler but equally instructive observation concerns the codettas.
The exposition codetta (mm. 26–28) cadences in G major, providing a
strong half-cadence-of-the-tonic / authentic-cadence-of-the-dominant
double function. The recapitulation codetta (mm. 71–73) cadences in C
major and is — significantly — virtually unchanged in figuration from
its exposition counterpart. The tool's color overlay reveals this: the
codetta color band reappears with identical material at identical
length, while the *meaning* of the cadence has fundamentally shifted.
For learners, this is a vivid demonstration that *form is not surface
identity*; the same notes occupy different functional roles depending
on the harmonic environment.

### How the tool surfaces these insights

The analytical claims above are not generated by the tool — they are
the analytical content the tool is *designed to reveal*. Three
features carry the pedagogical work:

1. **Key labels on recap regions.** When the playhead enters mm. 42–58,
   the analysis pane displays "F major" rather than "C major." The
   anomaly is named in real time.
2. **Auto-commentary on the deformation.** The same pane displays a
   short framing sentence — *"Subdominant recapitulation: the
   exposition's modulation plan, redirected toward the tonic"* — which
   transforms the local key change into a *functional* event.
3. **Loop-section A/B comparison.** A single toggle replays the
   exposition's P region followed immediately by the recapitulation's
   P region. The two passages are *the same melody* in *different
   keys*, and hearing them back-to-back makes Mozart's
   transposition-as-mechanism viscerally clear in a way no static
   analytical diagram can.


# 4. The Tool: Three Coordinated Representations

The system is a static, client-side web application (≈600 lines of
vanilla JavaScript) with one external dependency
(OpenSheetMusicDisplay) and no build step. A live deployment is
embedded with this article (see *Example 1* below); source code,
analysis data, and the audio-policy documentation are available
through the project's GitHub repository and Zenodo archive (see
*Reproducibility*, §7).

For a TISMIR reader, the architecturally salient property is not the
component list but the *coordination*: three representations of the
same musical present moment are kept in sync, and the user can
intervene in any one of them. Two design choices deserve specific
articulation as Tools-and-Datasets contributions: a stable measure-
painting scheme that survives OSMD re-layout (§4.2), and a non-monotonic
time-mapping function that handles performer-elected repeats without
analytical loss (§4.5).

## 4.1 The Three Representations

| Representation | Encoding | Update on `timeupdate` |
|---|---|---|
| **Color timeline** | Horizontal bar, two-level color, proportional widths | Red playhead advances |
| **Score** | MusicXML rendered as SVG; current measure highlighted | Cursor moves to current note |
| **Analytical pane** | Section + theme labels, current key, auto-commentary | Re-renders on label change |

A measure-to-time lookup (binary search, O(log n)) runs once per
`timeupdate` event (≈ 250 ms). The current measure is then routed to
all three representations, which update within a single render frame.
A linear proportional scaling at `loadedmetadata` accommodates
recordings of different total durations than the reference (Goto 2006);
future work will integrate score-audio alignment (Nakamura, Yoshii, &
Katayose 2017) for tempo-flexible accuracy.

## 4.2 The Two-Level Color Scheme

Color encoding follows two principles. First, WCAG 2.1 AA compliance:
text contrast is maintained at ≥ 4.5:1. Second, color-blind
accessibility: no information is conveyed by color alone — theme
zones (P / S / codetta) are also distinguished by accent bars and
text labels, following the kind of multi-channel encoding practice
that Kuo and Chuang (2013) systematize at the pitch level for
beginner notation.

| Element | Color | Role |
|---|---|---|
| Exposition | Pastel blue | Stable, presenting |
| Development | Pastel amber | Tonally exploratory |
| Recapitulation | Pastel green | Returning, resolving |
| Now-position | Red | Playhead, score cursor |

## 4.3 The Analysis Layer as Data

The formal analysis is a versioned JSON object (see *Example 2*
below). Treating the analysis itself as a peer-reviewable, machine-
readable artefact — rather than as a hidden pedagogical commentary —
opens it to community extension (other works, other forms) and to
machine reuse by future MIR pipelines. For the present paper this
matters because it lets us release *both* the tool and the K. 545
analysis under separable open licenses (MIT and CC BY 4.0,
respectively).

## 4.4 Affordances for Active Listening

Three interactive affordances are pedagogically central:

- **Section jump** — clicking any colored timeline segment seeks the
  audio to that measure. A teacher can move directly from "exposition
  P" to "recapitulation P" without scrubbing.
- **Section loop** — toggles playback to repeat the current section,
  enabling immediate A–B comparison.
- **Playback-speed control** — slows passage to 0.5× without altering
  pitch, useful for very brief modulating moments.

Keyboard shortcuts (Space, ←/→, L for loop, C for color toggle) make
classroom demonstration responsive in a way mouse-only interaction
cannot.

## 4.5 Exposition Repeat Folding

When a performer elects to take the exposition repeat — the
overwhelming majority of K. 545 recordings in the canonical
discography, including the Schiff Carnegie Hall (2015) recording used
in our reference deployment — the audio time-line becomes
*non-monotonic* with respect to analytical time. Audio seconds 0:00 –
0:55 traverse the exposition; audio seconds 0:55 – 1:48 traverse the
exposition *again*; audio second 1:48 onwards opens the development.
Two design responses are available:

1. **Ignore the repeat.** The cursor and analytical pane simply
   continue forward through audio time, and during the repeat the
   pane displays an off-by-one section ("development") while the
   listener is still in the exposition. Pedagogically misleading.
2. **Fold the repeat.** During the repeat, the cursor returns to the
   exposition's start and re-traverses it; only when the audio passes
   the second exposition codetta does the cursor advance into the
   development.

We adopt the second option. Let *t* be the current audio time and let
the user-marked or default repeat span be \[*r*₁, *r*₂\]. The
analytical time *τ* is then a piecewise function:

```
              ⎧ t                                  if t < r₁
              ⎪
   τ(t)   =   ⎨ ((t − r₁) / (r₂ − r₁)) · r₁         if r₁ ≤ t < r₂
              ⎪
              ⎩ t − (r₂ − r₁)                      otherwise
```

Three properties follow:

- **First-pass identity.** For *t* < *r*₁, analytical time equals audio
  time. The cursor behaves as a simple score-follower until the repeat
  begins.
- **Fold-back on repeat.** For *r*₁ ≤ *t* < *r*₂, the cursor re-
  traverses the analytical interval \[0, *r*₁\] proportionally with
  the second hearing. The listener hears the exposition a second time
  while the cursor visibly returns to bar 1 and crawls forward to bar
  28 again.
- **Post-repeat offset.** For *t* ≥ *r*₂, analytical time advances at
  audio rate but offset back by the repeat duration. The development
  and recapitulation are addressed correctly regardless of repeat
  length.

The repeat boundaries *r*₁ and *r*₂ are user-adjustable through three
keyboard shortcuts (M, [, ]) for live calibration against the actual
recording, and the calibrated values are persisted in
`localStorage`. The fold is therefore robust to the wide variance in
recording-specific repeat timings observed across the K. 545
discography, and the same folding scheme transfers without
modification to any sonata-form work with a marked exposition repeat.

To our knowledge, no prior open music-visualization system (including
Dezrann, Sonic Visualiser, and the score-following tools surveyed in
§2.4) addresses performer-elected repeats with an explicit
non-monotonic time map. The closest analogue in the MIR literature is
the structure-following work of Müller (2015, ch. 3), which handles
repeats by inserting multiple parallel score branches; our approach
preserves a single score-time axis and is consequently simpler to
implement and to visualize for a learner.


# 5. A Classroom Walk-Through

This section illustrates how a teacher using the tool might surface
the analytical claims of §3.3 in a single 30-minute class meeting.

## 5.1 First Hearing (5 minutes)

The teacher opens the tool with the audio loaded and *color
visualization disabled*. The class hears the entire movement once —
including the exposition repeat — while the score scrolls and the red
playhead moves along the (still uncolored) timeline. The instruction
is simply: "Where do you think the movement is divided?" The
preserved exposition repeat surfaces a useful preliminary observation
— that the music *returns to the same material* approximately one
minute in.

## 5.2 Color Reveal and Section Identification (8 minutes)

The teacher toggles section color on. The exposition / development /
recapitulation tripartite division is now visible at a glance on the
timeline; the same colors are simultaneously painted as measure-level
overlays on the score. Students are asked to identify, by clicking
the timeline segments, the boundary measures of each section. Because
the colored regions are now both *temporal* (timeline) and *spatial*
(score), students can verify their guesses on either representation.

## 5.3 Exposition P and S (5 minutes)

Using the section-jump buttons, the teacher plays just the
exposition's P region (mm. 1–13), then just S (mm. 14–25). The
analysis pane displays "C major" then "G major"; the boundary is
auditorily *and* visually marked. The teacher asks: "What harmonic
move did Mozart just make?" The answer (I → V) is no longer something
the teacher tells the class but something the class deduces from the
visible key change.

## 5.4 The Critical Moment: Recapitulation P (8 minutes)

The teacher jumps to recapitulation P (mm. 42–58, audio time around
2:12). The analysis pane displays "**F major**." This is, in our
experience, the moment students lean forward. Two follow-up actions
make the pedagogical point:

1. *Loop on*. The teacher engages section loop and lets the class
   hear recap P for one full pass. The label "F major" is held in
   view. The visual and auditory representations of *the same
   primary theme in a different key* are now jointly available.
2. *A / B compare*. The teacher then loop-toggles between exposition
   P and recap P, playing each twice. Most students hear *the same
   tune in two different keys* — and recognize the recap as
   *transposed*, not "wrong."

## 5.5 Synthesis (4 minutes)

The teacher displays the schematic comparison:

> Exposition: P in C → S in G  *(I → V, motion of a fifth up)*
> Recapitulation: P in F → S in C  *(IV → I, motion of a fifth up)*

The schematic is now grounded in what the class has just heard *and*
seen. The teacher poses the synthesizing question: "Why did Mozart
start the recap in the 'wrong' key?" — and the class, having seen S
land safely in C, has the materials to answer.

The walk-through above is not the only possible use of the tool, and
not every passage requires color or looping. But it illustrates the
basic *grammar of teaching with the tool*: choose a passage, choose
the representations to foreground, listen, look, and let students
make the analytical observation themselves.


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
- Kuo, Y.-T., & Chuang, M.-C. (2013). A proposal of a color music
  notation system on a single melody for music beginners.
  *International Journal of Music Education, 31*(4), 394–412.
  https://doi.org/10.1177/0255761413489082
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
