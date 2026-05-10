# 커버레터 템플릿 (한국어)

> 사용 안내:
> - 기본 템플릿 + venue 별 단락 변형이 함께 들어 있습니다.
> - 투고 직전에 `[대괄호]` 부분을 채워 넣으세요.
> - venue 전용 단락 한 개를 [본문] 자리에 끼워넣어 사용.

---

## 기본 양식

```
[저자명]
[소속·직위]
[주소]
[이메일]
[ORCID]

2026년 [월] [일]

[편집장 이름]
[학술지명] 편집위원회
귀하

투고 논문 제목: 「악보-음원-형식 동기화 시각화를 통한 소나타 형식 학습 도구의
설계와 구현 — 모차르트 피아노 소나타 K. 545 1악장을 중심으로」

본 원고를 *[학술지명]* 에 투고하고자 합니다. 본 연구는 학습자가 소나타 형식의
위계적 구조를 청각·시각·인지의 세 채널로 동시에 경험할 수 있도록, 악보·음원·
형식 분석을 시간축에서 동기화한 웹 기반 학습 도구를 설계·구현하고 그 교육 효과를
검증하였습니다.

[본문 — venue 전용 단락]

본 원고는 어떤 학술지에도 동시 투고되지 않았으며, 본 원고의 어떤 부분도 다른
출판물에 게재된 적이 없습니다. 모든 저자가 투고에 동의하였으며, 잠재적 이해
충돌은 없습니다. 본 연구의 사용성 평가는 [소속 대학명] 생명윤리위원회 IRB
승인(번호 [____]) 을 받았습니다.

본 도구의 소스코드와 분석 데이터는 GitHub 에 공개되어 있으며
(https://github.com/rosyrosys/sonata-form-viz), Zenodo DOI [10.5281/zenodo.XXXXX]
가 부여되어 있습니다. 모든 자료는 재현 가능하도록 정리되어 있습니다.

검토 부탁드리며, 답변을 기다리겠습니다.

감사합니다.

[저자명] 드림
```

---

## venue 전용 단락 (위 [본문] 자리에 사용)

### A. 음악교육연구 / 음악교수법연구 (KCI)

```
본 연구는 2022 개정 교육과정 음악과 일반선택 "음악 감상과 비평" 의
*형식의 인지와 비평적 기술* 성취기준에 직접 대응하는 교육 도구를 제안합니다.
국내 학교 음악교육 현장에서 표준 교재로 사용되는 모차르트 K. 545 1악장을
사례곡으로 하여, 학부 음악교육 전공생 N=18 을 대상으로 한 평가에서 형식
식별 정확도가 47.2% 에서 71.8% 로 유의미하게 향상되었습니다 (t(17)=4.92,
p<.01, Cohen's d=1.16). 시스템 사용성 척도(SUS) 점수 평균 81.4 는 산업 평균
68 을 상회합니다.

본 도구의 핵심 교육적 기여는 K. 545 의 *재현부 하속조 시작* 이라는 비전형
사례를 학습자에게 색상·라벨·자동 해설의 결합으로 명시화한 점입니다. 사후
자유서술에서 78%의 참여자가 이 비전형성을 자발적으로 언급하여, 다중 표상
시각화가 *형식의 규범과 예외* 를 동시에 가르치는 데 효과적임을 시사합니다.

본 원고는 KCI 등재지 *음악교육연구* 의 독자가 가장 직접적으로 활용할 수 있는
형태로 작성되었으며, 한국어 원고로 제출합니다.
```

### B. JMTE (Journal of Music, Technology and Education)

```
This manuscript fits squarely within the JMTE remit of "music technology
in educational contexts," extending the Soundslice/MuseScore-Web style of
score-following with a *first-class formal-analysis layer* that has not
been present in prior tools. The novelty is two-fold: (i) a hierarchical
JSON schema for sonata-form analysis (sections × theme zones) released
open-source, and (ii) an exposition-repeat folding scheme that lets the
visual cursor track the *first-pass* analytical position even while the
performer is in the second pass.

We provide a quantitative evaluation (N=18 undergraduates, single-group
pre-/post-test) showing a large-effect-size gain (d=1.16) in form-
identification accuracy, plus a SUS score (81.4) above the industry mean.
Critically, the rate at which learners spontaneously identified the
work's atypical subdominant recapitulation rose from 0% to 78%,
suggesting the tool teaches not just norms but also pedagogically
significant deformations.

The system, analysis schema, and paper drafts are released as
open-source / CC BY 4.0 at GitHub and archived on Zenodo, satisfying
the reproducibility expectations articulated in JMTE's recent editorials.
```

### C. ACM Multimedia / ACM TOMM

```
This work contributes to the multimedia community a *bilingual,
synchronization-driven, hierarchical-annotation system* that treats
formal music analysis as a first-class media stream. The technical
contributions are: (1) a measure-time lookup with O(log n) seek, (2)
an exposition-repeat folding map that preserves analytical monotonicity
under performer-elected repeats, and (3) a layout-stable measure-overlay
renderer that handles OSMD's asynchronous SVG layout reliably across
browsers.

The system is open-source (MIT, CC BY 4.0), already deployed as Korean
and English editions, and includes a 60-second demonstration video at
[link]. We submit this manuscript jointly to the main track and the
*Open Source Software Competition* track, where the project is offered
for community evaluation.
```

### D. TENOR / Music Encoding Conference

```
Our submission targets TENOR's central themes — digital notation,
score-as-interaction-surface, and pedagogical applications. We
contribute (i) a layered overlay renderer on top of OpenSheetMusicDisplay
that respects MusicXML measure boundaries, (ii) a JSON schema for
hierarchical sonata-form analysis suitable for re-use across the standard
Mozart/Haydn/Beethoven sonata canon, and (iii) an evaluation suggesting
that this kind of overlay-on-notation approach yields measurable learning
gains in undergraduate music education.

We will release code, schema, and analysis data as part of the
proceedings, and welcome adoption / extension by the TENOR community.
```

### E. IEEE TLT / Computers & Education

```
This manuscript reports the design and evaluation of a learning
technology that synchronizes notated score, audio, and formal-analysis
overlays for music form education. The evaluation follows a single-group
pre-/post-test design (N=18 undergraduate music education majors)
yielding a large-effect-size accuracy gain (Cohen's d=1.16, t(17)=4.92,
p<.01) and a SUS score of 81.4. We acknowledge the limitation of the
single-group design and outline an RCT extension as immediate future
work, but believe the current results merit publication as an early-stage
report of a method that combines (a) multimodal representational
synchronization (b) hierarchical annotation as a first-class media
stream (c) reproducibility-first open-source release with DOI.
```

### F. TISMIR / EMR

```
We submit a short report describing a tool and dataset for
synchronizing MusicXML scores, audio, and hierarchical formal analysis,
released as open source (MIT) with a public Zenodo DOI. The dataset
contribution is a JSON schema describing two-level sonata-form analysis
(section × theme zone) instantiated for Mozart K. 545, Mvt. I — directly
extensible to Beethoven Op. 49 No. 2 and other canonical pedagogical
works. The evaluation — small but quantitative — demonstrates a
large-effect-size gain in form identification, with particular sensitivity
to atypical formal events (the subdominant recapitulation). We hope the
schema is reused by the empirical-musicology community.
```
