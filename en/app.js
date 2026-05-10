/* =============================================================
 * 소나타 형식 시각화 — Mozart K. 545 Mvt. I
 *
 * 책임 분리:
 *   data        : sonata_structure.json (계층적 형식 분석)
 *               + measure_times.json    (마디 ↔ 시간 룩업)
 *   render      : OpenSheetMusicDisplay (MusicXML → SVG)
 *               + 자체 SVG 측정 기반 마디 오버레이
 *   sync        : audio.timeupdate → 이진탐색 → 커서/라벨/플레이헤드
 *   interaction : 점프, 섹션 반복, 속도, 토글, 키보드
 *   fallback    : 음원/악보 없으면 "메트로놈 데모 모드"
 * ============================================================= */

const SCORE_URL  = "data/mozart_k545_mvt1.musicxml";
const STRUCT_URL = "data/sonata_structure.json";
const TIMING_URL = "data/measure_times.json";

const $ = (id) => document.getElementById(id);
const audio = $("audio");
const speedSlider = $("speed");
const speedLabel = $("speed-value");
const toggleColor = $("toggle-color");
const toggleCursor = $("toggle-cursor");
const toggleLoop = $("toggle-loop");
const nowSection = $("now-section");
const nowSubsection = $("now-subsection");
const nowKey = $("now-key");
const nowMeasure = $("now-measure");
const analysisText = $("analysis-text");
const timelineTrack = $("timeline-track");
const timelinePlayhead = $("timeline-playhead");
const jumpButtonsEl = $("jump-buttons");
const scoreLoading = $("score-loading");

let osmd = null;
let structure = null;
let measureTimes = [];
let totalDuration = 0;          // 분석 기준 길이(초)
let audioSegment = null;        // {start, end, exposition_repeat?} — 음원 안의 1악장 영역
let currentSegmentIdx = -1;
let demoMode = false;
let demoTimer = null;
let demoElapsed = 0;
let demoPlaying = false;

/* ----------------------------------------------------------
 * 초기화
 * ---------------------------------------------------------- */
async function init() {
  try {
    const [s, t] = await Promise.all([
      fetch(STRUCT_URL).then(r => r.json()),
      fetch(TIMING_URL).then(r => r.json()),
    ]);
    structure = s;
    measureTimes = t.measures;
    totalDuration = t.total_duration;
    audioSegment = t.audio_segment || null;
    // localStorage 에 저장된 사용자 마킹 복원
    try {
      const saved = JSON.parse(localStorage.getItem("audioSegment") || "null");
      if (saved && audioSegment) Object.assign(audioSegment, saved);
    } catch (_) {}
    // 저장된 보정값(73마디 audio time 매핑)이 있으면 우선 적용
    loadCalibration();
  } catch (e) {
    console.error("Analysis data load failed", e);
    scoreLoading.textContent = "Could not load analysis data.";
    return;
  }

  buildTimeline();
  buildJumpButtons();
  await initScore();
  await initAudioOrDemo();
  bindEvents();
}

async function initScore() {
  if (typeof opensheetmusicdisplay === "undefined") {
    scoreLoading.textContent = "Score library failed to load (check network).";
    return;
  }
  osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmd-container", {
    autoResize: true,
    backend: "svg",
    drawTitle: false,
    drawComposer: false,
    drawCredits: false,
    drawPartNames: false,
    followCursor: false,
    pageFormat: "Endless",
    cursorsOptions: [
      { type: 0, color: "#d4504a", alpha: 0.55, follow: true }
    ],
  });
  try {
    const r = await fetch(SCORE_URL);
    if (!r.ok) throw new Error("MusicXML missing (HTTP " + r.status + ")");
    const isMxl = SCORE_URL.toLowerCase().endsWith(".mxl");
    let data;
    if (isMxl) {
      // .mxl 은 ZIP. OSMD 는 base64 문자열 형태의 .mxl 을 받는다.
      const buf = new Uint8Array(await r.arrayBuffer());
      let bin = "";
      for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
      data = btoa(bin);
    } else {
      data = await r.text();
    }
    await osmd.load(data);
    // 기본 줌(또는 사용자 저장값) 을 load 후 render 전에 적용
    const savedZoom = parseFloat(localStorage.getItem("osmdZoom"));
    osmd.Zoom = isFinite(savedZoom) ? savedZoom : 0.7;
    osmd.render();
    // 악보 커서는 기본 OFF (사용자가 토글로 켤 때만 표시).
    // 동기 정밀도가 마디 단위라 음표 단위 커서는 거슬릴 수 있어 끔.
    if (toggleCursor && toggleCursor.checked) osmd.cursor.show();
    else if (osmd.cursor) osmd.cursor.hide();
    paintMeasureOverlays();
    scoreLoading.classList.add("hidden");
  } catch (e) {
    console.warn("Score not loaded — demo mode:", e.message);
    scoreLoading.innerHTML =
      "🎼 <strong>No score file found.</strong><br>" +
      "Place a MusicXML for K. 545, Mvt. I at <code>data/mozart_k545_mvt1.musicxml</code> to enable the score.<br>" +
      "Form visualization and metronome demo will continue to work.";
  }
}

