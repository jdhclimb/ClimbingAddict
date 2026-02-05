const AXES_5=["action","mental","life","growth","pain"];
const axisKo={action:"행동력",mental:"잠식력",life:"침투력",growth:"성장력",pain:"혹사력"};
const $=id=>document.getElementById(id);
const screenStart=$("screenStart"),screenQuiz=$("screenQuiz"),screenResult=$("screenResult");
const qTitle=$("qTitle"),optionsEl=$("options");
const btnStart=$("btnStart"),btnPrev=$("btnPrev"),btnNext=$("btnNext"),btnResetTop=$("btnResetTop"),btnRestart=$("btnRestart"),btnShareLink=$("btnShareLink"),btnSaveCard=$("btnSaveCard");
const progressBar=$("progressBar"),qIndexEl=$("qIndex"),qTotalEl=$("qTotal"),qTotal2El=$("qTotal2");
const resultPercentEl=$("resultPercent"),scoreBarFillEl=$("scoreBarFill"),resultTypeEl=$("resultType"),resultTagsEl=$("resultTags"),resultHashEl=$("resultHash"),resultDescMainEl=$("resultDescMain"),resultDescSubEl=$("resultDescSub");
const QUESTIONS=[
// {id:"A01",type:"single",axis:"action",text:"저번 달 암장 방문 횟수는?",options:[{text:"0~4회",value:0},{text:"5~9회",value:1},{text:"10~14회",value:2},{text:"15회 이상",value:3}]},
// {id:"A02",type:"single",axis:"action",text:"암장 최대 체류시간",options:[{text:"~2시간",value:0},{text:"2시간~5시간",value:1},{text:"5시간~8시간",value:2},{text:"8시간 이상",value:3}]},
// {id:"A03",type:"single",axis:"action",text:"몸이 피곤하고 움직이기도 귀찮을 때",options:[{text:"안 간다",value:0},{text:"고민하다 안 간다",value:1},{text:"조금 늦게라도 간다",value:2},{text:"클밍이면 가야지",value:3}]},
// {id:"A04",type:"single",axis:"action",text:"주 최대 방문 횟수",options:[{text:"2일 이하",value:0},{text:"3일~5일",value:1},{text:"5일~6일",value:2},{text:"7일",value:3}]},

// {id:"M01",type:"multi",axis:"mental",text:"다음 중 해본 것 모두 체크",options:[{text:"벽 더듬거려봄",value:1},{text:"문틀 타고 올라가봄",value:1},{text:'미끄러운 길 걷다 "오...밸런스" 생각해 봄',value:1},{text:"해당 없음",value:0,exclusive:true}]},
// {id:"M02",type:"single",axis:"mental",text:"암장 못 가면",options:[{text:"별 생각 없음",value:0},{text:"좀 아쉽다",value:1},{text:"하루가 비는 느낌",value:2}]},
// {id:"M03",type:"single",axis:"mental",text:"등반하는 꿈 꿔본 적",options:[{text:"없다",value:0},{text:"있다",value:1}]},
// {id:"M04",type:"single",axis:"mental",text:"가만히 있을 때 떠오르는 생각",options:[{text:"딴 생각",value:0},{text:"클라이밍 언제 가지",value:1},{text:"존버했던 문제/뿌무 생각",value:2},{text:"돌.만지고.싶다.",value:3}]},
// {id:"M05",type:"single",axis:"mental",text:"클라이머가 아닌 친구/동료",options:[{text:"클라이밍 이야기 안 한다",value:0},{text:"취미 이야기 나오면 잠깐",value:1},{text:"뿌무 자랑",value:2},{text:"너무 많이 해서 밴 당함",value:3}]},

// {id:"L01",type:"single",axis:"life",text:"클밍 안하는 친구/가족이랑 여행가서",options:[{text:"재밌게 논다",value:0},{text:"주변 암장 찾아만 본다",value:1},{text:"암장 몇 번 감",value:2},{text:"여행 가기 전 암장 간다 말해둠",value:3}]},
// {id:"L02",type:"single",axis:"life",text:"일정 잡을 때",options:[{text:"약속 먼저, 암장은 일정 비면",value:0},{text:"상황 봐서 결정",value:1},{text:"암장 중심으로 약속 조정",value:2},{text:"암장 먼저, 약속은 클밍 쉬어야 할 때",value:3}]},
// {id:"L03",type:"single",axis:"life",text:"연차/자휴 때리고 클밍 간 적",options:[{text:"없다",value:0},{text:"있다",value:1}]},
// {id:"L04",type:"single",axis:"life",text:"쉬려고 맘 먹었다가 못 참고 암장 간 적",options:[{text:"없다",value:0},{text:"있다",value:1}]},
// {id:"L05",type:"single",axis:"life",text:"클밍 잘하려고 트레이닝/다른 운동/식단 해본 적",options:[{text:"없다",value:0},{text:"있다",value:1}]},
// {id:"L06",type:"single",axis:"life",text:"연휴가 다가오면",options:[{text:"여행/휴식 위주",value:0},{text:"하루쯤 암장 갈까 싶음",value:1},{text:"클밍 언제 어디 갈지 계획함",value:2},{text:"연휴 == 암장 몰아가기 타임",value:3}]},

// {id:"G01",type:"single",axis:"growth",text:"새로운 무브(토모아, 활어 등) 접했을 때",options:[{text:"어려워 보이면 안 한다",value:0},{text:"한두 번 시도 해봄",value:1},{text:"익숙해질 때까지 도전",value:2},{text:"해당 문제 볼 때마다 눈 돌아감",value:3}]},
// {id:"G02",type:"single",axis:"growth",text:"존버 완등 성공! 동작이 좀 지저분하다면?",options:[{text:"여튼 완등했으면 됨",value:0},{text:"찝찝하지만 완등했으니까...",value:1},{text:"다시 한다",value:2},{text:"깔끔하게 풀릴 때까지 다시",value:3}]},
// {id:"G03",type:"single",axis:"growth",text:"클라이밍 때문에 감정적으로 흔들린 적",options:[{text:"없다",value:0},{text:"아쉬워서 짜증 난 정도",value:1},{text:"가끔 분노가 치밀어 오른다",value:2},{text:"진짜로 울거나 멘탈 터진 적 있음",value:3}]},
// {id:"G04",type:"single",axis:"growth",text:"“요즘 실력 늘었다”는 말 들으면",options:[{text:"기분 좋다",value:0},{text:"뿌듯하다",value:1},{text:"부족한 부분이 떠오른다",value:2},{text:"아직 만족할 수 없다",value:3}]},

// {id:"P01",type:"single",axis:"pain",text:"깁스하고 클밍한 적",options:[{text:"있다",value:1},{text:"없다",value:0}]},
// {id:"P02",type:"single",axis:"pain",text:"클밍 중 피멍/쓸림 발생 시",options:[{text:"그만할까...",value:0},{text:"약 바르고 안 아프면 다시 ㄱㄱ",value:1},{text:"안 죽어~ 시간 없다 빨리 붙자...",value:2},{text:"다음 날 발견/남이 말해줘서 앎",value:3}]},
// {id:"P03",type:"single",axis:"pain",text:"클밍 안하는 사람들이 손/팔 보고 안타까워한 적",options:[{text:"있다",value:1},{text:"없다",value:0}]},
// {id:"P04",type:"single",axis:"pain",text:'"좀 쉬어라" 들어본 적',options:[{text:"있다",value:1},{text:"없다",value:0}]},
// {id:"P05",type:"single",axis:"pain",text:"의사가 클라이밍 쉬라고 하면?",options:[{text:"병원...가본 적 없는데?",value:0},{text:"얼마나 쉬어야 하는지 확인한다",value:1},{text:"의사가 뭘 알아",value:2},{text:"그럴 거 같아서 병원 안 감",value:3}]},
{id:"P06",type:"single",axis:"pain",text:"마감 전 나가는 이유",options:[{text:"일찍 와서..?",value:0},{text:"할 거 다 해서",value:1},{text:"더 이상 저그 잡을 힘도 없어서",value:2},{text:"마감 전에 어딜 나가",value:3}]}
];

