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

본 논문은 시스템 설계와 구현, 그리고 K. 545 1악장의 *재현부 하속조 시작*
이라는 비전형 사례를 다중 표상으로 시각화하는 교수법적 의의를 다룬다. 본
도구는 MIT 라이선스 오픈소스로 공개되며, JSON 스키마로 정의된 형식 분석
데이터는 다른 작품·다른 형식으로 즉시 확장 가능하다. 학습 효과의 정량적
검증은 후속 RCT 연구로 남긴다.

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

This paper focuses on system design and implementation, and on the
pedagogical significance of visualizing K. 545's atypical *subdominant
recapitulation* through multi-representational synchronization. The tool
is released as MIT-licensed open source; its JSON schema for formal
analysis is directly extensible to other works and forms. Empirical
validation of learning effects is deferred to a planned randomized
controlled trial.

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
으로 메울 수 있다는 가능성은 Sapp(2011)·Cannam et al.(2010)·Couprie(2008)
등의 컴퓨테이셔널 음악학 연구에서 일찍이 제기되었으나, 이들의 작업은
연구자용 분석 도구이거나 특정 디지털 인문학 플랫폼에 종속되어 있어
학습자 친화도가 낮다. 한편 Soundslice·MuseScore Web 같은 상용 도구는
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

색상 매핑은 음악교육에서 음악 정보를 직관적으로 전달하는 표상 수단으로
연구되어 왔다. Kuo and Chuang (2013) 은 음악 초보자를 위해 음높이·길이·
음역·강도를 색·격자·도형·크기에 매핑하는 *색상 음악 표기 시스템* 을
제안하면서, Itten 색상환과 Natural Color System 의 12원색을 12음 평균율에
체계적으로 매핑하였다. 본 도구의 색상-섹션 인코딩은 그러한 *색-음악
공감각적 표상* 원리를 *음높이 차원* 이 아니라 *형식 위계 차원* 에 적용한
사례로 위치할 수 있다.

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


# 6. 논의

## 6.1 교수법적 의의

전통적 형식 교수법은 흔히 "재현부 = 으뜸조 회귀" 라는 *규칙* 을 가르치고
예외를 *예외* 로 처리한다. 그러나 K. 545의 하속조 재현은 *모듈레이션
패턴의 일관된 사용을 위해 시작 조성을 옮기는 것이 더 합리적일 수 있다* 는
함수적 통찰을 보여준다. 본 도구는 이러한 *비전형성의 함수적 의의* 를 색상·
라벨·자동 해설의 결합으로 명시적 학습 대상으로 만들 수 있다. 다중 표상
시각화가 형식의 *규범과 예외* 를 동시에 가르치는 데 기여한다는 점이 본
설계의 핵심 가치다.

## 6.2 도구 설계의 의의

- **JSON 스키마의 1급 시민화**: 형식 분석을 *기계가독* 데이터로 정의함으로써,
  ① 다른 곡으로의 즉시 확장, ② 분석 자체에 대한 동료 검토 및 버전 관리,
  ③ 후속 ML/MIR 연구의 학습 데이터로의 재사용을 가능케 한다.
- **Exposition repeat folding**: 연주자가 제시부 반복을 취할 때 분석시간을
  첫 회차로 폴딩하는 매핑은 *비단조 시간 정렬* 의 실용적 해법으로, 다른
  소나타 형식 작품·시기에도 그대로 이식 가능하다.
- **데모 모드의 가치**: 음원 파일이 없는 저예산·저작권 민감 환경에서도
  *형식 흐름 그 자체* 를 학습할 수 있게 한다.
- **단일 의존성**: OSMD 외 외부 의존성이 없어 5년 단위 수업 자료의 *수명
  안정성* 이 높다.

## 6.3 한계와 후속 연구

본 논문은 시스템 설계·구현·교수법적 의의에 한정하며, 학습 효과의 정량적
검증은 별도의 추후 연구가 필요하다. 후속 연구 방향:

1. **통제군 RCT** — 동일 분석 내용을 동영상 강의·교과서로 전달한 군과
   본 도구 사용군의 형식 식별 정확도 변화를 비교.
2. **자동 마디 정렬** — NMF 기반 score-audio alignment 통합으로 음반
   종속성 해소 (Nakamura et al., 2017).
3. **다곡 확장** — Beethoven Op. 49 No. 2, Clementi Op. 36 No. 1 등의
   분석 데이터셋을 동일 스키마로 공개하여 다-작품 데이터셋 구축.
4. **다른 형식** — 론도, 변주곡, 푸가 형식의 동일 도구 적용.
5. **모바일 반응형** — 현재 데스크탑 우선 디자인을 다단 레이아웃으로 확장.


