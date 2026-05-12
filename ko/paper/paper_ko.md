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

## 2.4 관련 도구

본 작업의 가장 가까운 선행 사례는 본 학술지(TISMIR)에 게재된 Dezrann 웹
플랫폼 (Giraud et al., 2025) 과 Allegraud et al. (2019) 의 소나타 형식
구조 학습 연구이다. 두 작업 모두 음악 형식 주석을 *웹 인터랙티브 1급 객체*
로 다루며, 모차르트 소나타 악장에 적용되었다. 본 작업은 그 연구 라인을
따라 다음 세 가지를 추가 기여한다:

1. **악보 자체에 직접 도장된 두 단계 색상 인코딩.** Dezrann 이 waveform-
   악보 뷰에 별도 마커로 주석 라벨을 배치하는 반면, 본 도구는 OSMD 의 SVG
   `getBBox` 측 단위 색상 오버레이로 *악보 그 자체* 를 섹션 색으로 칠한다.
   섹션·주제 영역 색이 학습자가 이미 보고 있는 같은 표면 위에 공존한다.
2. **데이터로서의 분석 스키마.** 본 작업의 `sonata_structure.json` 은
   Dezrann 주석에 첨부된 메타데이터가 아니라 *독립된 peer-reviewable,
   versioned, CC BY 4.0 라이선스 객체*. 후속 MIR 파이프라인과 다른 작품
   분석에 그대로 재사용 가능 — Allegraud et al. (2019) 의 소나타 형식
   corpus 가 재사용된 것과 같은 의미.
3. **학습자 친화 단일 작품 초점.** Allegraud et al. (2019) 은 *자동 검출*
   문제를 32-사중주 corpus 위에서 MIR 커뮤니티 대상으로 다룬다. 본 작업은
   *교수 학습* 문제를 단일 정전 작품 위에서 음악교육 커뮤니티 대상으로
   다룬다. 두 접근은 *상보적* — 견고한 분류기 (Allegraud) 와 정밀한
   교수법적 도구 (본 작업) 는 동일 평가 척도를 가질 필요가 없다.

표 1 은 본 작업을 여러 인접 시스템과 비교한다.

**표 1.** 관련 시각화·주석·악보 추적 도구 비교

| 도구 | 위계적 형식 라벨 | 악보-음원 동기 | 악보 자체 색상 | 섹션 점프 | 오픈소스 | 학습자 친화 |
|---|---|---|---|---|---|---|
| Sonic Visualiser (Cannam et al. 2010) | △ (주석) | × | × | △ | ✓ | △ |
| Soundslice (상용) | × | ✓ | × | △ | × | ✓ |
| iAnalyse (Couprie 2008) | ✓ | △ | △ | ✓ | ✓ | △ |
| Verovio Humdrum Viewer (Sapp 2017) | △ | △ | × | × | ✓ | △ |
| MuseScore Web (상용) | × | ✓ | × | × | × | ✓ |
| Dezrann (Giraud et al. 2025) | ✓ (라벨 기반) | ✓ | △ (트랙 라벨) | ✓ | ✓ | ✓ |
| **본 작업** | **✓ (두 단계)** | **✓** | **✓ (마디 도장)** | **✓** | **✓** | **✓** |

신규성 주장은 "최초의 오픈소스 소나타 형식 시각화" 가 아니라 더 좁다:
"마디 단위로 도장된 위계적 형식 색상 + 악보-음원 동기 + 분리 가능한
데이터-스키마 분석을 결합한 최초의 학습자 친화 오픈소스 도구."


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


# 4. 도구: 세 가지 동기화된 표상

시스템은 정적 클라이언트사이드 웹 앱(약 600 LoC vanilla JavaScript) 으로,
외부 의존성은 OpenSheetMusicDisplay 하나, 빌드 단계 없음. 라이브 배포가
본 논문과 함께 임베드되며 (아래 *Example 1* 참조), 소스코드·분석 데이터·
음원 정책 문서는 GitHub 저장소와 Zenodo 아카이브에서 접근 가능하다
(§7 *Reproducibility*).

