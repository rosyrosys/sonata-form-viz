# 소나타 형식 시각화 학습 도구

W. A. Mozart, *Piano Sonata in C Major, K. 545*, Mvt. I 을 교재로 한
"악보 + 음원 + 형식 분석" 동기화 시각화 시스템.

## 1. 빠른 실행

브라우저는 로컬 파일에서 `fetch()` 를 막으므로 **간단한 HTTP 서버**가 필요합니다.

```bash
# 프로젝트 루트에서
python -m http.server 8000
# 또는
npx serve .
```

이후 브라우저로 `http://localhost:8000/` 접속.

## 2. 자료 준비 (저작권 안전)

본 저장소에는 음원·악보 파일을 포함하지 않습니다. 모두 **퍼블릭 도메인** 또는 **CC** 라이선스로 직접 받아 채우세요.

| 파일 경로 | 출처 |
|---|---|
| `data/mozart_k545_mvt1.musicxml` | [IMSLP — K.545](https://imslp.org/wiki/Piano_Sonata_No.16,_K.545_(Mozart,_Wolfgang_Amadeus)) 의 MusicXML, 또는 MuseScore Community 의 PD 편집본 |
| `assets/mozart_k545_mvt1.mp3` | [Musopen](https://musopen.org/music/2697-piano-sonata-no-16-in-c-major-k-545/) 의 PD 녹음 |

오디오 길이가 195초가 아니어도 자동 비례 보정됩니다(`app.js`). 정밀 동기를 원하면
Sonic Visualiser → "Bar and Beat Tracker" 플러그인으로 다운비트 추출 후
`data/measure_times.json` 의 `measures[]` 를 갱신하세요.

## 3. 시스템 구조

```
┌──────────────────────────────────────────────┐
│            오디오 (HTML5 <audio>)            │
│  ▼ timeupdate 이벤트 (≈ 250 ms 주기)         │
│ ┌──────────────────────────────────────────┐ │
│ │ 1. 시간 → 마디 매핑 (이진탐색)            │ │
│ │ 2. 마디 → 섹션/주제 매핑                  │ │
│ │ 3. OSMD cursor 이동                       │ │
│ │ 4. 타임라인 플레이헤드                    │ │
│ │ 5. 라벨/해설 갱신                          │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

데이터 모델:

- `data/sonata_structure.json` — 소나타 형식 분석 (계층적: section → theme)
- `data/measure_times.json` — 마디 ↔ 시간 매핑 (이산 룩업 테이블)

## 4. 교육적 설계 결정

| 결정 | 근거 |
|---|---|
| 곡 선택: K.545 Mvt.I | 짧음(≈3분), 명료한 형식, 재현부의 하속조 시작이라는 교육적 이슈 |
| 색상: 파스텔 4색 | WCAG 2.1 대비비 + 색맹 호환 표상 분리 |
| 계층적 라벨 (section + theme) | LaRue (1970) 의 SHMRG 분석 위계 |
| 이중 시각: 타임라인 + 악보 커서 | "선형 시간"과 "악보 공간" 두 표상을 동시 제공 (dual coding theory, Paivio 1991) |
| 섹션 반복 옵션 | 형식 구간 비교 청취 학습 (Hargreaves 1986) |

## 5. 라이선스

코드: MIT. 데이터(`sonata_structure.json`)는 본 연구 결과물로 CC BY 4.0.
실제 음원/악보 파일은 사용자가 본인 책임으로 라이선스를 확인해야 합니다.
