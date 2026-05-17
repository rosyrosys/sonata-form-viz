---
title: "Teaching Sonata Form Through Synchronized Multi-Representational Visualization: Design, Implementation, and Evaluation of an Open-Source Web Tool Using Mozart's K. 545"
title_ko: "동기화된 다중 표상 시각화를 통한 소나타 형식 교육: 모차르트 K. 545 를 사례로 한 오픈소스 웹 도구의 설계·구현·평가"
note: "Bilingual paragraph-by-paragraph manuscript. English paragraph first, Korean translation immediately below in blockquote form. Generated for translation review and side-by-side reading; not the submission file."
date: 2026-05-15
---

[ARTICLE TYPE: Tools and Datasets Article]
[기사 유형: 도구·데이터셋 논문]

# Teaching Sonata Form Through Synchronized Multi-Representational Visualization: Design, Implementation, and Evaluation of an Open-Source Web Tool Using Mozart's K. 545
# 동기화된 다중 표상 시각화를 통한 소나타 형식 교육: 모차르트 K. 545 를 사례로 한 오픈소스 웹 도구의 설계·구현

*[Author details are not included in this manuscript file as the peer
review process is blinded. Author names, affiliations, contact details
and ORCIDs are provided via the online submission system.]*

*[익명 심사를 위해 본 원고에는 저자 정보를 포함하지 않습니다. 저자명,
소속, 연락처, ORCID 는 온라인 제출 시스템을 통해 별도로 제공됩니다.]*

# Abstract / 초록

> Sonata form is a central topic in music-theory and music-history
> curricula, yet learners routinely report difficulty perceiving
> formal structure while listening: the hierarchical relation
> between sections, theme zones, and the moment-to-moment audio is
> not directly legible from a printed score. Existing computational
> tools for music visualization either treat formal annotations as
> auxiliary metadata rather than as first-class data, or have not
> been designed for the practical edge cases of learner-facing use,
> most prominently the performer-elected exposition repeat. We
> present an open-source, web-based tool that synchronizes a
> MusicXML score, audio playback, and a two-level formal-analysis
> layer (sections × theme zones) along a single timeline,
> demonstrated on Mozart's Piano Sonata in C major, K. 545, first
> movement (73 measures). The system renders MusicXML through
> OpenSheetMusicDisplay and paints section and theme-zone colors
> directly onto the score at the measure level. We introduce an
> exposition-repeat folding map: a piecewise non-monotonic time
> function that preserves analytical monotonicity under performer-
> elected repeats, an edge case that no prior open
> music-visualization system has addressed with an explicit time
> map. Together, the tool and the released analysis schema provide
> an open infrastructure for both classroom teaching of formal
> hierarchy and downstream computational reuse on other works in
> the sonata-form repertoire.

소나타 형식은 음악이론·서양음악사 교과의 중핵 주제이지만, 학습자들은
청취 중 형식 구조를 인지하는 데 보편적으로 어려움을 보고한다. 섹션,
주제 영역, 그리고 매 순간의 오디오 사이의 위계 관계가 인쇄된 악보에서
직접 가독되지 않기 때문이다. 음악 시각화의 기존 컴퓨테이셔널 도구들은
형식 주석을 일급(first-class) 데이터가 아닌 보조 메타데이터로 취급
하거나, 학습자 친화적 사용의 실용적 엣지 케이스(특히 연주자가 시행하는
제시부 반복)에 대응하도록 설계되지 않았다. 본 연구는 MusicXML 악보,
음원 재생, 두 단계 형식 분석 계층(섹션 × 주제 영역)을 단일 시간축에서
동기화하는 오픈소스 웹 기반 도구를 제시하며, 모차르트 피아노 소나타
다장조 K. 545 1악장(73마디)을 사례로 시연한다. 시스템은 MusicXML 을
OpenSheetMusicDisplay 로 렌더하고, 마디 단위로 섹션과 주제 영역 색상을
악보 자체에 도장한다. 본 연구는 제시부 반복 폴딩 맵을 도입한다: 연주자
선택 반복 하에서 분석적 단조성을 보존하는 piecewise 비단조 시간
함수이며, 저자들이 알기로 어떤 기존 오픈 음악 시각화 시스템도 이 사례를
명시적 시간 맵으로 처리하지 않는다. 본 도구와 공개되는 분석 스키마는
형식 위계의 교실 교수와 소나타 형식 레퍼토리의 다른 작품들로의 다운스트림
컴퓨테이셔널 재사용을 위한 *오픈 인프라* 를 제공한다.

> **Word Count:** *[to be inserted at final submission, current
> draft ≈ 6,000 words including references and appendix]*

**단어 수:** *[최종 제출 시 정확한 단어 수 기입, 현재 초안 약 6,000
단어 (참고문헌·부록 포함)]*

> **Keywords:** sonata form; score-audio synchronization; MusicXML
> visualization; exposition-repeat folding; music education
> technology; Mozart K. 545

**주제어:** 소나타 형식; 악보-음원 동기화; MusicXML 시각화;
제시부 반복 폴딩; 음악교육공학; 모차르트 K. 545


# 1. Introduction / 서론

## 1.1 Motivation / 연구의 필요성

> Sonata form is the principal organizational principle of Western
> instrumental music from the late eighteenth century onwards and remains
> a central topic in music-theory and music-history curricula at both
> secondary and tertiary levels (Caplin, 2009; Hepokoski & Darcy, 2006).
> Despite this curricular centrality, learners, including
> music-conservatory entrants, routinely report difficulty perceiving
> formal structure during listening (Cook, 1990; Margulis, 2014). This
> difficulty arises from at least three representational gaps:

소나타 형식은 18세기 후반 이후 서양 기악 음악의 핵심 조직 원리로서
중등·고등 교육의 음악이론·서양음악사 교과에서 중핵적 주제로 자리
잡고 있다 (Caplin, 2009; Hepokoski & Darcy, 2006). 그러나 교육과정상의
중요성에도 불구하고, 학습자, 음악대학 신입생까지 포함하여, 는
청취 중 형식 구조를 인지하는 데 어려움을 보편적으로 보고한다
(Cook, 1990; Margulis, 2014). 이 어려움은 적어도 세 가지 표상의
격차에서 비롯된다:

> - **The temporal–spatial gap.** Music unfolds in time, but notation is
>   fixed in space. The learner must mentally bind the two.
> - **Absence of "you-are-here" cues.** Listeners typically receive no
>   visual indication of their current position within the formal scheme.
> - **Flattening of hierarchy.** The hierarchy of section → theme zone →
>   motive is not directly legible from the printed score; it relies on
>   verbal explanation or post-hoc analysis.

- **시간-공간 격차.** 음악은 시간에 따라 펼쳐지지만 기보는 공간에
  고정되어 있다. 학습자는 둘을 머릿속으로 연결해야 한다.
- **"현재 위치(you-are-here)" 단서의 부재.** 청자는 형식 안에서 자신이
  어디에 있는지 시각적으로 안내받지 못한다.
- **위계의 평면화.** 섹션 → 주제 영역 → 동기로 이어지는 위계는
  인쇄된 악보에 직접 표시되지 않으며, 언어적 설명이나 사후 분석에
  의존한다.

> Digital tools offer a route to closing these gaps through
> *simultaneous representation*. Computational visualization has shown
> analytic potential in the computer-musicology literature, but most
> existing tools are research-oriented and not aimed at classroom
> learners. Commercial platforms such as Soundslice and MuseScore Web
> provide score-following synchronized to audio, yet they do not treat
> *formal analysis as a first-class data object*: a learner cannot click
> a "secondary theme" label, jump to it, loop it, and see it foregrounded
> on the score in the same color it occupies on a timeline.

디지털 도구는 *동시 표상* 을 통해 이 격차들을 메울 수 있는 경로를
제공한다. 컴퓨테이셔널 시각화는 컴퓨터-음악학 문헌에서 분석적
잠재력을 보여 왔으나, 기존 도구 대부분은 *연구자 지향* 이며 교실
학습자를 겨냥하지 않는다. Soundslice, MuseScore Web 같은 상용
플랫폼은 음원에 동기화된 악보 추종 기능을 제공하지만, *형식 분석
자체를 일급(first-class) 데이터 객체로* 다루지는 않는다: 학습자는
"부주제(S)" 라벨을 클릭해서 그 지점으로 점프하고, 루프시키고, 악보
위에서 타임라인과 동일한 색으로 전경화된 모습을 동시에 볼 수 있는
경험을 갖지 못한다.

> This paper presents an open-source tool designed precisely to close
> that gap, evaluates its educational effect on undergraduate
> music-education majors, and releases its analytical data and source
> code under permissive licenses for community reuse.

본 논문은 정확히 그 격차를 메우기 위해 설계된 오픈소스 도구를
제시하고, 학부 음악교육 전공자에 대한 교육적 효과를 (후속 연구로)
평가하며, 분석 데이터와 소스 코드를 커뮤니티 재사용 가능한 관대한
라이선스로 공개한다.

## 1.2 Research Questions / 연구 문제

> - **RQ1.** How should the synchronized visualization of score, audio,
>   and formal analysis be designed to support effective learning of the
>   hierarchical structure of sonata form?
> - **RQ2.** What pedagogical affordances does the first movement of
>   Mozart's K. 545 offer as a case piece, particularly its
>   subdominant-recapitulation deformation?
> - **RQ3.** How does the implemented system perform with respect to (a)
>   formal-identification accuracy and (b) system usability?

- **RQ1.** 소나타 형식의 위계 구조를 효과적으로 학습하도록 돕는,
  악보·음원·형식 분석의 동기화 시각화는 어떻게 설계되어야 하는가?
- **RQ2.** 모차르트 K. 545 1악장은 사례 작품으로서 어떤 교수법적
  어포던스를 제공하는가, 특히 하속조 재현부라는 비전형은 어떻게
  활용될 수 있는가?
- **RQ3.** 구현된 시스템은 (a) 형식 식별 정확도와 (b) 시스템 사용성
  측면에서 어떻게 평가되는가?

## 1.3 Contributions / 연구의 기여

> This work contributes four artifacts to the TISMIR Tools-and-Datasets
> layer:

본 연구는 TISMIR Tools-and-Datasets 계층에 네 개의 산출물을 기여한다:

> 1. **A learner-facing open-source tool** (MIT) that synchronizes
>    notated score, audio, and a hierarchical formal-analysis layer in
>    the browser, with a single external dependency
>    (OpenSheetMusicDisplay) and a metronome demo mode for
>    copyright-sensitive classroom use.

1. **학습자 친화 오픈소스 도구** (MIT), 단일 외부 의존성
   (OpenSheetMusicDisplay) 만으로 악보·음원·위계적 형식 분석을
   브라우저에서 동기화하며, 저작권 민감 교실 환경을 위한 메트로놈
   데모 모드를 포함한다.

> 2. **An open analysis schema and dataset** (CC BY 4.0), a
>    machine-readable JSON encoding of two-level sonata-form analysis
>    (sections × theme zones), instantiated for Mozart K. 545 mvt. I
>    and *intentionally interoperable* with the Algomus annotation
>    conventions of Allegraud et al. (2019), so that human-curated
>    analyses and classifier output share a common ingestion path.

