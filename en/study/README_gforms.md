# Google Forms 자동 생성 가이드 — Sonata Form Visualization

## 개요

이 폴더 안에 든 파일로 IRB 승인 받은 설문지를 **Google Forms 한 개로 즉시 생성** 할 수 있습니다. 73개 항목을 수동으로 만들지 마시고 아래 절차대로 하세요 (3분).

| 파일 | 용도 |
|---|---|
| `gforms_create_ko.gs` | 한국어 설문 자동 생성 Apps Script |
| `gforms_create_en.gs` | 영어 설문 자동 생성 Apps Script |
| `gforms_questionnaire.csv` | 모든 문항을 한눈에 보는 참고 CSV (한·영 양쪽) |
| `README_gforms.md` | 이 파일 |

> Google Forms 는 CSV 직접 import 를 지원하지 않습니다. 따라서 *공식적이고 빠른* 방법은 **Apps Script** 입니다 (CSV 는 문항 점검용 참고).

---

## 30초 사용법 (한국어판 기준)

### Step 1 — Apps Script 프로젝트 만들기

1. Chrome 으로 https://script.google.com 접속
2. 좌측 상단 **새 프로젝트** 클릭
3. 기본 코드 (`function myFunction() { ... }`) 전부 *지우기*
4. `gforms_create_ko.gs` 파일 내용 *전체 복사·붙여넣기*
5. 좌측 ⓘ 프로젝트 이름을 "Sonata Form Survey" 등으로 변경
6. ⌘/Ctrl + S 로 저장

### Step 2 — 실행

1. 상단 함수 선택창에서 **`createSonataFormSurvey`** 선택
2. ▶︎ **실행** 클릭
3. 처음이면 권한 승인 화면:
   - "권한 검토" → 본인 Google 계정 선택
   - "이 앱은 Google에서 확인하지 않았습니다" 경고 → **고급** → **(프로젝트 이름) (안전하지 않음)으로 이동** → **허용**
4. 콘솔 (하단 "실행 로그") 에 다음이 출력되면 완료:
   ```
   === Form 생성 완료 ===
   편집 URL : https://docs.google.com/forms/d/...../edit
   응답 URL : https://docs.google.com/forms/d/e/..../viewform
   총 문항 수: 70+
   ```
5. **편집 URL** 클릭 → Google Drive 의 새 Form 이 열림

### Step 3 — 후속 손질 (필수)

자동 생성된 Form 은 **3가지** 만 손보면 바로 사용 가능합니다.

#### 3-1. 발췌 음원 URL 채우기 (24개)

Apps Script 상단의 두 배열에 자기 음원 URL 을 넣고 다시 실행하면 자동으로 video item 이 박힙니다:

```javascript
const EXCERPT_URLS_PRE = [
  'https://youtu.be/abc123',  // 1. Beethoven mm.1-8
  'https://youtu.be/xyz789',  // 2. Beethoven mm.21-28
  // ... 12개
];
```

음원 업로드 권장 방식:
- **방법 A (권장)**: PD 음원을 YouTube 비공개 (unlisted) 로 업로드 후 30초 시작점을 `&t=15s` 형태로 지정
- **방법 B**: Google Drive 에 업로드 → 공유 링크 → "동영상" 항목 자리에 링크 (단, Drive video item 은 약간 까다로움)
- **방법 C**: GitHub Pages 에 mp3 호스팅 → URL 을 image/text 항목 도움말에 표시 (video item 은 YouTube 만 지원)

URL 을 채우고 Apps Script 를 *다시* 실행하면 새로운 Form 이 또 생깁니다. 이전 Form 은 직접 삭제.

#### 3-2. SUS 10 문항 본문 직접 입력

자동 생성된 Form 의 §D 에는 `D1. [SUS Item 1 — 한국어 번역본 본문 입력]` 같은 자리표시자가 있습니다.

각 자리에 **Brooke (1996) System Usability Scale** 원본 10문항 또는 연구진이 준비한 한국어 직역 번역본을 직접 복사해 넣으세요. 본 스크립트가 본문을 자동 삽입하지 않는 이유는:
- 원 척도 비교 가능성 보장 (수정·번역 변형 금지)
- 저작권 안전

#### 3-3. 응답 수집 시트 연결

Form 페이지 → **응답** 탭 → 우상단 Sheets 아이콘 → 새 스프레드시트 생성. 모든 응답이 실시간으로 시트에 적힙니다.

### Step 4 — 시범 운영 + 본 운영

1. 본인 계정으로 한 번 통과 (≈10분) — 발췌 영상이 잘 재생되는지, 시간이 60분 안에 들어오는지 확인
2. 연구실 동료 1명과 N=2 파일럿
3. 모집·본 운영

---

## 한 가지 주의 — 자동 채점이 켜져 있습니다

스크립트는 `setIsQuiz(true)` 로 시작하고 식별 과제 24문항에 정답 표시 + 1점씩 부여합니다. 따라서 응답자가 제출 직후 점수를 본다면 사후과제 결과가 사전 학습 답에 영향을 줄 수 있습니다.

대응:
- Form 편집 → 설정 (⚙️) → "퀴즈" → "점수 발표" → **수동으로 발표** 선택
- 응답자 화면에 정답·점수가 즉시 보이지 않게 되어 사전·사후 검사 무결성 보존

또는 자동 채점이 필요 없으면 스크립트 첫 행의 `.setIsQuiz(true)` 를 삭제하고 다시 실행.

---

## 영어판은?

`gforms_create_en.gs` 를 사용하면 동일한 절차로 영문 Form 이 생성됩니다 — UI·옵션·라벨·해설 모두 영어, SUS 본문은 Brooke (1996) 영어 원본 직접 입력.

---

## 트러블슈팅

| 증상 | 해결 |
|---|---|
| "권한이 필요합니다" 무한 반복 | Chrome → 시크릿 창에서 다시 시도. 학교 G Suite 계정에서 외부 스크립트 차단 시 개인 Gmail 로 전환 |
| Video item 이 안 들어감 | YouTube 가 아닌 URL (Drive, mp3 직접) 일 가능성. URL 을 YouTube 로 변경하거나 video 부분이 자동으로 section header 로 폴백되었는지 확인 |
| Form 이 너무 길어 응답자 피로 | 스크립트의 §A·§D 만 별도 Form 으로 분리 — 사전 회기에서 §A, 사후 회기에서 §B-β / §C / §D 진행 |
| 응답 데이터 R 분석 | 시트 → 다운로드 .csv → R `read_csv()` → 분석 (`paper/paper_ko.md` §6 참조) |

---

## 후속 자동화 (선택)

- **자동 익명 코드 부여**: Apps Script 의 onFormSubmit trigger 로 응답마다 P-001, P-002 자동 부여 가능 → 별도 스크립트 필요시 알려주세요
- **OSF 자동 동기**: OSF API 와 연동해 응답 데이터셋을 매일 자동 업로드 가능
- **R 자동 분석 파이프라인**: 시트 → R Markdown 자동 채점 + 사전·사후 t-test → HTML 리포트