async function initAudioOrDemo() {
  await new Promise(resolve => {
    let done = false;
    const ok = () => { if (!done) { done = true; resolve(); } };
    audio.addEventListener("loadedmetadata", ok, { once: true });
    audio.addEventListener("error", () => { demoMode = true; ok(); }, { once: true });
    setTimeout(() => { if (!audio.duration) { demoMode = true; } ok(); }, 1500);
  });
  if (demoMode) enableDemoMode();
}

/* ----------------------------------------------------------
 * 타임라인
 * ---------------------------------------------------------- */
function buildTimeline() {
  timelineTrack.innerHTML = "";
  const flat = flattenSegments(structure);
  flat.forEach((seg, i) => {
    const div = document.createElement("div");
    div.className = `timeline-segment ${seg.section} theme-${seg.theme || "P"}`;
    const widthPct = ((seg.end_time - seg.start_time) / totalDuration) * 100;
    div.style.width = widthPct + "%";
    div.title = `${labelKor(seg.section)} · ${themeLabel(seg.theme)}\n` +
                `m. ${seg.start_measure}–${seg.end_measure}\n` +
                `${formatTime(seg.start_time)}–${formatTime(seg.end_time)}\n` +
                `${seg.key}`;
    div.dataset.idx = i;
    if (i === 0 || flat[i - 1].section !== seg.section) {
      const tag = document.createElement("span");
      tag.className = "seg-tag";
      tag.textContent = labelKorShort(seg.section);
      div.appendChild(tag);
    }
    div.addEventListener("click", () => seekTo(seg.start_time, true));
    timelineTrack.appendChild(div);
  });
}

function buildJumpButtons() {
  jumpButtonsEl.innerHTML = "";
  structure.sections.forEach(s => {
    const btn = document.createElement("button");
    btn.dataset.section = s.id;
    btn.textContent = `${labelKor(s.id)} (m. ${s.start_measure})`;
    btn.addEventListener("click", () => seekTo(s.start_time, true));
    jumpButtonsEl.appendChild(btn);
  });
}

function flattenSegments(struct) {
  const out = [];
  struct.sections.forEach(sec => {
    (sec.themes || [{ id: sec.id, ...sec }]).forEach(th => {
      out.push({
        section: sec.id,
        theme: th.id,
        start_measure: th.start_measure,
        end_measure: th.end_measure,
        start_time: th.start_time,
        end_time: th.end_time,
        key: th.key || sec.key || "",
        note: th.note || sec.note || "",
      });
    });
  });
  return out;
}

/* ----------------------------------------------------------
 * 마디 오버레이 — SVG getBBox 기반(견고)
 * ---------------------------------------------------------- */
function paintMeasureOverlays() {
  if (!osmd || !toggleColor.checked) return;
  const container = $("osmd-container");
  container.querySelectorAll(".measure-overlay").forEach(n => n.remove());

  const svg = container.querySelector("svg");
  if (!svg) return;

  const sheet = osmd.GraphicSheet || osmd.graphic;
  if (!sheet || !sheet.MeasureList) return;

  // OSMD 의 graphical-measure 좌표는 그래픽 단위. SVG 의 viewBox 와
  // 실제 픽셀 비율로 환산해야 정확.
  const svgRect = svg.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const offsetX = svgRect.left - containerRect.left;
  const offsetY = svgRect.top  - containerRect.top;
  const vbW = svg.viewBox.baseVal.width  || svgRect.width;
  const vbH = svg.viewBox.baseVal.height || svgRect.height;
  const sx = svgRect.width  / vbW;
  const sy = svgRect.height / vbH;
  const unitToVB = 10; // OSMD 그래픽 단위 ≈ 10 viewBox 유닛

  // 시스템(악보 한 줄) 단위로 묶어서, 같은 마디번호의 모든 보표를
  // 한 박스로 덮음.
  sheet.MeasureList.forEach(staffMeasures => {
    if (!staffMeasures || staffMeasures.length === 0) return;
    const top = staffMeasures[0];
    const bot = staffMeasures[staffMeasures.length - 1];
    if (!top || !bot) return;
    const measureNumber = top.MeasureNumber;
    const seg = findSegmentByMeasure(measureNumber);
    if (!seg) return;

    const a = top.PositionAndShape;
    const b = bot.PositionAndShape;
    const x = a.AbsolutePosition.x * unitToVB * sx + offsetX;
    const y = a.AbsolutePosition.y * unitToVB * sy + offsetY;
    const w = a.Size.width * unitToVB * sx;
    const h = (b.AbsolutePosition.y + b.Size.height - a.AbsolutePosition.y) * unitToVB * sy;

    const overlay = document.createElement("div");
    overlay.className = `measure-overlay ${seg.section}`;
    overlay.style.left = x + "px";
    overlay.style.top  = y + "px";
    overlay.style.width  = w + "px";
    overlay.style.height = h + "px";
    overlay.dataset.measure = measureNumber;
    container.appendChild(overlay);
  });
}