2. **오픈 분석 스키마와 데이터셋** (CC BY 4.0), 섹션 × 주제 영역의
   두 단계 소나타 형식 분석을 기계가독 JSON 으로 부호화하고, 모차르트
   K. 545 1악장에 대해 인스턴스화한다. 본 스키마는 Allegraud et al.
   (2019) 의 Algomus 주석 컨벤션과 *의도적으로 상호운용 가능* 하도록
   설계되어, 인간 큐레이팅 분석과 분류기 출력 모두 동일한 입력 경로를
   공유한다.

> 3. **An exposition-repeat folding map**, a piecewise non-monotonic
>    time function that preserves analytical monotonicity under
>    performer-elected exposition repeats, formalized in §4.5. To our
>    knowledge, no prior open music-visualization system (Dezrann,
>    Sonic Visualiser, Verovio Humdrum Viewer, score-following
>    commercial tools) treats this case with an explicit time map.

3. **제시부 반복 폴딩 시간 맵**: 연주자 선택 제시부 반복 하에서
   분석적 단조성을 보존하는 piecewise 비단조 시간 함수 (§4.5 에서
   공식화). 저자들이 알기로 기존 어떤 오픈 음악 시각화 시스템
   (Dezrann, Sonic Visualiser, Verovio Humdrum Viewer, 상용
   score-following 도구 포함) 도 이 사례를 명시적 시간 맵으로
   처리하지 않는다.

> 4. **A pedagogical scenario for the atypical-recapitulation case**,
>    a 30-minute classroom walk-through (§5) demonstrating how the
>    tool's three coordinated representations surface K. 545's
>    subdominant recapitulation as a functional-logic deduction
>    rather than a memorized exception.

4. **비전형 재현부 사례에 대한 교수법적 시나리오**: 본 도구의 세 가지
   동기화된 표상이 K. 545 의 하속조 재현을 *암기된 예외* 가 아닌
   *함수적 논리의 추론* 으로 표면화하는 과정을 보이는 30분 교실
   워크-스루 (§5).

> Empirical validation of learning effects is reserved for a planned
> randomized controlled trial; the present contribution is the open
> infrastructure layer on which such evaluation can be built.

학습 효과의 정량적 검증은 별도의 무작위 통제군 시험으로 유보하며, 본
연구의 기여는 그러한 평가가 이루어질 수 있는 *오픈 인프라 계층* 자체에
해당한다.


# 2. Background / 이론적 배경

## 2.1 Hierarchical Analysis of Sonata Form / 소나타 형식의 위계적 분석

> We adopt a two-level hierarchy that combines the rotational perspective
> of Sonata Theory (Hepokoski & Darcy, 2006) with the formal-function
> account of Caplin (1998).

본 연구는 Hepokoski & Darcy (2006) 의 *Sonata Theory* 의 회전적
(rotational) 관점과 Caplin (1998) 의 형식 기능 (formal-function) 분석을
결합한 두 단계 위계를 채택한다.

> **Large sections.**
> - Exposition, presents two thematic complexes in two key areas.
> - Development, recasts and modulates the exposition's material.
> - Recapitulation, restates both thematic complexes in the tonic.
> - Coda, optional closing section (absent in K. 545 mvt. I).

**대(大)섹션.**
- 제시부: 두 개의 주제 복합체를 두 개의 조성 영역에서 제시.
- 발전부: 제시부의 재료를 재구성·전조.
- 재현부: 두 주제 복합체를 모두 으뜸조에서 재진술.
- 코다: 선택적 종결부 (K. 545 1악장에는 없음).

> **Theme zones.**
> - P (Primary theme zone)
> - T (Transition)
> - S (Secondary theme zone)
> - K (Closing theme / codetta)

**주제 영역.**
- P (주주제 영역)
- T (경과부)
- S (부주제 영역)
- K (종결 주제 / 코데타)

> This two-level hierarchy is directly compatible with both Hepokoski &
> Darcy's *rotational* analysis and Caplin's *formal-function* analysis,
> and it offers learners *two simultaneous resolutions of "where am I?"*:
> which large section, and which thematic role within it.

이 두 단계 위계는 Hepokoski & Darcy 의 *회전적* 분석과 Caplin 의
*형식 기능* 분석 모두와 직접 호환되며, 학습자에게 *"나는 지금 어디
있는가?" 라는 질문의 두 가지 동시 해상도*, 어느 대섹션 안에 있는지,
그 안에서 어떤 주제적 역할을 맡는 지점인지, 를 제공한다.

## 2.2 Dual Coding and the Cognitive Theory of Multimedia Learning / 이중 부호화와 멀티미디어 학습의 인지 이론

> Paivio's (1991) dual coding theory holds that verbal and non-verbal
> representations are processed through *separate cognitive channels*,
> and that activating both channels increases learning efficiency.
> Mayer's (2009) cognitive theory of multimedia learning extends this to
> instructional design through three principles particularly relevant
> here:

Paivio (1991) 의 이중 부호화 이론(dual coding theory) 은 언어적·비언어적
표상이 *분리된 인지 채널* 을 통해 처리되며, 두 채널을 동시에 활성화할
때 학습 효율이 증가한다고 본다. Mayer (2009) 의 멀티미디어 학습
인지이론은 이를 수업 설계로 확장한다. 본 연구와 특히 관련 있는 세
원리:

> | Mayer's Principle | Implementation in This Tool |
> |---|---|
> | Modality | Audio (auditory) + score (visual) + label (verbal) co-presented |
> | Temporal contiguity | All representations updated within a single render frame on `timeupdate` |
> | Spatial contiguity | Color overlay drawn *directly on the score itself*, not in a separate panel |

| Mayer 원리 | 본 도구에서의 구현 |
|---|---|
| 양상성 (Modality) | 음원(청각) + 악보(시각) + 라벨(언어) 동시 제시 |
| 시간적 인접성 | 모든 표상이 `timeupdate` 시 단일 렌더 프레임 내 갱신 |
| 공간적 인접성 | 색상 오버레이를 별도 패널이 아닌 *악보 그 자체* 위에 도장 |

> Color mapping has been studied as a representational means in music
> pedagogy. Kuo and Chuang (2013), proposing a color music notation system
> for beginners, map pitch, duration, range, and intensity to colors,
> lattices, graphs, and shape sizes respectively, drawing on Itten's color
> wheel and the Natural Color System to align twelve primary colors with
> twelve-tone equal temperament. Their work demonstrates the systematic
> applicability of color–music synesthetic mapping at the *pitch*
> dimension. Our tool's two-tier scheme (sections plus theme zones, with
> WCAG-2.1 contrast and non-color redundancy) applies the same color–music
> representational principle, but at the *formal hierarchy* dimension
> rather than the pitch dimension.

음악 교수법에서 색상 매핑은 표상 수단으로 연구되어 왔다. Kuo and
Chuang (2013) 은 초보자를 위한 색채 음악 표기 시스템을 제안하며 음높이,
지속 시간, 음역, 세기를 각각 색·격자·그래프·도형 크기에 매핑하고,
Itten 의 색상환과 Natural Color System 을 활용해 12개 기본 색상을
12음 평균율과 정렬한다. 이들의 작업은 *음높이* 차원에서 색-음악
공감각적 매핑의 체계적 적용 가능성을 보여준다. 본 도구의 두 단계 도식
(섹션 + 주제 영역, WCAG-2.1 대비 + 비-색상 중복 인코딩 포함) 은 동일한
색-음악 표상 원리를 음높이 차원이 아닌 *형식 위계* 차원에 적용한다.

## 2.3 Active Learning and Comparative Listening / 능동 학습과 비교 청취

> Hargreaves (1986) and North & Hargreaves (2008) document that
> form-learning is strengthened by *repeated listening* and *active
> comparison*. The present tool therefore supports section-level
> jumping, section looping, playback-speed control, and keyboard
> shortcuts so that learners can perform *A–B comparison* of, for
> example, P in the exposition versus P in the recapitulation, a
> comparison that is precisely what reveals the K. 545 subdominant
> recapitulation as such.

Hargreaves (1986) 와 North & Hargreaves (2008) 은 형식 학습이 *반복
청취* 와 *능동 비교* 로 강화됨을 문서화한다. 따라서 본 도구는 섹션 점프,
구간 반복, 재생 속도 조절, 키보드 단축키를 지원하여 학습자가 예를 들어
*제시부 P 와 재현부 P 의 A-B 비교* 를 수행할 수 있게 한다. 정확히
이러한 비교가 K. 545 의 하속조 재현부의 본질을 드러내는 통로이다.

## 2.4 Related Tools / 관련 도구

> The closest precedents for the present work are the Dezrann web
> platform (Ballester et al. 2025) and the sonata-form structure-learning
> study of Allegraud et al. (2019), both published in this journal. Both
> treat formal music annotation as a first-class web-interactive object;
> both have been applied to Mozart sonata movements. The present work
> follows that line and contributes three differences:

본 작업의 가장 가까운 선행 사례는 본 학술지(TISMIR) 에 게재된 Dezrann
웹 플랫폼 (Ballester et al. 2025) 과 Allegraud et al. (2019) 의 소나타
형식 구조 학습 연구이다. 양자 모두 형식 음악 주석을 일급(first-class)
웹 인터랙티브 객체로 다루며, 둘 다 모차르트 소나타 악장에 적용되었다.
본 연구는 이 계열을 잇되 세 가지 차이를 기여한다:

> 1. **Two-level color encoding native to the score.** Where Dezrann
>    places annotation labels as discrete markers on a waveform-and-
>    score view, our tool paints *the score itself* with section colors
>    at the measure level (computed via SVG `getBBox` on the OSMD
>    render). Section and theme-zone colors coexist on the same surface
>    the learner is already reading.

1. **악보 자체에 직접 도장된 두 단계 색상 인코딩.** Dezrann 이
   waveform-and-score 뷰 위에 주석 라벨을 *이산 마커* 로 배치하는
   반면, 본 도구는 *악보 자체* 를 마디 단위 섹션 색상으로 칠한다
   (OSMD 렌더 위의 SVG `getBBox` 로 계산). 섹션 색과 주제 영역 색이
   학습자가 이미 읽고 있는 동일 표면에 공존한다.

> 2. **A two-level analytical schema treated as primary data.** Our
>    `sonata_structure.json` is not metadata attached to a Dezrann
>    annotation but a stand-alone, peer-reviewable, versioned object
>    licensed CC BY 4.0. This makes it directly reusable in MIR
>    pipelines and in derivative analyses of other works, in the same
>    sense that the Allegraud et al. (2019) sonata-form corpus has been
>    reused.

2. **분석 스키마를 일급 데이터로 취급.** 본 연구의
   `sonata_structure.json` 은 Dezrann 주석에 첨부된 메타데이터가 아니라
   *독립된 peer-reviewable, 버전 관리되는 객체* 로 CC BY 4.0 으로 공개
   된다. 이는 MIR 파이프라인과 다른 작품의 파생 분석에 그대로 재사용
   가능, Allegraud et al. (2019) 의 소나타 형식 코퍼스가 재사용되어
   온 것과 같은 의미이다.

> 3. **A learner-facing, single-work focus.** Allegraud et al. (2019)
>    address the *automatic detection* problem on a 32-quartet corpus
>    for the music-information-retrieval community; the present tool
>    addresses the *teaching* problem on a single canonical work for the
>    music-education community. The two are complementary: a robust
>    classifier (Allegraud) and a precise pedagogical instrument
>    (this work) need not target the same evaluation metric.

