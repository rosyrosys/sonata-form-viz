# Research Plan — Sonata Form Visualization Learning Study

> IRB-ready document. Fill in `[bracketed]` items before submission.

---

## 1. Project Information

| Item | Value |
|---|---|
| Title (EN) | Evaluation of a Synchronized Score-Audio-Form Visualization Tool |
| Title (KO) | 악보-음원-형식 동기화 시각화 도구의 학습 효과 검증 |
| Principal Investigator | [Name, Position, Institution] |
| Co-investigators | [None or list] |
| Sponsoring institution | [University] |
| Study period | [YYYY.MM] – [YYYY.MM] (~6 months) |
| IRB review type | **Exempt** (low-risk educational research, anonymous) or **expedited** |
| Funding | [None / institutional / NRF] |

## 2. Background and Rationale

The hierarchical structure of sonata form (sections × theme zones) is
abstract for learners; recognizing atypical features such as Mozart K.
545's subdominant recapitulation is especially difficult. This study
quantitatively evaluates whether a web-based tool that synchronizes
score, audio, and formal-analysis annotations along a single timeline
improves form-identification accuracy and user satisfaction.

(Detailed background: see `paper/paper_en.md` §1–2.)

## 3. Research Questions and Hypotheses

- **RQ1.** Does form-identification accuracy improve significantly after
  a single learning session with the tool?
  - **H1.** Posttest accuracy is significantly higher than pretest
    (paired one-tailed t-test, *p* < .05).