/* ----------------------------------------------------------
 * 오디오 ↔ 분석 시간 변환
 *
 * 사용자 음원이 *전체 소나타* 처럼 1악장 외 영역을 포함할 때,
 * audioSegment.{start,end} 가 1악장이 차지하는 구간을 정의한다.
 * 또한 Schiff 같은 연주가 제시부를 반복할 때 exposition_repeat
 * 구간을 폴딩해서 "분석 시간"이 두 번째 청취 동안 [0..60]을
 * 한 번 더 흐르도록 만든다.
 * ---------------------------------------------------------- */
function audioToAnalysis(audioT) {
  if (!audioSegment) return audioT;
  if (audioT <= audioSegment.start) return 0;
  if (audioT >= audioSegment.end)   return totalDuration;
  const seg = audioT - audioSegment.start;

  const rep = audioSegment.exposition_repeat;
  if (rep && rep.enabled) {
    const repFrom = Math.max(0, rep.from - audioSegment.start);
    const repTo   = Math.max(repFrom, rep.to - audioSegment.start);
    // 첫 회차는 1:1 (audio = analysis), 따라서 expEndAnalysis = repFrom
    if (seg < repFrom) return seg;
    if (seg < repTo) {
      // 반복 회차: [repFrom, repTo] → [0, repFrom] 으로 폴딩
      const fraction = (seg - repFrom) / Math.max(repTo - repFrom, 0.001);
      return fraction * repFrom;
    }
    // 반복 이후: 반복 구간 길이만큼 차감
    return seg - (repTo - repFrom);
  }
  return seg;
}

function analysisToAudio(analysisT) {
  if (!audioSegment) return analysisT;
  const rep = audioSegment.exposition_repeat;
  if (rep && rep.enabled) {
    const repFrom = Math.max(0, rep.from - audioSegment.start);
    if (analysisT <= repFrom) return audioSegment.start + analysisT;
    return audioSegment.start + analysisT + (rep.to - rep.from);
  }
  return audioSegment.start + analysisT;
}

/* ----------------------------------------------------------
 * 동기화
 * ---------------------------------------------------------- */
function findMeasureAtTime(t) {
  let lo = 0, hi = measureTimes.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (measureTimes[mid].time <= t) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return measureTimes[ans].measure;
}

function findSegmentByMeasure(m) {
  for (const sec of structure.sections) {
    for (const th of (sec.themes || [sec])) {
      if (m >= th.start_measure && m <= th.end_measure) {
        return {
          section: sec.id,
          theme: th.id || sec.id,
          key: th.key || sec.key,
          note: th.note || sec.note,
        };
      }
    }
  }
  return null;
}

function moveCursorToMeasure(measureNumber) {
  if (!osmd || !osmd.cursor || !toggleCursor.checked) return;
  try {
    osmd.cursor.reset();
    let safety = 5000;
    while (safety-- > 0) {
      const it = osmd.cursor.Iterator || osmd.cursor.iterator;
      if (!it) break;
      const cm = (it.CurrentMeasureIndex !== undefined
                 ? it.CurrentMeasureIndex
                 : (it.currentMeasureIndex !== undefined
                    ? it.currentMeasureIndex : -1)) + 1;
      if (cm >= measureNumber) break;
      osmd.cursor.next();
      if (it.EndReached || it.endReached) break;
    }
  } catch (_) { /* 비치명적 */ }
}

/* ----------------------------------------------------------
 * 메인 루프
 * ---------------------------------------------------------- */
