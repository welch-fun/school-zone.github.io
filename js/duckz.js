const games=[
 {name:"Duck Dash",icon:"🦆",desc:"Dodge the puddles.",url:"../games/duck-dash/index.html"},
 {name:"Memory",icon:"🧠",desc:"Find the matching pairs.",url:"../games/memory/index.html"},
 {name:"Duck Pong",icon:"🏓",desc:"Classic paddle chaos.",url:"../games/pong/index.html"},
 {name:"Click Duck",icon:"👆",desc:"How fast can you quack?",url:"../games/click-duck/index.html"},
 {name:"Math Rush",icon:"➗",desc:"Solve before time runs out.",url:"../games/math-rush/index.html"},
 {name:"Reaction",icon:"⚡",desc:"Test your reflexes.",url:"../games/reaction/index.html"}
];
const grid=document.querySelector("#gameGrid"),overlay=document.querySelector("#gameOverlay"),frame=document.querySelector("#gameFrame"),title=document.querySelector("#frameTitle");
games.forEach(g=>{
 const b=document.createElement("button"); b.className="game-card";
 b.innerHTML=`<div class="game-art">${g.icon}</div><div class="game-name">${g.name}</div><div class="game-desc">${g.desc}</div>`;
 b.onclick=()=>openGame(g);grid.appendChild(b);
});
function openGame(g){title.textContent=g.name;frame.src=g.url;overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeGame(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");setTimeout(()=>frame.src="",260);document.body.style.overflow=""}
document.querySelector("#closeGame").onclick=closeGame;
overlay.querySelector(".game-shade").onclick=closeGame;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&overlay.classList.contains("open"))closeGame()});
