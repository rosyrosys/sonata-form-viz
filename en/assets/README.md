# Audio file

This repository **bundles a Public Domain recording** so the tool works
out of the box:

```
assets/mozart_k545_mvt1.ogg   (2.87 MB, 2:14, Public Domain)
```

| Field | Value |
|---|---|
| Performer | Robin Alciatore (piano) |
| Source | [Musopen](https://musopen.org/) (released into the Public Domain) |
| Distribution | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Wolfgang_Amadeus_Mozart_-_sonata_no._16_in_c_major,_k.545_'sonata_facile'_-_i._allegro.ogg) |
| Duration | 2:14 (133.88 s) — Movement I only |
| Exposition repeat | Not taken (single pass through the exposition) |
| License | Public Domain (no attribution required, but Musopen requests inline acknowledgement when convenient) |

## Replacing the bundled recording

If you prefer a different recording (e.g. a commercial release like
Schiff's Carnegie Hall 2015 album, or a faster/slower interpretation),
replace `mozart_k545_mvt1.ogg` with your own file. The browser's
`<audio>` element accepts MP3 too — drop a `mozart_k545_mvt1.mp3`
next to the OGG and the MP3 source takes precedence (it is listed
first in `index.html`).

**Calibration when swapping recordings.** Press **T** in the page and
tap **Space** at the six landmark measures the on-screen prompts ask
for. The system stores the calibration in `localStorage`, so you only
need to do it once per recording. If your recording takes the
exposition repeat (Schiff does; Alciatore does not), the calibration
flow also captures the repeat boundaries.

## Other Public Domain sources

If the bundled OGG ever becomes unavailable or you want alternatives:

- **Musopen** — https://musopen.org/music/23-piano-sonata-no-16-facile-k-545/ (free account required for download)
- **IMSLP** — https://imslp.org/wiki/Piano_Sonata_No.16,_K.545_(Mozart,_Wolfgang_Amadeus) — under the *Recordings* tab, pick a file labeled "Public Domain" or one of the CC-BY recordings (e.g. Quinn Mason, Galaxy Bösendorfer 290)

## Does the audio have to be exactly 133.88 s?

No. The system performs proportional handling and the calibration
flow re-anchors measures per recording. The `audio_segment` block in
`data/measure_times.json` defines the segment within the audio file
that corresponds to Mvt. I; tweak `end` (and re-enable
`exposition_repeat` if applicable) when replacing the recording.

## Mvt. I-only recording vs full-sonata recording

`audio_segment.end` in `data/measure_times.json` is the audio time
(in seconds) at which Mvt. I ends. The bundled OGG is Mvt. I only
(133.88 s = `audio_segment.end`). If you use a recording of the full
sonata (e.g. ~720 s), set this value to the end of Mvt. I (e.g.
193 s for Schiff) so playback auto-stops at the movement boundary
and does not spill into Mvt. II.
