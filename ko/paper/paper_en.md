[ARTICLE TYPE: Tools and Datasets Article]

# Teaching Sonata Form Through Synchronized Multi-Representational Visualization: Design, Implementation, and Evaluation of an Open-Source Web Tool Using Mozart's K. 545

*[Author details are not included in this manuscript file as the peer
review process is blinded. Author names, affiliations, contact details
and ORCIDs are provided via the online submission system.]*

# Abstract

Sonata form is a central topic in music-theory and music-history
curricula, yet learners routinely report difficulty perceiving formal
structure while listening: the hierarchical relation between sections,
theme zones, and the moment-to-moment audio is not directly legible
from a printed score. Existing computational tools for music
visualization either treat formal annotations as auxiliary metadata
rather than as first-class data, or have not been designed for the
practical edge cases of learner-facing use, most prominently the
performer-elected exposition repeat. We present an open-source,
web-based tool that synchronizes a MusicXML score, audio playback,
and a two-level formal-analysis layer (sections × theme zones) along
a single timeline, demonstrated on Mozart's Piano Sonata in C major,
K. 545, first movement (73 measures). The system renders MusicXML
through OpenSheetMusicDisplay and paints section and theme-zone
colors directly onto the score at the measure level. We introduce
an exposition-repeat folding map: a piecewise non-monotonic time
function that preserves analytical monotonicity under performer-
elected repeats, an edge case that no prior open music-visualization
system has addressed with an explicit time map. Together, the tool
and the released analysis schema provide an open infrastructure for
both classroom teaching of formal hierarchy and downstream
computational reuse on other works in the sonata-form repertoire.

**Word Count:** *[to be inserted at final submission, current draft
≈ 6,100 words including references and appendix]*

**Keywords:** sonata form; score-audio synchronization; MusicXML
visualization; exposition-repeat folding; music education technology;
Mozart K. 545


# 1. Introduction

## 1.1 Motivation

Sonata form is the principal organizational principle of Western
instrumental music from the late eighteenth century onwards and remains
a central topic in music-theory and music-history curricula at both
secondary and tertiary levels (Caplin, 2009; Hepokoski & Darcy, 2006).
Despite this curricular centrality, learners, including
music-conservatory entrants, routinely report difficulty perceiving
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
  Mozart's K. 545 offer as a case piece, particularly its
  subdominant-recapitulation deformation?
- **RQ3.** How does the implemented system perform with respect to (a)
  formal-identification accuracy and (b) system usability?

## 1.3 Contributions

This work contributes four artifacts to the TISMIR Tools-and-Datasets
layer:

1. **A learner-facing open-source tool** (MIT) that synchronizes
   notated score, audio, and a hierarchical formal-analysis layer in
   the browser, with a single external dependency
   (OpenSheetMusicDisplay) and a metronome demo mode for
   copyright-sensitive classroom use.
2. **An open analysis schema and dataset** (CC BY 4.0), a
   machine-readable JSON encoding of two-level sonata-form analysis
   (sections × theme zones), instantiated for Mozart K. 545 mvt. I
   and *intentionally interoperable* with the Algomus annotation
   conventions of Allegraud et al. (2019), so that human-curated
   analyses and classifier output share a common ingestion path.
3. **An exposition-repeat folding map**: a piecewise non-monotonic
   time function that preserves analytical monotonicity under
   performer-elected exposition repeats, formalized in §4.5. To our
   knowledge, no prior open music-visualization system (Dezrann,
   Sonic Visualiser, Verovio Humdrum Viewer, score-following
   commercial tools) treats this case with an explicit time map.
4. **A pedagogical scenario for the atypical-recapitulation case**,
   a 30-minute classroom walk-through (§5) demonstrating how the
   tool's three coordinated representations surface K. 545's
   subdominant recapitulation as a functional-logic deduction
   rather than a memorized exception.

Empirical validation of learning effects is reserved for a planned
randomized controlled trial; the present contribution is the open
infrastructure layer on which such evaluation can be built.


# 2. Background

## 2.1 Hierarchical Analysis of Sonata Form

We adopt a two-level hierarchy that combines the rotational perspective
of Sonata Theory (Hepokoski & Darcy, 2006) with the formal-function
account of Caplin (1998).

