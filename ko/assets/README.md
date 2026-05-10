# 음원 파일 안내

본 저장소에는 저작권 안전을 위해 음원 파일을 포함하지 않습니다.
다음 출처에서 직접 받아 이 폴더에 `mozart_k545_mvt1.mp3` 라는
이름으로 저장해 주세요.

## 권장 출처 (모두 무료·합법)

### 1순위 — Musopen (퍼블릭 도메인)
https://musopen.org/music/2697-piano-sonata-no-16-in-c-major-k-545/

페이지에서 **Movement 1** 만 다운로드. 무료 계정 가입 후 MP3 받기 가능.

### 2순위 — IMSLP (Wikimedia 연계)
https://imslp.org/wiki/Piano_Sonata_No.16,_K.545_(Mozart,_Wolfgang_Amadeus)

Recordings 탭에서 **CC0 / Public Domain** 표시된 녹음만 받기.

## 파일 배치

```
assets/
├── README.md                       (이 파일)
└── mozart_k545_mvt1.mp3            ← 이 위치에 저장
```

## 음원 길이가 195초가 아니어도 되나요?

상관 없습니다. `measure_times.json` 의 `audio_segment` 와
`exposition_repeat` 가 있으면 그 값이 우선 적용됩니다. 사용자가
직접 들으면서 마디 동기를 보정하려면 페이지에서 **T** 키를
눌러 6개 핵심 마디를 탭하면 됩니다.

## 1악장만 있는 녹음 vs 전체 소나타 녹음

`data/measure_times.json` 의 `audio_segment.end` 가 1악장이 끝나는
오디오 시간(초) 입니다. 전체 소나타 녹음(예: 720초)을 사용하면
이 값을 1악장이 끝나는 시각(예: 193초) 으로 두면 됩니다.
재생은 `audio_segment.end` 에서 자동 정지하여 2악장으로 넘어가지
않습니다.
