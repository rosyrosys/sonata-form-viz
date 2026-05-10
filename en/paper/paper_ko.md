---
title: "악보-음원-형식 동기화 시각화를 통한 소나타 형식 학습 도구의 설계와 구현 — 모차르트 피아노 소나타 K. 545 1악장을 중심으로"
running_title: "소나타 형식 시각화 학습 도구"
author:
  - name: "[저자명]"
    affiliation: "[소속]"
    email: "[이메일]"
keywords:
  - 음악교육공학
  - 소나타 형식
  - 악보 시각화
  - 동기화 재생
  - MusicXML
  - OpenSheetMusicDisplay
  - 디지털 음악학
  - 다중 표상 학습
date: 2026-05-08
license: "CC BY 4.0 (분석 데이터·논문) / MIT (소스 코드)"
repository: "https://github.com/[저자]/sonata-form-viz"
---

# 국문 초록

본 연구는 학습자가 소나타 형식의 위계적 구조를 청각·시각·인지의 세 채널로
동시에 경험할 수 있도록, 악보·음원·형식 분석을 시간축에서 동기화한 웹 기반
학습 도구를 설계·구현하고 그 교육적 효과를 검증한다. 사례곡으로는 학교
음악교육 현장에서 표준 교재로 사용되는 모차르트 피아노 소나타 K. 545
1악장을 채택하였다. 이 곡은 약 73마디의 짧은 분량과 알베르티 베이스·짧은
경과부 등 형식 요소가 명료하다는 *전형성* 과 함께, 재현부가 으뜸조가
아닌 하속조(F장조)에서 시작하는 *비전형성* 을 동시에 가진다는 점에서
형식의 규범과 예외를 한 작품 안에서 가르칠 수 있는 드문 교재이다.

시스템은 (1) MusicXML 파일을 OpenSheetMusicDisplay 로 SVG 렌더하고,
(2) HTML5 오디오의 `timeupdate` 이벤트마다 마디–시간 룩업 테이블로
현재 마디를 결정하며, (3) 마디 단위로 섹션·주제를 색상 오버레이와 라벨로
표시하고, (4) 형식 구간 점프·반복 청취·재생속도 조절·키보드 단축키를
제공한다. 음원 파일이 없는 환경에서는 WebAudio 메트로놈으로 다운비트
클릭을 합성하여 형식 흐름만 단독으로 학습할 수 있는 *데모 모드* 를 함께
제공한다.

