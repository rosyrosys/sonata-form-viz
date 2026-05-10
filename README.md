# Sonata Form Visualization

A web-based learning tool that synchronizes a notated score, audio, and
formal analysis along a single timeline so learners can experience the
hierarchical structure of sonata form simultaneously through auditory,
visual, and cognitive channels.

**Case study:** W. A. Mozart, *Piano Sonata in C Major, K. 545*, Mvt. I (Allegro).

This work is uniquely suited to teaching sonata form because it combines
textbook-clear formal landmarks (P → S → codetta in the exposition) with a
celebrated *deformation*: the recapitulation begins in the **subdominant
(F major)** rather than the tonic.

## Two language editions

| Folder | URL when run locally |
|---|---|
| [`ko/`](./ko) | Korean edition — 한국어 |
| [`en/`](./en) | English edition |

Both editions share the same code, MusicXML, and analysis schema. They differ
only in the text of the UI labels and analysis annotations.

## Quick start

```bash
# from either ko/ or en/
npx http-server . -p 8000     # or: python -m http.server 8000
# then open http://localhost:8000/
```

Place an audio file at `assets/mozart_k545_mvt1.mp3` (see
[`ko/assets/README.md`](./ko/assets/README.md) or
[`en/assets/README.md`](./en/assets/README.md) for legal sources).

## Features

- Score rendered from MusicXML via OpenSheetMusicDisplay
- Audio playback synchronized to measure-level color overlay on the score
- Linear timeline of the form with click-to-jump
- Section looping, playback-speed control, keyboard shortcuts
- Tap calibration mode (press **T**) — six anchor measures get expanded by
  linear interpolation to the full 73-bar timing
- Demo metronome mode for environments without an audio file
- Full handling of the exposition repeat (folded back to the first pass)

## Repository layout

```
sonata-form-viz/
├── ko/                 Korean edition
│   ├── index.html · style.css · app.js
│   ├── data/
│   │   ├── sonata_structure.json   formal analysis (sections / themes)
│   │   ├── measure_times.json      measure ↔ time mapping
│   │   └── mozart_k545_mvt1.musicxml + .mxl
│   ├── paper/
│   │   ├── paper_ko.md / .docx     Korean paper draft
│   │   ├── paper_en.md / .docx     English paper draft
│   │   ├── submission_targets.md   Korean journal recommendations
│   │   └── submission_targets_en.md
│   └── assets/README.md            audio sourcing instructions
└── en/                 English edition (same structure, translated)
```

## License

- **Code** (`*.js`, `*.css`, `*.html`, `*.ps1`): MIT (see [LICENSE](./LICENSE))
- **Analysis data** (`data/*.json`) and **paper drafts** (`paper/*.md`):
  CC BY 4.0
- **MusicXML** of K. 545 included is in the public domain (Mozart, 1788)
- **Audio is NOT included.** Users must supply their own legally obtained
  recording. Public-domain recordings are available from
  [Musopen](https://musopen.org/music/2697/).

## Citation

If you use this tool in research or teaching, please cite the accompanying
paper:

```
[Author] (2026). 악보-음원-형식 동기화 시각화를 통한 소나타 형식
학습 도구의 설계와 구현. [Journal name pending].
```