3. **학습자 친화, 단일 작품 초점.** Allegraud et al. (2019) 은 MIR
   커뮤니티를 위해 32곡 현악사중주 코퍼스의 *자동 검출* 문제를 다룬다.
   본 도구는 음악교육 커뮤니티를 위해 단일 정전 작품의 *교수* 문제를
   다룬다. 두 접근은 상보적, 견고한 분류기(Allegraud) 와 정밀한
   교수 도구 (본 연구) 가 동일한 평가 지표를 겨냥할 필요는 없다.

> Table 1 positions the present work against several adjacent systems.

표 1 은 본 연구를 인접 시스템들과 비교 배치한다.

> **Table 1.** Comparison with related visualization, annotation, and
> score-following tools.
>
> | Tool | Hierarchical formal labels | Score-audio sync | Color on score itself | Section jump | Open source | Learner-facing |
> |---|---|---|---|---|---|---|
> | Sonic Visualiser (Cannam et al. 2010) | △ (annotation only) | × | × | △ | ✓ | △ |
> | Soundslice (commercial) | × | ✓ | × | △ | × | ✓ |
> | iAnalyse (Couprie 2008) | ✓ | △ | △ | ✓ | ✓ | △ |
> | Verovio Humdrum Viewer (Sapp 2017) | △ | △ | × | × | ✓ | △ |
> | MuseScore Web (commercial) | × | ✓ | × | × | × | ✓ |
> | Dezrann (Ballester et al. 2025) | ✓ (label-based) | ✓ | △ (track labels) | ✓ | ✓ | ✓ |
> | **This work** | **✓ (two-level)** | **✓** | **✓ (measure-painted)** | **✓** | **✓** | **✓** |

**표 1.** 관련 시각화·주석·악보 추종 도구와의 비교.

| 도구 | 위계적 형식 라벨 | 악보-음원 동기화 | 악보 자체 위 색상 | 섹션 점프 | 오픈소스 | 학습자 친화 |
|---|---|---|---|---|---|---|
| Sonic Visualiser (Cannam et al. 2010) | △ (주석만) | × | × | △ | ✓ | △ |
| Soundslice (상용) | × | ✓ | × | △ | × | ✓ |
| iAnalyse (Couprie 2008) | ✓ | △ | △ | ✓ | ✓ | △ |
| Verovio Humdrum Viewer (Sapp 2017) | △ | △ | × | × | ✓ | △ |
| MuseScore Web (상용) | × | ✓ | × | × | × | ✓ |
| Dezrann (Ballester et al. 2025) | ✓ (라벨 기반) | ✓ | △ (트랙 라벨) | ✓ | ✓ | ✓ |
| **본 연구** | **✓ (두 단계)** | **✓** | **✓ (마디 도장)** | **✓** | **✓** | **✓** |

> The novelty claim is therefore narrower than "first open-source
> sonata-form visualization": it is "first open-source, learner-facing
> tool combining measure-painted hierarchical formal color, score-audio
> synchronization, and a separable analysis-as-data schema."

따라서 본 연구의 신규성 주장은 "최초의 오픈소스 소나타 형식 시각화"
보다 더 좁다: "*마디 도장된 위계적 형식 색상* + *악보-음원 동기화* +
*분리 가능한 분석-데이터 스키마* 를 결합한 최초의 오픈소스 학습자
친화 도구" 가 정확한 표현이다.


# 3. Mozart's K. 545, Movement I: An Analytical Walk-Through / 모차르트 K. 545 1악장 분석적 워크-스루

## 3.1 Why This Work, and Why Movement I / 왜 이 작품, 왜 1악장인가

> Composed in Vienna in 1788 and self-described by Mozart as "*für
> Anfänger*" (for beginners; the now-conventional title *Sonata facile*
> is a posthumous attribution), the movement is in C major, common time,
> *Allegro*, and runs only 73 measures (Mozart, 1986/NMA IX/25). Its
> near-canonical status in piano pedagogy means that most undergraduate
> music students have *played or heard* the work before they have *analyzed*
> it, a peculiar gap that this paper, and the tool it accompanies, take
> as a pedagogical opportunity. Three properties make Movement I uniquely
> productive as a teaching case:

1788년 비엔나에서 작곡되어 모차르트 본인이 "*für Anfänger*" (초보자를
위한; 통용되는 제목 *Sonata facile* 는 사후 부여된 별칭) 라고 표기한
이 악장은 다장조, 4/4 박자, *Allegro*, 73마디에 불과하다 (Mozart, 1986/
NMA IX/25). 피아노 교수법에서 거의 정전(canonical) 의 위상을 갖기에
대부분의 학부 음악 전공자는 이 작품을 *분석* 하기 전에 *연주하거나
들어본* 경험을 갖는다, 본 논문과 동반 도구는 이 특이한 간극을
교수법적 기회로 삼는다. 1악장이 교재로서 유달리 생산적인 세 가지
속성이 있다:

> 1. **Length.** At roughly three and a half minutes, the whole movement
>    fits comfortably into a single class hearing, with time left for
>    comparative re-listening of selected regions.

1. **분량.** 약 3분 30초로 전 악장이 단일 수업 시간 안에 편안히
   수용되며, 선별 구간 비교 재청취까지 시간이 남는다.

> 2. **Textural transparency.** The Alberti-bass-plus-melody texture
>    leaves each formal landmark audible: every theme entry, every
>    modulation, every cadence is clearly articulated. Less transparent
>    sonata movements (e.g., the Beethoven *Pathétique*, Op. 13/i) bury
>    their formal events in dense polyphony.

2. **텍스처의 투명성.** 알베르티 베이스 + 선율 의 단순 텍스처는 모든
   형식적 지표를 가청적으로 보존한다: 주제 진입, 전조, 종지 하나하나가
   명료히 발음된다. 덜 투명한 소나타 악장 (예: 베토벤 *Pathétique*,
   Op. 13/i) 은 형식적 사건을 짙은 다성 안에 묻는다.

> 3. **A normative-and-deformational character.** The exposition behaves
>    *exactly as a textbook sonata exposition should*; the recapitulation
>    does not. This contrast, the same musical material treated two ways
>   , is the analytical heart of the movement and the heart of this
>    paper.

3. **규범적-비전형적 이중성.** 제시부는 *교과서적 소나타 제시부가
   응당 그러해야 할 그대로* 행동하지만, 재현부는 그렇지 않다. 같은
   음악 재료가 두 가지 방식으로 다루어지는 이 대비가 본 악장의 분석적
   심장이며, 본 논문의 심장이다.

## 3.2 Two-Level Formal Layout / 두 단계 형식 배치

> Table 2 presents the formal analysis encoded in the tool. The
> two-level grain, large *sections* containing *theme zones*, follows
> the SHMRG tradition of LaRue (1970) and the *Sonata Theory* framework
> of Hepokoski and Darcy (2006), simplified for pedagogical use by
> collapsing the transition into the primary-theme zone when the latter
> is harmonically continuous.

표 2 는 본 도구에 부호화된 형식 분석을 제시한다. 두 단계 입자성, *대
섹션* 이 *주제 영역* 을 포함하는, 은 LaRue (1970) 의 SHMRG 전통과
Hepokoski & Darcy (2006) 의 *Sonata Theory* 프레임을 따르되, 경과부가
화성적으로 연속될 때는 주주제 영역에 합쳐 교수법적 단순화를 적용한다.

> **Table 2.** Two-level formal analysis of K. 545, mvt. I (73 measures).
> Times are given for a representative recording at ♩ ≈ 132 with the
> exposition repeat taken.

**표 2.** K. 545 1악장 (73마디) 의 두 단계 형식 분석. 시간은 ♩ ≈ 132
의 대표 녹음에서 제시부 반복 포함 기준이다.

> | Section | Theme zone | Measures | Key | Time |
> |---|---|---|---|---|
> | **Exposition** | Primary theme (P) | 1–13 | C major | 0:00 – 0:27 |
> | | Secondary theme (S) | 14–25 | G major | 0:27 – 0:50 |
> | | Codetta | 26–28 | G major | 0:50 – 0:55 |
> | | *Exposition repeated* |, |, | 0:55 – 1:47 |
> | **Development** | (modulating progression) | 29–41 | g → d → a → C → a → F | 1:48 – 2:12 |
> | **Recapitulation** | Primary theme (P) | 42–58 | **F major** ← subdominant | 2:12 – 2:45 |
> | | Secondary theme (S) | 59–70 | C major | 2:45 – 3:07 |
> | | Codetta | 71–73 | C major | 3:07 – 3:13 |

| 섹션 | 주제 영역 | 마디 | 조성 | 시간 |
|---|---|---|---|---|
| **제시부** | 주주제 (P) | 1–13 | 다장조 | 0:00 – 0:27 |
| | 부주제 (S) | 14–25 | 사장조 | 0:27 – 0:50 |
| | 코데타 | 26–28 | 사장조 | 0:50 – 0:55 |
| | *제시부 반복* | - | - | 0:55 – 1:47 |
| **발전부** | (전조 진행) | 29–41 | g → d → a → C → a → F | 1:48 – 2:12 |
| **재현부** | 주주제 (P) | 42–58 | **바장조** ← 하속조 | 2:12 – 2:45 |
| | 부주제 (S) | 59–70 | 다장조 | 2:45 – 3:07 |
| | 코데타 | 71–73 | 다장조 | 3:07 – 3:13 |

> Three features of this table reward attention. *First*, every numbered
> measure has a unique formal address: this is what allows the tool to
> overlay a color block on each measure in the score and a color segment
> on the timeline. *Second*, the exposition's tonal motion, C → G,
> typical for a major-mode sonata, is reproduced *not* in the
> recapitulation but in *the exposition's own repeat*; this is the
> performer's primary mechanism for letting the listener internalize the
> exposition's harmonic plan. *Third*, the recapitulation reproduces the
> *entire harmonic pattern of the exposition*, but shifted: P now in F
> major rather than C, with S returning to C rather than going to G.
> The remainder of this section unpacks why.

이 표의 세 가지 특징이 주목할 만하다. *첫째*, 모든 번호 매김된 마디는
고유 형식 주소를 갖는다, 이것이 도구가 악보의 각 마디에 색상 블록을,
타임라인에 색상 구간을 오버레이할 수 있게 하는 기반이다. *둘째*, 제시부
의 조성 진행, 다 → 사, 장조 소나타의 전형, 은 재현부가 아닌 *제시부
자체의 반복* 에서 재현된다. 이는 청자가 제시부의 화성 설계를 내재화하게
하는 연주자의 주된 메커니즘이다. *셋째*, 재현부는 제시부의 *전체 화성
패턴* 을 그대로 재현하되 위치를 이동시킨다: P 가 다장조가 아닌 바장조
에서, S 가 사장조가 아닌 다장조에서. 본 절의 나머지 부분이 그 이유를
풀어낸다.

## 3.3 The Subdominant Recapitulation: Functional Logic / 하속조 재현부의 함수적 논리

> K. 545's recapitulation famously begins in F major rather than the
> expected tonic C. Hepokoski and Darcy (2006: ch. 17) classify this as a
> *subdominant recapitulation*, a recognized but unusual deformation of
> the standard sonata template. The deformation is unusual enough to be
> mentioned in nearly every undergraduate textbook treatment of the
> movement, but its functional logic is rarely traced in detail.