**Large sections.**
- Exposition: presents two thematic complexes in two key areas.
- Development: recasts and modulates the exposition's material.
- Recapitulation: restates both thematic complexes in the tonic.
- Coda: optional closing section (absent in K. 545 mvt. I).

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
example, P in the exposition versus P in the recapitulation, a
comparison that is precisely what reveals the K. 545 subdominant
recapitulation as such.

## 2.4 Related Tools

The closest precedents for the present work are the Dezrann web
platform (Ballester et al. 2025) and the sonata-form structure-learning
study of Allegraud et al. (2019). Both papers treat formal music
annotation as a first-class web-interactive object, and both have been
applied to Mozart sonata movements. The present work
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
| Dezrann (Ballester et al. 2025) | ✓ (label-based) | ✓ | △ (track labels) | ✓ | ✓ | ✓ |
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
it, a peculiar gap that this paper, and the tool it accompanies, take
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
   does not. This contrast, the same musical material treated two ways
  , is the analytical heart of the movement and the heart of this
   paper.

## 3.2 Two-Level Formal Layout

Table 2 presents the formal analysis encoded in the tool. The
two-level grain, large *sections* containing *theme zones*, follows
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
| | *Exposition repeated* | - | - | 0:55 – 1:47 |
| **Development** | (modulating progression) | 29–41 | g → d → a → C → a → F | 1:48 – 2:12 |
| **Recapitulation** | Primary theme (P) | 42–58 | **F major** ← subdominant | 2:12 – 2:45 |
| | Secondary theme (S) | 59–70 | C major | 2:45 – 3:07 |
| | Codetta | 71–73 | C major | 3:07 – 3:13 |

Three features of this table reward attention. *First*, every numbered
measure has a unique formal address: this is what allows the tool to
overlay a color block on each measure in the score and a color segment
on the timeline. *Second*, the exposition's tonal motion, C → G,
typical for a major-mode sonata, is reproduced *not* in the
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
function*, consolidating *both* themes in the tonic. The secondary
theme would arrive at G major, exactly as in the exposition, and the
movement would have *no* resolution of the dominant.

Mozart's solution is brilliantly economical: he transposes the entire
recapitulation P down a fifth, into F major, and then lets the same
modulating logic carry the music *up* a fifth to the tonic.

> **Mozart's actual recap:** P in F → S in C  (motion of a fifth upward)

The motion *I → V* of the exposition becomes *IV → I* of the
recapitulation, exactly the resolution the form requires. The same
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
   to C") misses Mozart's clever route. Both layers, local key,
   structural goal, must be simultaneously available to the learner.
   This is exactly where multi-representational visualization can help:
   color labels make local key audible-at-a-glance, while the timeline
   makes the structural goal visible at a single look.

3. **The recap is not a literal repetition.** Beyond the starting
   transposition, the recapitulation expands the transition (mm. 50–57)
   relative to the single-measure exposition T at m. 13, a
   *recompositional* adjustment necessary to land S correctly in C.
   This is again a teaching point: a recapitulation that "just goes
   back to the beginning" would be unable to negotiate the
   non-symmetric tonal layout.

These three observations are not new to specialists, but the experience
of *seeing them happen simultaneously*, in color, on the score, at
playback speed, is, in our experience, when students cease describing
the recap as "wrong key" and begin describing it as "clever solution."

### Codetta differences

A subtler but equally instructive observation concerns the codettas.
The exposition codetta (mm. 26–28) cadences in G major, providing a
strong half-cadence-of-the-tonic / authentic-cadence-of-the-dominant
double function. The recapitulation codetta (mm. 71–73) cadences in C
major and is, significantly, virtually unchanged in figuration from
its exposition counterpart. The tool's color overlay reveals this: the
codetta color band reappears with identical material at identical
length, while the *meaning* of the cadence has fundamentally shifted.
For learners, this is a vivid demonstration that *form is not surface
identity*; the same notes occupy different functional roles depending
on the harmonic environment.

### How the tool surfaces these insights

The analytical claims above are not generated by the tool, they are
the analytical content the tool is *designed to reveal*. Three
features carry the pedagogical work:

