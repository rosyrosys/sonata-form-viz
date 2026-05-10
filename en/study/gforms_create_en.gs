/**
 * Sonata Form Visualization — Google Forms Auto-Generation Script (English)
 *
 * Usage:
 *   1. Go to https://script.google.com and click "New project".
 *   2. Replace the contents of Code.gs with this entire file.
 *   3. (Optional) Upload your 24 audio excerpts as unlisted YouTube
 *      videos and replace EXCERPT_URLS_PRE / _POST with your URLs.
 *   4. Select createSonataFormSurvey() and click ▶ Run.
 *   5. Approve permissions ("Advanced" → "Go to project (unsafe)" → Allow).
 *   6. The console will print the form's edit URL; the form is also
 *      created in your Google Drive.
 *
 * Note:
 *   - The 10 SUS items must be reproduced verbatim from Brooke (1996)
 *     to preserve cross-study comparability of scores. This script
 *     creates 10 placeholder Likert items; open the generated form
 *     and paste the official SUS item text into each.
 */

// ============================================================
// Configuration — adjust as needed
// ============================================================

const FORM_TITLE = 'Sonata Form Visualization — Learning-Effect Evaluation';
const FORM_DESC =
  'This survey takes about 60 minutes. All responses are anonymous.\n' +
  'Order: A pretest survey → B-α pretest identification task → tool ' +
  'learning session (separate) → B-β posttest identification task → ' +
  'C free response → D usability scale.\n' +
  'See the consent form for full study information.';

const PLACEHOLDER_URL = 'https://youtu.be/REPLACE_ME';
const EXCERPT_URLS_PRE = [
  PLACEHOLDER_URL, // 1. Beethoven Op.49.2 mvt1 mm.1-8
  PLACEHOLDER_URL, // 2. Beethoven Op.49.2 mvt1 mm.21-28
  PLACEHOLDER_URL, // 3. Beethoven Op.49.2 mvt1 mm.53-60
  PLACEHOLDER_URL, // 4. Beethoven Op.49.2 mvt1 mm.67-74
  PLACEHOLDER_URL, // 5. Haydn XVI:35 mvt1 mm.1-8
  PLACEHOLDER_URL, // 6. Haydn XVI:35 mvt1 mm.24-31
  PLACEHOLDER_URL, // 7. Haydn XVI:35 mvt1 mm.58-65
  PLACEHOLDER_URL, // 8. Haydn XVI:35 mvt1 mm.79-86
  PLACEHOLDER_URL, // 9. Schubert Op.142 No.2 A
  PLACEHOLDER_URL, // 10. Schubert Op.142 No.2 B
  PLACEHOLDER_URL, // 11. Schubert Op.142 No.2 A return
  PLACEHOLDER_URL  // 12. Bach Invention No.1
];
const EXCERPT_URLS_POST = [
  PLACEHOLDER_URL, // 1. Beethoven Op.49.2 mvt1 mm.9-14
  PLACEHOLDER_URL, // 2. Beethoven Op.49.2 mvt1 mm.36-44
  PLACEHOLDER_URL, // 3. Beethoven Op.49.2 mvt1 mm.47-52
  PLACEHOLDER_URL, // 4. Beethoven Op.49.2 mvt1 mm.75-82
  PLACEHOLDER_URL, // 5. Haydn XVI:35 mvt1 mm.17-24
  PLACEHOLDER_URL, // 6. Haydn XVI:35 mvt1 mm.32-40
  PLACEHOLDER_URL, // 7. Haydn XVI:35 mvt1 mm.50-57
  PLACEHOLDER_URL, // 8. Haydn XVI:35 mvt1 mm.87-94
  PLACEHOLDER_URL, // 9. Schubert Op.90 No.2 A
  PLACEHOLDER_URL, // 10. Schubert Op.90 No.2 B
  PLACEHOLDER_URL, // 11. Bach Invention No.8
  PLACEHOLDER_URL  // 12. Mozart K.265 Theme
];

const FORM_OPTIONS = [
  '① Exposition — Primary theme (P)',
  '② Exposition — Secondary theme (S)',
  '③ Exposition — Codetta',
  '④ Development',
  '⑤ Recapitulation — Primary theme',
  '⑥ Recapitulation — Secondary theme',
  '⑦ Recapitulation — Codetta',
  '⑧ Don\'t know / Not sonata form'
];

