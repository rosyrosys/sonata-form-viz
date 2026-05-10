# Google Forms Auto-Generation Guide — Sonata Form Visualization

## Overview

The files in this folder let you create the entire IRB-approved
questionnaire as a single Google Form **in three minutes**, instead of
typing 70+ items by hand.

| File | Purpose |
|---|---|
| `gforms_create_en.gs` | Apps Script that builds the English form |
| `gforms_create_ko.gs` | Apps Script for the Korean form |
| `gforms_questionnaire.csv` | Reference CSV listing every item (bilingual) |
| `README_gforms.md` | This file |

> Google Forms does not support direct CSV import. The official and
> fastest path is **Apps Script** (the CSV is a reference document).

---

## 30-second usage (English version)

### Step 1 — Create an Apps Script project

1. In Chrome, open https://script.google.com
2. Click **New project** in the upper-left
3. Delete the default code (`function myFunction() { ... }`)
4. Open `gforms_create_en.gs`, copy the entire contents, and paste
   into the editor
5. Rename the project (e.g. "Sonata Form Survey") via the title field
6. Save with ⌘/Ctrl + S

### Step 2 — Run

1. In the function dropdown, select **`createSonataFormSurvey`**
2. Click ▶ **Run**
3. On first run, a permission prompt appears:
   - "Review permissions" → choose your Google account
   - "Google hasn't verified this app" → **Advanced** → **Go to
     (project name) (unsafe)** → **Allow**
4. The Execution log prints:
   ```
   === Form created ===
   Edit URL    : https://docs.google.com/forms/d/...../edit
   Response URL: https://docs.google.com/forms/d/e/..../viewform
   Total items : 70+
   ```
5. Click the Edit URL → the new form opens from your Google Drive

### Step 3 — Three required follow-ups

The auto-generated form needs three small adjustments before use.

#### 3-1. Fill in the 24 audio-excerpt URLs

In the Apps Script, edit the two arrays at the top with your hosted
audio URLs and run again:

```javascript
const EXCERPT_URLS_PRE = [
  'https://youtu.be/abc123',  // 1. Beethoven mm.1-8
  'https://youtu.be/xyz789',  // 2. Beethoven mm.21-28
  // ... 12 entries
];
```

Recommended hosting:
- **Option A (preferred)**: upload PD audio as *unlisted* YouTube
  videos; you can include `&t=15s` start offsets if needed
- **Option B**: upload mp3 files to Google Drive and paste shareable
  links (Drive video items are slightly fragile)
- **Option C**: host mp3 on GitHub Pages and place the link in the
  item's help text (the video item only renders YouTube URLs)

After updating URLs, re-run the script to regenerate. Delete the
previous form manually.

#### 3-2. Paste the SUS items verbatim

In §D the script creates ten Likert items labeled like
`D1. [SUS Item 1 — paste the official Brooke (1996) text here]`.

For each, copy the corresponding original SUS item from
**Brooke, J. (1996). SUS: A "quick and dirty" usability scale.** The
script does *not* embed the SUS text directly because the published
instrument must be reproduced unchanged to preserve cross-study
comparability of scores.

#### 3-3. Connect a response sheet

In the form's **Responses** tab, click the Sheets icon to create a new
spreadsheet. Submissions then stream into the sheet in real time.

### Step 4 — Pilot, then live

1. Take the survey yourself (~10 min); confirm video playback works
   and the session fits 60 minutes
2. Run a 2-person pilot with colleagues
3. Begin recruitment

---

## Important — auto-grading is enabled

The script calls `setIsQuiz(true)` and assigns 1-point answer keys to
the 24 identification items. If the participant sees their score
immediately, the pretest result could leak into posttest performance.

Mitigation:
- In the form: ⚙ **Settings** → **Quiz** → **Release scores: Later,
  after manual review** — keeps grades hidden until you release them
- Or: remove `.setIsQuiz(true)` from the script and re-run if you
  prefer no auto-grading at all

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Permission loop | Try in a Chrome incognito window; if your school G Suite blocks external scripts, switch to a personal Gmail |
| Video item not inserted | The URL was not a YouTube link. Use YouTube, or note that the script falls back to a section header with the URL in help text |
| Form too long, fatigue | Split §A and §D into a separate form: §A in the pre-session, §B-β/C/D in the post-session |
| Analyzing data in R | Sheet → Download .csv → `read_csv()` → see `paper/paper_en.md` §6 |

---

## Optional next-stage automation

- **Auto-assign anonymous codes** via an `onFormSubmit` trigger
- **OSF sync**: nightly upload of anonymized response sheet via OSF API
- **R Markdown pipeline**: sheet → R-Markdown report with auto-scoring
  and pre/post t-test → HTML

Ask if you'd like any of these scripts written.