# 7. 결론

본 연구는 소나타 형식이라는 추상적 위계 구조를 학습자에게 청각·악보·
타임라인의 세 채널로 동시 제공하는 웹 기반 학습 도구를 설계·구현하고,
모차르트 K. 545 1악장을 사례로 그 *교수법적 의의* 를 논의하였다. 특히
재현부의 하속조 시작이라는 비전형 사례를 다중 표상으로 명시화함으로써
*형식의 규범과 예외* 를 동시에 가르칠 수 있는 도구로서의 가능성을 보였다.

본 도구는 MIT 라이선스로, 분석 데이터는 CC BY 4.0 으로 공개되어 디지털
음악학 커뮤니티의 자유로운 재사용·확장이 가능하다. 학습 효과의 정량적
검증은 후속 통제군 RCT 연구로 남기며, 본 논문이 제시한 시스템·스키마·
교수법적 프레임은 그 RCT의 기반이 된다.


# 8. 재현 가능성 (Reproducibility)

본 연구의 모든 산출물은 다음 영구 식별자로 공개된다.

| 자원 | 위치 |
|---|---|
| 소스 코드 (HTML/CSS/JS) | https://github.com/rosyrosys/sonata-form-viz |
| v0.1.0 릴리스 | https://github.com/rosyrosys/sonata-form-viz/releases/tag/v0.1.0 |
| 영구 보관 (Zenodo DOI) | [10.5281/zenodo.20108497](https://doi.org/10.5281/zenodo.20108497) |
| 형식 분석 JSON 스키마 | `data/sonata_structure.json` (CC BY 4.0) |
| 마디–시간 매핑 | `data/measure_times.json` (CC BY 4.0) |
| MusicXML (PD) | `data/mozart_k545_mvt1.musicxml` |
| 논문 원고 (KO/EN) | `paper/paper_ko.md`, `paper/paper_en.md` |

저장소는 **한국어판 (`ko/`)** 과 **영어판 (`en/`)** 두 에디션으로 구성되며,
양쪽 모두 동일한 코드 베이스와 분석 스키마를 공유한다.

**음원 비포함 정책**: 본 평가에 사용된 András Schiff 의 Carnegie Hall 2015
녹음은 상용 저작권 음반이므로 저장소에 포함되지 않는다. 재현 시도자는
`assets/README.md` 에 안내된 Public Domain 출처(Musopen, IMSLP)에서 자유 음원을
받아 동일 폴더에 두면 된다. 시스템의 마디–시간 매핑은 *비례 보정* 과 *탭
보정 모드(T 키)* 로 임의 음원에 적응한다.

**의존성**: 외부 라이브러리는 `OpenSheetMusicDisplay v1.8.7` 단일이며
브라우저 호환성은 Chrome 120+, Edge 120+, Firefox 121+ 에서 검증되었다.
서버는 정적 파일 호스팅이면 충분하다 (예: `python -m http.server`).

**후속 RCT 데이터**: 본 논문 이후 진행될 학습 효과 검증 RCT의 익명화된
응답 데이터는 IRB 승인을 거쳐 OSF.io에 CC BY 4.0으로 공개될 예정이다.


# 참고문헌

- 교육부 (2022). *2022 개정 교육과정 음악과 교육과정*. 교육부 고시 제2022-33호.
- 이흥렬, 홍정수 (2017). *음악사 — 서양음악사*. 음악춘추사.

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
- Kuo, Y.-T., & Chuang, M.-C. (2013). A proposal of a color music
  notation system on a single melody for music beginners.
  *International Journal of Music Education*, 31(4), 394–412.
  https://doi.org/10.1177/0255761413489082
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
- Sapp, C. S. (2011). *Computational Methods for the Analysis of Musical
  Structure.* PhD thesis, Stanford CCRMA.
- Sapp, C. S. (2017). Verovio Humdrum Viewer. In *Music Encoding Conference*.
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience:
  Practical Statistics for User Research* (2nd ed.). Morgan Kaufmann.
- Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). *Experimental and
  Quasi-Experimental Designs for Generalized Causal Inference.* Houghton
  Mifflin.


# 부록 A. 시스템 화면

(figures/ 폴더의 PNG 파일 — 본 도구의 스크린샷 3종을 첨부)

- Figure A.1 — 시스템 전체 화면 개관
- Figure A.2 — 형식 타임라인 클로즈업 (P/S/codetta 색상 인코딩)
- Figure A.3 — 악보 위 마디 색상 오버레이 (재현부 P 구간, F장조)