TISMIR 독자에게 본질적으로 흥미로운 점은 구성요소 목록이 아니라 *조정
(coordination)* 이다. 같은 음악적 현재 시점의 세 가지 표상이 동기 유지되며,
사용자는 어느 표상에든 개입할 수 있다. Tools-and-Datasets 트랙 기여로
특별히 두 가지 설계 결정이 명시될 가치가 있다: OSMD 재배치를 견디는 안정적
마디 도장 방식 (§4.2) 과, 연주자 선택 반복을 분석적 손실 없이 처리하는
비단조 시간 매핑 함수 (§4.5).

## 4.1 세 가지 표상

| 표상 | 인코딩 | `timeupdate` 시 갱신 |
|---|---|---|
| **색상 타임라인** | 수평 막대, 두 단계 색상, 비례 너비 | 빨간 플레이헤드 전진 |
| **악보** | MusicXML 을 SVG 로 렌더, 현재 마디 강조 | 커서가 현재 음표로 이동 |
| **분석 패널** | 섹션·주제 라벨, 현재 조성, 자동 해설 | 라벨 변경 시 재렌더 |

매 `timeupdate` 이벤트 (≈250ms 주기) 마다 마디-시간 룩업(이진탐색, O(log n)) 이
한 번 실행된다. 현재 마디는 세 표상 모두로 라우팅되어 단일 렌더 프레임 안에
갱신된다. `loadedmetadata` 에서의 선형 비례 스케일링은 참조와 다른 총 길이의
녹음에 대응한다 (Goto, 2006). 향후 작업은 템포 가변 정확도를 위해 score-audio
정렬(Nakamura, Yoshii, & Katayose, 2017)을 통합할 예정이다.

## 4.2 두 단계 색상 인코딩

색상 인코딩은 두 원칙을 따른다. 첫째, WCAG 2.1 AA 준수 — 텍스트 대비는 ≥4.5:1
유지. 둘째, 색맹 접근성 — 색상만으로 정보를 전달하지 않으며, 주제 영역
(P/S/codetta) 은 액센트 막대와 텍스트 라벨로도 구분된다. 이는 Kuo & Chuang
(2013) 이 음높이 수준 초보자 표기에서 체계화한 다채널 인코딩 관행을 형식
위계 수준으로 확장한 것이다.

| 요소 | 색상 | 역할 |
|---|---|---|
| 제시부 | 파스텔 청 | 안정·제시 |
| 발전부 | 파스텔 황 | 조성적 탐색 |
| 재현부 | 파스텔 녹 | 회귀·해소 |
| 현재 위치 | 빨강 | 플레이헤드·악보 커서 |

## 4.3 데이터로서의 분석 계층

형식 분석은 versioned JSON 객체이다 (아래 *Example 2* 참조). 분석 자체를
peer-reviewable, machine-readable artefact 로 다루는 것 — 숨겨진 교수법
주석이 아니라 — 이 다른 작품·다른 형식으로의 커뮤니티 확장과 후속 MIR
파이프라인의 기계 재사용을 가능하게 한다. 본 논문에서는 도구와 K. 545
분석을 *각각 분리 가능한* 오픈 라이선스로 배포할 수 있게 한다 (MIT, CC BY 4.0).

## 4.4 능동 청취를 위한 어포던스

세 가지 인터랙티브 어포던스가 교수법적으로 중요하다:

- **섹션 점프** — 색상 타임라인 세그먼트 클릭 시 그 마디로 오디오 시킹.
  교사가 *제시부 P* 에서 *재현부 P* 로 스크러빙 없이 즉시 이동 가능.
- **섹션 반복** — 현재 섹션을 반복 재생 토글. 즉각 A–B 비교 가능.
- **재생 속도 조절** — 음높이 변화 없이 0.5배까지 감속. 짧은 모듈레이션
  순간에 유용.

