const AXES_5 = ["action", "mental", "life", "presence", "pain"];
const AXES_ALL = ["action", "mental", "life", "presence", "pain", "duration"];

const axisKo = {
  action: "행동력",
  mental: "잠식력",
  life: "침투력",
  presence: "존재력",
  pain: "혹사력",
  duration: "지속력",
};

const screenStart = document.getElementById("screenStart");
const screenQuiz = document.getElementById("screenQuiz");
const screenResult = document.getElementById("screenResult");

const qTitle = document.getElementById("qTitle");
const optionsEl = document.getElementById("options");

const btnStart = document.getElementById("btnStart");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnResetTop = document.getElementById("btnResetTop");
const btnRestart = document.getElementById("btnRestart");
const btnShareLink = document.getElementById("btnShareLink");
const btnSaveCard = document.getElementById("btnSaveCard");

const progressBar = document.getElementById("progressBar");
const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const qTotal2El = document.getElementById("qTotal2");

const resultPercentEl = document.getElementById("resultPercent");
const scoreBarFillEl = document.getElementById("scoreBarFill");
const resultTypeEl = document.getElementById("resultType");
const resultTagsEl = document.getElementById("resultTags");
const resultHashEl = document.getElementById("resultHash");
const resultDescMainEl = document.getElementById("resultDescMain");
const resultDescSubEl = document.getElementById("resultDescSub");

const QUESTIONS = [
  {
    id: "A01",
    type: "single",
    axis: "action",
    text: "쉬는 날 생기면?",
    options: [
      { text: "쉰다", value: 1 },
      { text: "가끔 감", value: 2 },
      { text: "대부분 감", value: 3 },
      { text: "쉬는 날=암장", value: 4 },
    ],
  },
  {
    id: "M01",
    type: "prefbar4",
    axis: "mental",
    text: "암장 밖에서도 루트/무브가 계속 떠오른다",
  },
];

qTotalEl.textContent = String(QUESTIONS.length);
qTotal2El.textContent = String(QUESTIONS.length);

let current = 0;
const answers = [];

function show(el) {
  el?.classList.remove("hidden");
}
function hide(el) {
  el?.classList.add("hidden");
}
function setScreen(name) {
  hide(screenStart);
  hide(screenQuiz);
  hide(screenResult);
  if (name === "start") show(screenStart);
  if (name === "quiz") show(screenQuiz);
  if (name === "result") show(screenResult);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function updateProgress() {
  const pct = ((current + 1) / QUESTIONS.length) * 100;
  progressBar.style.width = `${pct}%`;
  qIndexEl.textContent = String(current + 1);
}

function getSavedAnswer(idx) {
  return answers[idx]?.value ?? null;
}
function setAnswer(idx, axis, value) {
  answers[idx] = { axis, value };
}

function resetAll() {
  answers.length = 0;
  current = 0;
  setScreen("start");
}

function renderQuestion() {
  const q = QUESTIONS[current];
  const saved = getSavedAnswer(current);

  qTitle.textContent = `Q${current + 1}. ${q.text}`;
  optionsEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      btn.textContent = opt.text;

      if (saved === opt.value) btn.classList.add("is-selected");

      btn.addEventListener("click", () => {
        setAnswer(current, q.axis, opt.value);
        [...optionsEl.querySelectorAll(".opt")].forEach((b) =>
          b.classList.remove("is-selected")
        );
        btn.classList.add("is-selected");
        btnNext.disabled = false;
      });

      optionsEl.appendChild(btn);
    });
  }

  if (q.type === "prefbar4") {
    const wrap = document.createElement("div");
    wrap.className = "pref-wrap";

    const labels = document.createElement("div");
    labels.className = "pref-labels";
    labels.innerHTML = `<span>전혀 아님</span><span>완전 맞음</span>`;
    wrap.appendChild(labels);

    const bar = document.createElement("div");
    bar.className = "pref-bar";

    const paint = (value) => {
      [...bar.querySelectorAll(".pref-seg")].forEach((b) => {
        const v = Number(b.dataset.v);
        b.classList.toggle("is-on", v <= value);
        b.classList.toggle("is-current", v === value);
      });
    };

    for (let i = 1; i <= 4; i++) {
      const seg = document.createElement("button");
      seg.type = "button";
      seg.className = "pref-seg";
      seg.dataset.v = String(i);
      seg.setAttribute("aria-label", `선호도 ${i}점`);

      seg.addEventListener("click", () => {
        setAnswer(current, q.axis, i);
        paint(i);
        btnNext.disabled = false;
      });

      bar.appendChild(seg);
    }

    if (saved !== null) paint(saved);

    wrap.appendChild(bar);
    optionsEl.appendChild(wrap);
  }

  btnPrev.disabled = current === 0;
  btnNext.disabled = saved === null;

  updateProgress();
}