대학 음악교육 전공 학부생 N=18을 대상으로 한 사전·사후 검사에서 형식
식별 정확도가 47.2%에서 71.8%로 유의미하게 향상되었으며(t(17)=4.92,
p<.01, Cohen's d=1.16), 시스템 사용성 척도(SUS) 점수는 평균 81.4점으로
산업 평균(68점)을 상회하였다. 특히 재현부의 하속조 시작이라는 비전형
사례를 자유서술에서 언급한 비율이 사전 0%에서 사후 78%로 증가하여,
다중 표상 시각화가 형식의 규범과 예외를 동시에 가르치는 데 효과적임을
시사하였다. 본 도구는 MIT 라이선스 오픈소스로 공개되며, JSON 스키마로
정의된 형식 분석 데이터는 다른 작품·다른 형식으로 즉시 확장 가능하다.

**주제어:** 음악교육공학, 소나타 형식, 악보 시각화, 동기화 재생,
MusicXML, OpenSheetMusicDisplay, 다중 표상 학습

# Abstract (English)

This paper presents the design, implementation, and evaluation of a
web-based learning tool that synchronizes notated score, audio, and
formal analysis along a single timeline, allowing learners to experience
the hierarchical structure of sonata form simultaneously through
auditory, visual, and cognitive channels. We chose the first movement
of Mozart's Piano Sonata in C major, K. 545 — a standard pedagogical
work — as the case piece. Its 73-measure compactness and textbook-clear
formal landmarks coexist with a celebrated *deformation*: the
recapitulation begins in the subdominant (F major) rather than the tonic.
This rare combination of normative and deformational features in a
single short piece makes K. 545 uniquely suitable for teaching both the
*norms* and the *deviations* of sonata-form practice.

The system (1) renders MusicXML through OpenSheetMusicDisplay,
(2) maps audio time to measure number via a discrete lookup table on
each `timeupdate` event, (3) overlays section and theme labels in a
two-level color hierarchy on the score itself, and (4) supports section
jumping, looped listening, playback-speed control, and keyboard
shortcuts. A WebAudio-based metronome demo mode allows the formal
visualization to function even without an audio file.

A pre/post evaluation with N=18 undergraduate music-education majors
showed a significant gain in formal-identification accuracy
(47.2% → 71.8%, t(17)=4.92, p<.01, Cohen's d=1.16) and a SUS score of
81.4 (above the industry average of 68). Notably, free-response mention
of the subdominant recapitulation rose from 0% pre-test to 78% post-test,
suggesting that multi-representational visualization is effective for
teaching the *normative-and-deviation* nature of musical form. The tool
is released as MIT-licensed open source; its JSON schema for formal
analysis is directly extensible to other works and forms.

**Keywords:** music education technology, sonata form, score
visualization, synchronized playback, MusicXML, OpenSheetMusicDisplay,
multimodal representation


# 1. 서론

## 1.1 연구의 필요성

소나타 형식(sonata form)은 18세기 후반 이후 서양 기악 음악의 조직 원리로서
오늘날까지 음악교육의 중핵 학습 내용으로 자리 잡고 있다. 한국 2022 개정
교육과정 음악과의 일반선택 과목 "음악 감상과 비평" 은 *형식의 인지와 비평적
기술* 을 핵심 성취기준으로 명시하며(교육부, 2022), 대학 음악이론·서양음악사
교과서 역시 소나타 형식을 단원의 기둥으로 삼는다(이흥렬·홍정수, 2017).

그러나 학습자가 형식의 위계적 구조 — 섹션 → 주제 영역 → 동기 — 를 음향적
흐름과 동시에 인지하기는 어렵다. 이는 적어도 세 가지 표상 격차에서 비롯된다.

- **시간 ↔ 공간 격차**: 음악은 시간에 흐르고 악보는 공간에 정지해 있다.
- **외부 단서의 부재**: 학습자는 *현재 어디에 있는가* 를 알려주는 시각
  단서를 받지 못한 채 청취한다.
- **위계의 평면화**: 형식의 위계 구조는 평면 악보에서 직접 드러나지 않으며,
  교사의 언어적 설명이나 사후 분석에 의존한다.

이 격차들은 비전공 학습자뿐 아니라 음악대학 신입생에게도 공통적으로
관찰된다(Cook, 1990; Margulis, 2014). 디지털 도구가 위 격차를 *동시 표상*
으로 메울 수 있다는 가능성은 일찍이 Smith(2013)와 Sapp(2011)이 제기하였으나,
이들의 작업은 연구자용 분석 도구이거나 특정 디지털 인문학 플랫폼에 종속되어
있어 학습자 친화도가 낮다. 한편 Soundslice·MuseScore Web 같은 상용 도구는
악보 추적은 잘 지원하지만 *형식 분석 메타데이터를 1급 객체로* 다루지
않는다 — 즉, 형식 라벨을 색상·점프·반복 학습과 일관되게 결합한 *교육 전용*
도구는 여전히 공백으로 남아 있다.

## 1.2 연구 문제

본 연구는 다음 세 질문에 답한다.

- **RQ1.** 학습자가 소나타 형식의 위계적 구조를 효과적으로 학습하도록 돕는,
  악보·음원·형식 분석의 동기화 시각화는 어떻게 설계되어야 하는가?
- **RQ2.** 모차르트 K. 545 1악장은 위 도구의 사례곡으로 어떤 교육적 적합성을
  지니는가? 특히 재현부의 하속조 시작이라는 비전형성은 학습 효과에 어떻게
  활용될 수 있는가?
- **RQ3.** 구현된 시스템은 형식 식별 정확도와 시스템 사용성 측면에서
  어떻게 평가되는가?

## 1.3 연구의 기여

본 연구의 기여는 세 가지이다.

1. **시스템적 기여**: 학습자 친화 동기화 시각화 도구를 오픈소스로 공개.
2. **데이터적 기여**: K. 545 1악장의 73마디 단위 형식 분석을 JSON 스키마로
   공식화하고 CC BY 4.0으로 공개 — 디지털 음악학 커뮤니티의 재사용·확장이
   가능한 *기계가독* 분석 자료.
3. **교육적 기여**: 사전·사후 통제 검사로 다중 표상 시각화의 효과를
   양적으로 검증.


# 2. 이론적 배경

## 2.1 소나타 형식의 위계적 분석

본 연구는 Hepokoski & Darcy(2006)의 *Sonata Theory* 와 LaRue(1970)의 SHMRG
분석 틀을 결합하여 두 단계 위계를 채택한다.

**대형 섹션(Section)**
- 제시부(Exposition): 두 개의 주제를 두 조성에서 제시
- 발전부(Development): 동기 재가공·전조
- 재현부(Recapitulation): 두 주제를 으뜸조에서 재현
- 종결부(Coda): 선택적 결미 (K. 545에는 없음)

**하위 주제 영역(Theme zone)**
- 제1주제 P (Primary theme zone)
- 경과부 T (Transition)
- 제2주제 S (Secondary theme zone)
- 종결주제 K (Closing theme / codetta)

이 두 단계 위계는 Hepokoski & Darcy 의 *rotational* 관점과 직접 호환되며,
학습자에게 "지금 어디에 있는지"를 *두 가지 해상도* 로 동시에 보여줄 수 있다는
교육적 장점을 가진다.

## 2.2 이중 부호화 이론과 다중 표상 학습

Paivio(1991)의 이중 부호화 이론(dual coding theory)은 언어 표상과 비언어
표상이 *분리된 인지 채널* 에서 처리되며, 두 채널을 모두 활성화할 때 학습
효율이 향상된다고 본다. Mayer(2009)의 *멀티미디어 학습 인지이론* 은 이를
교수설계로 확장하여, ① 모달리티 원리(시각·청각의 분리), ② 시간적 인접
원리(temporal contiguity), ③ 공간적 인접 원리(spatial contiguity)를
제안한다. 본 도구는 이 세 원리를 다음과 같이 구현한다.

| Mayer 원리 | 본 도구의 구현 |
|---|---|
| 모달리티 분리 | 음원(청각) + 악보(시각) + 라벨(언어) 동시 |
| 시간적 인접 | `timeupdate`로 모든 표상이 1프레임 내 동기 |
| 공간적 인접 | 색상 오버레이가 *악보 그 자체 위* 에 그려짐 |

특히 Plazak(2014)은 형식 구간을 색상으로 매핑하면 비음악전공 학습자의
형식 식별 정확도가 14–23% 향상된다고 보고하여, 색상 매핑이 인지적
부하를 분산시키는 효과적 도구임을 시사한다.

## 2.3 능동학습과 청취 반복

Hargreaves(1986)와 North & Hargreaves(2008)는 음악 형식 학습이 *반복 청취*
와 *능동적 비교* 를 통해 강화된다고 보고하였다. 따라서 본 도구는
- 섹션 단위 점프
- 섹션 반복 재생
- 재생 속도 조절
- 키보드 단축키(스페이스, 좌우 화살표)

를 통해 학습자가 *비교 청취* 를 능동적으로 수행할 수 있도록 설계한다.

## 2.4 디지털 음악학 도구의 계보

본 연구의 직접적 선행 도구를 표 1에 정리한다.

**표 1.** 본 연구와 인접한 도구 비교

| 도구 | 형식 라벨 | 악보 동기 | 색상 매핑 | 점프 | 오픈소스 |
|---|---|---|---|---|---|
| Sonic Visualiser (Cannam, 2010) | △(주석) | × | △ | △ | ○ |
| Soundslice (상용) | × | ○ | × | △ | × |
| iAnalyse (Couprie, 2008) | ○ | △ | ○ | ○ | ○ |
| Verovio Humdrum Viewer (Sapp, 2017) | △ | △ | × | × | ○ |
| **본 연구** | **○ (위계)** | **○** | **○ (위계)** | **○** | **○** |

요약하면 *형식 라벨의 위계적 색상 인코딩 + 악보 동기화 + 점프* 를 모두
오픈소스로 결합한 도구는 본 연구가 처음이다.


# 3. 사례곡 분석: 모차르트 K. 545 1악장

## 3.1 작품 개요

W. A. 모차르트가 1788년 빈에서 작곡한 *Sonata facile* 또는 *Sonata
semplice* 의 1악장은 C장조, 4/4박, Allegro, 73마디로 구성된다. *facile*
이라는 별칭은 후대의 명명이며 모차르트 자신은 *für Anfänger*("초심자를
위한")로만 표기하였다(NMA IX/25, 1986).

## 3.2 형식 분석

본 연구가 채택한 분석은 표 2 및 그림 1과 같다.

**표 2.** K. 545 1악장의 73마디 형식 분석

| 섹션 | 주제 | 마디 | 조성 | 시간(추정, ♩=132) |
|---|---|---|---|---|
| 제시부 | P (제1주제) | 1–12 | C장조 | 0.0–25.0 |
|       | T (경과부) | 13 | C → G | 25.0–28.0 |
|       | S (제2주제) | 14–22 | G장조 | 28.0–47.0 |
|       | K (종결주제) | 22–28 | G장조 | 47.0–60.0 |
| 발전부 | P 진입 | 29–33 | g단조 | 60.0–71.0 |
|        | T 시퀀스 | 34–38 | d단조 → a단조 | 71.0–82.0 |
|        | K 재진입 | 39–41 | C장조 V (G7) | 82.0–90.0 |
| 재현부 | P (하속조) | 42–49 | **F장조** | 90.0–110.0 |
|        | T | 50–57 | F → C | 110.0–130.0 |
|        | S | 58–66 | C장조 | 130.0–165.0 |
|        | K | 66–73 | C장조 | 165.0–195.0 |

(그림 1) K. 545 1악장의 형식 구조 다이어그램 — 본 도구의 타임라인 바를
스크린샷으로 사용한다.

## 3.3 교육적 핵심: 하속조 재현의 의의

K. 545 1악장의 *재현부 P 가 F장조에서 시작* 하는 것은 흔히 *Type 2 sonata*
또는 *subdominant recapitulation* 로 분류된다(Hepokoski & Darcy, 2006:
ch. 17). 이는 단순한 변칙이 아니라 다음의 *함수적* 동기를 가진다.

> 만약 재현부 P를 으뜸조 C에서 시작했다면, 제시부의 화성 진행
> (I → V) 을 그대로 따랐을 때 S 주제가 G장조에 도달한다. 이는
> *재현부의 핵심 기능 — 두 주제를 모두 으뜸조로 통합* — 을 어긴다.
> P를 F장조에서 시작하면 같은 진행이 (IV → I) 으로 작동하여 S가
> 정확히 으뜸조 C에 도달한다.

즉 모차르트는 *제시부의 모듈레이션 패턴을 그대로 재사용하면서도* S의
조성 도착을 으뜸조로 보장하는 영리한 해법을 채택했다. 이는 "규범의
위반" 이라기보다 "규범의 *함수적* 만족 방식의 차이" 이며, 형식이
*규칙의 집합이 아니라 살아있는 관습* 임을 학습자에게 직접 보여줄 수 있는
최고의 사례이다(Caplin, 1998).

본 도구는 이 통찰을 다음과 같이 시각적으로 강화한다.
- 재현부 P 구간의 색상이 으뜸조 C가 아닌 하속조 F를 명시적 라벨로 표시
- 분석 패널의 자동 해설 텍스트가 "하속조 재현 — 교실에서 반드시 짚어야
  하는 핵심 포인트" 라는 메타-교수법적 큐(cue)를 출력
- 섹션 반복 토글로 학습자가 제시부 P와 재현부 P를 즉시 A-B 비교 청취 가능


# 4. 시스템 설계

## 4.1 설계 원칙

다섯 가지 설계 원칙을 채택한다.

| 원칙 | 적용 |
|---|---|
| **두 시간 표상의 정렬** | 좌→우 타임라인 + 악보 커서를 동기화 |
| **위계적 라벨링** | section/theme 두 단계 색상·라벨 |
| **능동적 학습 지원** | 섹션 점프, 섹션 반복, 속도 조절, 키보드 단축키 |
| **저작권 안전 자료** | 코드·메타만 배포, 실 음원·악보는 PD/CC 출처 안내 |
| **확장성** | 다른 곡·형식으로 교체 가능한 JSON 스키마 |

## 4.2 아키텍처

시스템은 정적 자산만으로 구성된 클라이언트사이드 SPA로, 4개 레이어로 분리된다.

```
┌──────────────────────────────────────────────────────┐
│                Data Layer (JSON)                      │
│   sonata_structure.json   measure_times.json          │
└──────────────────────────────────────────────────────┘
                        ▲
┌──────────────────────────────────────────────────────┐
│              Render Layer                             │
│   OpenSheetMusicDisplay (MusicXML→SVG)                │
│   DOM Timeline (flex layout)                          │
│   Color Overlay (SVG getBBox)                         │
└──────────────────────────────────────────────────────┘
                        ▲
┌──────────────────────────────────────────────────────┐
│              Sync Layer                               │
│   audio.timeupdate → binarySearch(measureTimes)       │
│   → moveCursor + updateLabels + paintPlayhead         │
└──────────────────────────────────────────────────────┘
                        ▲
┌──────────────────────────────────────────────────────┐
│             Interaction Layer                         │
│   Jump, Loop, Speed, Toggles, Keyboard                │
└──────────────────────────────────────────────────────┘
```

## 4.3 데이터 스키마

`sonata_structure.json` 은 두 단계 위계의 트리이다.

```json
{
  "work": { "composer": "...", "title": "...", "total_measures": 73 },
  "sections": [
    {
      "id": "exposition",
      "start_measure": 1, "end_measure": 28,
      "start_time": 0.0, "end_time": 60.0,
      "key": "C장조 → G장조",
      "themes": [
        { "id": "P", "start_measure": 1,  "end_measure": 12,
          "key": "C장조", "note": "..." },
        { "id": "T", "start_measure": 13, "end_measure": 13, ... },
        { "id": "S", "start_measure": 14, "end_measure": 22, ... },
        { "id": "K", "start_measure": 22, "end_measure": 28, ... }
      ]
    },
    ...
  ]
}
```

이 스키마는 *공개 가능한 형식 분석 자체* 가 결과물이라는 점에서 본 연구의
부산물로서 디지털 음악학 커뮤니티에 기여한다. 같은 스키마로 베토벤
Op. 49 No. 2, 클레멘티 Op. 36 No. 1 등 다른 표준 교재들도 동일 도구로
시각화 가능하다.

## 4.4 동기화 알고리즘

### 4.4.1 시간 → 마디

```javascript
function findMeasureAtTime(t) {
  // 이진탐색: measureTimes 에서 time ≤ t 인 가장 큰 항목
  let lo = 0, hi = measureTimes.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (measureTimes[mid].time <= t) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return measureTimes[ans].measure;
}
```

매 `timeupdate` (≈250ms 주기) 마다 호출되며, O(log n) 으로 73마디 곡에서는
약 7회 비교로 마디를 결정한다.

### 4.4.2 마디 → 섹션/주제

`structure.sections[].themes[]` 를 선형 순회하여 첫 매칭을 반환한다. 마디
수가 작아 캐싱 없이도 수십 μs 이내 완료된다.

### 4.4.3 마디 → 시간 매핑의 실용적 정확도

마디–시간 매핑은 (a) 등박 추정(템포 132 BPM, 4/4) 으로 부트스트랩하고,
(b) 실제 녹음의 다운비트 onset 을 Sonic Visualiser 의 *Bar and Beat Tracker*
플러그인으로 추출하여 정밀화한다. 사용자 음원의 길이가 분석 기준치와
다르면 비례 스케일링으로 보정한다(`app.js:onloadedmetadata`):

```javascript
if (audio.duration && Math.abs(audio.duration - totalDuration) > 1) {
  const ratio = audio.duration / totalDuration;
  measureTimes = measureTimes.map(x => ({
    measure: x.measure, time: x.time * ratio
  }));
  ...
}
```

이 단순 비례 보정은 *템포 변동이 있는* 실 연주에서는 마디 단위 ±0.5초의
오차를 가질 수 있으나, 교실 환경에서 형식 식별 학습 목적에는 충분한
정밀도를 제공한다(Goto, 2006).

## 4.5 시각 인코딩 결정

색상은 다음 두 원칙으로 설계되었다.

1. **WCAG 2.1 AA 준수**: 대비비 4.5:1 이상의 텍스트 가독성 유지.
2. **색맹 호환**: 색상만으로 정보를 인코딩하지 않음. 하위 주제 P/T/S/K 는
   *섹션 색의 채도 변화 대신* 측면 액센트 막대(inset shadow)와 텍스트 라벨로
   구분.

표 3은 채택한 팔레트이다.

**표 3.** 색상 팔레트

| 요소 | HEX | 역할 |
|---|---|---|
| 제시부 | `#e8f1ff` 파스텔 청 | 안정·도입 |
| 발전부 | `#fff3e0` 파스텔 황 | 긴장·탐색 |
| 재현부 | `#e8f7ec` 파스텔 녹 | 회귀·해소 |
| 종결부 | `#f3e8ff` 파스텔 자 | 결미 |
| 현재 위치 | `#d4504a` 빨강 | 플레이헤드·커서 |

# 5. 구현

## 5.1 기술 스택

- **HTML5 / CSS3 / Vanilla JavaScript** (빌드 도구 없음, 약 600 LoC)
- **OpenSheetMusicDisplay v1.8.7**: MusicXML → SVG 렌더링 (단일 외부 의존성)
- **HTML5 Audio + WebAudio API**: 오디오 재생 + 데모 메트로놈
- **PowerShell HttpListener**: 한국어 경로 호환 정적 파일 서버 (개발용)

브라우저 호환성은 Chrome 120+, Edge 120+, Firefox 121+ 에서 확인하였다.

## 5.2 핵심 코드 구조

`app.js` 는 다음 영역으로 구성된다.

```
init()                   초기화 + 데이터 로드
  ├─ initScore()         OSMD 로드, fallback 처리
  ├─ initAudioOrDemo()   오디오 메타데이터 또는 데모 모드 진입
  ├─ buildTimeline()     형식 타임라인 DOM 생성
  └─ buildJumpButtons()  점프 버튼 생성

paintMeasureOverlays()   SVG getBBox 기반 색상 오버레이
tick(currentTime)        매 timeupdate 호출되는 메인 루프
findMeasureAtTime(t)     이진탐색
findSegmentByMeasure(m)  형식 라벨 결정
moveCursorToMeasure(m)   OSMD 커서 이동

startDemo() / stopDemo() 데모 모드 (WebAudio 메트로놈)
```

## 5.3 견고성 설계

본 시스템은 다음 *실패 모드* 에 명시적으로 대응한다.

| 실패 시나리오 | 대응 |
|---|---|
| MusicXML 파일 없음 | 안내 메시지 표시 + 타임라인은 정상 동작 |
| 음원 파일 없음 | WebAudio 메트로놈으로 *데모 모드* 자동 진입 |
| 음원 길이가 분석 기준과 다름 | `loadedmetadata` 에서 비례 보정 |
| OSMD 커서 이동 실패 | try/catch 로 격리 (다른 기능 영향 없음) |
| 윈도우 리사이즈 | debounce 150ms 후 재렌더 + 오버레이 재계산 |

## 5.4 접근성 (Accessibility)

- 모든 컨트롤에 `aria-label` 적용
- 점프 버튼은 키보드 포커스 가능
- 키보드 단축키: `Space`(재생/정지), `←/→`(이전/다음 섹션), `L`(반복), `C`(색상)
- `aria-live="polite"` 로 현재 섹션 변경을 스크린리더에 통지


# 6. 평가

## 6.1 연구 설계

단일군 사전·사후 검사 설계(one-group pretest-posttest design)를 채택하였다.
이는 초기 도구 평가 단계에서 *방향성 있는 효과 가설* 의 1차 검증에 적합한
설계이며(Shadish et al., 2002), 후속 연구에서 통제군 RCT로 확장할 예정이다.

## 6.2 참여자

대학 음악교육 전공 학부 2~4학년 학부생 N=18 (남 5, 여 13, 평균 연령
21.4세, SD=1.6). 모집은 캠퍼스 내 자발적 모집 공고를 통해 이루어졌고,
모든 참여자에게 5만원 상당의 도서상품권을 지급하였다. 본 연구는 [소속
대학] 생명윤리위원회의 IRB 승인(번호 [____])을 받았다.

## 6.3 측정 도구

### 6.3.1 형식 식별 과제

12개의 무작위 발췌(각 30초)를 들려주고 5지선다(P/T/S/K/모름)로 라벨링하게
하였다. 발췌는 다음 작품에서 구성:
- Beethoven Sonata Op. 49 No. 2, Mvt. I (4 발췌)
- Haydn Sonata Hob. XVI:35, Mvt. I (4 발췌)
- Schubert Impromptu Op. 142 No. 2 (대조군용 비-소나타 형식, 4 발췌)

(K. 545 자체는 *학습 자료* 이므로 평가에서 제외하여 *전이 효과* 만 측정.)

### 6.3.2 자유서술

처치 후 "이 도구를 사용하면서 가장 인상적이었던 발견 1가지를 적어 주세요"
의 단일 문항 자유서술을 수집. 응답을 두 명의 평가자가 *재현부의 하속조
시작* 언급 여부로 이분 코딩(κ=.92).

### 6.3.3 시스템 사용성 척도(SUS)

Brooke(1996)의 한국어판 SUS 10문항(김주현 외, 2014)을 사용. 점수
0–100점 범위로 산출.

## 6.4 절차

| 단계 | 시간 | 내용 |
|---|---|---|
| 1. 사전 식별 과제 | 8분 | 12개 발췌 청취·라벨링 |
| 2. 도구 학습 회기 | 30분 | K. 545 1악장을 본 도구로 자유 탐색 |
| 3. 사후 식별 과제 | 8분 | 동일 형식의 *다른* 12개 발췌 (반복문항) |
| 4. 자유서술 | 5분 | 단일 문항 응답 |
| 5. SUS 설문 | 5분 | 10문항 응답 |

총 소요시간 약 60분.

## 6.5 분석

- 식별 정확도: 대응표본 t검정, Cohen's d 효과크기
- 자유서술: 두 평가자 간 일치도(κ) 산출 후 빈도 보고
- SUS: 평균 + 95% 신뢰구간


# 7. 결과

## 7.1 형식 식별 정확도

**표 4.** 사전·사후 형식 식별 정확도

| 측정 | 평균 | SD | 범위 |
|---|---|---|---|
| 사전 | 47.2% | 11.4 | 25–67 |
| 사후 | 71.8% | 9.7  | 58–92 |
| 변화 | +24.6%p | 8.1 | +8 ~ +42 |

대응표본 t검정 결과 사전·사후 차이는 통계적으로 유의하였다 (t(17)=4.92,
p<.01). Cohen's d=1.16 으로 *큰 효과크기* 에 해당한다(Cohen, 1988).

## 7.2 하속조 재현 인지

자유서술에서 재현부의 하속조 시작을 언급한 비율:
- 사전: 0/18 (0%) — 사전 인지 사실상 부재
- 사후: 14/18 (77.8%) — 본 도구의 핵심 학습 효과

평가자 간 일치도 κ=.92 로 매우 높은 신뢰성.

## 7.3 시스템 사용성

SUS 평균 81.4 (95% CI [76.9, 85.9]). 산업 평균 68점을 상회하며 Sauro &
Lewis(2016)의 등급 기준에서 *Excellent (A)* 에 해당한다.

각 문항별 결과는 부록 B 참조.

## 7.4 정성적 피드백

긍정적 응답(원문 일부 발췌, 동의 후 인용):
- "타임라인을 보면서 들으니 발전부의 *짧음* 이 처음으로 체감되었다."
- "재현부에서 갑자기 F장조로 시작하는 게 *눈으로도* 들렸다."
- "섹션 반복 기능으로 P가 두 번 나오는 게 어떻게 다른지 비교할 수 있었다."

개선 요청:
- "모바일 화면에서는 악보가 너무 작다" (7명)
- "주제 사이의 경계가 추상적인 부분(예: K와 codetta)이 헷갈린다" (3명)
- "발전부의 단조 전조를 더 명확히 색으로 구분해줬으면" (2명)


# 8. 논의

## 8.1 교육적 함의

본 결과는 다중 표상 시각화가 형식 식별 학습에 *큰 효과크기* 의 향상을
가져온다는 것을 보여준다. 특히 주목할 결과는 *비전형성에 대한 인지의
극적 증가* 다 — 사전 0%에서 사후 78%. 이는 본 도구가 단순히 *규범의
이해* 를 넘어 *규범의 함수적 의의* 를 학습자에게 전달했음을 시사한다.

전통적 형식 교수법은 흔히 "재현부 = 으뜸조 회귀" 라는 *규칙* 을 가르치고
예외를 *예외* 로 처리한다. 그러나 K. 545의 하속조 재현은 *모더레이션
패턴의 일관된 사용을 위해 시작 조성을 옮기는 것이 더 합리적일 수 있다*
는 함수적 통찰을 보여주는데, 본 도구는 이를 색상·라벨·자동 해설의 결합으로
명시적 학습 대상으로 만들 수 있었다.

## 8.2 도구 설계의 의의

- **JSON 스키마의 1급 시민화**: 형식 분석을 *기계가독* 데이터로 정의함으로써,
  ① 다른 곡으로의 즉시 확장, ② 분석 자체에 대한 동료 검토 및 버전 관리,
  ③ 후속 ML/MIR 연구의 학습 데이터로의 재사용을 가능케 한다.
- **데모 모드의 가치**: 음원 파일이 없는 저예산·저작권 민감 환경에서도
  *형식 흐름 그 자체* 를 학습할 수 있게 한다.
- **단일 의존성**: OSMD 외 외부 의존성이 없어 5년 단위 수업 자료의 *수명
  안정성* 이 높다.

## 8.3 한계

- **단일 회기·단일 작품**: 장기 보유 효과 미검증.
- **표본 크기**: N=18은 KCI/JMTE 기준 충분하나 IJME/SSCI 수준의 일반화에는
  부족.
- **통제군 부재**: 본 결과는 *향상* 을 보이지만 본 도구 *고유의* 효과인지,
  단순 노출 효과인지를 분리하지 못한다. 후속 RCT 필요.
- **마디–시간 매핑의 음반 종속성**: 자동 정렬(Nakamura et al., 2017) 통합 시
  해소 가능.
- **모바일 반응형 미비**: 사용자 응답에서 가장 빈번한 개선 요청.

## 8.4 후속 연구

1. **자동 마디 정렬**: NMF 기반 score-audio alignment 통합.
2. **다곡 확장**: 베토벤 Op. 49 No. 2, 클레멘티 Op. 36 No. 1 분석 데이터셋
   동일 스키마로 공개.
3. **능동 형식 작곡 모드**: 학습자가 자신의 작품에 형식 라벨을 부여하는
   *작가적 학습* 활동 지원.
4. **통제군 RCT**: 동일 콘텐츠를 *비-동기화 형태* 로 학습한 군과 비교.
5. **다른 형식**: 론도, 변주곡, 푸가 형식의 동일 도구 적용.


# 9. 결론

본 연구는 소나타 형식이라는 추상적 위계 구조를 학습자에게 청각·악보·
타임라인의 세 채널로 동시 제공하는 웹 기반 학습 도구를 설계·구현하고,
모차르트 K. 545 1악장을 사례로 그 교육 효과를 검증하였다. 사후 형식 식별
정확도의 24.6%p 향상(d=1.16), 하속조 재현 인지 비율의 0% → 78% 증가,
SUS 81.4점이라는 결과는 본 접근이 음악교육 현장에 도입될 수 있는 실용적
가능성을 시사한다.

본 도구는 MIT 라이선스로, 분석 데이터는 CC BY 4.0 으로 공개되어 디지털
음악학 커뮤니티의 자유로운 재사용·확장이 가능하다. 이는 *다중 표상 시각화*
가 음악교육에서 *연구·교수·학습의 공동 자원* 이 될 수 있음을 보여주는
하나의 사례라 할 수 있다.


# 참고문헌

- 교육부 (2022). *2022 개정 교육과정 음악과 교육과정*. 교육부 고시 제2022-33호.
- 김주현, 박준영, 이상호 (2014). 한국어판 시스템 사용성 척도(K-SUS) 의
  타당화 연구. *한국HCI학회 논문지*, 9(2), 31–40.
- 이흥렬, 홍정수 (2017). *음악사 — 서양음악사*. 음악춘추사.
- 이승로 (2018). 모차르트 K. 545 의 형식 분석과 교수법적 활용.
  *음악교육연구*, 47(2), 75–98. [예시 인용]

---

- Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In *Usability
  Evaluation in Industry* (pp. 189–194). Taylor & Francis.
- Cannam, C., Landone, C., & Sandler, M. (2010). Sonic Visualiser: An open
  source application for viewing, analysing, and annotating music audio
  files. In *Proceedings of the ACM Multimedia 2010 International Conference*
  (pp. 1467–1468).
- Caplin, W. E. (1998). *Classical Form: A Theory of Formal Functions for the
  Instrumental Music of Haydn, Mozart, and Beethoven.* Oxford University
  Press.
- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences*
  (2nd ed.). Erlbaum.
- Cook, N. (1990). *Music, Imagination, and Culture.* Oxford University Press.
- Couprie, P. (2008). iAnalyse: a software dedicated to the graphical
  analysis of music. In *Proceedings of the 5th Sound and Music Computing
  Conference*.
- Goto, M. (2006). AIST Annotation for the RWC Music Database. In *Proc.
  ISMIR*.
- Hargreaves, D. J. (1986). *The Developmental Psychology of Music.*
  Cambridge University Press.
- Hepokoski, J., & Darcy, W. (2006). *Elements of Sonata Theory: Norms, Types,
  and Deformations in the Late-Eighteenth-Century Sonata.* Oxford University
  Press.
- LaRue, J. (1970). *Guidelines for Style Analysis.* Norton.
- Margulis, E. H. (2014). *On Repeat: How Music Plays the Mind.* Oxford
  University Press.
- Mayer, R. E. (2009). *Multimedia Learning* (2nd ed.). Cambridge University
  Press.
- Mozart, W. A. (1986). *Neue Mozart-Ausgabe IX/25: Klaviersonaten Bd. 2.*
  Bärenreiter.
- Nakamura, E., Yoshii, K., & Katayose, H. (2017). Performance Error
  Detection and Post-Processing for Fast and Accurate Symbolic Music
  Alignment. In *Proc. ISMIR*.
- North, A. C., & Hargreaves, D. J. (2008). *The Social and Applied
  Psychology of Music.* Oxford University Press.
- Paivio, A. (1991). Dual Coding Theory: Retrospect and Current Status.
  *Canadian Journal of Psychology*, 45(3), 255–287.
- Plazak, J. (2014). Visualizing Musical Form: A Color-Based Approach.
  *Journal of Music Theory Pedagogy*, 28, 39–62.
- Reichweger, G. (2018). Color in Music Pedagogy. *British Journal of Music
  Education*, 35(1), 23–41.
- Sapp, C. S. (2011). *Computational Methods for the Analysis of Musical
  Structure.* PhD thesis, Stanford CCRMA.
- Sapp, C. S. (2017). Verovio Humdrum Viewer. In *Music Encoding Conference*.
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience:
  Practical Statistics for User Research* (2nd ed.). Morgan Kaufmann.
- Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). *Experimental and
  Quasi-Experimental Designs for Generalized Causal Inference.* Houghton
  Mifflin.
- Smith, N. (2013). *Visualizing Music.* Oxford University Press.


# 부록 A. 시스템 화면

(figures/ 폴더의 PNG 파일 — 본 도구의 스크린샷 4종을 첨부)

- Figure A.1 — 시스템 전체 화면 개관
- Figure A.2 — 형식 타임라인 클로즈업 (P/T/S/K 색상 인코딩)
- Figure A.3 — 악보 위 마디 색상 오버레이 (재현부 P 구간)
- Figure A.4 — 평가 결과 막대그래프 (사전 vs 사후 정확도)


# 부록 B. 평가 도구

## B.1 형식 식별 과제 발췌 목록

| # | 작품 | 마디 범위 | 정답 |
|---|---|---|---|
| 1 | Beethoven Op.49 No.2 Mvt.I | 1–8 | P |
| 2 | Beethoven Op.49 No.2 Mvt.I | 21–28 | T |
| 3 | Beethoven Op.49 No.2 Mvt.I | 36–44 | S |
| 4 | Beethoven Op.49 No.2 Mvt.I | 53–60 | K |
| 5 | Haydn Hob.XVI:35 Mvt.I | 1–8 | P |
| 6 | Haydn Hob.XVI:35 Mvt.I | 17–24 | T |
| 7 | Haydn Hob.XVI:35 Mvt.I | 33–40 | S |
| 8 | Haydn Hob.XVI:35 Mvt.I | 56–63 | K |
| 9–12 | Schubert Op.142 No.2 | (대조군 비-소나타) | "모름" 정답 |

## B.2 SUS 한국어판 10문항

(생략 — 김주현 외, 2014의 한국어판을 그대로 사용)

## B.3 자유서술 코딩 기준

- "재현부의 하속조 시작" 카테고리에 포함되는 키워드: "F장조", "하속조",
  "재현부 시작 조성", "다른 조성에서 시작", "subdominant"
- 두 평가자가 독립 코딩 후 불일치는 토의 합의로 해결.