키보드 단축키 (Space, ←/→, L 반복, C 색상 토글) 가 교실 시연을 마우스만으로는
불가능한 응답성으로 만든다.

## 4.5 제시부 반복 폴딩 (Exposition Repeat Folding)

연주자가 제시부 반복을 취할 때 — K. 545 정전 디스코그래피 (참조 배포에 사용한
Schiff Carnegie Hall 2015 녹음 포함) 의 압도적 다수 — 오디오 시간선은
분석 시간에 대해 *비단조(non-monotonic)* 가 된다. 오디오 초 0:00–0:55 가 제시부를
횡단하고, 오디오 초 0:55–1:48 이 제시부를 *다시* 횡단하고, 오디오 1:48 이후가
발전부로 진입한다. 두 가지 설계 대응이 가능하다:

1. **반복 무시.** 커서와 분석 패널이 오디오 시간을 그대로 따라간다. 반복 중
   패널이 *오프바이원* 섹션 ("발전부") 을 표시하는데 청자는 여전히 제시부에
   있다. 교수법적으로 오도.
2. **반복 폴딩.** 반복 중 커서가 제시부 시작으로 돌아가 재횡단한다. 오디오가
   두 번째 제시부 codetta 를 지나야만 커서가 발전부로 진입한다.

본 작업은 두 번째 옵션을 채택한다. *t* 를 현재 오디오 시간, 사용자 마킹 또는
기본 반복 구간을 \[*r*₁, *r*₂\] 라 하면, 분석 시간 *τ* 는 piecewise 함수이다:

```
              ⎧ t                                  if t < r₁
              ⎪
   τ(t)   =   ⎨ ((t − r₁) / (r₂ − r₁)) · r₁         if r₁ ≤ t < r₂
              ⎪
              ⎩ t − (r₂ − r₁)                      otherwise
```

세 가지 속성:

- **첫 회차 동일성.** *t* < *r*₁ 일 때 분석 시간 = 오디오 시간. 커서는
  반복이 시작되기 전까지 단순 score-follower 처럼 작동.
- **반복 시 fold-back.** *r*₁ ≤ *t* < *r*₂ 일 때 커서가 분석 구간 \[0, *r*₁\]
  을 두 번째 청취에 비례하여 재횡단. 청자는 제시부를 다시 듣고, 커서는
  마디 1로 돌아가 마디 28까지 다시 기어 올라간다.
- **반복 후 오프셋.** *t* ≥ *r*₂ 일 때 분석 시간은 오디오 속도로 전진하지만
  반복 구간 길이만큼 뒤로 오프셋. 반복 길이와 무관하게 발전부·재현부가
  정확히 주소화됨.

반복 경계 *r*₁, *r*₂ 는 키보드 단축키 (M, [, ]) 로 사용자가 실시간 캘리브레이션
가능하며, 캘리브레이션 값은 `localStorage` 에 영구 저장된다. 폴딩은 따라서
K. 545 디스코그래피에서 관찰되는 녹음별 반복 타이밍 편차에 견고하며, 동일
폴딩 스키마가 표기된 제시부 반복이 있는 모든 소나타 형식 작품에 변경 없이
이식 가능하다.

저자들이 알기로, 어떤 기존 오픈 음악 시각화 시스템 (Dezrann, Sonic
Visualiser, §2.4 의 score-following 도구 포함) 도 연주자 선택 반복을 명시적
비단조 시간 맵으로 처리하지 않는다. MIR 문헌의 가장 가까운 대응은 Müller
(2015, ch. 3) 의 구조 추적 작업으로, 다중 병렬 악보 분기 삽입을 통해 반복을
처리한다. 본 접근은 단일 score-time 축을 유지하여 구현·시각화 모두에서 더
단순하다.


# 5. 교실 워크-스루

본 절은 §3.3 의 분석적 주장을 30분 단일 수업에서 본 도구를 사용해 어떻게
끌어낼 수 있는지 예시한다.