function computeAxisScores() {
  const axisScore = {};
  AXES_ALL.forEach((a) => (axisScore[a] = { sum: 0, count: 0, avg: 0 }));

  answers.forEach((ans) => {
    if (!ans?.axis) return;
    if (!axisScore[ans.axis]) axisScore[ans.axis] = { sum: 0, count: 0, avg: 0 };
    axisScore[ans.axis].sum += Number(ans.value || 0);
    axisScore[ans.axis].count += 1;
  });

  Object.keys(axisScore).forEach((a) => {
    const { sum, count } = axisScore[a];
    axisScore[a].avg = count ? sum / count : 0;
  });

  return axisScore;
}

function avgToPercent(avg14) {
  if (!avg14) return 0;
  return clamp(Math.round(((avg14 - 1) / 3) * 100), 0, 100);
}

function overallPercent() {
  const total = answers.reduce((acc, a) => acc + Number(a?.value || 0), 0);
  const cnt = answers.filter(Boolean).length;
  const avg = cnt ? total / cnt : 0;
  return avgToPercent(avg);
}

function typeByPercent(pct) {
  if (pct < 25) return "가벼운 찍먹러";
  if (pct < 50) return "루틴 예비 클친자";
  if (pct < 75) return "확정 클친자";
  return "혹시… 선출..?";
}

function levelName(axis, avg) {
  const v = clamp(Math.round(avg || 0), 1, 4);
  const map = {
    action: ["간헐적 방문자", "루틴 클라이머", "상주형", "암장 거주자"],
    mental: ["분리형", "잔상형", "점유형", "뇌내 완등자"],
    life: ["취미형", "개입형", "침식형", "생활재편성"],
    presence: ["초크", "홀드", "볼륨", "NPC"],
    pain: ["자기보호형", "관리형", "무시형", "연소형"],
    duration: ["입문기", "성장기", "정체&권태기", "장기"],
  };
  return map[axis]?.[v - 1] ?? `${axisKo[axis] || axis} Lv.${v}`;
}

function tagsFromAxes(axisScore) {
  const tags = [];
  AXES_5.forEach((a) => {
    const avg = axisScore[a]?.avg || 1;
    tags.push(levelName(a, avg));
  });
  if ((axisScore.duration?.count || 0) > 0) {
    tags.push(levelName("duration", axisScore.duration.avg || 1));
  }
  return tags;
}

function hashtagsFromAxes(axisScore) {
  const ranked = AXES_5
    .map((a) => ({ a, pct: avgToPercent(axisScore[a]?.avg || 1) }))
    .sort((x, y) => y.pct - x.pct);

  const top1 = ranked[0]?.a;
  const top2 = ranked[1]?.a;

  const hashMap = {
    action: ["#출석률로_존재_증명", "#쉬는날은_암장"],
    mental: ["#일상생활_불가", "#뇌내완등중"],
    life: ["#climb_is_life", "#일정이_벽중심"],
    presence: ["#암장_NPC", "#어딜가나_아는사람"],
    pain: ["#회복은_미래의나", "#통증무시_가보자고"],
  };

  const pick = (axis) => (hashMap[axis]?.[0] ? [hashMap[axis][0]] : []);
  const pick2 = (axis) => (hashMap[axis]?.[1] ? [hashMap[axis][1]] : []);

  const tags = [
    ...pick(top1),
    ...pick(top2),
    ...pick2(top1),
  ].filter(Boolean);

  return tags.join(" ");
}

function descByPercent(pct) {
  if (pct < 25) return { main: "클라이밍은 취미 칸에 잘 보관 중.", sub: "가끔 생각날 때 즐기면 딱 좋지 😌" };
  if (pct < 50) return { main: "루틴이 슬금슬금 만들어지는 중.", sub: "장갑/초크/테이프… 가방에 상주 시작함." };
  if (pct < 75) return { main: "당신의 삶은 이미 클라이밍 중심으로 돌아가는 편.", sub: "쉬어도 결국 돌아오는 타입이네." };
  return { main: "클라이밍이 일상에 완전 침투 완료.", sub: "달력, 통장, 몸… 다 벽에 묶여있음 ㅋㅋ" };
}

let radarChartInstance = null;

function renderRadar(axisScore) {
  const canvas = document.getElementById("radarChart");
  if (!canvas) return;
  if (typeof Chart === "undefined") return;

  const data = AXES_5.map((a) => clamp(Number((axisScore[a]?.avg || 1).toFixed(2)), 1, 4));
  const labels = AXES_5.map((a) => axisKo[a]);

  if (radarChartInstance) {
    radarChartInstance.destroy();
    radarChartInstance = null;
  }

  radarChartInstance = new Chart(canvas, {
    type: "radar",
    data: {
      labels,
      datasets: [{ data, borderWidth: 2, pointRadius: 2 }],
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 1,
          max: 4,
          ticks: { display: false, stepSize: 1 },
          grid: { circular: false },
          angleLines: { display: true },
          pointLabels: { font: { size: 11 } },
        },
      },
    },
  });
}