const ANSWER_KEY_PRE = [
  '① Exposition — Primary theme (P)',
  '② Exposition — Secondary theme (S)',
  '④ Development',
  '⑤ Recapitulation — Primary theme',
  '① Exposition — Primary theme (P)',
  '② Exposition — Secondary theme (S)',
  '④ Development',
  '⑤ Recapitulation — Primary theme',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form'
];
const ANSWER_KEY_POST = [
  '① Exposition — Primary theme (P)',
  '② Exposition — Secondary theme (S)',
  '③ Exposition — Codetta',
  '⑥ Recapitulation — Secondary theme',
  '① Exposition — Primary theme (P)',
  '② Exposition — Secondary theme (S)',
  '④ Development',
  '⑥ Recapitulation — Secondary theme',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form',
  '⑧ Don\'t know / Not sonata form'
];

const EXCERPT_LABELS_PRE = [
  '1. Beethoven Op.49 No.2, Mvt.I (mm. 1–8)',
  '2. Beethoven Op.49 No.2, Mvt.I (mm. 21–28)',
  '3. Beethoven Op.49 No.2, Mvt.I (mm. 53–60)',
  '4. Beethoven Op.49 No.2, Mvt.I (mm. 67–74)',
  '5. Haydn Hob.XVI:35, Mvt.I (mm. 1–8)',
  '6. Haydn Hob.XVI:35, Mvt.I (mm. 24–31)',
  '7. Haydn Hob.XVI:35, Mvt.I (mm. 58–65)',
  '8. Haydn Hob.XVI:35, Mvt.I (mm. 79–86)',
  '9. Schubert Impromptu Op.142 No.2 (A section)',
  '10. Schubert Impromptu Op.142 No.2 (B section, Trio)',
  '11. Schubert Impromptu Op.142 No.2 (A return)',
  '12. Bach Two-Part Invention No.1 (mm. 1–7)'
];
const EXCERPT_LABELS_POST = [
  '1. Beethoven Op.49 No.2, Mvt.I (mm. 9–14)',
  '2. Beethoven Op.49 No.2, Mvt.I (mm. 36–44)',
  '3. Beethoven Op.49 No.2, Mvt.I (mm. 47–52)',
  '4. Beethoven Op.49 No.2, Mvt.I (mm. 75–82)',
  '5. Haydn Hob.XVI:35, Mvt.I (mm. 17–24)',
  '6. Haydn Hob.XVI:35, Mvt.I (mm. 32–40)',
  '7. Haydn Hob.XVI:35, Mvt.I (mm. 50–57)',
  '8. Haydn Hob.XVI:35, Mvt.I (mm. 87–94)',
  '9. Schubert Impromptu Op.90 No.2 (A section)',
  '10. Schubert Impromptu Op.90 No.2 (B section, Scherzo)',
  '11. Bach Two-Part Invention No.8 (mm. 1–6)',
  '12. Mozart Variations K.265 (Theme)'
];