- **RQ2.** Does the tool increase spontaneous learner recognition of K.
  545's atypical subdominant recapitulation?
  - **H2.** The proportion of free-response mentions of the
    subdominant recapitulation is significantly higher post than pre
    (Fisher's exact test or McNemar test, *p* < .01).
- **RQ3.** Does the tool's usability exceed the industry SUS mean of 68?
  - **H3.** The 95% CI lower bound of the mean SUS score exceeds 68.

## 4. Study Design

### 4.1 Primary Design (Phase 1)
**Single-group pretest–posttest design** (Shadish, Cook, & Campbell,
2002). Appropriate for first-stage directional-effect verification;
within-subject control reduces individual variance.

### 4.2 Follow-up RCT Design (Phase 2, recommended)
- **Control group** (n = 30): a 30-minute video lecture covering the
  same analytical content non-synchronously.
- **Treatment group** (n = 30): 30-minute self-directed exploration of
  K. 545 with the tool.
- Random allocation; single-blind (assessor-blind) scoring.
- Identical pre/post identification task + SUS.

This document focuses on Phase 1; Phase 2 deltas are summarized in §13.

## 5. Participants

### 5.1 Target population
Undergraduate music-education, musicology, and applied-music majors in
years 2–4. Non-music-major comparison is reserved for a later study.

### 5.2 Sample size and power
- **Target N**: 30 (Phase 1) / 60 total (Phase 2 RCT, 30 per arm).
- **Power**: paired t-test, *α* = .05 (two-tailed), 1 − *β* = .80.
- **Expected effect size**: pilot (N = 18) yielded Cohen's *d* = 1.16.
  Conservative *d* = 0.6 → required N = 24; with attrition margin,
  **N = 30**. Computed in G\*Power 3.1.

### 5.3 Inclusion criteria
- Age ≥ 18.
- Currently enrolled, year 2–4 undergraduate.
- Music-related major.
- Self-reported normal hearing.
- (For KO-language administration) Korean fluency.

### 5.4 Exclusion criteria
- Prior performance experience of K. 545 Mvt. I (controls precise
  prior learning).
- First-degree advisees of any investigator (avoids dual relationships).

### 5.5 Recruitment
- Campus posters, music-school student-society mailing lists.
- Recruitment notice states anonymity, KRW 50,000 book voucher (or
  local-currency equivalent) compensation, ≈ 60-minute time
  commitment, voluntary participation.
- Volunteers email investigators directly.

## 6. Procedure

### 6.1 Session structure (single ~60-minute session)

| Step | Time | Content | Instrument |
|---|---|---|---|
| 0. Consent | 5 min | Sign / e-consent | `consent_form_en.md` |
| 1. Pretest survey | 5 min | Demographics, music background, self-rated form knowledge | `questionnaire_en.md §A` |
| 2. Pretest identification task | 10 min | 12 excerpts × 30 s, label each | `questionnaire_en.md §B`, set α |
| 3. Tool learning session | 30 min | Free exploration of K. 545 Mvt. I with the tool | http://localhost:8772/ or GitHub Pages |
| 4. Posttest identification task | 10 min | 12 *different* excerpts | `questionnaire_en.md §B`, set β |
| 5. Free response | 5 min | One most-impressive discovery | `questionnaire_en.md §C` |
| 6. SUS | 5 min | 10-item System Usability Scale | Brooke 1996 |
| 7. Debriefing | 5 min | Purpose, voucher delivery | — |

### 6.2 Setup
- Quiet room (lab or library group-study room), single participant.
- Laptop (≥ 15" screen) + headphones.
- Stable internet for hosting the tool.

### 6.3 Data collection
- All responses via Google Forms or IRB-approved LMS.
- Pre/post matching by anonymous ID (P-001 format).
- Identifiable info kept separately (consent forms, ID-name table).

## 7. Instruments

### 7.1 Demographics + music background (pretest, 7 items)
Age, sex, year, major, instrumental experience, self-rated form
understanding, prior K. 545 exposure (`questionnaire_en.md §A`).

### 7.2 Form-identification task (pre/post, 12 items each)
- 30-second excerpts, 8-option multiple choice.
- Pre and post use **different but equivalent excerpt sets**.
- Pieces:
  - Beethoven Sonata Op. 49 No. 2, Mvt. I (4 excerpts)
  - Haydn Sonata Hob. XVI:35, Mvt. I (4 excerpts)
  - Schubert Impromptus + Bach Inventions + Mozart K. 265 (4
    distractor non-sonata excerpts)
- Response options: ① Exposition P ② Exposition S ③ Exposition codetta
  ④ Development ⑤ Recap P ⑥ Recap S ⑦ Recap codetta
  ⑧ Don't know / Not sonata form
- Scoring: 1 point per correct, 0–12 total.
- Excerpt-by-excerpt key in `questionnaire_en.md §B`.

### 7.3 Free response (single posttest item)
> "Please describe in your own words the most striking discovery you
> made while using the tool."

- Two raters independently code for mention of *subdominant
  recapitulation* (binary), Cohen's κ reported.
- Trigger keywords: "F major", "subdominant", "different key",
  "starts in IV".

### 7.4 System Usability Scale (SUS, posttest, 10 items)
- Brooke (1996), 5-point Likert. Korean administration uses Kim,
  Park, & Lee (2014) validated K-SUS.
- *To preserve cross-study comparability, the original instrument is
  used verbatim from the published source* and attached to the IRB
  application as Appendix; **the 10 items are not reproduced in this
  Markdown file**.
- Scoring: standard SUS algorithm (odd-item: response − 1; even-item:
  5 − response; sum × 2.5).

## 8. Variables

| Type | Variable | Measurement |
|---|---|---|
| IV | Treatment timing (pre vs post) | Within-subject |
| DV1 | Form-identification accuracy | 0–100% (12-item correctness) |
| DV2 | Subdominant recap recognition | Binary (mentioned / not) |
| DV3 | Usability | SUS 0–100 |
| Covariate | Years of music training | Self-reported |
|  | Self-rated form knowledge | 5-point Likert |

## 9. Analysis Plan

| Hypothesis | Test | Effect size |
|---|---|---|
| H1 (accuracy gain) | Paired t-test (one-tailed) | Cohen's *d* |
| H2 (subdominant recognition) | McNemar / Fisher exact | Odds ratio |
| H3 (usability ≥ 68) | One-sample t-test + 95% CI | Cohen's *d* |
| (Exploratory) Music-training effect | Δ-score ~ training years | Adj. *R*² |

- Missing data: listwise deletion (anticipated < 5%).
- Multiple comparison: Bonferroni for three primary hypotheses
  (α = .017).
- Software: R 4.x (`{rstatix}`, `{effectsize}`) or SPSS 28.
- Pre-registration on OSF.io is recommended.

## 10. Risks and Benefits

### 10.1 Risks
- Physical/psychological: none above everyday listening + survey.
- Privacy: minimized via anonymous coding.
- Listening level recommended ≤ 70 dB.

### 10.2 Benefits
- Direct: improved form recognition through tool exposure.
- Indirect: contributes to refining the tool for educational use.

## 11. Confidentiality and Data Management

- Only **anonymous codes (P-001 format)** appear in datasets.
- Consent forms and ID–name table: paper + locked cabinet, retained
  5 years, then shredded.
- Electronic data: encrypted research-team OneDrive, retained 5
  years, then permanently deleted.
- Anonymized response dataset will be released on OSF.io under
  CC BY 4.0 after publication.
- Direct identifiers are never included in the analysis dataset.

## 12. Consent Process

1. Recruitment package includes the information sheet
   (`consent_form_en.md`).
2. Investigator reviews orally at session start; participant
   questions addressed.
3. Written or electronic signature confirms consent before any
   data collection.
4. Right to withdraw at any time without penalty is stated and
   documented.

## 13. Phase 2 (RCT) Modifications

| Item | Change |
|---|---|
| Design | Randomized between-subject |
| Control treatment | 30-minute video lecture (same content, non-synchronous) |
| Randomization | Block randomization (sex, year balanced) |
| Blinding | Assessor-blind scoring |
| Primary outcome | Δ accuracy |
| Secondary outcome | 6-week retention (delayed posttest) |
| Analysis | Mixed-effects model (lme4) — time × condition interaction |
| Pre-registration | OSF.io required |

## 14. Timeline

| Phase | Duration | Notes |
|---|---|---|
| Tool finalization + n=3 pilot | 1 wk | Excerpt timing precision |
| IRB submission | 2 wk | Exempt or expedited |
| Recruitment + data collection (Phase 1) | 4–6 wk | Until N = 30 |
| Analysis + writing | 4 wk | Update paper §6–7 |
| Submission | — | Music Education Research |

## 15. References

- Brooke, J. (1996). SUS: A "quick and dirty" usability scale.
- Kim, J., Park, J., & Lee, S. (2014). Validation of K-SUS.
  *Korean Journal of HCI*, 9(2), 31–40.
- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral
  Sciences* (2nd ed.).
- Faul, F., Erdfelder, E., Lang, A.-G., & Buchner, A. (2007). G\*Power 3.
- Hepokoski, J., & Darcy, W. (2006). *Elements of Sonata Theory.* OUP.
- Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002).
  *Experimental and Quasi-Experimental Designs.*

(Full bibliography: `paper/references.bib`.)

---

## Appendices

- `consent_form_en.md` — information sheet + consent form
- `questionnaire_en.md` — pretest, identification task, free
  response, SUS scoring sheet
- `paper/paper_en.md` — accompanying manuscript
