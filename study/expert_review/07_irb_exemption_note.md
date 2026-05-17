# IRB Exemption / Simplified Review — Justification & Optional Form

In most Korean university IRBs (생명윤리위원회), expert evaluation of
a software tool falls *outside* the definition of "human-subjects
research" or qualifies for *simplified review* (간이심의 or 면제
심의). This document provides:

1. The justification that you can hand to your IRB office.
2. An optional draft for a simplified-review application.
3. A fallback plan if your institution insists on full review.

---

## 1. Justification (for IRB office consultation)

**Research title:** Preliminary expert evaluation of an open-source
sonata-form visualization tool, as part of a manuscript prepared for
TISMIR (Transactions of the International Society for Music
Information Retrieval).

**Why this is NOT human-subjects research (or qualifies for
simplified review):**

The 「생명윤리 및 안전에 관한 법률」 (Bioethics and Safety Act)
defines "human subjects research" as research that obtains data
*about* human subjects through intervention, interaction, or
collection of identifying private information. The proposed study:

- **Does not study the experts themselves.** The experts are
  recruited *as professionals* providing *professional judgment*
  about a software tool. The unit of analysis is *the tool*, not
  the experts' attributes, behaviors, attitudes, or experiences.

- **Does not collect identifying private information beyond
  professional credentials.** No personal data (age, gender,
  health, beliefs, lifestyle, etc.) is collected. Name and
  institutional affiliation are collected for credential
  verification and *only* used in acknowledgments with explicit
  separate consent.

- **Uses standard professional-evaluation methods.** The
  methodology (cognitive walkthrough per Wharton et al. 1994,
  expert heuristic evaluation per Nielsen 1994, System Usability
  Scale per Brooke 1996) is established for software evaluation
  and is routinely conducted *outside IRB review* in
  HCI / educational-technology research.

- **Carries no risk to the participants.** The intervention is
  reviewing a tool. The participants are not exposed to any
  physical, psychological, social, or economic risk beyond what
  they would encounter in their normal professional duties.

- **Sample size is two.** Two experts is below thresholds for
  systematic empirical research; the data is *qualitative
  professional consultation*, not statistical inference about a
  population.

**Therefore:** the study is requested to be classified as either
*exempt* (면제) or *simplified review* (간이심의), under the
institution's standard categorisation for software-evaluation
consultations.

---

## 2. Simplified-review application — draft template

(Adapt to your institution's specific form. Most Korean university
IRBs accept a 1-page application for simplified review.)

```
[기관명] 생명윤리위원회 (IRB) 간이심의 신청서

연구과제명:
  소나타 형식 시각화 도구의 사전 전문가 검토 — TISMIR 학술지
  Tools-and-Datasets 트랙 제출 원고의 일부

연구책임자:
  [성명, 직위, 소속, 이메일]

연구기간:
  [YYYY-MM-DD] ~ [YYYY-MM-DD] (약 2주)

참여자:
  음악교육 / 음악이론 전문가 2인. 전문가적 판단을 제공하는
  *평가자* (evaluator) 의 역할이며, 연구 대상이 아님.

연구목적:
  학부 음악교육 학습자를 위한 오픈소스 웹 기반 시각화 도구의
  교수법적 충실도, 사용성, 잠재적 학습자 오해 위험을 음악
  교육·음악이론 전문가의 관점에서 사전 평가받음. 본 결과는
  TISMIR 학술지에 제출되는 원고의 §6 (Preliminary Expert
  Review) 으로 보고됨.

연구방법:
  각 전문가와 1시간 개별 세션. 도구 자율 탐색 (10분) → 30분
  교실 워크-스루 시연 (30분) → SUS 10문항 작성 (5분) →
  반-구조 인터뷰 (15분).

데이터 수집·관리:
  - 세션 녹음 (참여자 사전 동의 시)
  - 전사본·SUS 점수·인터뷰 노트는 연구책임자의 암호 보호된
    로컬 저장소에 보관, 원고 게재 1년 후 영구 삭제
  - 본 데이터는 본 원고 외 어떤 목적에도 사용되지 않음

위험:
  없음. 본 검토에서 전문가는 도구를 평가하는 평가자이며, 어떤
  신체적·정신적·사회적·경제적 위험에도 노출되지 않음.

이익:
  - 원고 게재 후 최종 PDF + Zenodo 영구 보관 링크 송부
  - (명시적 동의 시) 원고 acknowledgments 에 성명 표기
  - 후속 RCT 연구의 자문위원 협력 의향 확인 (의무 아님)

간이심의 요청 사유:
  본 검토는 전문가 평가 (expert evaluation) 이며 일반적 인간
  대상 연구의 정의에 부합하지 않음. 표준 HCI / 음악교육공학
  방법론 (cognitive walkthrough, SUS) 을 따르며, 신체적·정신적
  위험 없고 개인 식별 정보 수집 최소화. 「생명윤리법」 시행규칙
  제33조에 따른 면제 또는 간이심의 적용 가능 범위로 판단됨.

첨부:
  1. 참여자 안내서 (file 02 from this package)
  2. 세션 프로토콜 (file 03)
  3. SUS 양식 (file 04)
  4. 인터뷰 가이드 (file 05)

연구책임자 서명·날짜:
  [성명] _________________________ [YYYY-MM-DD]
```

---

## 3. If full IRB review is required by your institution

If your IRB insists on standard human-subjects review (despite the
arguments in section 1), this remains feasible:

**Typical timeline:** 4–6 weeks from submission to approval, vs.
the 2-week study schedule. If you submit a full IRB application
now, expert review can run in week 5–6 and §6 can be drafted in
week 7. This pushes TISMIR submission by ~5 weeks.

**Alternative:** Submit to TISMIR without §6 (the manuscript stands
on its own without it), and add §6 as an appendix or supplementary
material after IRB approval and expert review are complete. The
revised version is then ready for any second-round revisions
requested by TISMIR reviewers.

---

## Recommended sequence

1. **Day 1.** Email your IRB office (생명윤리위원회 사무국) with
   the justification in section 1 and ask informally whether they
   classify this as exempt, simplified, or full review.
2. **Day 1–3.** Wait for IRB response.
3. **If exempt or simplified** → proceed with recruitment (file 01)
   in parallel with submitting the simplified-review form
   (section 2). Sessions can begin as soon as both experts
   confirm.
4. **If full review required** → either (a) accept the 5-week delay,
   or (b) submit to TISMIR without §6 and add §6 in revision.

The IRB office is usually responsive to a clear methodological
brief and will give a quick informal verdict that lets you plan.
Do not skip the IRB office consultation — that is the protective
step for both you and the experts.
