# 음원 파일

본 저장소는 **Public Domain 녹음을 번들 포함** 하여 별도 다운로드 없이
즉시 작동합니다:

```
assets/mozart_k545_mvt1.ogg   (2.87 MB, 2:14, Public Domain)
```

| 항목 | 값 |
|---|---|
| 연주자 | Robin Alciatore (piano) |
| 원본 출처 | [Musopen](https://musopen.org/) — Public Domain 으로 공개 |
| 배포 경로 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Wolfgang_Amadeus_Mozart_-_sonata_no._16_in_c_major,_k.545_'sonata_facile'_-_i._allegro.ogg) |
| 길이 | 2:14 (133.88 초) — 1악장 단독 |
| 제시부 반복 | 미시행 (반복 없이 한 번만 연주) |
| 라이선스 | Public Domain (출처 표기 의무 없음. Musopen 은 가능 시 출처 명시 *권장*) |

## 번들 녹음을 다른 녹음으로 교체

다른 녹음을 사용하려면 (예: Schiff Carnegie Hall 2015 상용 음반,
혹은 다른 템포의 해석) `mozart_k545_mvt1.ogg` 를 자신의 파일로 덮어쓰면
됩니다. `<audio>` 요소는 MP3 도 지원합니다 — `mozart_k545_mvt1.mp3` 를
OGG 옆에 두면 MP3 source 가 우선 (index.html 에서 먼저 listed) 됩니다.

**교체 시 보정.** 페이지에서 **T** 키를 누른 뒤 화면이 안내하는 6개 마디
지점에서 **Space** 키를 탭하세요. 보정값은 `localStorage` 에 저장되어
한 번만 수행하면 됩니다. 녹음이 제시부 반복을 시행하면 (Schiff 는 함,
Alciatore 는 안 함) 보정 흐름이 반복 경계도 함께 캡처합니다.

## 기타 Public Domain 출처

번들 OGG 가 사용 불가능해지거나 대안이 필요한 경우:

- **Musopen** — https://musopen.org/music/23-piano-sonata-no-16-facile-k-545/ (다운로드 시 무료 계정 필요)
- **IMSLP** — https://imslp.org/wiki/Piano_Sonata_No.16,_K.545_(Mozart,_Wolfgang_Amadeus) — *Recordings* 탭에서 "Public Domain" 표시 파일 또는 CC-BY 녹음 선택 (예: Quinn Mason, Galaxy Bösendorfer 290)

## 음원이 정확히 133.88 초여야 하나요?

아니요. 시스템은 비례 처리와 보정 흐름으로 녹음마다 마디 시간을 재고정
합니다. `data/measure_times.json` 의 `audio_segment` 블록은 음원 안에서
1악장이 차지하는 구간을 정의합니다. 녹음을 교체할 때 `end` 를 조정하고
`exposition_repeat` 적용 여부도 함께 설정하세요.

## 1악장 단독 녹음 vs 전곡 녹음

`audio_segment.end` 는 1악장이 끝나는 음원 시간(초)입니다. 번들 OGG 는
1악장 단독이므로 `audio_segment.end = 133.88`. 전곡(약 720초) 녹음을
사용하면 1악장 종료점(예: Schiff 는 193초)으로 설정하여 재생이
2악장으로 흘러가지 않도록 합니다.