let lastMeasure = -1;
function tick(currentTimeRaw) {
  // currentTimeRaw 는 *오디오 시계* (또는 데모 모드에선 분석 시계).
  // 데모 모드는 audioSegment 가 없으므로 그대로 분석 시간이 됨.
  const t = audioSegment && !demoMode ? audioToAnalysis(currentTimeRaw) : currentTimeRaw;

  // 1악장 끝 도달 시 자동 정지
  if (audioSegment && !demoMode && currentTimeRaw >= audioSegment.end - 0.05) {
    if (!audio.paused) audio.pause();
  }

  const m = findMeasureAtTime(t);
  if (m !== lastMeasure) {
    lastMeasure = m;
    moveCursorToMeasure(m);
    updateNowPlaying(m, t);
    highlightCurrentOverlay(m);
  }
  const pct = totalDuration > 0 ? (t / totalDuration) * 100 : 0;
  timelinePlayhead.style.left = pct + "%";

  if (toggleLoop.checked && currentSegmentIdx >= 0) {
    const seg = flattenSegments(structure)[currentSegmentIdx];
    if (seg && t >= seg.end_time - 0.05) {
      seekTo(seg.start_time, false);
    }
  }
}

function highlightCurrentOverlay(measureNumber) {
  document.querySelectorAll(".measure-overlay").forEach(o => {
    const isCur = parseInt(o.dataset.measure, 10) === measureNumber;
    o.style.outline = isCur ? "2px solid var(--accent)" : "";
    o.style.zIndex = isCur ? "2" : "1";
  });
}

function updateNowPlaying(m, t) {
  const seg = findSegmentByMeasure(m);
  if (!seg) return;
  nowSection.textContent = labelKor(seg.section);
  nowSection.style.background = sectionColorVar(seg.section);
  nowSubsection.textContent = themeLabel(seg.theme);
  nowSubsection.style.borderColor = themeColorVar(seg.theme);
  nowSubsection.style.color = themeColorVar(seg.theme);
  nowKey.textContent = seg.key;
  nowMeasure.textContent = `m. ${m}`;
  analysisText.textContent = seg.note || "";

  document.querySelectorAll(".jump-buttons button").forEach(b => {
    b.classList.toggle("active", b.dataset.section === seg.section);
  });

  const flat = flattenSegments(structure);
  for (let i = 0; i < flat.length; i++) {
    if (m >= flat[i].start_measure && m <= flat[i].end_measure) {
      currentSegmentIdx = i;
      break;
    }
  }
}

function seekTo(analysisTime, play) {
  if (demoMode) {
    demoElapsed = analysisTime;
    if (play) startDemo();
  } else {
    audio.currentTime = audioSegment ? analysisToAudio(analysisTime) : analysisTime;
    if (play) audio.play();
  }
}

/* ----------------------------------------------------------
 * 탭 보정 모드 — 핵심 마디 6개에서 스페이스 탭으로 73마디 전체
 * 타이밍을 선형 보간하여 재계산
 * ---------------------------------------------------------- */
const CALIBRATION_LANDMARKS = [
  { measure: 1,  label: "Exposition P start (first note of m. 1)" },
  { measure: 14, label: "Exposition S start (new G-major melody)" },
  { measure: 29, label: "Development start (turns minor and darker)" },
  { measure: 42, label: "Recapitulation P start (F major!)" },
  { measure: 58, label: "Recap S start (back in C major)" },
  { measure: 73, label: "Last bar of Mvt. I / just before Mvt. II" }
];
let calibState = null;

function startCalibration() {
  if (demoMode || !audio || !audio.duration) {
    showToast("Calibration requires a loaded audio file");
    return;
  }
  calibState = { idx: 0, taps: [] };
  audio.currentTime = 0;
  audio.play();
  showCalibrationUI();
}

