const modal = document.querySelector("#toolModal");
const title = document.querySelector("#toolTitle");
const content = document.querySelector("#toolContent");

const tools = {
  calculator: {
    title: "Calculator",
    html: `<div class="form-row"><input id="calcInput" class="big-input" placeholder="e.g. (12 × 4) + 8" autocomplete="off"><button class="primary" id="calcGo">Calculate</button></div><div class="result" id="calcResult">Your answer will appear here.</div>`
  },
  timer: {
    title: "Study Timer",
    html: `<div class="timer-display" id="timerDisplay">05:00</div><div class="form-row"><input id="timerMinutes" class="big-input" type="number" min="1" max="180" value="5" aria-label="Minutes"><button class="primary" id="timerStart">Start</button></div><div class="center" style="margin-top:12px"><button class="primary" id="timerReset">Reset</button></div>`
  },
  random: {
    title: "Random Picker",
    html: `<textarea id="randomInput" class="big-input" placeholder="Put one option per line..."></textarea><button class="primary" id="randomGo" style="margin-top:12px">Pick one</button><div class="result" id="randomResult">Waiting for options.</div>`
  },
  counter: {
    title: "Word Counter",
    html: `<textarea id="countInput" class="big-input" placeholder="Start typing or paste your work..."></textarea><div class="counter"><span id="words">0 words</span><span id="chars">0 characters</span></div>`
  }
};

function openTool(name){
  const tool = tools[name]; if(!tool) return;
  title.textContent = tool.title; content.innerHTML = tool.html;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  if(name==="calculator") setupCalculator();
  if(name==="timer") setupTimer();
  if(name==="random") setupRandom();
  if(name==="counter") setupCounter();
}
function closeTool(){
  modal.classList.remove("open"); modal.setAttribute("aria-hidden","true");
}
document.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>openTool(b.dataset.tool)));
document.querySelectorAll("[data-close-tool]").forEach(b=>b.addEventListener("click",closeTool));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeTool()});

function setupCalculator(){
  const input=document.querySelector("#calcInput"), result=document.querySelector("#calcResult");
  const go=()=>{ try {
    const safe=input.value.replace(/×/g,"*").replace(/÷/g,"/");
    if(!/^[0-9+*/().%\\s-]+$/.test(safe)) throw new Error();
    const answer=Function('"use strict"; return ('+safe+')')();
    if(!Number.isFinite(answer)) throw new Error();
    result.textContent=String(answer);
  } catch { result.textContent="Please enter a valid calculation."; }};
  document.querySelector("#calcGo").addEventListener("click",go);
  input.addEventListener("keydown",e=>{if(e.key==="Enter")go()});
}
function setupTimer(){
  let remaining=300, interval=null;
  const display=document.querySelector("#timerDisplay"), mins=document.querySelector("#timerMinutes");
  const render=()=>{let m=Math.floor(remaining/60),s=remaining%60;display.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`};
  document.querySelector("#timerStart").onclick=()=>{
    if(interval)return;
    if(remaining<=0) remaining=Math.max(60,Number(mins.value||5)*60);
    interval=setInterval(()=>{remaining--;render();if(remaining<=0){clearInterval(interval);interval=null;document.querySelector("#timerStart").textContent="Start";}},1000);
    document.querySelector("#timerStart").textContent="Pause";
  };
  document.querySelector("#timerStart").addEventListener("click",()=>{ if(interval){clearInterval(interval);interval=null;document.querySelector("#timerStart").textContent="Start"}});
  document.querySelector("#timerReset").onclick=()=>{clearInterval(interval);interval=null;remaining=Math.max(60,Number(mins.value||5)*60);render();document.querySelector("#timerStart").textContent="Start"};
  mins.oninput=()=>{if(!interval){remaining=Math.max(60,Number(mins.value||5)*60);render()}};
  render();
}
function setupRandom(){
  document.querySelector("#randomGo").onclick=()=>{
    const options=document.querySelector("#randomInput").value.split(/\n/).map(x=>x.trim()).filter(Boolean);
    document.querySelector("#randomResult").textContent=options.length?options[Math.floor(Math.random()*options.length)]:"Add at least one option.";
  };
}
function setupCounter(){
  const input=document.querySelector("#countInput"), words=document.querySelector("#words"), chars=document.querySelector("#chars");
  const update=()=>{const text=input.value.trim();words.textContent=`${text?text.split(/\s+/).length:0} words`;chars.textContent=`${input.value.length} characters`};
  input.addEventListener("input",update);update();
}