K. 545 의 재현부는 기대되는 으뜸조 다장조가 아닌 바장조에서 시작하는
것으로 유명하다. Hepokoski & Darcy (2006: 17장) 는 이를 *하속조 재현*
(subdominant recapitulation) 으로 분류하며, 표준 소나타 템플릿의 인정된
그러나 비전형적인 변형으로 다룬다. 이 비전형성은 거의 모든 학부 교재
의 본 악장 다룸에서 언급될 만큼 두드러지지만, 그 *함수적 논리* 는
세밀하게 추적되는 일이 드물다.

### A symmetrical harmonic plan / 대칭적 화성 설계

> Consider the exposition first. The primary theme begins in the tonic
> (C major), the transition leads the harmony to the dominant (G major),
> and the secondary theme arrives on that dominant. Schematically:

먼저 제시부를 보자. 주주제는 으뜸조 (다장조) 에서 시작하고, 경과부는
화성을 딸림조 (사장조) 로 이끌며, 부주제는 그 딸림조에 도착한다.
도식적으로:

> > **Exposition:** P in C → S in G  (motion of a fifth upward)

> **제시부:** P 다장조 → S 사장조  (5도 상행)

> This *I → V* trajectory is the textbook expectation. Now consider what
> would happen if the recapitulation mechanically reused this trajectory
> while starting in the tonic:

이 *I → V* 궤적이 교과서적 기대이다. 이제 재현부가 으뜸조에서 시작하면서
이 궤적을 기계적으로 재사용하면 어떻게 될지 생각해 보자:

> > **Hypothetical "tonic recap":** P in C → S in G  (same as exposition)

> **가상의 "으뜸조 재현":** P 다장조 → S 사장조  (제시부와 동일)

> The result would *fail to fulfill the recapitulation's central
> function*, consolidating *both* themes in the tonic. The secondary
> theme would arrive at G major, exactly as in the exposition, and the
> movement would have *no* resolution of the dominant.

결과는 재현부의 핵심 기능, *두 주제 모두* 를 으뜸조에 통합하기, 를
*달성하지 못한다*. 부주제는 제시부와 똑같이 사장조에 도착할 것이고,
악장은 딸림조를 *해소하지 못한* 채 끝나게 된다.

> Mozart's solution is brilliantly economical: he transposes the entire
> recapitulation P down a fifth, into F major, and then lets the same
> modulating logic carry the music *up* a fifth to the tonic.

모차르트의 해법은 명쾌하리만큼 경제적이다: 재현부 P 전체를 5도 아래
바장조로 이조하고, 동일한 전조 논리가 음악을 5도 *상행* 시켜 으뜸조
로 데려가게 한다.

> > **Mozart's actual recap:** P in F → S in C  (motion of a fifth upward)

> **모차르트의 실제 재현부:** P 바장조 → S 다장조  (5도 상행)

> The motion *I → V* of the exposition becomes *IV → I* of the
> recapitulation, exactly the resolution the form requires. The same
> modulatory mechanism, redirected by a single starting-key shift,
> achieves precisely the opposite tonal effect.

제시부의 *I → V* 운동이 재현부에서는 *IV → I* 가 된다, 형식이 요구
하는 정확한 해소이다. 동일한 전조 메커니즘이 단 하나의 시작 조성 변경
으로 재방향되어 정확히 반대의 조성적 효과를 달성한다.

### Why this matters pedagogically / 이것이 왜 교수법적으로 중요한가

> Three observations follow from this analysis:

이 분석에서 세 가지 관찰이 따른다:

> 1. **The "deformation" is not a deviation but an optimization.** A
>    strict tonic-onset recap would have required Mozart to alter the
>    internal mechanism of the modulation. Instead, by changing only
>    the starting key, the entire mechanism is preserved and reoriented.
>    Form here behaves as *living convention*: the convention is
>    "consolidate themes in tonic," and Mozart finds the most economical
>    route to that goal.

1. **"비전형" 은 이탈이 아니라 최적화이다.** 엄격한 으뜸조 시작 재현부
   였다면 모차르트는 전조의 내부 메커니즘을 변형해야 했을 것이다. 대신
   시작 조성만 바꿈으로써 전체 메커니즘은 보존되고 재방향된다. 여기서
   형식은 *살아있는 관습* 으로 행동한다: 관습은 "주제들을 으뜸조에
   통합하기" 이며, 모차르트는 그 목표에 도달하는 가장 경제적인 경로를
   찾는다.

