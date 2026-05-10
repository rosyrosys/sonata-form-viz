/**
 * Sonata Form Visualization — Google Forms 자동 생성 스크립트 (한국어)
 *
 * 사용법:
 *   1. https://script.google.com 접속, 우측 상단 "새 프로젝트"
 *   2. 이 파일 내용 전체 복사하여 Code.gs 자리에 붙여넣기
 *   3. (선택) 발췌 음원을 YouTube 비공개로 업로드하고
 *      EXCERPT_URLS_PRE / _POST 의 URL 을 본인 URL 로 교체
 *   4. createSonataFormSurvey() 함수 선택 후 ▶︎ 실행
 *   5. Google 권한 승인 화면 → "고급" → "안전하지 않은 페이지로 이동" → 허용
 *   6. 실행 완료 후 콘솔에 Form URL 출력 → Drive 에서 확인 가능
 *
 * 주의:
 *   - SUS 10 문항은 표준 척도(Brooke 1996 / 김주현 외 2014) 그대로 써야
 *     비교 가능성이 보장됩니다. 본 스크립트는 "SUS Item 1..10" 자리만
 *     생성하므로, 생성된 Form 을 열어 각 문항 텍스트를 김주현 외 (2014)
 *     공식 한국어판으로 직접 채워주세요.
 */

// =============================================================
// 설정 — 본인 환경에 맞게 수정
// =============================================================

const FORM_TITLE = 'Sonata Form Visualization 학습 효과 평가';
const FORM_DESC =
  '본 설문은 약 60분 소요되며, 모든 응답은 익명으로 처리됩니다.\n' +
  '진행 순서: A 사전 설문 → B-α 사전 식별 과제 → 도구 학습(별도 진행) ' +
  '→ B-β 사후 식별 과제 → C 자유서술 → D 사용성 평가.\n' +
  '동의서는 별도 안내문 참조.';

// 발췌 음원 URL (YouTube 비공개 또는 공개 PD 녹음 링크).
// 24 개 전부 본인이 업로드한 URL 로 교체 후 실행.
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
  '① 제시부 — 제1주제 (P)',
  '② 제시부 — 제2주제 (S)',
  '③ 제시부 — codetta',
  '④ 발전부',
  '⑤ 재현부 — 제1주제',
  '⑥ 재현부 — 제2주제',
  '⑦ 재현부 — codetta',
  '⑧ 모름 / 소나타 형식 아님'
];

// 정답 키 (사전·사후 각 12 문항). 자동 채점 사용 시 활용.
const ANSWER_KEY_PRE = [
  '① 제시부 — 제1주제 (P)',
  '② 제시부 — 제2주제 (S)',
  '④ 발전부',
  '⑤ 재현부 — 제1주제',
  '① 제시부 — 제1주제 (P)',
  '② 제시부 — 제2주제 (S)',
  '④ 발전부',
  '⑤ 재현부 — 제1주제',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님'
];
const ANSWER_KEY_POST = [
  '① 제시부 — 제1주제 (P)',
  '② 제시부 — 제2주제 (S)',
  '③ 제시부 — codetta',
  '⑥ 재현부 — 제2주제',
  '① 제시부 — 제1주제 (P)',
  '② 제시부 — 제2주제 (S)',
  '④ 발전부',
  '⑥ 재현부 — 제2주제',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님',
  '⑧ 모름 / 소나타 형식 아님'
];