function showCalibrationUI() {
  let panel = document.getElementById("calib-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "calib-panel";
    panel.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border:2px solid #d4504a;border-radius:12px;padding:1.5rem 2rem;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:9999;max-width:480px;text-align:center;font-size:1rem";
    document.body.appendChild(panel);
  }
  if (!calibState) { panel.remove(); return; }
  const cur = CALIBRATION_LANDMARKS[calibState.idx];
  panel.innerHTML = `
    <div style="font-size:.8rem;color:#999;margin-bottom:.5rem;">
      Calibration ${calibState.idx + 1} / ${CALIBRATION_LANDMARKS.length}
    </div>
    <div style="font-size:1.1rem;font-weight:600;margin-bottom:.5rem;">m. ${cur.measure}</div>
    <div style="margin-bottom:1rem;">${cur.label}</div>
    <div style="font-size:.85rem;color:#666;margin-bottom:1rem;">
      Press <strong>Space</strong> the moment you hear this measure.<br>
      Backspace to undo the last tap.
    </div>
    <div style="font-size:.75rem;color:#888;">
      Audio time: <span id="calib-audio-time">${formatTime(audio.currentTime)}</span><br>
      Esc to cancel
    </div>`;
  // live time update
  if (showCalibrationUI._t) clearInterval(showCalibrationUI._t);
  showCalibrationUI._t = setInterval(() => {
    const el = document.getElementById("calib-audio-time");
    if (el && calibState) el.textContent = formatTime(audio.currentTime);
    else clearInterval(showCalibrationUI._t);
  }, 100);
}

function calibrationTap() {
  if (!calibState) return;
  const cur = CALIBRATION_LANDMARKS[calibState.idx];
  calibState.taps.push({ measure: cur.measure, time: audio.currentTime });
  calibState.idx++;
  if (calibState.idx >= CALIBRATION_LANDMARKS.length) {
    finishCalibration();
  } else {
    showCalibrationUI();
  }
}

function calibrationUndo() {
  if (!calibState || calibState.idx === 0) return;
  calibState.idx--;
  calibState.taps.pop();
  showCalibrationUI();
}

function cancelCalibration() {
  calibState = null;
  const panel = document.getElementById("calib-panel");
  if (panel) panel.remove();
  if (showCalibrationUI._t) clearInterval(showCalibrationUI._t);
  showToast("Calibration cancelled");
}

function finishCalibration() {
  if (!calibState || calibState.taps.length < 2) { cancelCalibration(); return; }
  const taps = calibState.taps;
  // taps: [{measure, time}, ...] — 측정 마디는 1, 14, 29, 42, 58, 73
  // 분석상 m1=0, m14=28s, m29=60s, m42=90s, m58=130s, m73=195s 가 *추정* 값.
  // 우리는 audio time → measure 매핑을 새로 만든다:
  //   m1..m13 : 첫 두 탭 사이 선형 보간
  //   m14..m28 : 두번째~세번째 탭 사이
  //   ...
  // 그 결과를 measureTimes 의 "분석시간" 으로 저장.
  // 그러나 audioSegment 시스템과 호환되려면, 우리는 audio time 자체를
  // measure 에 매핑해야 함. 가장 단순: audioSegment 를 무력화하고
  // measureTimes 자체를 audio time 으로 갱신, totalDuration 도 갱신.
  const newMT = [];
  for (let i = 0; i < taps.length - 1; i++) {
    const a = taps[i], b = taps[i + 1];
    const span = b.measure - a.measure;
    for (let k = 0; k < span; k++) {
      const m = a.measure + k;
      const t = a.time + (k / span) * (b.time - a.time);
      newMT.push({ measure: m, time: t });
    }
  }
  // 마지막 탭(보통 m.73)도 추가
  newMT.push({ measure: taps[taps.length - 1].measure, time: taps[taps.length - 1].time });

  // 적용: measureTimes 와 totalDuration 갱신, audioSegment 무력화
  measureTimes = newMT;
  totalDuration = newMT[newMT.length - 1].time;
  audioSegment.start = newMT[0].time;
  audioSegment.end = newMT[newMT.length - 1].time;
  audioSegment.exposition_repeat = audioSegment.exposition_repeat || {};
  audioSegment.exposition_repeat.enabled = false; // 탭이 두번째 회차를 가리키지 않으므로 폴딩 끔
  audioSegment.calibrated = true;

  // 분석 시간(structure.sections.themes) 도 갱신: 측 → 시간으로 다시 계산
  const measureToTime = {};
  newMT.forEach(x => measureToTime[x.measure] = x.time);
  function measureTime(m) {
    // 정확히 매칭 안 되면 최근접 두 점으로 보간
    if (measureToTime[m] !== undefined) return measureToTime[m];
    const ms = newMT.map(x => x.measure);
    const lo = Math.max(...ms.filter(x => x <= m));
    const hi = Math.min(...ms.filter(x => x >= m));
    if (lo === hi) return measureToTime[lo];
    const f = (m - lo) / (hi - lo);
    return measureToTime[lo] + f * (measureToTime[hi] - measureToTime[lo]);
  }
  structure.sections.forEach(sec => {
    sec.start_time = measureTime(sec.start_measure);
    sec.end_time   = measureTime(sec.end_measure);
    (sec.themes || []).forEach(th => {
      th.start_time = measureTime(th.start_measure);
      th.end_time   = measureTime(th.end_measure);
    });
  });

  try {
    localStorage.setItem("calibration", JSON.stringify({
      measureTimes: newMT,
      totalDuration,
      audioSegment
    }));
  } catch (_) {}

  buildTimeline();
  if (showCalibrationUI._t) clearInterval(showCalibrationUI._t);
  const panel = document.getElementById("calib-panel");
  if (panel) panel.remove();
  calibState = null;
  showToast(`✓ Calibration complete — 73 measures re-computed from ${taps.length} taps (saved)`);
}