> 2. **Recognition of subdominant recap requires hearing both the local
>    key and the larger functional aim.** A listener attending only to
>    the surface ("the recap starts in the wrong key") misses the
>    resolution; a listener attending only to the tonal goal ("S returns
>    to C") misses Mozart's clever route. Both layers, local key,
>    structural goal, must be simultaneously available to the learner.
>    This is exactly where multi-representational visualization can help:
>    color labels make local key audible-at-a-glance, while the timeline
>    makes the structural goal visible at a single look.

2. **하속조 재현의 인지는 지역적 조성과 더 큰 함수적 목표를 동시에
   들어야 한다.** 표면에만 주목하는 청자 ("재현부가 틀린 조성에서 시작
   한다") 는 해소를 놓치고, 조성적 목표에만 주목하는 청자 ("S 가
   다장조로 돌아온다") 는 모차르트의 영리한 경로를 놓친다. *두 계층,
   지역 조성, 구조적 목표, 이 동시에 학습자에게 가용해야 한다.*
   정확히 이 지점에서 다중 표상 시각화가 도움을 줄 수 있다: 색상
   라벨이 지역 조성을 한눈에 가청적으로 만들고, 타임라인이 구조적
   목표를 한눈에 가시적으로 만든다.

> 3. **The recap is not a literal repetition.** Beyond the starting
>    transposition, the recapitulation expands the transition (mm. 50–57)
>    relative to the single-measure exposition T at m. 13, a
>    *recompositional* adjustment necessary to land S correctly in C.
>    This is again a teaching point: a recapitulation that "just goes
>    back to the beginning" would be unable to negotiate the
>    non-symmetric tonal layout.

3. **재현부는 문자 그대로의 반복이 아니다.** 시작 이조 외에도 재현부는
   경과부 (mm. 50–57) 를, m. 13 의 단일 마디 제시부 T 와 비교하여,
   확장한다. 이는 S 를 다장조에 올바르게 착륙시키기 위한 *재작곡적*
   조정이다. 다시금 교수법적 핵심: "단순히 처음으로 돌아가는" 재현부는
   비대칭 조성 배치를 협상하지 못할 것이다.

> These three observations are not new to specialists, but the experience
> of *seeing them happen simultaneously*, in color, on the score, at
> playback speed, is, in our experience, when students cease describing
> the recap as "wrong key" and begin describing it as "clever solution."

이 세 관찰은 전공자에게 새롭지 않으나, *세 가지를 동시에, 색상으로,
악보 위에서, 재생 속도로, 일어나는 모습으로 보는 경험* 이, 저자들의
경험상, 학생들이 재현부를 "틀린 조성" 으로 기술하기를 멈추고 "영리한
해법" 으로 기술하기 시작하는 순간이다.

### Codetta differences / 코데타 차이

> A subtler but equally instructive observation concerns the codettas.
> The exposition codetta (mm. 26–28) cadences in G major, providing a
> strong half-cadence-of-the-tonic / authentic-cadence-of-the-dominant
> double function. The recapitulation codetta (mm. 71–73) cadences in C
> major and is, significantly, virtually unchanged in figuration from
> its exposition counterpart. The tool's color overlay reveals this: the
> codetta color band reappears with identical material at identical
> length, while the *meaning* of the cadence has fundamentally shifted.
> For learners, this is a vivid demonstration that *form is not surface
> identity*; the same notes occupy different functional roles depending
> on the harmonic environment.

조금 더 미묘하지만 동등하게 시사적인 관찰이 코데타들에 관한 것이다.
제시부 코데타 (mm. 26–28) 는 사장조로 종지하여 *으뜸조의 반종지 /
딸림조의 완전 종지* 라는 강력한 이중 기능을 제공한다. 재현부 코데타
(mm. 71–73) 는 다장조로 종지하며, 중요하게도, figuration 면에서는
제시부 대응물과 사실상 동일하다. 본 도구의 색상 오버레이가 이를 드러
낸다: 코데타 색상 띠가 동일 길이의 동일 재료로 재등장하지만, 종지의
*의미* 는 근본적으로 변해 있다. 학습자에게는 *형식이 표면의 동일성이
아님* 을 생생히 보여주는 시연이다, 같은 음표가 화성 환경에 따라
서로 다른 함수적 역할을 점유한다.

### How the tool surfaces these insights / 도구가 이 통찰들을 어떻게 표면화하는가

> The analytical claims above are not generated by the tool, they are
> the analytical content the tool is *designed to reveal*. Three
> features carry the pedagogical work:

위의 분석적 주장들은 도구가 *생성* 하는 것이 아니라, 도구가 *드러내도록
설계된* 분석적 내용이다. 세 가지 기능이 교수법적 작업을 수행한다:

> 1. **Key labels on recap regions.** When the playhead enters mm. 42–58,
>    the analysis pane displays "F major" rather than "C major." The
>    anomaly is named in real time.

1. **재현부 구간에서의 조성 라벨.** 플레이헤드가 mm. 42–58 에 진입하면
   분석 패널이 "다장조" 가 아닌 "바장조" 를 표시한다. 비전형성이 실시간
   으로 명명된다.

> 2. **Auto-commentary on the deformation.** The same pane displays a
>    short framing sentence, *"Subdominant recapitulation: the
>    exposition's modulation plan, redirected toward the tonic"*, which
>    transforms the local key change into a *functional* event.

2. **비전형에 대한 자동 해설.** 동일 패널이 짧은 framing 문장을 표시
   한다, *"하속조 재현: 제시부의 전조 설계가 으뜸조로 재방향됨"*,
   이는 지역적 조성 변화를 *함수적* 사건으로 변환한다.

> 3. **Loop-section A/B comparison.** A single toggle replays the
>    exposition's P region followed immediately by the recapitulation's
>    P region. The two passages are *the same melody* in *different
>    keys*, and hearing them back-to-back makes Mozart's
>    transposition-as-mechanism viscerally clear in a way no static
>    analytical diagram can.

3. **루프-섹션 A/B 비교.** 단일 토글이 제시부 P 영역과 재현부 P 영역을
   연속 재생한다. 두 패시지는 *서로 다른 조성에서의 같은 선율* 이며,
   연속 청취는 모차르트의 *이조-메커니즘* 을 어떤 정적 분석 도표도
   해낼 수 없는 방식으로 신체적으로 명료히 만든다.


# 4. The Tool: Three Coordinated Representations / 도구: 세 가지 동기화된 표상

> The system is a static, client-side web application (≈600 lines of
> vanilla JavaScript) with one external dependency
> (OpenSheetMusicDisplay) and no build step. A live deployment is
> embedded with this article (see *Example 1* below); source code,
> analysis data, and the audio-policy documentation are available
> through the project's GitHub repository and Zenodo archive (see
> *Reproducibility*, §7).

본 시스템은 정적 클라이언트-사이드 웹 애플리케이션 (바닐라 JavaScript
약 600줄) 으로, 단일 외부 의존성 (OpenSheetMusicDisplay) 외에는 빌드
단계가 없다. 라이브 배포가 본 논문에 임베드되어 있으며 (아래 *예시 1*
참조), 소스 코드·분석 데이터·음원 정책 문서는 프로젝트의 GitHub
저장소와 Zenodo 아카이브에서 이용 가능하다 (§7 *재현 가능성* 참조).

> For a TISMIR reader, the architecturally salient property is not the
> component list but the *coordination*: three representations of the
> same musical present moment are kept in sync, and the user can
> intervene in any one of them. Two design choices deserve specific
> articulation as Tools-and-Datasets contributions: a stable measure-
> painting scheme that survives OSMD re-layout (§4.2), and a non-monotonic
> time-mapping function that handles performer-elected repeats without
> analytical loss (§4.5).

TISMIR 독자에게 구조적으로 두드러진 속성은 컴포넌트 목록이 아니라
*동기화* 이다: 동일한 음악적 현재 순간의 세 가지 표상이 동기 상태로
유지되며, 사용자는 어느 한 표상에서든 개입할 수 있다. Tools-and-
Datasets 기여로 특별히 명시할 두 가지 설계 선택: OSMD 재-레이아웃에
견고한 *안정된 마디 도장 도식* (§4.2), 그리고 연주자 선택 반복을
분석적 손실 없이 처리하는 *비단조 시간 매핑 함수* (§4.5).

## 4.1 The Three Representations / 세 가지 표상

> | Representation | Encoding | Update on `timeupdate` |
> |---|---|---|
> | **Color timeline** | Horizontal bar, two-level color, proportional widths | Red playhead advances |
> | **Score** | MusicXML rendered as SVG; current measure highlighted | Cursor moves to current note |
> | **Analytical pane** | Section + theme labels, current key, auto-commentary | Re-renders on label change |

| 표상 | 인코딩 | `timeupdate` 시 갱신 |
|---|---|---|
| **색상 타임라인** | 수평 막대, 두 단계 색상, 비례 폭 | 빨간 플레이헤드 진행 |
| **악보** | MusicXML 를 SVG 로 렌더, 현재 마디 강조 | 커서가 현재 음표로 이동 |
| **분석 패널** | 섹션 + 주제 라벨, 현재 조성, 자동 해설 | 라벨 변경 시 재렌더 |

> A measure-to-time lookup (binary search, O(log n)) runs once per
> `timeupdate` event (≈ 250 ms). The current measure is then routed to
> all three representations, which update within a single render frame.
> A linear proportional scaling at `loadedmetadata` accommodates
> recordings of different total durations than the reference (Goto 2006);
> future work will integrate score-audio alignment (Nakamura, Yoshii, &
> Katayose 2017) for tempo-flexible accuracy.

마디-시간 룩업 (이진 탐색, O(log n)) 이 `timeupdate` 이벤트마다 (≈ 250
ms) 1회 실행된다. 현재 마디가 세 표상 모두로 라우팅되어 단일 렌더
프레임 내에 갱신된다. `loadedmetadata` 시점의 선형 비례 스케일링이
참조와 다른 총 길이의 녹음에 대응한다 (Goto 2006). 향후 작업은 템포
가변 정확도를 위해 score-audio alignment (Nakamura, Yoshii, & Katayose
2017) 를 통합할 예정이다.

## 4.2 The Two-Level Color Scheme / 두 단계 색상 도식

> Color encoding follows two principles. First, WCAG 2.1 AA compliance:
> text contrast is maintained at ≥ 4.5:1. Second, color-blind
> accessibility: no information is conveyed by color alone, theme
> zones (P / S / codetta) are also distinguished by accent bars and
> text labels, following the kind of multi-channel encoding practice
> that Kuo and Chuang (2013) systematize at the pitch level for
> beginner notation.

색상 인코딩은 두 원칙을 따른다. 첫째, WCAG 2.1 AA 준수: 텍스트 대비가
≥ 4.5:1 유지된다. 둘째, 색맹 접근성: 정보를 색상만으로 전달하지 않는다
주제 영역 (P / S / codetta) 은 액센트 막대와 텍스트 라벨로도 구분
되며, 이는 Kuo and Chuang (2013) 이 초보자 기보에서 음높이 수준으로
체계화한 다채널 인코딩 관행을 형식 위계 수준으로 확장한 것이다.

> | Element | Color | Role |
> |---|---|---|
> | Exposition | Pastel blue | Stable, presenting |
> | Development | Pastel amber | Tonally exploratory |
> | Recapitulation | Pastel green | Returning, resolving |
> | Now-position | Red | Playhead, score cursor |

| 요소 | 색상 | 역할 |
|---|---|---|
| 제시부 | 파스텔 청 | 안정·제시 |
| 발전부 | 파스텔 황 | 조성적 탐색 |
| 재현부 | 파스텔 녹 | 회귀·해소 |
| 현재 위치 | 빨강 | 플레이헤드·악보 커서 |

## 4.3 The Analysis Layer as Data / 데이터로서의 분석 계층

> The formal analysis is a versioned JSON object (see *Example 2*
> below). Treating the analysis itself as a peer-reviewable, machine-
> readable artefact, rather than as a hidden pedagogical commentary,
> opens it to community extension (other works, other forms) and to
> machine reuse by future MIR pipelines. For the present paper this
> matters because it lets us release *both* the tool and the K. 545
> analysis under separable open licenses (MIT and CC BY 4.0,
> respectively).

형식 분석은 versioned JSON 객체이다 (아래 *예시 2* 참조). 분석 자체를
peer-reviewable, machine-readable artefact 로 다루는 것, 숨겨진 교수법
주석이 아니라, 이 다른 작품·다른 형식으로의 커뮤니티 확장과 후속 MIR
파이프라인의 기계 재사용을 가능하게 한다. 본 논문에서 이 점이 중요한
이유는 도구와 K. 545 분석을 *각각 분리 가능한* 오픈 라이선스 (각각 MIT
와 CC BY 4.0) 로 배포할 수 있기 때문이다.

### Interoperability with the Algomus annotation corpus / Algomus 주석 코퍼스와의 상호운용성

> The schema's structural categories, `sections[].type ∈ {exposition,
> development, recapitulation, coda}`, `themes[].type ∈ {P, T, S, K,
> codetta, retransition}`, and `(start_measure, end_measure)` ranges,
> deliberately mirror the analytic categories used in Allegraud et al.
> (2019) for the Mozart string-quartet sonata-form corpus. A thin
> ingestion adapter is sufficient to load the 32-movement Algomus
> reference analyses into the tool, because the field names map
> one-to-one and the measure-range conventions are shared. We provide
> the schema specification (`data/sonata_structure.schema.json`) and a
> worked example for K. 545; we leave the adapter for the full Algomus
> corpus as a community contribution opportunity. The architectural
> point is that our learner-facing tool *amplifies* the classifier and
> annotation work of Allegraud et al. rather than competing with it:
> their corpus becomes loadable content for our visualization, and our
> visualization becomes a downstream evaluation surface for their
> classifier output.

본 스키마의 구조적 카테고리, `sections[].type ∈ {exposition,
development, recapitulation, coda}`, `themes[].type ∈ {P, T, S, K,
codetta, retransition}`, `(start_measure, end_measure)` 범위, 는
Allegraud et al. (2019) 가 모차르트 현악 사중주 소나타 형식 코퍼스에
사용한 분석 카테고리를 의도적으로 미러링한다. 필드명이 1:1 로 대응
하고 마디 범위 컨벤션이 공유되므로, 32악장의 Algomus 참조 분석을 본
도구로 적재하는 데에는 얇은 ingestion 어댑터만으로 충분하다. 본 논문은
스키마 명세 (`data/sonata_structure.schema.json`) 와 K. 545 인스턴스를
공개하며, 전체 Algomus 코퍼스에 대한 어댑터는 커뮤니티 기여 기회로
남긴다. 본 학습자 친화 도구는 Allegraud et al. 의 분류기·주석 작업과
*경쟁* 하는 것이 아니라 그것을 *증폭* 한다는 것이 핵심이다: 그들의
코퍼스는 본 시각화의 로딩 가능 콘텐츠가 되고, 본 시각화는 그들의 분류기
출력에 대한 다운스트림 평가 표면이 된다.

## 4.4 Affordances for Active Listening / 능동 청취를 위한 어포던스

> Three interactive affordances are pedagogically central:

세 가지 인터랙티브 어포던스가 교수법적으로 중요하다:

> - **Section jump**, clicking any colored timeline segment seeks the
>   audio to that measure. A teacher can move directly from "exposition
>   P" to "recapitulation P" without scrubbing.
> - **Section loop**, toggles playback to repeat the current section,
>   enabling immediate A–B comparison.
> - **Playback-speed control**, slows passage to 0.5× without altering
>   pitch, useful for very brief modulating moments.

- **섹션 점프**: 색상 타임라인 세그먼트 클릭 시 그 마디로 오디오 시킹.
  교사가 *제시부 P* 에서 *재현부 P* 로 스크러빙 없이 즉시 이동 가능.
- **섹션 루프**: 현재 섹션을 반복 재생 토글. 즉각 A–B 비교 가능.
- **재생 속도 조절**: 음정을 바꾸지 않고 0.5x 까지 감속. 매우 짧은
  전조 순간 분석에 유용.

> Keyboard shortcuts (Space, ←/→, L for loop, C for color toggle) make
> classroom demonstration responsive in a way mouse-only interaction
> cannot.

키보드 단축키 (Space, ←/→, L 루프, C 색상 토글) 는 마우스 전용 상호작용
이 해낼 수 없는 방식으로 교실 시연을 반응적으로 만든다.

## 4.5 Exposition Repeat Folding / 제시부 반복 폴딩

> When a performer elects to take the exposition repeat, the
> overwhelming majority of K. 545 recordings in the canonical
> discography, including the Schiff Carnegie Hall (2015) recording used
> in our reference deployment, the audio time-line becomes
> *non-monotonic* with respect to analytical time. Audio seconds 0:00 –
> 0:55 traverse the exposition; audio seconds 0:55 – 1:48 traverse the
> exposition *again*; audio second 1:48 onwards opens the development.
> Two design responses are available:

연주자가 제시부 반복을 시행할 때, 본 참조 배포에서 사용한 Schiff
Carnegie Hall (2015) 녹음 포함, K. 545 정전 디스코그래피의 압도적
다수, 오디오 시간선은 분석 시간에 대해 *비단조* 가 된다. 오디오 초
0:00 – 0:55 가 제시부를 통과하고, 0:55 – 1:48 이 제시부를 *다시* 통과
하며, 1:48 부터 발전부가 열린다. 두 가지 설계 대응이 가능하다:

> 1. **Ignore the repeat.** The cursor and analytical pane simply
>    continue forward through audio time, and during the repeat the
>    pane displays an off-by-one section ("development") while the
>    listener is still in the exposition. Pedagogically misleading.

1. **반복을 무시.** 커서와 분석 패널이 단순히 오디오 시간을 따라
   계속 전진하면, 반복 동안 청자는 여전히 제시부에 있는데도 패널은
   잘못 된 섹션 ("발전부") 을 표시한다. 교수법적으로 오도적이다.

> 2. **Fold the repeat.** During the repeat, the cursor returns to the
>    exposition's start and re-traverses it; only when the audio passes
>    the second exposition codetta does the cursor advance into the
>    development.

2. **반복을 폴딩.** 반복 동안 커서는 제시부 시작으로 되돌아가 다시
   통과한다. 오디오가 두 번째 제시부 코데타를 지나야 비로소 커서가
   발전부로 진행한다.

> We adopt the second option. Let *t* be the current audio time and let
> the user-marked or default repeat span be \[*r*₁, *r*₂\]. The
> analytical time *τ* is then a piecewise function:

본 연구는 두 번째 옵션을 채택한다. 현재 오디오 시간을 *t*, 사용자
표기 또는 기본 반복 구간을 \[*r*₁, *r*₂\] 라 하자. 분석 시간 *τ* 는
다음과 같은 piecewise 함수이다:

> ```
>               ⎧ t                                  if t < r₁
>               ⎪
>    τ(t)   =   ⎨ ((t − r₁) / (r₂ − r₁)) · r₁         if r₁ ≤ t < r₂
>               ⎪
>               ⎩ t − (r₂ − r₁)                      otherwise
> ```

```
              ⎧ t                                  if t < r₁
              ⎪
   τ(t)   =   ⎨ ((t − r₁) / (r₂ − r₁)) · r₁         if r₁ ≤ t < r₂
              ⎪
              ⎩ t − (r₂ − r₁)                      otherwise