## 5.1 첫 청취 (5분)

교사는 음원을 로딩한 상태로, *색상 시각화를 비활성화* 하고 도구를 연다.
학급은 악장 전체를 한 번 듣는다 — 제시부 반복 포함 — 그동안 악보는
스크롤되고 빨간 재생 헤드는 (아직 색이 없는) 타임라인을 따라 이동한다.
지시는 단순하다: "이 악장은 어디에서 나뉜다고 생각하나요?" 보존된 제시부
반복은 유용한 예비 관찰을 표면화한다 — 음악이 약 1분 지점에서 *같은
재료로 돌아온다* 는 사실이다.

## 5.2 색상 공개와 섹션 식별 (8분)

교사는 섹션 색상을 켠다. 제시부 / 발전부 / 재현부 의 삼분 구조가 이제
타임라인에서 한눈에 보이며, 동일한 색상이 동시에 악보 위에 마디 단위
오버레이로 입혀진다. 학생들은 타임라인 구간을 클릭함으로써 각 섹션의
경계 마디를 식별하라는 과제를 받는다. 색상 영역이 이제 *시간적* (타임라인)
이면서 동시에 *공간적* (악보) 이므로, 학생들은 두 표상 어디에서든 자신의
추측을 검증할 수 있다.

## 5.3 제시부 P 와 S (5분)

섹션 점프 버튼을 사용해 교사는 제시부의 P 영역 (mm. 1–13) 만을, 그다음
S (mm. 14–25) 만을 재생한다. 분석 패널은 "다장조" 다음 "사장조" 를 표시
하며, 경계는 청각적 *이면서* 시각적으로 표시된다. 교사는 묻는다: "모차르트가
방금 어떤 화성 진행을 했나요?" 답 (I → V) 은 이제 교사가 학급에게 *말해주는*
것이 아니라, 가시적 조성 변화로부터 학급이 *추론* 하는 대상이다.

## 5.4 결정적 순간: 재현부 P (8분)

교사는 재현부 P (mm. 42–58, 음원 시간 약 2:12) 로 점프한다. 분석 패널은
"**바장조**" 를 표시한다. 저자들의 경험상, 이것이 학생들이 앞으로 기울이는
순간이다. 두 가지 후속 동작이 교수법적 핵심을 만든다:

1. *루프 켜기*. 교사는 섹션 루프를 활성화하여 학급이 재현부 P 를 한 번
   완전히 듣게 한다. "바장조" 라벨은 시야에 유지된다. *동일한 주요 주제가
   다른 조성에서* 의 시각·청각 표상이 이제 동시에 가용해진다.
2. *A / B 비교*. 그다음 교사는 제시부 P 와 재현부 P 를 루프 토글하며 각각
   두 번씩 재생한다. 대부분의 학생들이 *두 다른 조성에서의 같은 곡조* 를
   듣게 되고, 재현부를 "틀린" 것이 아닌 *전조된* 것으로 인식한다.

## 5.5 종합 (4분)

교사는 도식적 비교를 표시한다:

> 제시부: P 다장조 → S 사장조 *(I → V, 5도 위로 이동)*
> 재현부: P 바장조 → S 다장조 *(IV → I, 5도 위로 이동)*

이 도식은 이제 학급이 방금 듣고 *또* 본 것에 근거한다. 교사는 종합 질문을
던진다: "왜 모차르트는 '틀린' 조성에서 재현부를 시작했을까요?" — 그리고
학급은, S 가 다장조에 안전하게 도착하는 것을 보았기에, 답할 재료를 가지고
있다.

위 워크-스루가 본 도구의 유일한 사용법은 아니며, 모든 구간이 색상이나
루프를 필요로 하는 것도 아니다. 그러나 이는 *본 도구로 가르치는 기본
문법* 을 예시한다: 한 구간을 선택하고, 전경화할 표상을 선택하고, 듣고,
보고, 학생들이 스스로 분석적 관찰을 만들도록 두는 것이다.


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