function loadCalibration() {
  try {
    const saved = JSON.parse(localStorage.getItem("calibration") || "null");
    if (saved && saved.measureTimes && saved.measureTimes.length >= 70) {
      measureTimes = saved.measureTimes;
      totalDuration = saved.totalDuration;
      Object.assign(audioSegment, saved.audioSegment);
      // structure 시간도 재계산
      const map = {}; measureTimes.forEach(x => map[x.measure] = x.time);
      function mt(m) {
        if (map[m] !== undefined) return map[m];
        const ms = measureTimes.map(x => x.measure);
        const lo = Math.max(...ms.filter(x => x <= m));
        const hi = Math.min(...ms.filter(x => x >= m));
        if (lo === hi) return map[lo];
        const f = (m - lo) / (hi - lo);
        return map[lo] + f * (map[hi] - map[lo]);
      }
      structure.sections.forEach(sec => {
        sec.start_time = mt(sec.start_measure);
        sec.end_time   = mt(sec.end_measure);
        (sec.themes || []).forEach(th => {
          th.start_time = mt(th.start_measure);
          th.end_time   = mt(th.end_measure);
        });
      });
      console.info("저장된 보정값 로드됨");
    }
  } catch (_) {}
}

/* ----------------------------------------------------------
 * 사용자 마킹 — 'M' 키로 1악장 끝 시간 설정
 * ---------------------------------------------------------- */
function markMovementEnd() {
  if (!audioSegment || demoMode) return;
  audioSegment.end = audio.currentTime;
  try { localStorage.setItem("audioSegment", JSON.stringify(audioSegment)); } catch (_) {}
  showToast(`Mvt. I end marked at ${formatTime(audio.currentTime)} (saved)`);
}
function markRepeatBoundary(which) {
  if (!audioSegment || demoMode) return;
  if (!audioSegment.exposition_repeat) audioSegment.exposition_repeat = { enabled: true, from: 60, to: 120 };
  audioSegment.exposition_repeat.enabled = true;
  audioSegment.exposition_repeat[which] = audio.currentTime;
  try { localStorage.setItem("audioSegment", JSON.stringify(audioSegment)); } catch (_) {}
  showToast(`Repeat boundary ${which} marked at ${formatTime(audio.currentTime)}`);
}
function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:.6rem 1rem;border-radius:6px;z-index:9999;font-size:.9rem;box-shadow:0 4px 12px rgba(0,0,0,.2)";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(showToast._h);
  showToast._h = setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .4s"; }, 2200);
}

/* ----------------------------------------------------------
 * 데모 모드 (음원 없을 때)
 *   WebAudio 로 다운비트마다 짧은 클릭(1500Hz) 발음
 * ---------------------------------------------------------- */
let audioCtx = null;
function enableDemoMode() {
  demoMode = true;
  audio.style.opacity = "0.5";
  audio.title = "No audio file — running in metronome demo mode";
  // 데모용 가짜 컨트롤
  const demoBar = document.createElement("div");
  demoBar.style.cssText = "grid-column:1/-1; padding:.4rem .6rem; background:#fff8e1; border:1px solid #f3d575; border-radius:6px; font-size:.85rem;";
  demoBar.innerHTML = `🎵 <strong>Demo mode</strong> — no audio file; metronome clicks reproduce the formal flow.
    <button id="demo-play" style="margin-left:.5rem;">▶ Play</button>
    <button id="demo-pause" style="margin-left:.25rem;">⏸ Pause</button>`;
  $("controls").insertBefore(demoBar, audio.nextSibling);
  $("demo-play").addEventListener("click", startDemo);
  $("demo-pause").addEventListener("click", stopDemo);
}

function ensureAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function clickSound(strong) {
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.frequency.value = strong ? 1800 : 1200;
  g.gain.setValueAtTime(0.2, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
  o.connect(g).connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + 0.05);
}