const EXCERPT_LABELS_PRE = [
  '1. Beethoven Op.49 No.2, Mvt.I (마디 1–8)',
  '2. Beethoven Op.49 No.2, Mvt.I (마디 21–28)',
  '3. Beethoven Op.49 No.2, Mvt.I (마디 53–60)',
  '4. Beethoven Op.49 No.2, Mvt.I (마디 67–74)',
  '5. Haydn Hob.XVI:35, Mvt.I (마디 1–8)',
  '6. Haydn Hob.XVI:35, Mvt.I (마디 24–31)',
  '7. Haydn Hob.XVI:35, Mvt.I (마디 58–65)',
  '8. Haydn Hob.XVI:35, Mvt.I (마디 79–86)',
  '9. Schubert Impromptu Op.142 No.2 (A부)',
  '10. Schubert Impromptu Op.142 No.2 (B부, Trio)',
  '11. Schubert Impromptu Op.142 No.2 (A부 회귀)',
  '12. Bach Two-Part Invention No.1 (마디 1–7)'
];
const EXCERPT_LABELS_POST = [
  '1. Beethoven Op.49 No.2, Mvt.I (마디 9–14)',
  '2. Beethoven Op.49 No.2, Mvt.I (마디 36–44)',
  '3. Beethoven Op.49 No.2, Mvt.I (마디 47–52)',
  '4. Beethoven Op.49 No.2, Mvt.I (마디 75–82)',
  '5. Haydn Hob.XVI:35, Mvt.I (마디 17–24)',
  '6. Haydn Hob.XVI:35, Mvt.I (마디 32–40)',
  '7. Haydn Hob.XVI:35, Mvt.I (마디 50–57)',
  '8. Haydn Hob.XVI:35, Mvt.I (마디 87–94)',
  '9. Schubert Impromptu Op.90 No.2 (A부)',
  '10. Schubert Impromptu Op.90 No.2 (B부, Scherzo)',
  '11. Bach Two-Part Invention No.8 (마디 1–6)',
  '12. Mozart Variations K.265 (Theme)'
];