```

> Three properties follow:

세 가지 속성이 따른다:

> - **First-pass identity.** For *t* < *r*₁, analytical time equals audio
>   time. The cursor behaves as a simple score-follower until the repeat
>   begins.
> - **Fold-back on repeat.** For *r*₁ ≤ *t* < *r*₂, the cursor re-
>   traverses the analytical interval \[0, *r*₁\] proportionally with
>   the second hearing. The listener hears the exposition a second time
>   while the cursor visibly returns to bar 1 and crawls forward to bar
>   28 again.
> - **Post-repeat offset.** For *t* ≥ *r*₂, analytical time advances at
>   audio rate but offset back by the repeat duration. The development
>   and recapitulation are addressed correctly regardless of repeat
>   length.

- **첫 회차 항등.** *t* < *r*₁ 일 때 분석 시간 = 오디오 시간. 커서는
  반복이 시작되기 전까지 단순 score-follower 로 행동한다.
- **반복 시 폴드백.** *r*₁ ≤ *t* < *r*₂ 일 때, 커서는 두 번째 청취와
  비례하여 분석 구간 \[0, *r*₁\] 을 다시 통과한다. 청자가 제시부를 두
  번째 듣는 동안 커서는 가시적으로 1마디로 돌아가 다시 28마디까지
  기어 올라간다.
- **반복 후 오프셋.** *t* ≥ *r*₂ 일 때 분석 시간은 오디오 속도로 진행
  하되 반복 길이만큼 뒤로 오프셋된다. 발전부와 재현부는 반복 길이에
  관계없이 올바르게 지시된다.

> The repeat boundaries *r*₁ and *r*₂ are user-adjustable through three
> keyboard shortcuts (M, [, ]) for live calibration against the actual
> recording, and the calibrated values are persisted in
> `localStorage`. The fold is therefore robust to the wide variance in
> recording-specific repeat timings observed across the K. 545
> discography, and the same folding scheme transfers without
> modification to any sonata-form work with a marked exposition repeat.

반복 경계 *r*₁, *r*₂ 는 세 개의 키보드 단축키 (M, [, ]) 로 실제 녹음에
대해 사용자가 실시간 보정 가능하며, 보정값은 `localStorage` 에 영구
저장된다. 따라서 폴딩은 K. 545 디스코그래피에서 관찰되는 녹음별 반복
타이밍 편차에 견고하며, 동일 폴딩 도식이 표기된 제시부 반복이 있는
*모든 소나타 형식 작품* 에 변경 없이 이식 가능하다.

> To our knowledge, no prior open music-visualization system (including
> Dezrann, Sonic Visualiser, and the score-following tools surveyed in
> §2.4) addresses performer-elected repeats with an explicit
> non-monotonic time map. The closest analogue in the MIR literature is
> the structure-following work of Müller (2015, ch. 3), which handles
> repeats by inserting multiple parallel score branches; our approach
> preserves a single score-time axis and is consequently simpler to
> implement and to visualize for a learner.

저자들이 알기로, 어떤 기존 오픈 음악 시각화 시스템 (§2.4 의 Dezrann,
Sonic Visualiser, score-following 도구 포함) 도 연주자 선택 반복을
명시적 비단조 시간 맵으로 처리하지 않는다. MIR 문헌의 가장 가까운
대응은 Müller (2015, ch. 3) 의 구조 추적 작업으로, 다중 병렬 악보
분기 삽입을 통해 반복을 처리한다. 본 접근은 단일 score-time 축을
유지하여 구현·시각화 모두에서 더 단순하다, 학습자에게도 단순하다.


# 5. A Classroom Walk-Through / 교실 워크-스루

> This section illustrates how a teacher using the tool might surface
> the analytical claims of §3.3 in a single 30-minute class meeting.

본 절은 §3.3 의 분석적 주장을 30분 단일 수업에서 본 도구를 사용해
어떻게 끌어낼 수 있는지 예시한다.

## 5.1 First Hearing (5 minutes) / 첫 청취 (5분)

> The teacher opens the tool with the audio loaded and *color
> visualization disabled*. The class hears the entire movement once,
> including the exposition repeat, while the score scrolls and the red
> playhead moves along the (still uncolored) timeline. The instruction
> is simply: "Where do you think the movement is divided?" The
> preserved exposition repeat surfaces a useful preliminary observation
>, that the music *returns to the same material* approximately one
> minute in.

교사는 음원을 로딩한 상태로, *색상 시각화를 비활성화* 하고 도구를 연다.
학급은 악장 전체를 한 번 듣는다, 제시부 반복 포함, 그동안 악보는
스크롤되고 빨간 재생 헤드는 (아직 색이 없는) 타임라인을 따라 이동한다.
지시는 단순하다: "이 악장은 어디에서 나뉜다고 생각하나요?" 보존된
제시부 반복은 유용한 예비 관찰을 표면화한다, 음악이 약 1분 지점에서
*같은 재료로 돌아온다* 는 사실이다.

## 5.2 Color Reveal and Section Identification (8 minutes) / 색상 공개와 섹션 식별 (8분)

> The teacher toggles section color on. The exposition / development /
> recapitulation tripartite division is now visible at a glance on the
> timeline; the same colors are simultaneously painted as measure-level
> overlays on the score. Students are asked to identify, by clicking
> the timeline segments, the boundary measures of each section. Because
> the colored regions are now both *temporal* (timeline) and *spatial*
> (score), students can verify their guesses on either representation.

교사는 섹션 색상을 켠다. 제시부 / 발전부 / 재현부 의 삼분 구조가 이제
타임라인에서 한눈에 보이며, 동일한 색상이 동시에 악보 위에 마디 단위
오버레이로 입혀진다. 학생들은 타임라인 구간을 클릭함으로써 각 섹션의
경계 마디를 식별하라는 과제를 받는다. 색상 영역이 이제 *시간적* (타임
라인) 이면서 동시에 *공간적* (악보) 이므로, 학생들은 두 표상 어디에
서든 자신의 추측을 검증할 수 있다.

## 5.3 Exposition P and S (5 minutes) / 제시부 P 와 S (5분)

> Using the section-jump buttons, the teacher plays just the
> exposition's P region (mm. 1–13), then just S (mm. 14–25). The
> analysis pane displays "C major" then "G major"; the boundary is
> auditorily *and* visually marked. The teacher asks: "What harmonic
> move did Mozart just make?" The answer (I → V) is no longer something
> the teacher tells the class but something the class deduces from the
> visible key change.

섹션 점프 버튼을 사용해 교사는 제시부의 P 영역 (mm. 1–13) 만을, 그
다음 S (mm. 14–25) 만을 재생한다. 분석 패널은 "다장조" 다음 "사장조"
를 표시하며, 경계는 청각적 *이면서* 시각적으로 표시된다. 교사는 묻는다:
"모차르트가 방금 어떤 화성 진행을 했나요?" 답 (I → V) 은 이제 교사가
학급에게 *말해주는* 것이 아니라, 가시적 조성 변화로부터 학급이 *추론*
하는 대상이다.

## 5.4 The Critical Moment: Recapitulation P (8 minutes) / 결정적 순간: 재현부 P (8분)

> The teacher jumps to recapitulation P (mm. 42–58, audio time around
> 2:12). The analysis pane displays "**F major**." This is, in our
> experience, the moment students lean forward. Two follow-up actions
> make the pedagogical point:

교사는 재현부 P (mm. 42–58, 음원 시간 약 2:12) 로 점프한다. 분석 패널은
"**바장조**" 를 표시한다. 저자들의 경험상, 이것이 학생들이 앞으로
기울이는 순간이다. 두 가지 후속 동작이 교수법적 핵심을 만든다:

> 1. *Loop on*. The teacher engages section loop and lets the class
>    hear recap P for one full pass. The label "F major" is held in
>    view. The visual and auditory representations of *the same
>    primary theme in a different key* are now jointly available.
> 2. *A / B compare*. The teacher then loop-toggles between exposition
>    P and recap P, playing each twice. Most students hear *the same
>    tune in two different keys*, and recognize the recap as
>    *transposed*, not "wrong."

1. *루프 켜기*. 교사는 섹션 루프를 활성화하여 학급이 재현부 P 를 한 번
   완전히 듣게 한다. "바장조" 라벨은 시야에 유지된다. *동일한 주요
   주제가 다른 조성에서* 의 시각·청각 표상이 이제 동시에 가용해진다.
2. *A / B 비교*. 그다음 교사는 제시부 P 와 재현부 P 를 루프 토글하며
   각각 두 번씩 재생한다. 대부분의 학생들이 *두 다른 조성에서의 같은
   곡조* 를 듣게 되고, 재현부를 "틀린" 것이 아닌 *전조된* 것으로
   인식한다.

## 5.5 Synthesis (4 minutes) / 종합 (4분)

> The teacher displays the schematic comparison:
>
> > Exposition: P in C → S in G  *(I → V, motion of a fifth up)*
> > Recapitulation: P in F → S in C  *(IV → I, motion of a fifth up)*

교사는 도식적 비교를 표시한다:

> 제시부: P 다장조 → S 사장조 *(I → V, 5도 위로 이동)*
> 재현부: P 바장조 → S 다장조 *(IV → I, 5도 위로 이동)*

> The schematic is now grounded in what the class has just heard *and*
> seen. The teacher poses the synthesizing question: "Why did Mozart
> start the recap in the 'wrong' key?", and the class, having seen S
> land safely in C, has the materials to answer.

이 도식은 이제 학급이 방금 듣고 *또* 본 것에 근거한다. 교사는 종합
질문을 던진다: "왜 모차르트는 '틀린' 조성에서 재현부를 시작했을까요?"
그리고 학급은, S 가 다장조에 안전하게 도착하는 것을 보았기에, 답할
재료를 가지고 있다.

> The walk-through above is not the only possible use of the tool, and
> not every passage requires color or looping. But it illustrates the
> basic *grammar of teaching with the tool*: choose a passage, choose
> the representations to foreground, listen, look, and let students
> make the analytical observation themselves.

위 워크-스루가 본 도구의 유일한 사용법은 아니며, 모든 구간이 색상이나
루프를 필요로 하는 것도 아니다. 그러나 이는 *본 도구로 가르치는 기본
문법* 을 예시한다: 한 구간을 선택하고, 전경화할 표상을 선택하고, 듣고,
보고, 학생들이 스스로 분석적 관찰을 만들도록 두는 것이다.


# 6. Discussion / 논의

## 6.1 Pedagogical Implications / 교수법적 함의

> Traditional verbal teaching often presents the recapitulation as
> "return-in-tonic," handling deformations as exceptions; K. 545's
> subdominant recapitulation makes a stronger pedagogical claim
> available, that Mozart *preserves the exposition's modulation pattern*
> by shifting the starting key down a fifth, so that the secondary
> theme arrives in the tonic on the second hearing. The synchronized
> color-coded view makes this *function-preserving* character of the
> deformation visually self-evident, aligning with current form-functional
> approaches to musical analysis (Caplin, 1998, 2009). The pedagogical
> move, from rules-and-exceptions to functional flexibility, is the
> central educational claim of this work.

전통적인 언어 중심 교수법은 재현부를 흔히 "으뜸조로의 회귀" 로 제시
하며 비전형을 *예외* 로 처리한다. K. 545 의 하속조 재현은 더 강한
교수법적 주장을 가용하게 한다, 모차르트는 시작 조성을 5도 아래로
옮김으로써 *제시부의 전조 패턴을 보존* 하고, 결과적으로 부주제가 두
번째 청취에서 으뜸조에 도착하게 한다. 동기화된 색상 코드 뷰는 이러한
비전형의 *함수 보존(function-preserving)* 성격을 시각적으로 자명히
만든다, 음악 분석의 현행 형식-함수 접근 (Caplin, 1998, 2009) 과
정렬되어. 교수법적 이동, 규칙-예외 모델에서 함수적 유연성으로, 이
본 작업의 중심 교육 주장이다.

## 6.2 Methodological and Tooling Implications / 방법론적·도구적 함의

> - **First-class status of formal analysis.** Encoding the analysis as
>   a versioned JSON object, not as ephemeral pedagogical commentary,
>   invites peer review of the analysis itself, machine reuse, and
>   reproducibility.
> - **Exposition-repeat folding.** The non-monotonic mapping between
>   audio time and analytical time during performer-elected repeats is a
>   practical solution to a problem common across sonata-form recordings
>   and applicable wherever the form contains an indicated repeat.
> - **Demo mode as a copyright-pragmatic default.** The WebAudio
>   metronome allows the form layer to function in environments where
>   no PD/CC audio is at hand, lowering the barrier to classroom
>   adoption.
> - **Single-dependency architecture.** Course materials with one
>   external library age more gracefully than those with complex build
>   pipelines, a non-trivial property for syllabi designed to last
>   multiple cohorts.

- **형식 분석의 일급(first-class) 지위.** 분석을 *덧없는 교수법 주석*
  이 아닌 버전 관리되는 JSON 객체로 부호화하는 것은 *분석 자체에 대한
  동료 검토*, 기계 재사용, 재현 가능성을 가능하게 한다.
- **제시부 반복 폴딩.** 연주자 선택 반복 동안의 오디오 시간 ↔ 분석
  시간 비단조 매핑은 소나타 형식 녹음에 보편적인 문제에 대한 실용적
  해법이며, *표기된 반복이 있는 어떤 형식에든* 적용 가능하다.
- **저작권-실용 디폴트로서의 데모 모드.** WebAudio 메트로놈은 PD/CC
  음원이 손에 없는 환경에서도 형식 계층이 작동하게 하여 교실 채택
  장벽을 낮춘다.
- **단일 의존성 아키텍처.** 단일 외부 라이브러리로 구성된 교재는 복잡한
  빌드 파이프라인을 가진 것보다 우아하게 노후화 한다, *여러 코호트에
  걸쳐 지속될 강의 자료* 에 사소하지 않은 속성이다.

## 6.3 Limitations and Future Work / 한계와 후속 연구

> This paper limits itself to system design, implementation, and
> pedagogical positioning. Empirical validation of learning effects is
> deferred to subsequent work. Planned next steps:

본 논문은 시스템 설계·구현·교수법적 위치 짓기에 자신을 한정한다. 학습
효과의 정량적 검증은 별도의 후속 연구로 유보한다. 계획된 후속 단계:

> 1. **Randomized controlled trial** comparing the synchronized condition
>    to (a) audio + score without synchronization and (b) audio + verbal
>    lecture only, with form-identification accuracy and the System
>    Usability Scale (Brooke, 1996) as primary measures.
> 2. **Automatic score-audio alignment** (Nakamura et al., 2017) to
>    eliminate recording-dependence.
> 3. **Multi-piece dataset.** Beethoven Op. 49 No. 2 mvt. I and Clementi
>    Op. 36 No. 1 mvt. I encoded against the same JSON schema for
>    comparative form study.
> 4. **Authoring mode.** Learners label their own compositions with
>    formal regions, producing reusable analysis artefacts.
> 5. **Other formal types.** Rondo, theme-and-variations, and fugue,
>    each requiring schema extension.
> 6. **Mobile responsiveness.** Extending the desktop-first design to
>    tablet and phone form factors.

1. **무작위 통제군 시험**: 동기화된 조건을 (a) 동기화 없는 음원 +
   악보, (b) 음원 + 언어 강의 단독 과 비교하며, 형식 식별 정확도와
   시스템 사용성 척도 (System Usability Scale; Brooke, 1996) 를 1차
   측정치로 사용.
2. **자동 score-audio alignment** (Nakamura et al., 2017), 녹음
   의존성 해소.
3. **다곡 데이터셋.** Beethoven Op. 49 No. 2 1악장 및 Clementi Op. 36
   No. 1 1악장을 동일 JSON 스키마로 부호화하여 형식 비교 연구.
4. **작성(authoring) 모드.** 학습자가 자신의 작곡에 형식 영역을 라벨
   링하여 재사용 가능한 분석 산출물을 생산.
5. **다른 형식 유형.** 론도, 주제와 변주, 푸가, 각각 스키마 확장 필요.
6. **모바일 반응형.** 데스크탑 우선 디자인을 태블릿·폰 폼팩터로 확장.


# 7. Conclusion / 결론

> This paper has presented an open-source, web-based tool that
> synchronizes score, audio, and a hierarchical formal-analysis layer to
> teach the structure of sonata form, with Mozart's K. 545 mvt. I as the
> case piece. The central pedagogical claim, that synchronized
> multi-representation makes the *function-preserving* nature of
> non-tonic recapitulations visually self-evident, is grounded in
> form-functional theory and instantiated as a runnable, openly licensed
> system. Empirical validation of the learning gains this design
> predicts is the subject of a planned randomized controlled trial; the
> system, schema, and pedagogical framing presented here provide the
> foundation for that work.

본 논문은 소나타 형식의 구조를 가르치기 위해 악보·음원·위계적 형식
분석 계층을 동기화하는 오픈소스 웹 기반 도구를, 모차르트 K. 545 1악장
을 사례로, 제시하였다. 중심 교수법적 주장, *동기화된 다중 표상은
비-으뜸조 재현부의 함수 보존적 본질을 시각적으로 자명히 만든다*, 은
형식-함수 이론에 기반하며 실행 가능한 오픈 라이선스 시스템으로
인스턴스화되었다. 이 설계가 예측하는 학습 이득에 대한 정량 검증은
별도의 무작위 통제군 시험의 주제이다. 본 논문이 제시한 시스템·스키마·
교수법적 프레임이 그 작업의 토대를 이룬다.

> The tool is released under the MIT License; the formal-analysis data
> under CC BY 4.0. Both invite reuse, extension, and peer scrutiny in
> the spirit of open digital musicology.

본 도구는 MIT 라이선스로, 형식 분석 데이터는 CC BY 4.0 으로 공개된다.
양자 모두 오픈 디지털 음악학의 정신으로 재사용·확장·동료 검증을
초대한다.


# 8. Reproducibility / 재현 가능성

> All artifacts of this study are released with persistent identifiers.

본 연구의 모든 산출물은 영구 식별자(persistent identifier) 와 함께
공개된다.

> | Resource | Location |
> |---|---|
> | Source code (HTML / CSS / JS) | https://github.com/rosyrosys/sonata-form-viz |
> | v0.1.0 release | https://github.com/rosyrosys/sonata-form-viz/releases/tag/v0.1.0 |
> | Long-term archive (Zenodo DOI) | [10.5281/zenodo.20108497](https://doi.org/10.5281/zenodo.20108497) |
> | Formal-analysis JSON schema | `data/sonata_structure.json` (CC BY 4.0) |
> | Measure-to-time mapping | `data/measure_times.json` (CC BY 4.0) |
> | MusicXML (public domain) | `data/mozart_k545_mvt1.musicxml` |
> | Manuscript drafts (KO / EN) | `paper/paper_ko.md`, `paper/paper_en.md` |

| 자원 | 위치 |
|---|---|
| 소스 코드 (HTML / CSS / JS) | https://github.com/rosyrosys/sonata-form-viz |
| v0.1.0 릴리스 | https://github.com/rosyrosys/sonata-form-viz/releases/tag/v0.1.0 |
| 장기 보관 (Zenodo DOI) | [10.5281/zenodo.20108497](https://doi.org/10.5281/zenodo.20108497) |
| 형식 분석 JSON 스키마 | `data/sonata_structure.json` (CC BY 4.0) |
| 마디–시간 매핑 | `data/measure_times.json` (CC BY 4.0) |
| MusicXML (public domain) | `data/mozart_k545_mvt1.musicxml` |
| 논문 초고 (KO / EN) | `paper/paper_ko.md`, `paper/paper_en.md` |

> The repository ships with two parallel editions, **`ko/`** (Korean) and
> **`en/`** (English), sharing the same code base and analysis schema.

저장소는 **`ko/`** (한국어판) 과 **`en/`** (영어판) 두 병렬 에디션을
포함하며, 두 에디션 모두 동일한 코드 베이스와 분석 스키마를 공유한다.

> **A Public Domain recording is bundled.** Each edition ships with
> `assets/mozart_k545_mvt1.ogg`, a Public Domain performance by Robin
> Alciatore distributed via Musopen and Wikimedia Commons (2:14,
> 2.87 MB). No additional download is required. Users who prefer a
> different recording, for example the András Schiff Carnegie Hall
> (2015) commercial release, can drop their own file at
> `assets/mozart_k545_mvt1.mp3` (the MP3 source is listed first in
> `index.html`, so it takes precedence over the bundled OGG). The
> interactive tap-calibration mode (press *T* and tap *Space* at six
> landmark measures) re-anchors the measure-to-time mapping for any
> recording in under a minute and persists the calibration in
> `localStorage`. If the bundled audio is removed or fails to load,
> the WebAudio metronome demo mode kicks in automatically so the
> form-analysis visualization still operates.

**Public Domain 녹음 번들 포함.** 각 에디션은 `assets/mozart_k545_
mvt1.ogg`, Musopen 및 Wikimedia Commons 를 통해 배포되는 Robin
Alciatore 의 Public Domain 연주 (2:14, 2.87 MB), 를 번들로 포함하여
별도 다운로드 없이 즉시 작동한다. 다른 녹음을 선호하는 사용자 (예:
András Schiff Carnegie Hall 2015 상용 음반) 는 `assets/mozart_k545_
mvt1.mp3` 위치에 자신의 파일을 두면 된다 (MP3 source 가 `index.html`
에 먼저 listed 되어 번들 OGG 보다 우선). *탭 보정 모드 (T 키 + 6개
마디 지점 Space 탭)* 로 임의 녹음에 대해 마디–시간 매핑을 1분 이내에
재고정하며 보정값은 `localStorage` 에 영구 저장된다. 번들 음원이
제거되거나 로드 실패 시 WebAudio 메트로놈 데모 모드가 자동 활성화
되어 형식 시각화는 계속 작동한다.

> **Dependencies.** The only external runtime dependency is
> *OpenSheetMusicDisplay* v1.8.7. Browser compatibility is verified on
> Chrome 120+, Edge 120+, and Firefox 121+. Any static-file server suffices
> (e.g., `python -m http.server`).

**의존성.** 외부 런타임 의존성은 *OpenSheetMusicDisplay* v1.8.7 하나뿐
이다. 브라우저 호환성은 Chrome 120+, Edge 120+, Firefox 121+ 에서
검증되었다. 정적 파일 서버 (예: `python -m http.server`) 면 충분하다.

> **Forthcoming RCT data.** Anonymized response data from the planned
> controlled trial will be released under CC BY 4.0 on OSF.io once
> IRB-approved data collection and analysis are complete.

**예정된 RCT 데이터.** 계획된 통제군 시험의 익명화된 응답 데이터는
IRB 승인을 받은 수집·분석이 완료되는 대로 OSF.io 에 CC BY 4.0 으로
공개될 예정이다.


# Acknowledgments / 사사

> *[To be added after blinding requirements are met. The author(s)
> gratefully acknowledge the open-source contributors of
> OpenSheetMusicDisplay, the curators of the Musopen / Wikimedia
> Commons Public Domain recording of K. 545 used in the bundled
> deployment, and the Algomus research group whose annotation
> conventions inspired the schema interoperability discussed in
> §4.3.]*

*[익명 심사 요건 충족 후 추가 예정. 저자(들)는 OpenSheetMusicDisplay
오픈소스 기여자, 번들 배포에 사용된 K. 545 Public Domain 녹음을 공개한
Musopen / Wikimedia Commons, 그리고 §4.3 의 스키마 상호운용성에 영감을
준 Algomus 연구 그룹에 감사를 표한다.]*


# Ethics and Consent / 윤리 및 동의

> The present manuscript reports the design, implementation, and
> analytical case study of an open-source software tool. It does not
> include human-subjects evaluation, animal subjects, or human-derived
> data, and no ethics-committee approval is therefore required for the
> work reported here. The planned randomized controlled trial outlined
> in §6.3, which will involve undergraduate music-education majors as
> participants and the System Usability Scale (Brooke, 1996) as a
> primary measure, will be conducted under the appropriate
> institutional review board approval and reported in a separate
> follow-up publication.

본 원고는 오픈소스 소프트웨어 도구의 설계·구현과 분석적 사례 연구를
보고한다. 인간 대상 평가, 동물 대상 실험, 인간 유래 데이터를 포함하지
않으므로 본 보고에 대해 윤리위원회의 사전 승인은 필요하지 않다. §6.3
에 제시된 계획된 무작위 통제군 시험, 학부 음악교육 전공자 참여, 시스템
사용성 척도 (System Usability Scale; Brooke, 1996) 를 1차 측정치로 사용
은 해당 기관의 IRB 승인을 거쳐 별도 후속 논문으로 보고될 예정이다.


# Competing Interests / 이해 충돌

> The author(s) has/have no competing interests to declare.

저자(들) 은 신고할 이해 충돌이 없다.


# Funding Information / 자금 정보

> *[To be filled at final submission: list any funding sources with
> grant numbers, or state "No funding was received for this work."]*

*[최종 제출 시 기입. 펀딩 출처 및 과제 번호 명시 또는 "본 연구는 외부
자금을 지원받지 않았다" 기재.]*


# Authors' Contributions / 저자 기여

> *[To be filled at final submission. For single authorship: "The
> sole author conceived the study, designed and implemented the
> software, prepared the analysis schema and case study, drafted the
> manuscript, and approved the final version." For multi-authored
> submissions, please supply a CRediT-style contribution statement.]*

*[최종 제출 시 기입. 단독 저자의 경우: "단독 저자가 연구를 구상하고
소프트웨어를 설계·구현하였으며, 분석 스키마와 사례 연구를 준비하고
원고를 작성하였으며 최종 본을 승인하였다." 공저의 경우 CRediT 양식의
기여 진술 기재.]*


# References / 참고문헌

(원본 영문 References 목록을 그대로 유지. 한국어 번역본은 KCI/영문
저널 어느 쪽에 제출하든 *영문 원어* 가 표준이므로 번역하지 않음.)

- Allegraud, P., Bigo, L., Feisthauer, L., Giraud, M., Groult, R.,
  Leguy, E., & Levé, F. (2019). Learning sonata form structure on
  Mozart's string quartets. *Transactions of the International
  Society for Music Information Retrieval, 2*(1), 82–96.
  https://doi.org/10.5334/tismir.27
- Ballester, C., Bacot, B., Bigo, L., Borsan, V. N., Couturier, L.,
  Déguernel, K., et al. (2025). Interacting with annotated and
  synchronized music corpora on the Dezrann web platform.
  *Transactions of the International Society for Music Information
  Retrieval, 8*(1), 121–139. https://doi.org/10.5334/tismir.212
- Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W.
  Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.),
  *Usability Evaluation in Industry* (pp. 189–194). Taylor & Francis.
- Cannam, C., Landone, C., & Sandler, M. (2010). Sonic Visualiser: An
  open source application for viewing, analysing, and annotating
  music audio files. In *Proceedings of the ACM Multimedia 2010
  International Conference* (pp. 1467–1468).
- Caplin, W. E. (1998). *Classical form: A theory of formal functions
  for the instrumental music of Haydn, Mozart, and Beethoven.* Oxford
  University Press.
- Caplin, W. E. (2009). What are formal functions? In P. Bergé (Ed.),
  *Musical form, forms, & formenlehre* (pp. 21–40). Leuven University
  Press.
- Cook, N. (1990). *Music, imagination, and culture.* Oxford University
  Press.
- Couprie, P. (2008). iAnalyse: un logiciel d'aide à l'analyse
  musicale. In *Journées d'Informatique Musicale (JIM)* (pp. 115–121).
  Albi, France. HAL: hal-00823867.
- Goto, M. (2006). AIST annotation for the RWC music database. In
  *Proceedings of ISMIR 2006*.
- Hargreaves, D. J. (1986). *The developmental psychology of music.*
  Cambridge University Press.
- Hepokoski, J., & Darcy, W. (2006). *Elements of sonata theory:
  Norms, types, and deformations in the late-eighteenth-century
  sonata.* Oxford University Press.
- Kuo, Y.-T., & Chuang, M.-C. (2013). A proposal of a color music
  notation system on a single melody for music beginners.
  *International Journal of Music Education, 31*(4), 394–412.
  https://doi.org/10.1177/0255761413489082
- LaRue, J. (1970). *Guidelines for style analysis.* Norton.
- Margulis, E. H. (2014). *On repeat: How music plays the mind.*
  Oxford University Press.
- Mayer, R. E. (2009). *Multimedia learning* (2nd ed.). Cambridge
  University Press.
- Mozart, W. A. (1986). *Neue Mozart-Ausgabe IX/25: Klaviersonaten
  Bd. 2.* Bärenreiter.
- Müller, M. (2015). *Fundamentals of music processing: Audio,
  analysis, algorithms, applications.* Springer.
  https://doi.org/10.1007/978-3-319-21945-5
- Nakamura, E., Yoshii, K., & Katayose, H. (2017). Performance error
  detection and post-processing for fast and accurate symbolic music
  alignment. In *Proceedings of the 18th International Society for
  Music Information Retrieval Conference (ISMIR)* (pp. 347–353).
- North, A. C., & Hargreaves, D. J. (2008). *The social and applied
  psychology of music.* Oxford University Press.
- Paivio, A. (1991). Dual coding theory: Retrospect and current status.
  *Canadian Journal of Psychology, 45*(3), 255–287.
- Sapp, C. S. (2017). Verovio Humdrum Viewer. In *Music Encoding
  Conference 2017*.


# Appendix A. Screenshots / 부록 A. 시스템 화면

> Three screenshots from the live deployment
> (https://rosyrosys.github.io/sonata-form-viz/en/) are included in the
> submission package under `figures/`. Captions:

라이브 배포 (https://rosyrosys.github.io/sonata-form-viz/en/) 에서 캡처
한 스크린샷 3종을 제출 패키지의 `figures/` 폴더에 포함한다. 캡션:

> - **Figure A.1.** System overview at startup, showing the title
>   banner, the section-level timeline (top: pastel-blue exposition,
>   pastel-amber development, pastel-green recapitulation), the
>   now-playing analysis pane (theme zone, key, current measure), and
>   the OSMD-rendered MusicXML score below.

- **Figure A.1.** 시스템 시작 화면 전체, 상단 제목 배너, 섹션 단위
  타임라인 (파스텔 청 제시부, 파스텔 황 발전부, 파스텔 녹 재현부),
  현재 위치 분석 패널 (주제 영역, 조성, 마디 번호), 그리고 하단의
  OSMD 렌더링 MusicXML 악보.

> - **Figure A.2.** Active-listening control panel and demo-mode
>   fallback. The yellow *Demo mode* bar is automatically shown when no
>   audio file is available (e.g. on the public deployment, where the
>   copyrighted reference recording is not bundled). Below it: section-
>   jump buttons (Exposition / Development / Recapitulation), playback-
>   speed slider, color/cursor/loop toggles, calibration controls, and a
>   keyboard-shortcut legend.

- **Figure A.2.** 능동 청취 제어 패널과 데모 모드 폴백. 음원 파일이
  없는 경우 (예: 공개 배포 환경, 저작권 녹음 미포함) 노란 *Demo mode*
  바가 자동으로 표시된다. 그 아래로 섹션 점프 버튼 (제시부 / 발전부 /
  재현부), 재생 속도 슬라이더, 색상·커서·루프 토글, 보정 컨트롤,
  키보드 단축키 안내가 배치된다.

> - **Figure A.3.** Recapitulation P region (mm. 42–58) on the score
>   with the pastel-amber section overlay visible at the section
>   boundary; the F-major key signature (one flat) is the visible cue
>   that distinguishes the recapitulation P from the C-major exposition
>   P, illustrating K. 545's subdominant-recapitulation deformation
>   discussed in §3.3.

- **Figure A.3.** 재현부 P 구간 (mm. 42–58) 의 악보 뷰, 섹션 경계에
  파스텔 황 오버레이가 보이고, 단조표 하나의 F장조 조표가 제시부 C장조
  P 와 재현부 P 를 시각적으로 구분한다. §3.3 에서 논의한 K. 545 의
  하속조 재현 비전형성을 직접 보여주는 화면.