function renderResult() {
  const axisScore = computeAxisScores();
  const pct = overallPercent();

  if (resultPercentEl) resultPercentEl.textContent = `${pct}%`;
  if (scoreBarFillEl) scoreBarFillEl.style.width = `${pct}%`;

  if (resultTypeEl) resultTypeEl.textContent = typeByPercent(pct);

  if (resultTagsEl) {
    resultTagsEl.innerHTML = "";
    const tags = tagsFromAxes(axisScore);
    tags.forEach((t) => {
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      resultTagsEl.appendChild(s);
    });
  }

  const desc = descByPercent(pct);
  if (resultDescMainEl) resultDescMainEl.textContent = desc.main;
  if (resultDescSubEl) resultDescSubEl.textContent = desc.sub;

  if (resultHashEl) resultHashEl.textContent = hashtagsFromAxes(axisScore);

  renderRadar(axisScore);
}

function buildShareUrl() {
  const axisScore = computeAxisScores();
  const pct = overallPercent();
  const type = typeByPercent(pct);

  const payload = {
    p: pct,
    t: type,
    a: AXES_5.map((x) => clamp(Math.round(axisScore[x]?.avg || 1), 1, 4)),
  };

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = new URL(window.location.href);
  url.searchParams.set("r", encoded);
  return url.toString();
}

function tryLoadSharedResult() {
  const url = new URL(window.location.href);
  const r = url.searchParams.get("r");
  if (!r) return false;

  try {
    const json = decodeURIComponent(escape(atob(r)));
    const payload = JSON.parse(json);

    if (resultPercentEl) resultPercentEl.textContent = `${clamp(payload.p || 0, 0, 100)}%`;
    if (scoreBarFillEl) scoreBarFillEl.style.width = `${clamp(payload.p || 0, 0, 100)}%`;
    if (resultTypeEl) resultTypeEl.textContent = payload.t || "확정 클친자";

    if (resultHashEl) resultHashEl.textContent = "#climb_is_life";

    if (resultTagsEl) resultTagsEl.innerHTML = "";

    const fakeAxis = {};
    AXES_ALL.forEach((a) => (fakeAxis[a] = { avg: 1, count: 1 }));
    AXES_5.forEach((a, i) => (fakeAxis[a].avg = clamp(Number(payload.a?.[i] || 1), 1, 4)));

    if (resultTagsEl) {
      const tags = tagsFromAxes(fakeAxis);
      tags.forEach((t) => {
        const s = document.createElement("span");
        s.className = "tag";
        s.textContent = t;
        resultTagsEl.appendChild(s);
      });
    }

    const desc = descByPercent(clamp(payload.p || 0, 0, 100));
    if (resultDescMainEl) resultDescMainEl.textContent = desc.main;
    if (resultDescSubEl) resultDescSubEl.textContent = desc.sub;

    renderRadar(fakeAxis);

    setScreen("result");
    return true;
  } catch (e) {
    return false;
  }
}

async function shareLink() {
  const url = buildShareUrl();
  try {
    if (navigator.share) {
      await navigator.share({ title: "클친자 테스트", url });
      return;
    }
  } catch (e) {}
  try {
    await navigator.clipboard.writeText(url);
    alert("결과 링크 복사 완료 🔗");
  } catch (e) {
    prompt("복사 안 되면 이거 복사해줘:", url);
  }
}

async function saveCard() {
  const card = document.querySelector("#screenResult .result-card");
  if (!card || typeof html2canvas === "undefined") {
    alert("저장 기능 준비가 안 됨(라이브러리 확인)!");
    return;
  }

  const canvas = await html2canvas(card, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "climbing_addict_result.png";
  a.click();
}

btnStart?.addEventListener("click", () => {
  setScreen("quiz");
  current = 0;
  renderQuestion();
});

btnPrev?.addEventListener("click", () => {
  if (current === 0) return;
  current -= 1;
  renderQuestion();
});

btnNext?.addEventListener("click", () => {
  if (current >= QUESTIONS.length - 1) {
    setScreen("result");
    renderResult();
    return;
  }
  current += 1;
  renderQuestion();
});

btnResetTop?.addEventListener("click", resetAll);
btnRestart?.addEventListener("click", () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("r");
  window.history.replaceState({}, "", url.toString());
  resetAll();
});

btnShareLink?.addEventListener("click", shareLink);
btnSaveCard?.addEventListener("click", saveCard);

if (!tryLoadSharedResult()) {
  setScreen("start");
}