// ============================================================
// Main — run this from the Apps Script editor
// ============================================================
function createSonataFormSurvey() {
  const form = FormApp.create(FORM_TITLE)
    .setDescription(FORM_DESC)
    .setCollectEmail(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(true)
    .setIsQuiz(true);

  // ----- §A demographics -----
  form.addPageBreakItem()
    .setTitle('A. Demographics & Music Background')
    .setHelpText('About 5 minutes.');

  form.addTextItem()
    .setTitle('A1. Anonymous code (P-XXX)')
    .setHelpText('Use the code given to you by the researcher, e.g. P-001.')
    .setRequired(true);
  form.addTextItem().setTitle('A2. Age (years)').setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('A3. Sex')
    .setChoiceValues(['Male', 'Female', 'Prefer not to say'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('A4. Year in school')
    .setChoiceValues(['Sophomore', 'Junior', 'Senior', 'Other'])
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('A5. Major (select all that apply)')
    .setChoiceValues(['Music education', 'Composition', 'Piano', 'Voice',
                      'Strings/Winds/Percussion', 'Musicology',
                      'Applied music', 'Other'])
    .setRequired(true);
  form.addTextItem().setTitle('A6. Total years of formal music training').setRequired(true);
  form.addTextItem().setTitle('A7. Primary instrument').setRequired(true);
  form.addScaleItem()
    .setTitle('A8. Self-rated current understanding of sonata form')
    .setBounds(1, 5)
    .setLabels('No understanding', 'Could teach it')
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('A9. Have you ever performed Mozart K. 545 Mvt. I?')
    .setChoiceValues(['Yes — for study', 'Yes — public performance/competition', 'No'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('A10. Have you previously listened to Mozart K. 545 Mvt. I?')
    .setChoiceValues(['Often (10+ times)', 'Sometimes (3–9)',
                      'Rarely (1–2)', 'Never'])
    .setRequired(true);

  // ----- §B-α pretest -----
  form.addPageBreakItem()
    .setTitle('B-α. Pretest Form-Identification Task (12 items)')
    .setHelpText('Listen once to each ~30-second excerpt and select the ' +
                 'single most appropriate label.');

  for (let i = 0; i < 12; i++) {
    if (EXCERPT_URLS_PRE[i] && EXCERPT_URLS_PRE[i] !== PLACEHOLDER_URL) {
      try {
        form.addVideoItem()
          .setTitle('Excerpt ' + EXCERPT_LABELS_PRE[i])
          .setVideoUrl(EXCERPT_URLS_PRE[i]);
      } catch (e) {
        form.addSectionHeaderItem()
          .setTitle(EXCERPT_LABELS_PRE[i])
          .setHelpText('Audio: ' + EXCERPT_URLS_PRE[i]);
      }
    } else {
      form.addSectionHeaderItem()
        .setTitle(EXCERPT_LABELS_PRE[i])
        .setHelpText('▶ Replace EXCERPT_URLS_PRE[' + i + '] with your audio URL.');
    }
    const item = form.addMultipleChoiceItem()
      .setTitle('B-α-' + (i + 1) + '. The label of the excerpt above is:')
      .setRequired(true);
    item.setChoices(FORM_OPTIONS.map(opt =>
      item.createChoice(opt, opt === ANSWER_KEY_PRE[i])
    ));
    item.setPoints(1);
  }

  // ----- §B-β posttest -----
  form.addPageBreakItem()
    .setTitle('B-β. Posttest Form-Identification Task (12 items)')
    .setHelpText('Administered after the tool-learning session. ' +
                 'Different excerpts from the pretest.');

  for (let i = 0; i < 12; i++) {
    if (EXCERPT_URLS_POST[i] && EXCERPT_URLS_POST[i] !== PLACEHOLDER_URL) {
      try {
        form.addVideoItem()
          .setTitle('Excerpt ' + EXCERPT_LABELS_POST[i])
          .setVideoUrl(EXCERPT_URLS_POST[i]);
      } catch (e) {
        form.addSectionHeaderItem()
          .setTitle(EXCERPT_LABELS_POST[i])
          .setHelpText('Audio: ' + EXCERPT_URLS_POST[i]);
      }
    } else {
      form.addSectionHeaderItem()
        .setTitle(EXCERPT_LABELS_POST[i])
        .setHelpText('▶ Replace EXCERPT_URLS_POST[' + i + '] with your audio URL.');
    }
    const item = form.addMultipleChoiceItem()
      .setTitle('B-β-' + (i + 1) + '. The label of the excerpt above is:')
      .setRequired(true);
    item.setChoices(FORM_OPTIONS.map(opt =>
      item.createChoice(opt, opt === ANSWER_KEY_POST[i])
    ));
    item.setPoints(1);
  }

  // ----- §C free response -----
  form.addPageBreakItem()
    .setTitle('C. Free Response')
    .setHelpText('A few short open-ended items.');
  form.addParagraphTextItem()
    .setTitle('C1. Please describe the most striking discovery you made ' +
              'while using the tool with K. 545 Mvt. I.')
    .setHelpText('3–5 sentences, max 200 words.')
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('C2. Which features helped most? (select all that apply)')
    .setChoiceValues([
      'Form timeline (top color bar)',
      'Measure-level color overlay on the score',
      'Auto-commentary in the analysis panel',
      'Section jump buttons',
      'Looped section playback',
      'Playback-speed control',
      'Keyboard shortcuts',
      'Other'
    ])
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle('C3. What could be improved? (optional)')
    .setRequired(false);

  // ----- §D SUS -----
  form.addPageBreakItem()
    .setTitle('D. System Usability Scale (SUS)')
    .setHelpText('Rate each of the 10 items on a 1 (strongly disagree) – ' +
                 '5 (strongly agree) scale. ' +
                 '※ The actual SUS item text (Brooke 1996) must be entered ' +
                 'directly into the Form per the published instrument.');
  for (let i = 1; i <= 10; i++) {
    form.addScaleItem()
      .setTitle('D' + i + '. [SUS Item ' + i + ' — paste the official Brooke (1996) text here]')
      .setBounds(1, 5)
      .setLabels('Strongly disagree', 'Strongly agree')
      .setRequired(true);
  }

  form.addPageBreakItem()
    .setTitle('Done')
    .setHelpText('Press Submit. Thank you for participating.');

  const editUrl = form.getEditUrl();
  const publishUrl = form.getPublishedUrl();
  Logger.log('=== Form created ===');
  Logger.log('Edit URL    : ' + editUrl);
  Logger.log('Response URL: ' + publishUrl);
  Logger.log('Total items : ' + form.getItems().length);
  return { editUrl, publishUrl };
}
