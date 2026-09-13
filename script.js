const screens = [...document.querySelectorAll(".screen")];
const hearts = document.getElementById("hearts");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  if(id === "reveal") startNameReveal();
}

function makeHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = ["♥","♡","✦","✨"][Math.floor(Math.random()*4)];
  h.style.left = Math.random()*100 + "%";
  h.style.fontSize = (12 + Math.random()*20) + "px";
  h.style.animationDuration = (5 + Math.random()*5) + "s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(makeHeart, 700);

document.getElementById("openBtn").onclick = () => {
  show("reveal");
  try { music.volume=.35; music.play(); musicBtn.textContent="♫"; } catch(e){}
};

musicBtn.onclick = () => {
  if(music.paused){music.play();musicBtn.textContent="♫";}
  else{music.pause();musicBtn.textContent="🔇";}
};

function startNameReveal(){
  const el=document.getElementById("nameReveal");
  const letters=["P","PR","PRE","PREM"];
  el.textContent="";
  letters.forEach((x,i)=>setTimeout(()=>el.textContent=x,i*500));
}

document.querySelectorAll(".next").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.next || "final"));
});

const photos=[
  ["prem1.jpg","This smile 🥹"],
["prem2.jpg","Just you being you. ✨"],
["prem3.jpg","Looking good, birthday boy! 😌"],
["prem4.jpg","And one more favourite… ❤️"]
];
let photoIndex=0;
const img=document.getElementById("memoryImg");
const caption=document.getElementById("caption");
const dots=document.getElementById("dots");

function renderDots(){
  dots.innerHTML=photos.map((_,i)=>`<span class="dot ${i===photoIndex?"active":""}"></span>`).join("");
}
renderDots();

document.getElementById("photoNext").onclick=()=>{
  photoIndex=(photoIndex+1)%photos.length;
  img.style.opacity=0;
  setTimeout(()=>{
    img.src=photos[photoIndex][0];
    caption.textContent=photos[photoIndex][1];
    img.style.opacity=1;
    renderDots();
  },180);
};

const openLetter=document.getElementById("openLetter");
openLetter.onclick=()=>{
  document.getElementById("envelope").classList.add("open");
  openLetter.classList.add("hidden");
  setTimeout(()=>{
    document.getElementById("letterBox").classList.add("show");
    typeText("wish1","Wishing my sweet boy a very Happy Birthday! ❤️",0);
    typeText("wish2","May all your dreams and wishes come true. ✨",700);
    typeText("wish3","May you always keep smiling and keep shining. 🫶🏻",1400);
    setTimeout(()=>document.getElementById("letterNext").classList.remove("hidden"),3000);
  },600);
};

function typeText(id,text,delay){
  setTimeout(()=>{
    const el=document.getElementById(id);
    let i=0;
    const timer=setInterval(()=>{
      el.textContent += text[i++] || "";
      if(i>=text.length) clearInterval(timer);
    },25);
  },delay);
}

document.getElementById("letterNext").onclick=()=>show("final");

document.getElementById("wishBtn").onclick=()=>{
  document.querySelector(".flame").style.display="none";
  document.getElementById("wishBtn").classList.add("hidden");
  document.getElementById("wishComplete").classList.remove("hidden");
  for(let i=0;i<28;i++) setTimeout(makeHeart,i*60);
};