1. **Key labels on recap regions.** When the playhead enters mm. 42–58,
   the analysis pane displays "F major" rather than "C major." The
   anomaly is named in real time.
2. **Auto-commentary on the deformation.** The same pane displays a
   short framing sentence, *"Subdominant recapitulation: the
   exposition's modulation plan, redirected toward the tonic"*, which
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
accessibility: no information is conveyed by color alone, theme
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
readable artefact, rather than as a hidden pedagogical commentary,
opens it to community extension (other works, other forms) and to
machine reuse by future MIR pipelines. For the present paper this
matters because it lets us release *both* the tool and the K. 545
analysis under separable open licenses (MIT and CC BY 4.0,
respectively).

### Interoperability with the Algomus annotation corpus

The schema's structural categories, `sections[].type ∈ {exposition,
development, recapitulation, coda}`, `themes[].type ∈ {P, T, S, K,
codetta, retransition}`, and `(start_measure, end_measure)` ranges,
deliberately mirror the analytic categories used in Allegraud et al.
(2019) for the Mozart string-quartet sonata-form corpus. A thin
ingestion adapter is sufficient to load the 32-movement Algomus
reference analyses into the tool, because the field names map
one-to-one and the measure-range conventions are shared. We provide
the schema specification (`data/sonata_structure.schema.json`) and a
worked example for K. 545; we leave the adapter for the full Algomus
corpus as a community contribution opportunity. The architectural
point is that our learner-facing tool *amplifies* the classifier and
annotation work of Allegraud et al. rather than competing with it:
their corpus becomes loadable content for our visualization, and our
visualization becomes a downstream evaluation surface for their
classifier output.

## 4.4 Affordances for Active Listening

Three interactive affordances are pedagogically central:

- **Section jump**: clicking any colored timeline segment seeks the
  audio to that measure. A teacher can move directly from "exposition
  P" to "recapitulation P" without scrubbing.
- **Section loop**: toggles playback to repeat the current section,
  enabling immediate A–B comparison.
- **Playback-speed control**: slows passage to 0.5× without altering
  pitch, useful for very brief modulating moments.

Keyboard shortcuts (Space, ←/→, L for loop, C for color toggle) make
classroom demonstration responsive in a way mouse-only interaction
cannot.

## 4.5 Exposition Repeat Folding

When a performer elects to take the exposition repeat, the
overwhelming majority of K. 545 recordings in the canonical
discography, including the Schiff Carnegie Hall (2015) recording used
in our reference deployment, the audio time-line becomes
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
visualization disabled*. The class hears the entire movement once,
including the exposition repeat, while the score scrolls and the red
playhead moves along the (still uncolored) timeline. The instruction
is simply: "Where do you think the movement is divided?" The
preserved exposition repeat surfaces a useful preliminary observation
that the music *returns to the same material* approximately one
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
   tune in two different keys*, and recognize the recap as
   *transposed*, not "wrong."

## 5.5 Synthesis (4 minutes)

The teacher displays the schematic comparison:

> Exposition: P in C → S in G  *(I → V, motion of a fifth up)*
> Recapitulation: P in F → S in C  *(IV → I, motion of a fifth up)*

The schematic is now grounded in what the class has just heard *and*
seen. The teacher poses the synthesizing question: "Why did Mozart
start the recap in the 'wrong' key?", and the class, having seen S
land safely in C, has the materials to answer.

The walk-through above is not the only possible use of the tool, and
not every passage requires color or looping. But it illustrates the
basic *grammar of teaching with the tool*: choose a passage, choose
the representations to foreground, listen, look, and let students
make the analytical observation themselves.


# 6. Preliminary Single-Expert Pilot Review

Empirical validation of the tool's pedagogical claims through a full
randomized controlled trial with undergraduate music-education
learners is reserved for follow-up work (§7.3). As a *preliminary*
validation aimed at refining the planned RCT and identifying design
risks before learner-facing deployment, we conducted a single-expert
pilot review with one domain reviewer holding more than 15 years of
music-education field experience. We report this as a single-expert
pilot — not as a generalizable expert panel — and the limitations of
an n=1 design are discussed in §6.5.

## 6.1 Method

The expert completed an asynchronous self-administered review using
a Word-format survey instrument that combined (a) a 40-minute guided
walk-through of the §5 classroom lesson plan with the expert acting
as the teacher, (b) the 10-item System Usability Scale (Brooke,
1996), and (c) six open-ended questions covering pedagogical
fidelity, affordance value, perceived risks of learner misconception,
missing affordances, single-work depth versus multi-piece breadth,
and recommendations for the planned RCT. The SUS items were
translated to Korean by the author following Brooke's (1996)
original wording; the survey was self-administered, with the expert
working through the live deployment at
https://rosyrosys.github.io/sonata-form-viz/ in their own
environment. Written responses were analysed by the author following
the thematic-analysis approach of Braun and Clarke (2006), and the
expert gave written informed consent for anonymous reporting.

The study was treated as expert evaluation rather than human-
subjects research; consequently no formal IRB approval was required
by the host institution.

## 6.2 SUS result

**Table 4.** SUS response from the single-expert reviewer.

| | Expert |
|---|---|
| Items 1, 3, 5, 7, 9 (positive, raw) | 5 / 5 / 5 / 5 / 5 |
| Items 2, 4, 6, 8, 10 (negative, raw) | 1 / 1 / 1 / 1 / 1 |
| Σ converted (each item = 4) | 40 |
| **SUS score (Σ × 2.5)** | **100 / 100** |

The expert returned the maximum SUS score, with all positive items
rated 5 and all negatively-worded (reverse-coded) items rated 1. We
note two things about this pattern. First, the *consistency* of the
response (5 on every positive item, 1 on every negative item) is
strong evidence that the expert correctly understood the bipolar
scale; random responding would yield occasional 5s on negative
items. Second, a single-expert SUS of 100 is informative but should
not be over-interpreted: an n=1 sample of an expert evaluator
predisposed to engage with classroom-tool design is not equivalent
to a sampled learner population, and SUS norms drawn from learner
data do not transfer to this case. We therefore report the raw
score and limit our claims accordingly.

## 6.3 Themes from the qualitative responses

Inductive coding of the six open-ended responses surfaced four
themes.

### 6.3.1 Three-channel synchronization is the named source of value

Both the *pedagogical fidelity* question (C1) and the *most valuable
affordance* question (C2) drew the same answer pattern. To the
fidelity question the expert responded "*Yes, because color is
shown, music is played, and they are displayed together with the
score.*" (C1); to the affordance question, "*The function of being
able to check sections via the score while hearing color and music
in real time.*" (C2). The expert did not single out any individual
affordance from the list provided (color encoding, section jump,
loop, playback-speed control, keyboard shortcuts, demo mode,
analysis pane); the *integration* of color, audio, and score was
itself identified as the locus of value. This converges with the
design claim of §4.1 that the tool's principal pedagogical
contribution is the *coordinated update* of three representations
rather than any single one.

### 6.3.2 No learner-misconception risks identified by the expert

In response to the misconception-risk question (C3) the expert
indicated they did not perceive any (*"There seem to be none."*).
We read this both as a positive indication that the expert, with
fifteen years of field experience, did not identify any obvious
visualization-induced misunderstanding pathway, and as a hypothesis
to be tested in the planned RCT rather than a confirmed null. An
expert's *prediction* of no risk is not equivalent to a learner
study failing to detect risk.

### 6.3.3 Two concrete design recommendations

The expert proposed two specific extensions:

1. **Within-section harmonic detail.** "*It would be better if the
   chord movements were shown in detail.*" (C4). The current tool
   displays section- and theme-zone-level key labels (e.g., "C
   major" / "G major" / "F major") but does not surface internal
   chord-by-chord progressions. The expert's recommendation is that
   chord-level harmonic motion be added as a finer visualization
   layer in a future revision.
2. **Whole-piece interface affordance.** In response to the
   RCT-methodology question (C6) the expert returned a design
   suggestion rather than a methodology suggestion: "*It would be
   good if one piece and the interface screen could be viewed as a
   whole.*" We read this as a request for a more whole-piece visual
   summary affordance — for instance an always-visible mini-map of
   the form alongside the (currently scrollable) score.

That a methodology question was answered with a design recommendation
is itself a finding: an experienced field expert's instinct, on
encountering a teaching tool, is to think about *how to extend the
tool* rather than *how to instrument a study around it*.

### 6.3.4 Multi-piece extension and real-world deployment endorsed

To the question of single-work depth versus multi-piece breadth
(C5) the expert responded "*If there were diverse works, I would
actively use them.*" The verb is significant: not "could use" but
"actively use." In an optional open-comment field at the end of
the survey the expert added, unprompted, "*Personally, I hope this
program is expanded and turned into a real, deployable tool.*" The
two statements together signal a single underlying judgement: that
the tool's current single-work form is a *demonstration artefact*,
and that the expert's field practice would benefit from its
maturation into a multi-work, deployment-grade resource. This
converges with — and elevates the priority of — the multi-piece
dataset already listed as future work in §7 (Beethoven Op. 49 No.
2 mvt. I and Clementi Op. 36 No. 1 mvt. I, encoded against the
same JSON schema), and motivates a parallel commitment to
production-readiness (documentation, classroom packaging, teacher-
facing materials) beyond the research prototype reported here.

## 6.4 Implications for the planned RCT and the tool roadmap

Three concrete revisions follow from the pilot.

1. **RCT primary measure to include "perceived integration"** — a
   confidence/integration rating in addition to formal-identification
   accuracy and SUS. The single-expert response suggests that the
   *experience of three-channel synchronization* may be a distinct
   construct that learners can rate independently of accuracy and
   usability. This will be added to the RCT protocol.
2. **Pre-RCT tool extension: chord-level harmonic layer.** The
   expert's C4 recommendation will be incorporated into a v0.2.0
   release before the RCT, so that the RCT evaluates the version
   the expert thought *should exist*, not the more limited v0.1.0.
3. **Multi-piece corpus prioritised.** Per the C5 endorsement,
   Beethoven Op. 49 No. 2 mvt. I and Clementi Op. 36 No. 1 mvt. I
   will be added to the corpus *before* the RCT rather than as
   post-RCT future work, so the trial can also assess
   single-work-deep versus multi-piece-comparative conditions.
4. **Production-readiness track in parallel.** The expert's
   unprompted comment that the tool should "*become a real,
   deployable tool*" frames a separate engineering track alongside
   the research RCT: documentation for non-author teachers,
   classroom packaging (offline-installable bundle, printable
   reference card), and a teacher-facing v1.0 release that does
   not depend on the live deployment URL.

## 6.5 Limitations of this pilot

This is a single-expert pilot review, not a generalizable empirical
study. Its findings function as *design-stage validation* and as
input to refining the planned RCT, not as evidence of learner
outcomes. We list the limitations explicitly:

- **n = 1.** A single expert cannot characterize the distribution of
  expert opinion on this tool. The four themes reported in §6.3
  should be read as *hypotheses generated by one informed
  observer*, not as patterns across a community of experts.
- **Maximum SUS score.** The SUS of 100 is consistent across the ten
  items but indicates that this individual expert was strongly
  positively disposed toward the tool. We do not claim that learner
  SUS distributions will resemble this.
- **Brief responses.** All six open-ended responses are short. This
  prevents the deeper thematic-analytic moves (cross-question
  triangulation, contradiction-spotting) that a richer interview
  protocol would have enabled. The responses still function as
  signal, but signal at lower bandwidth than a fully interviewed
  expert panel would supply.
- **Expert orientation toward design, not methodology.** As noted in
  §6.3.3, the methodology question (C6) was answered with a design
  suggestion. We treat this as data about the expert's professional
  orientation rather than as a deficit in the response, but it does
  mean the pilot yielded fewer methodological refinements for the
  RCT than initially hoped.
- **Pilot was self-administered.** The expert worked through the
  Word survey instrument in their own environment rather than in a
  researcher-moderated session. This permits the expert greater
  reflection but loses the live observation of confusions or
  workarounds that a moderated cognitive walkthrough would have
  captured.

These limitations are precisely why this pilot is reported as
*preliminary expert pilot review* rather than as expert validation.
The RCT planned in §7.3 is the empirical study against which the
tool's pedagogical claims will properly be tested.


# 7. Discussion

## 7.1 Pedagogical Implications

Traditional verbal teaching often presents the recapitulation as
"return-in-tonic," handling deformations as exceptions; K. 545's
subdominant recapitulation makes a stronger pedagogical claim
available, that Mozart *preserves the exposition's modulation pattern*
by shifting the starting key down a fifth, so that the secondary
theme arrives in the tonic on the second hearing. The synchronized
color-coded view makes this *function-preserving* character of the
deformation visually self-evident, aligning with current form-functional
approaches to musical analysis (Caplin, 1998, 2009). The pedagogical
move, from rules-and-exceptions to functional flexibility, is the
central educational claim of this work.

## 7.2 Methodological and Tooling Implications

- **First-class status of formal analysis.** Encoding the analysis as
  a versioned JSON object, not as ephemeral pedagogical commentary,
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
  pipelines, a non-trivial property for syllabi designed to last
  multiple cohorts.

## 7.3 Limitations and Future Work

This paper limits itself to system design, implementation, and
pedagogical positioning. Empirical validation of learning effects is
deferred to subsequent work. Planned next steps:

1. **Randomized controlled trial** comparing the synchronized condition
   to (a) audio + score without synchronization and (b) audio + verbal
   lecture only, with form-identification accuracy and the System
   Usability Scale (Brooke, 1996) as primary measures.
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


# 8. Conclusion

This paper has presented an open-source, web-based tool that
synchronizes score, audio, and a hierarchical formal-analysis layer to
teach the structure of sonata form, with Mozart's K. 545 mvt. I as the
case piece. The central pedagogical claim, that synchronized
multi-representation makes the *function-preserving* nature of
non-tonic recapitulations visually self-evident, is grounded in
form-functional theory and instantiated as a runnable, openly licensed
system. Empirical validation of the learning gains this design
predicts is the subject of a planned randomized controlled trial; the
system, schema, and pedagogical framing presented here provide the
foundation for that work.

The tool is released under the MIT License; the formal-analysis data
under CC BY 4.0. Both invite reuse, extension, and peer scrutiny in
the spirit of open digital musicology.


# 9. Reproducibility

All artifacts are released with persistent identifiers. The source
code is available at https://github.com/rosyrosys/sonata-form-viz
under the MIT License, and the v0.1.0 release is archived at
[https://doi.org/10.5281/zenodo.20108497](https://doi.org/10.5281/zenodo.20108497).
The analysis schema (`sonata_structure.json`), the measure-to-time
mapping (`measure_times.json`), and the manuscript itself are
licensed CC BY 4.0; the bundled reference recording is a Public
Domain performance distributed via Musopen and Wikimedia Commons.
The tool has a single external runtime dependency,
OpenSheetMusicDisplay v1.8.7, and runs from any static-file server.
A live deployment that bundles the reference recording is available
at https://rosyrosys.github.io/sonata-form-viz/ for reviewer use.
Detailed reproducibility notes covering the recording-substitution
procedure, the tap-calibration flow, browser-version compatibility,
and the release schedule for the forthcoming randomized controlled
trial response dataset are provided in the supplementary
`REPRODUCIBILITY.md` and on the Zenodo record.


# Acknowledgments

*[To be added after blinding requirements are met. The author(s)
gratefully acknowledge the open-source contributors of
OpenSheetMusicDisplay, the curators of the Musopen / Wikimedia
Commons Public Domain recording of K. 545 used in the bundled
deployment, and the Algomus research group whose annotation
conventions inspired the schema interoperability discussed in §4.3.]*


# Ethics and Consent

The present manuscript reports the design, implementation, and
analytical case study of an open-source software tool, supplemented
by a single-expert pilot review (§6) treated under standard
expert-evaluation methodology. It does not include learner-subjects
evaluation, animal subjects, or human-derived data beyond the
single expert pilot reviewer who provided written informed consent
for anonymous reporting. The planned randomized controlled trial
outlined in §7.3, which will involve undergraduate music-education
majors as participants and the System Usability Scale (Brooke,
1996) as a primary measure, will be conducted under the appropriate
institutional review board approval and reported in a separate
follow-up publication.


# Competing Interests

The author(s) has/have no competing interests to declare.


# Funding Information

*[To be filled at final submission: list any funding sources with
grant numbers, or state "No funding was received for this work."
The development of the tool, the bundled assets, and the manuscript
were prepared by the author(s) without external grant support unless
otherwise specified at the online submission stage.]*


# Authors' Contributions

*[To be filled at final submission. For single authorship: "The
sole author conceived the study, designed and implemented the
software, prepared the analysis schema and case study, drafted the
manuscript, and approved the final version." For multi-authored
submissions, please supply a CRediT-style contribution statement.]*


# References

- Allegraud, P., Bigo, L., Feisthauer, L., Giraud, M., Groult, R.,
  Leguy, E., & Levé, F. (2019). Learning sonata form structure on
  Mozart's string quartets. *Transactions of the International
  Society for Music Information Retrieval, 2*(1), 82–96.
  https://doi.org/10.5334/tismir.27
- Ballester, C., Bacot, B., Bigo, L., Borsan, V. N., Couturier, L.,
  Déguernel, K., et al. (2025). Interacting with annotated and
  synchronized music corpora on the Dezrann web platform.
  *Transactions of the International Society for Music Information
  Retrieval, 8*(1), 121–139. https://doi.org/10.5334/tismir.212
- Braun, V., & Clarke, V. (2006). Using thematic analysis in
  psychology. *Qualitative Research in Psychology, 3*(2), 77–101.
  https://doi.org/10.1191/1478088706qp063oa
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
- Cook, N. (1990). *Music, imagination, and culture.* Oxford University
  Press.
- Couprie, P. (2008). iAnalyse: un logiciel d'aide à l'analyse
  musicale. In *Journées d'Informatique Musicale (JIM)* (pp. 115–121).
  Albi, France. HAL: hal-00823867.
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
- LaRue, J. (1970). *Guidelines for style analysis.* Norton.
- Margulis, E. H. (2014). *On repeat: How music plays the mind.*
  Oxford University Press.
- Mayer, R. E. (2009). *Multimedia learning* (2nd ed.). Cambridge
  University Press.
- Mozart, W. A. (1986). *Neue Mozart-Ausgabe IX/25: Klaviersonaten
  Bd. 2.* Bärenreiter.
- Müller, M. (2015). *Fundamentals of music processing: Audio,
  analysis, algorithms, applications.* Springer.
  https://doi.org/10.1007/978-3-319-21945-5
- Nakamura, E., Yoshii, K., & Katayose, H. (2017). Performance error
  detection and post-processing for fast and accurate symbolic music
  alignment. In *Proceedings of the 18th International Society for
  Music Information Retrieval Conference (ISMIR)* (pp. 347–353).
- North, A. C., & Hargreaves, D. J. (2008). *The social and applied
  psychology of music.* Oxford University Press.
- Paivio, A. (1991). Dual coding theory: Retrospect and current status.
  *Canadian Journal of Psychology, 45*(3), 255–287.
- Sapp, C. S. (2017). Verovio Humdrum Viewer. In *Music Encoding
  Conference 2017*.


# Appendix A. Screenshots

Three screenshots from the live deployment
(https://rosyrosys.github.io/sonata-form-viz/en/) are included in the
submission package under `figures/`. Captions:

- **Figure A.1.** System overview at startup, showing the title
  banner, the section-level timeline (top: pastel-blue exposition,
  pastel-amber development, pastel-green recapitulation), the
  now-playing analysis pane (theme zone, key, current measure), and
  the OSMD-rendered MusicXML score below.
- **Figure A.2.** Active-listening control panel and demo-mode
  fallback. The yellow *Demo mode* bar is automatically shown when no
  audio file is available (e.g. on the public deployment, where the
  copyrighted reference recording is not bundled). Below it: section-
  jump buttons (Exposition / Development / Recapitulation), playback-
  speed slider, color/cursor/loop toggles, calibration controls, and a
  keyboard-shortcut legend.
- **Figure A.3.** Recapitulation P region (mm. 42–58) on the score
  with the pastel-amber section overlay visible at the section
  boundary; the F-major key signature (one flat) is the visible cue
  that distinguishes the recapitulation P from the C-major exposition
  P, illustrating K. 545's subdominant-recapitulation deformation
  discussed in §3.3.