// =============================================================
// 메인 — Apps Script 에디터에서 이 함수 실행
// =============================================================
function createSonataFormSurvey() {
  const form = FormApp.create(FORM_TITLE)
    .setDescription(FORM_DESC)
    .setCollectEmail(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(true)
    .setIsQuiz(true);  // 자동 채점 활성화 (식별 과제)

  // ----- §A 인구통계 -----
  form.addPageBreakItem()
    .setTitle('A. 인구통계 및 음악 경험')
    .setHelpText('소요 시간: 약 5분');

  form.addTextItem()
    .setTitle('A1. 익명 코드 (P-XXX)')
    .setHelpText('연구진이 부여한 익명 코드를 입력하세요. 예: P-001')
    .setRequired(true);

  form.addTextItem().setTitle('A2. 만 나이').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A3. 성별')
    .setChoiceValues(['남', '여', '답하지 않음'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A4. 학년')
    .setChoiceValues(['2학년', '3학년', '4학년', '기타'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('A5. 전공 (해당하는 모두)')
    .setChoiceValues(['음악교육', '작곡', '피아노', '성악',
                      '관현악', '음악학', '실용음악', '기타'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('A6. 정규 음악 교육 총 연수 (년)').setRequired(true);

  form.addTextItem()
    .setTitle('A7. 주 악기').setRequired(true);

  form.addScaleItem()
    .setTitle('A8. 소나타 형식에 대한 현재 이해도')
    .setBounds(1, 5)
    .setLabels('전혀 모름', '잘 알고 가르칠 수 있음')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A9. 모차르트 K. 545 1악장 연주 경험')
    .setChoiceValues(['있음 (학습용)', '있음 (공연·콩쿠르)', '없음'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A10. 모차르트 K. 545 1악장 청취 경험')
    .setChoiceValues(['자주 (10회 이상)', '가끔 (3–9회)',
                      '드물게 (1–2회)', '처음'])
    .setRequired(true);

  // ----- §B-α 사전 식별 과제 -----
  form.addPageBreakItem()
    .setTitle('B-α. 사전 형식 식별 과제 (12 문항)')
    .setHelpText('각 발췌(약 30초)를 한 번 청취 후 가장 적합한 라벨을 ' +
                 '하나 고르세요. 이미 알고 있는 곡도 *발췌가 어느 형식 ' +
                 '구간인지* 만 판단해 주세요.');

  for (let i = 0; i < 12; i++) {
    if (EXCERPT_URLS_PRE[i] && EXCERPT_URLS_PRE[i] !== PLACEHOLDER_URL) {
      try {
        form.addVideoItem()
          .setTitle('발췌 ' + EXCERPT_LABELS_PRE[i])
          .setVideoUrl(EXCERPT_URLS_PRE[i]);
      } catch (e) {
        form.addSectionHeaderItem()
          .setTitle(EXCERPT_LABELS_PRE[i])
          .setHelpText('음원: ' + EXCERPT_URLS_PRE[i]);
      }
    } else {
      form.addSectionHeaderItem()
        .setTitle(EXCERPT_LABELS_PRE[i])
        .setHelpText('▶︎ 음원 URL 을 EXCERPT_URLS_PRE[' + i + '] 에 채워주세요.');
    }

    const item = form.addMultipleChoiceItem()
      .setTitle('B-α-' + (i + 1) + '. 위 발췌의 형식 라벨은?')
      .setRequired(true);
    item.setChoices(FORM_OPTIONS.map(opt =>
      item.createChoice(opt, opt === ANSWER_KEY_PRE[i])
    ));
    item.setPoints(1);
  }

  // ----- §B-β 사후 식별 과제 -----
  form.addPageBreakItem()
    .setTitle('B-β. 사후 형식 식별 과제 (12 문항)')
    .setHelpText('도구 학습 회기 후 진행. 발췌는 사전과 다른 12개입니다.');

  for (let i = 0; i < 12; i++) {
    if (EXCERPT_URLS_POST[i] && EXCERPT_URLS_POST[i] !== PLACEHOLDER_URL) {
      try {
        form.addVideoItem()
          .setTitle('발췌 ' + EXCERPT_LABELS_POST[i])
          .setVideoUrl(EXCERPT_URLS_POST[i]);
      } catch (e) {
        form.addSectionHeaderItem()
          .setTitle(EXCERPT_LABELS_POST[i])
          .setHelpText('음원: ' + EXCERPT_URLS_POST[i]);
      }
    } else {
      form.addSectionHeaderItem()
        .setTitle(EXCERPT_LABELS_POST[i])
        .setHelpText('▶︎ 음원 URL 을 EXCERPT_URLS_POST[' + i + '] 에 채워주세요.');
    }

    const item = form.addMultipleChoiceItem()
      .setTitle('B-β-' + (i + 1) + '. 위 발췌의 형식 라벨은?')
      .setRequired(true);
    item.setChoices(FORM_OPTIONS.map(opt =>
      item.createChoice(opt, opt === ANSWER_KEY_POST[i])
    ));
    item.setPoints(1);
  }

  // ----- §C 자유서술 -----
  form.addPageBreakItem()
    .setTitle('C. 자유 서술')
    .setHelpText('본 도구를 사용한 학습 경험에 대한 짧은 의견.');

  form.addParagraphTextItem()
    .setTitle('C1. 본 도구로 K. 545 1악장을 학습하면서 가장 인상적이었던 ' +
              '발견 한 가지를 자유롭게 적어 주세요.')
    .setHelpText('3–5문장 권장, 최대 200자.')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('C2. 본 도구의 어떤 기능이 학습에 가장 도움이 되었나요? ' +
              '(복수 선택 가능)')
    .setChoiceValues([
      '형식 타임라인 (상단 색상 바)',
      '악보 위 마디 색상 오버레이',
      '분석 패널 자동 해설',
      '섹션 점프 버튼',
      '섹션 반복 재생',
      '재생 속도 조절',
      '키보드 단축키',
      '기타'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('C3. 개선이 필요한 부분이 있다면 적어 주세요. (선택)')
    .setRequired(false);

  // ----- §D SUS -----
  form.addPageBreakItem()
    .setTitle('D. 시스템 사용성 평가 (SUS)')
    .setHelpText('아래 10개 문항에 대해 1(매우 동의 안 함) – 5(매우 동의함) ' +
                 '으로 응답해 주세요. ' +
                 '※ 각 문항 텍스트는 김주현 외 (2014) 한국어판 SUS 본문으로 ' +
                 'Form 에 직접 입력하시거나 IRB 부록의 공식 한국어판을 참조하세요.');

  for (let i = 1; i <= 10; i++) {
    form.addScaleItem()
      .setTitle('D' + i + '. [SUS Item ' + i + ' — 김주현 외 (2014) 한국어판 본문 입력]')
      .setBounds(1, 5)
      .setLabels('매우 동의 안 함', '매우 동의함')
      .setRequired(true);
  }

  // ----- 마무리 -----
  form.addPageBreakItem()
    .setTitle('완료')
    .setHelpText('마지막으로 제출 버튼을 눌러주세요. ' +
                 '연구 참여에 감사드립니다.');

  // 결과: URL 출력
  const editUrl = form.getEditUrl();
  const publishUrl = form.getPublishedUrl();
  Logger.log('=== Form 생성 완료 ===');
  Logger.log('편집 URL : ' + editUrl);
  Logger.log('응답 URL : ' + publishUrl);
  Logger.log('총 문항 수: ' + form.getItems().length);
  return { editUrl, publishUrl };
}