qTotalEl.textContent=String(QUESTIONS.length);qTotal2El.textContent=String(QUESTIONS.length);

let current=0;const answers=[];
const show=el=>el?.classList.remove("hidden"),hide=el=>el?.classList.add("hidden");
const setScreen=name=>{hide(screenStart);hide(screenQuiz);hide(screenResult);name==="start"&&show(screenStart);name==="quiz"&&show(screenQuiz);name==="result"&&show(screenResult)};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const updateProgress=()=>{const pct=((current+1)/QUESTIONS.length)*100;progressBar.style.width=`${pct}%`;qIndexEl.textContent=String(current+1)};
const getSavedAnswer=idx=>answers[idx]??null;
const setAnswer=(idx,axis,value,selectedIdxs=null)=>{answers[idx]={axis,value,selectedIdxs}};
const resetAll=()=>{answers.length=0;current=0;setScreen("start")};

function renderQuestion(){
  const q=QUESTIONS[current],saved=getSavedAnswer(current);
  qTitle.textContent=`Q${current+1}. ${q.text}`;optionsEl.innerHTML="";
  if(q.type==="single"){
    q.options.forEach(opt=>{
      const btn=document.createElement("button");
      btn.type="button";btn.className="opt";btn.textContent=opt.text;
      if(saved?.value===opt.value)btn.classList.add("is-selected");
      btn.addEventListener("click",()=>{
        setAnswer(current,q.axis,opt.value);
        [...optionsEl.querySelectorAll(".opt")].forEach(b=>b.classList.remove("is-selected"));
        btn.classList.add("is-selected");btnNext.disabled=false;
      });
      optionsEl.appendChild(btn);
    });
  }
  if(q.type==="multi"){
    const savedIdxs=Array.isArray(saved?.selectedIdxs)?saved.selectedIdxs:[],selected=new Set(savedIdxs);
    const calcScore=()=>[...selected].reduce((sum,idx)=>sum+(q.options[idx]?.value||0),0);
    const updateNextState=()=>{btnNext.disabled=selected.size===0;setAnswer(current,q.axis,calcScore(),[...selected].sort((a,b)=>a-b))};
    q.options.forEach((opt,i)=>{
      const btn=document.createElement("button");
      btn.type="button";btn.className="opt";btn.textContent=opt.text;
      if(selected.has(i))btn.classList.add("is-selected");
      btn.addEventListener("click",()=>{
        const isExclusive=!!q.options[i]?.exclusive;
        if(isExclusive){
          selected.clear();selected.add(i);
          [...optionsEl.querySelectorAll(".opt")].forEach(b=>b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
        }else{
          [...selected].forEach(idx=>{if(q.options[idx]?.exclusive){selected.delete(idx);optionsEl.children[idx]?.classList.remove("is-selected")}});
          selected.has(i)?(selected.delete(i),btn.classList.remove("is-selected")):(selected.add(i),btn.classList.add("is-selected"));
        }
        updateNextState();
      });
      optionsEl.appendChild(btn);
    });
    updateNextState();
  }
  btnPrev.disabled=current===0;
  const canGoNext=q.type==="multi"
    ?(saved&&Array.isArray(saved.selectedIdxs)&&saved.selectedIdxs.length>0)
    :(saved&&typeof saved.value==="number");
  btnNext.disabled=!canGoNext;
  updateProgress();
}

const maxTotalScore=()=>QUESTIONS.reduce((sum,q)=>sum+(q.type==="multi"?4:3),0);
const overallPercent=()=>{const total=answers.reduce((acc,a)=>acc+Number(a?.value||0),0),max=maxTotalScore();return max?clamp(Math.round((total/max)*100),0,100):0};

function typeByPercent(pct){if(pct<15)return"찍먹 클라이머";if(pct<30)return"취미 클라이머";if(pct<45)return"정상 클라이머";if(pct<60)return"클밍 과몰입";if(pct<75)return"클밍 중독자";if(pct<90)return"진성 클친자";return"클친..? 그냥 미친 사람";}

const levelFromTotal=total=>total<=2?1:total<=6?2:total<=10?3:4;

const axisMetaByLevel={
  action:[{tag:"간헐적방문자",hash:"#찍먹중"},{tag:"루틴클라이머",hash:"#이번주암장은어디?"},{tag:"상주형",hash:"#암장으로출근중"},{tag:"암장거주자",hash:"#암장에월세내기"}],
  mental:[{tag:"분리형",hash:"#현생유지중"},{tag:"잔상형",hash:"#이거그립좋은데?"},{tag:"점유형",hash:"#이건핀치…이건슬로퍼…"},{tag:"뇌내완등자",hash:"#헤헤돌이당"}],
  life:[{tag:"취미형",hash:"#취미클라이머"},{tag:"개입형",hash:"#일상에클밍한조각"},{tag:"침식형",hash:"#클밍언제쉬지"},{tag:"생활재편성",hash:"#life_is_climb"}],
  growth:[{tag:"즐겜러",hash:"#클라이밍재밌당"},{tag:"자라나는새싹형",hash:"#잘하고싶다"},{tag:"집착광공",hash:"#클밍중독"},{tag:"벽",hash:"#더이상취미의범주아님"}],
  pain:[{tag:"자기보호형",hash:"#아프면쉬기"},{tag:"관리형",hash:"#아프면살살"},{tag:"무시형",hash:"#의사가뭘알아"},{tag:"연소형",hash:"#디져라_미래의나"}]
};

const axisDescByLevel={
  action:[["가끔 생각날 때만 감","몸은 소중히 챙김"],["주 2~3회는 기본","루틴 만들 줄 앎"],["암장에 출근 도장 찍음","일정이 클밍 중심"],["암장이 집보다 익숙함","쉬는 날? 그게 뭐임"]],
  mental:[["현생이 더 큼","클밍은 필요할 때만"],["일상에서 그립 잔상 옴","벽 보면 손이 먼저 감"],["뇌가 계속 무브 굴림","쓸데없이 밸런스 체크함"],["벽이랑 대화함","손이 홀드를 찾음(무의식)"]],
  life:[["약속이 1순위","클밍은 빈 시간에"],["일정에 클밍 한 칸 넣음","주변 암장 지도 저장함"],["약속을 클밍에 맞춤","연휴=암장 타임"],["생활이 재편성됨","여행도 암장 포함 패키지"]],
  growth:[["즐겜 마인드","완등하면 기분 좋음"],["잘하고 싶어서 슬금슬금 공부","무브 시도는 해봄"],["깔끔병 발동","피드백/분석 자동으로 함"],["눈 돌아감","만족이란 단어를 모름"]],
  pain:[["아프면 쉼","회복을 우선함"],["테이핑/관리하며 탐","무리까진 안 함"],["아픈데도 일단 한 판 더","내일의 나에게 미룸"],["몸 갈아서라도 함","병원은 ‘최후의 선택’"]]
};

const axisMainLineByLevel={
  action:["느긋한 방문러","루틴 적응 중","암장 중심 생활","암장 거주 의심"],
  mental:["현생 우선형","잔상형","점유형","뇌내완등자"],
  life:["취미형","개입형","침식형","생활재편성"],
  growth:["즐겜러","성장 갈망러","집착 광공","벽과 계약함"],
  pain:["자기보호형","관리형","무시형","연소형"]
};

const axisTotal=axis=>answers.filter(a=>a?.axis===axis).reduce((sum,a)=>sum+Number(a?.value??0),0);
const axisLevel=axis=>levelFromTotal(axisTotal(axis));
const axisTagHash=(axis)=>axisMetaByLevel[axis]?.[axisLevel(axis)-1]??{tag:axisKo[axis]||axis,hash:""};
const tagsFromAxes=()=>AXES_5.map(a=>axisTagHash(a).tag);
const hashtagsFromAxes=()=>AXES_5.map(a=>axisTagHash(a).hash).filter(Boolean).join(" ");

const tagHashFromLevel=(axis,lvl)=>axisMetaByLevel[axis]?.[clamp(Number(lvl||1),1,4)-1]??{tag:axisKo[axis]||axis,hash:""};

function descByLevels(levels){
  const safe=AXES_5.map((_,i)=>clamp(Number(levels?.[i]||1),1,4));
  let bestIdx=0;for(let i=1;i<safe.length;i++)if(safe[i]>safe[bestIdx])bestIdx=i;
  const bestAxisKey=AXES_5[bestIdx];
  const main=axisMainLineByLevel[bestAxisKey][safe[bestIdx]-1];
  const sub=AXES_5.flatMap((axis,i)=>axisDescByLevel[axis][safe[i]-1]).join("<br>");
  return {main,sub};
}

let radarChartInstance=null;
function renderRadar(data){
  const canvas=$("radarChart"); if(!canvas||typeof Chart==="undefined") return;
  canvas.width=260; canvas.height=260;

  const labels=AXES_5.map(a=>axisKo[a]);
  if(radarChartInstance) radarChartInstance.destroy();

  radarChartInstance=new Chart(canvas,{
    type:"radar",
    data:{labels,datasets:[{data,borderWidth:2,pointRadius:2}]},
    options:{
      responsive:false,
      animation:false,
      plugins:{legend:{display:false}},
      scales:{r:{min:1,max:4,ticks:{display:false,stepSize:1},grid:{circular:false}}}
    }
  });

  window.radarChartInstance = radarChartInstance;
  try{ radarChartInstance.update("none"); }catch(e){}
}
const resultImgEl = $("resultImg");

function imgByPercent(pct){
  if(pct<15) return "./assets/type_01.png";
  if(pct<30) return "./assets/type_02.png";
  if(pct<45) return "./assets/type_03.png";
  if(pct<60) return "./assets/type_04.png";
  if(pct<75) return "./assets/type_05.png";
  if(pct<90) return "./assets/type_06.png";
  return "./assets/type_07.png";
}
function renderResult(){
  const pct=overallPercent();
  resultPercentEl.textContent=`${pct}%`;scoreBarFillEl.style.width=`${pct}%`;
  resultTypeEl.textContent=typeByPercent(pct);
  if(resultTagsEl){resultTagsEl.innerHTML="";tagsFromAxes().forEach(t=>{const s=document.createElement("span");s.className="tag";s.textContent=t;resultTagsEl.appendChild(s)})}
  const levels=AXES_5.map(a=>axisLevel(a));
  const desc=descByLevels(levels);
  resultDescMainEl.textContent=desc.main;resultDescSubEl.innerHTML = desc.sub;
  resultHashEl.textContent=hashtagsFromAxes();
  requestAnimationFrame(()=>renderRadar(levels));
  resultImgEl.src = imgByPercent(pct);
}

function buildShareUrl(){
  const pct=overallPercent(),type=typeByPercent(pct);
  const payload={p:pct,t:type,lv:AXES_5.map(a=>axisLevel(a))};
  const encoded=btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url=new URL(window.location.href);url.searchParams.set("r",encoded);return url.toString();
}

function tryLoadSharedResult(){
  const url=new URL(window.location.href),r=url.searchParams.get("r");if(!r)return false;
  try{
    const payload=JSON.parse(decodeURIComponent(escape(atob(r))));
    const pct=clamp(payload.p||0,0,100),levels=payload.lv||[];
    resultPercentEl.textContent=`${pct}%`;scoreBarFillEl.style.width=`${pct}%`;
    resultTypeEl.textContent=payload.t||"확정 클친자";
    if(resultTagsEl){resultTagsEl.innerHTML="";AXES_5.forEach((axis,i)=>{const {tag}=tagHashFromLevel(axis,levels[i]);const s=document.createElement("span");s.className="tag";s.textContent=tag;resultTagsEl.appendChild(s)})}
    if(resultHashEl){resultHashEl.textContent=AXES_5.map((axis,i)=>tagHashFromLevel(axis,levels[i]).hash).filter(Boolean).join(" ")}
    const desc=descByLevels(levels);
    resultDescMainEl.textContent=desc.main;resultDescSubEl.innerHTML=desc.sub;
    resultImgEl.src = imgByPercent(pct);
    setScreen("result");requestAnimationFrame(()=>renderRadar(AXES_5.map((_,i)=>clamp(Number(levels?.[i]||1),1,4))));
    return true;
  }catch(e){return false}
}

async function shareLink(){
  const url=buildShareUrl();
  try{if(navigator.share){await navigator.share({title:"클친자 테스트",url});return}}catch(e){}
  try{await navigator.clipboard.writeText(url);alert("결과 링크 복사 완료 🔗")}catch(e){prompt("🔗",url)}
}

async function wait2Frames(){
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
}

function dataUrlToImageEl(dataUrl, w=260, h=260){
  const img = document.createElement("img");
  img.src = dataUrl;
  img.width = w;
  img.height = h;
  img.style.width = w+"px";
  img.style.height = h+"px";
  img.style.display = "block";
  return img;
}
async function saveCard916(){
  const live=document.querySelector("#screenResult .result-card");
  if(!live||typeof html2canvas==="undefined") return alert("저장 기능 준비가 안 됨!");
  const prevOverflow=document.body.style.overflow;document.body.style.overflow="hidden";

  const FRAME_W=1080,FRAME_H=1920,PAD_TOP=180,PAD_SIDE=48,PAD_BOTTOM=80,BASE_W=560;
  const bg=getComputedStyle(document.body).backgroundColor||"#fff";
  const bgImg=getComputedStyle(document.querySelector(".card"))?.backgroundImage||"none";

  const frame=document.createElement("div");
  Object.assign(frame.style,{
    position:"fixed",left:"0",top:"0",
    width:FRAME_W+"px",height:FRAME_H+"px",
    boxSizing:"border-box",
    padding:`${PAD_TOP}px ${PAD_SIDE}px ${PAD_BOTTOM}px`,
    backgroundColor:bg,backgroundImage:bgImg,
    display:"flex",alignItems:"flex-start",justifyContent:"center",
    pointerEvents:"none",transform:"translateX(-200vw)"
  });

  const card=live.cloneNode(true);
  card.querySelectorAll(".result-nav,.nav,button").forEach(el=>el.remove());
  card.classList.add("is-export");

  const img=card.querySelector("#resultImg");
  if(img){img.style.marginTop="10px";}

  Object.assign(card.style,{
    width:BASE_W+"px",maxWidth:BASE_W+"px",margin:"0",
    transformOrigin:"center top",
    padding:"18px",
    overflow:"visible"
  });

  const summary=card.querySelector(".result-summary");
  if(summary){summary.style.marginLeft="-10px";summary.style.maxWidth="100%";}

  const scoreRow=card.querySelector(".score-row");
  const scoreVal=card.querySelector(".score-value");
  if(scoreRow){scoreRow.style.marginBottom="10px";scoreRow.style.alignItems="center";scoreRow.style.gap="10px";}
  if(scoreVal){scoreVal.style.minWidth="72px";scoreVal.style.textAlign="right";scoreVal.style.flex="0 0 auto";}

  const hash=card.querySelector("#resultHash");
  if(hash){
    hash.style.maxWidth="100%";
    hash.style.overflowWrap="anywhere";
    hash.style.wordBreak="break-word";
    hash.style.marginTop="6px";
    hash.style.marginBottom="12px";
    hash.style.lineHeight="1.6";
  }

  const midRow=card.querySelector(".result-row.mid");
  if(midRow){
    midRow.style.marginTop="48px";
    midRow.style.gridTemplateColumns="320px 1fr";
    midRow.style.gap="12px";
  }

  const chartWrap=card.querySelector(".result-chart");
  if(chartWrap){
    chartWrap.style.transform="scale(1.12)";
    chartWrap.style.transformOrigin="left center";
  }

  const tagsCol=card.querySelector("#resultTags");
  if(tagsCol){
    tagsCol.style.justifyItems="end";
    tagsCol.style.alignContent="flex-start";
    tagsCol.style.gap="10px";

    tagsCol.querySelectorAll(".tag").forEach(t=>{
      const raw=(t.textContent||"").trim();
      if(!t.querySelector(".tag-txt")){
        t.textContent="";
        const s=document.createElement("span");
        s.className="tag-txt";
        s.textContent=raw;
        t.appendChild(s);
      }

      t.style.width="150px";
      t.style.height="42px";
      t.style.padding="0";
      t.style.display="grid";
      t.style.placeItems="center";
      t.style.lineHeight="1";

      const s=t.querySelector(".tag-txt");
      if(s){
        s.style.display="block";
        s.style.maxWidth="132px";
        s.style.whiteSpace="nowrap";
        // s.style.overflow="hidden";
        s.style.textOverflow="ellipsis";
        s.style.textAlign="center";
        s.style.lineHeight="1";
      }
    });
  }

  const desc=card.querySelector(".result-desc");
  if(desc){desc.style.marginTop="40px";desc.style.marginBottom="32px";}

  if(window.radarChartInstance){
    try{window.radarChartInstance.update("none");}catch(e){}
    const chartImg=new Image();
    chartImg.src=window.radarChartInstance.toBase64Image();
    chartImg.style.width="260px";
    chartImg.style.height="260px";
    chartImg.style.display="block";
    const c=card.querySelector("#radarChart");
    if(c) c.replaceWith(chartImg);
  }

  frame.appendChild(card);
  document.body.appendChild(frame);

  try{
    try{await document.fonts.ready;}catch(e){}
    const imgs=[...frame.querySelectorAll("img")];
    await Promise.all(imgs.map(img=>img.complete?Promise.resolve():new Promise(res=>{img.onload=res;img.onerror=res;})));
    await new Promise(r=>requestAnimationFrame(r));

    const pctText=(card.querySelector("#resultPercent")?.textContent||"0%").trim();
    const pct=Math.max(0,Math.min(100,parseInt(pctText,10)||0));
    const bar=card.querySelector(".score-bar");
    const fill=card.querySelector("#scoreBarFill");
    if(bar&&fill){
      bar.style.width="100%";
      bar.style.boxSizing="border-box";
      bar.style.overflow="hidden";
      const bw=Math.max(1,bar.getBoundingClientRect().width||420);
      fill.style.width=Math.round(bw*(pct/100))+"px";
      fill.style.height="100%";
      fill.style.display="block";
      fill.style.background="rgb(17,17,17)";
      fill.style.backgroundImage="none";
      fill.style.borderRadius="999px";
      fill.style.maxWidth="100%";
    }

    const innerW=FRAME_W-PAD_SIDE*2;
    const innerH=FRAME_H-PAD_TOP-PAD_BOTTOM;
    const h=card.scrollHeight;
    const w=card.offsetWidth;
    const scale=Math.min(innerW/w,innerH/h);
    card.style.transform=`scale(${scale})`;

    await new Promise(r=>requestAnimationFrame(r));

    const canvas=await html2canvas(frame,{
      width:FRAME_W,height:FRAME_H,scale:1,
      backgroundColor:bg,useCORS:true,allowTaint:true,logging:false
    });

    const a=document.createElement("a");
    a.href=canvas.toDataURL("image/png");
    a.download="climbing_result_9x16.png";
    a.click();
  }finally{
    frame.remove();
    document.body.style.overflow=prevOverflow;
  }
}
btnSaveCard?.addEventListener("click",saveCard916);

btnStart?.addEventListener("click",()=>{setScreen("quiz");current=0;renderQuestion()});
btnPrev?.addEventListener("click",()=>{if(current===0)return;current-=1;renderQuestion()});
btnNext?.addEventListener("click",()=>{if(current>=QUESTIONS.length-1){setScreen("result");renderResult();return}current+=1;renderQuestion()});
btnResetTop?.addEventListener("click",resetAll);
btnRestart?.addEventListener("click",()=>{const url=new URL(window.location.href);url.searchParams.delete("r");window.history.replaceState({},"",url.toString());resetAll()});
btnShareLink?.addEventListener("click",shareLink);

if(!tryLoadSharedResult())setScreen("start");