function startDemo() {
  ensureAudioCtx();
  if (demoPlaying) return;
  demoPlaying = true;
  let lastClickTime = -1;
  const speed = parseFloat(speedSlider.value) || 1;
  const t0 = performance.now() / 1000 - demoElapsed / speed;
  function loop() {
    if (!demoPlaying) return;
    demoElapsed = (performance.now() / 1000 - t0) * speed;
    if (demoElapsed >= totalDuration) { stopDemo(); return; }
    // 마디 진입 시 클릭
    const m = findMeasureAtTime(demoElapsed);
    if (m !== lastClickTime) {
      lastClickTime = m;
      const seg = findSegmentByMeasure(m);
      const strong = seg && (m === seg.start_measure || m === 1);
      clickSound(strong);
    }
    tick(demoElapsed);
    demoTimer = requestAnimationFrame(loop);
  }
  loop();
}
function stopDemo() {
  demoPlaying = false;
  if (demoTimer) cancelAnimationFrame(demoTimer);
}

/* ----------------------------------------------------------
 * Label / color utilities
 * ---------------------------------------------------------- */
function labelKor(id) {
  return ({ exposition: "Exposition", development: "Development",
            recapitulation: "Recapitulation", coda: "Coda" })[id] || id;
}
function labelKorShort(id) {
  return ({ exposition: "Exp.", development: "Dev.",
            recapitulation: "Recap.", coda: "Coda" })[id] || id;
}
function themeLabel(id) {
  return ({ P: "Primary theme (P)", T: "Transition (T)",
            S: "Secondary theme (S)", K: "Codetta" })[id] || id;
}
function sectionColorVar(id) {
  return ({ exposition: "var(--c-exposition)", development: "var(--c-development)",
            recapitulation: "var(--c-recapitulation)", coda: "var(--c-coda)" })[id] || "#fff";
}
function themeColorVar(id) {
  return ({ P: "var(--c-P)", T: "var(--c-T)", S: "var(--c-S)", K: "var(--c-K)" })[id] || "var(--c-P)";
}
function formatTime(s) {
  const mm = Math.floor(s / 60), ss = Math.floor(s % 60);
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

/* ----------------------------------------------------------
 * 이벤트 바인딩
 * ---------------------------------------------------------- */
function bindEvents() {
  audio.addEventListener("timeupdate", () => tick(audio.currentTime));
  audio.addEventListener("loadedmetadata", () => {
    // audioSegment 가 있으면 분석 시간은 그대로 두고, 오디오 안의 1악장
    // 영역만 사용. audioSegment 가 없는 경우(짧은 PD 녹음) 에만 비례 보정.
    if (audioSegment) {
      // audioSegment.end 가 음원 길이를 초과하면 음원 길이로 클램프
      audioSegment.end = Math.min(audioSegment.end, audio.duration);
      // 시작 위치를 segment.start 로 이동
      if (audio.currentTime < audioSegment.start) audio.currentTime = audioSegment.start;
      showToast(`Audio ${formatTime(audio.duration)}, Mvt. I = ${formatTime(audioSegment.start)}–${formatTime(audioSegment.end)} (press M to adjust end)`);
      return;
    }
    if (audio.duration && Math.abs(audio.duration - totalDuration) > 1) {
      const ratio = audio.duration / totalDuration;
      measureTimes = measureTimes.map(x => ({ measure: x.measure, time: x.time * ratio }));
      structure.sections.forEach(sec => {
        sec.start_time *= ratio; sec.end_time *= ratio;
        (sec.themes || []).forEach(th => { th.start_time *= ratio; th.end_time *= ratio; });
      });
      totalDuration = audio.duration;
      buildTimeline();
    }
  });

  speedSlider.addEventListener("input", () => {
    const r = parseFloat(speedSlider.value);
    audio.playbackRate = r;
    speedLabel.textContent = r.toFixed(2) + "×";
  });

  toggleColor.addEventListener("change", () => {
    document.querySelectorAll(".measure-overlay").forEach(n => n.remove());
    if (toggleColor.checked) paintMeasureOverlays();
  });
  toggleCursor.addEventListener("change", () => {
    if (osmd && osmd.cursor) {
      toggleCursor.checked ? osmd.cursor.show() : osmd.cursor.hide();
    }
  });

  // 키보드 단축키
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    // 보정 모드 중에는 별도 처리
    if (calibState) {
      if (e.key === " ")        { e.preventDefault(); calibrationTap(); return; }
      if (e.key === "Backspace"){ e.preventDefault(); calibrationUndo(); return; }
      if (e.key === "Escape")   { e.preventDefault(); cancelCalibration(); return; }
      return;
    }
    switch (e.key) {
      case " ":
        e.preventDefault();
        if (demoMode) (demoPlaying ? stopDemo() : startDemo());
        else (audio.paused ? audio.play() : audio.pause());
        break;
      case "ArrowLeft":  jumpSegment(-1); break;
      case "ArrowRight": jumpSegment(+1); break;
      case "l": case "L": toggleLoop.checked = !toggleLoop.checked; break;
      case "c": case "C":
        toggleColor.checked = !toggleColor.checked;
        toggleColor.dispatchEvent(new Event("change"));
        break;
      case "m": case "M": markMovementEnd(); break;
      case "[": markRepeatBoundary("from"); break;
      case "]": markRepeatBoundary("to"); break;
      case "r": case "R":
        if (audioSegment && audioSegment.exposition_repeat) {
          audioSegment.exposition_repeat.enabled = !audioSegment.exposition_repeat.enabled;
          try { localStorage.setItem("audioSegment", JSON.stringify(audioSegment)); } catch(_) {}
          showToast("Exposition repeat folding: " + (audioSegment.exposition_repeat.enabled ? "ON" : "OFF"));
        }
        break;
      case "t": case "T": startCalibration(); break;
      case "+": case "=":
        if (osmd) {
          osmd.Zoom = Math.min(2.0, (osmd.Zoom || 1) + 0.1);
          localStorage.setItem("osmdZoom", osmd.Zoom);
          osmd.render(); if (toggleCursor.checked) osmd.cursor.show(); else osmd.cursor.hide(); paintMeasureOverlays();
          showToast(`Score zoom ${Math.round(osmd.Zoom * 100)}%`);
        }
        break;
      case "-": case "_":
        if (osmd) {
          osmd.Zoom = Math.max(0.3, (osmd.Zoom || 1) - 0.1);
          localStorage.setItem("osmdZoom", osmd.Zoom);
          osmd.render(); if (toggleCursor.checked) osmd.cursor.show(); else osmd.cursor.hide(); paintMeasureOverlays();
          showToast(`Score zoom ${Math.round(osmd.Zoom * 100)}%`);
        }
        break;
    }
  });

  // 툴바 버튼
  const btnCal = document.getElementById("btn-calibrate");
  if (btnCal) btnCal.addEventListener("click", startCalibration);
  const btnZi = document.getElementById("btn-zoom-in");
  if (btnZi) btnZi.addEventListener("click", () => {
    if (!osmd) return;
    osmd.Zoom = Math.min(2.0, (osmd.Zoom || 1) + 0.1);
    localStorage.setItem("osmdZoom", osmd.Zoom);
    osmd.render(); if (toggleCursor.checked) osmd.cursor.show(); else osmd.cursor.hide(); paintMeasureOverlays();
    showToast(`Score zoom ${Math.round(osmd.Zoom * 100)}%`);
  });
  const btnZo = document.getElementById("btn-zoom-out");
  if (btnZo) btnZo.addEventListener("click", () => {
    if (!osmd) return;
    osmd.Zoom = Math.max(0.3, (osmd.Zoom || 1) - 0.1);
    localStorage.setItem("osmdZoom", osmd.Zoom);
    osmd.render(); if (toggleCursor.checked) osmd.cursor.show(); else osmd.cursor.hide(); paintMeasureOverlays();
    showToast(`Score zoom ${Math.round(osmd.Zoom * 100)}%`);
  });
  const btnReset = document.getElementById("btn-reset-cal");
  if (btnReset) btnReset.addEventListener("click", () => {
    if (!confirm("Reset all calibration data and revert to default estimated timing. Continue?")) return;
    localStorage.removeItem("calibration");
    localStorage.removeItem("audioSegment");
    location.reload();
  });

  window.addEventListener("resize", debounce(() => {
    if (osmd) {
      osmd.render();
      if (toggleCursor.checked) osmd.cursor.show();
      else if (osmd.cursor) osmd.cursor.hide();
      paintMeasureOverlays();
    }
  }, 150));
}

function jumpSegment(delta) {
  const flat = flattenSegments(structure);
  const idx = Math.max(0, Math.min(flat.length - 1, currentSegmentIdx + delta));
  seekTo(flat[idx].start_time, true);
}

function debounce(fn, ms) {
  let h; return (...a) => { clearTimeout(h); h = setTimeout(() => fn(...a), ms); };
}

document.addEventListener("DOMContentLoaded", init);
