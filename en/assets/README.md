# Audio file

For copyright safety, this repository does not include audio. Please obtain
a recording from one of the sources below and save it in this folder as
`mozart_k545_mvt1.mp3`.

## Recommended sources (free and legal)

### 1. Musopen (public domain)
https://musopen.org/music/2697-piano-sonata-no-16-in-c-major-k-545/

Download **Movement 1**. A free account is required for MP3 download.

### 2. IMSLP (Wikimedia-affiliated)
https://imslp.org/wiki/Piano_Sonata_No.16,_K.545_(Mozart,_Wolfgang_Amadeus)

Under the *Recordings* tab, use only files labeled **CC0** or
**Public Domain**.

## File placement

```
assets/
├── README.md                       (this file)
└── mozart_k545_mvt1.mp3            ← place here
```

## Does the audio have to be 195 s long?

No. The values in `data/measure_times.json` (`audio_segment` and
`exposition_repeat`) take precedence. To fine-tune measure-level
synchronization, press **T** in the page and tap Space at six landmark
measures.

## Mvt. I-only recording vs full sonata recording

`audio_segment.end` in `data/measure_times.json` is the audio time (in
seconds) at which Mvt. I ends. If you use a recording of the full sonata
(e.g. 720 s), set this value to the end of Mvt. I (e.g. 193 s). Playback
will auto-stop at `audio_segment.end` and not spill into Mvt. II.
