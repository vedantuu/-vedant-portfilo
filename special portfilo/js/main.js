/* ===== EDIT YOUR CONTENT HERE ===== */
const CONFIG={linkedin:"",github:"",email:"",resume:"",location:""}; // leave "" until you add real values
const SKILLS=[
 {t:"Programming Languages",i:["[Add language]"]},
 {t:"Web Development",i:["[Add skill]"]},
 {t:"Databases",i:["[Add skill]"]},
 {t:"Developer Tools",i:["[Add tool]"]},
 {t:"Operating Systems & Security",i:["[Add skill]"]}
];
const PROJECTS=[
 {n:"Project one (example)",d:"Describe your project here. This is a placeholder, not a finished project.",s:["Tech A","Tech B"],gh:"",live:""},
 {n:"Project two (example)",d:"Add what you built, why, and what you learned.",s:["Tech C"],gh:"",live:""}
];
/* ================================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const chips=a=>a.map(x=>`<span class="tag">${esc(x)}</span>`).join("");
$("#yr").textContent=new Date().getFullYear();

/* intro */
const intro=$("#intro");document.body.style.overflow="hidden";
function closeIntro(){intro.classList.add("gone");document.body.style.overflow="";}
$("#skip").onclick=closeIntro;$$("[data-enter]").forEach(a=>a.addEventListener("click",closeIntro));
if(matchMedia("(prefers-reduced-motion:reduce)").matches)closeIntro();
addEventListener("keydown",e=>{if(e.key==="Escape"){closeIntro();closeActive()}});

/* nav */
const nav=$("#nav"),links=$("#links"),burger=$("#burger");
burger.onclick=()=>{const o=links.classList.toggle("open");burger.setAttribute("aria-expanded",o);burger.textContent=o?"✕":"☰"};
$$("#links a").forEach(a=>a.onclick=()=>{links.classList.remove("open");burger.textContent="☰"});
const secs=$$("main section");
addEventListener("scroll",()=>{
 nav.classList.toggle("sc",scrollY>40);$("#top").classList.toggle("v",scrollY>600);
 let cur="home";secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});
 $$("#links a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+cur));
},{passive:true});
$("#top").onclick=()=>scrollTo({top:0});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
$$(".rv").forEach(el=>io.observe(el));

/* rotating roles */
const roles=["IT Student","Aspiring Developer","Technology Enthusiast","Creative Problem Solver"];let ri=0,ci=0,del=false;
(function type(){const w=roles[ri],el=$("#role");el.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(type,del?40:80)})();

/* clock */
setInterval(()=>$("#clock").textContent=new Date().toLocaleTimeString(),1000);$("#clock").textContent=new Date().toLocaleTimeString();

/* contact links (only real values) */
const contactLinks=[["LinkedIn",CONFIG.linkedin],["GitHub",CONFIG.github],["Email",CONFIG.email&&"mailto:"+CONFIG.email]].filter(x=>x[1]);
const contactHtml=contactLinks.length?contactLinks.map(([n,h])=>`<a class="btn" href="${esc(h)}" target="_blank" rel="noopener">${n}</a>`).join(""):`<p class="note">Contact links aren't set yet. Add your LinkedIn, GitHub and email in CONFIG at the top of the script.</p>`;
$("#contactBtns").innerHTML=contactHtml;

/* skills + projects */
$("#skillCards").innerHTML=SKILLS.map(s=>`<div class="card"><h3>${esc(s.t)}</h3>${chips(s.i)}</div>`).join("");
$("#projCards").innerHTML=PROJECTS.map((p,i)=>`<button class="card proj" data-i="${i}"><div class="pv">preview image</div><h3>${esc(p.n)}</h3><p style="color:var(--mut)">${esc(p.d)}</p>${chips(p.s)}</button>`).join("");
const dlg=$("#dlg");
$$(".proj").forEach(b=>b.onclick=()=>{const p=PROJECTS[b.dataset.i];
 $("#dlgBody").innerHTML=`<h3>${esc(p.n)}</h3><p style="color:var(--mut);margin:10px 0">${esc(p.d)}</p>${chips(p.s)}<div style="margin-top:14px">${p.gh?`<a class="btn ghost" href="${esc(p.gh)}" target="_blank" rel="noopener">GitHub</a> `:""}${p.live?`<a class="btn ghost" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo</a>`:""}${!p.gh&&!p.live?`<p class="note">No links added yet.</p>`:""}</div>`;dlg.showModal()});
$("#dlgClose").onclick=()=>dlg.close();

/* desktop OS */
const APPS={
 about:["📄","About me",`<h3>Vedant Unadkat</h3><p>BSc IT Hons · </p><p></p><p>I'm interested in programming, technology and learning by building projects.</p>`],
 projects:["📁","My projects",`<h3>Projects</h3>${PROJECTS.map(p=>`<p><b style="color:var(--tx)">${esc(p.n)}</b><br>${esc(p.d)}<br>${chips(p.s)}</p>`).join("")}<p class="note">Example entries until you add real ones.</p>`],
 skills:["⚙️","Skills",`<h3>Skills</h3>${SKILLS.map(s=>`<p><b style="color:var(--tx)">${esc(s.t)}</b><br>${chips(s.i)}</p>`).join("")}`],
 education:["🎓","Education",`<h3>Education</h3><p>BSc IT Hons, </p><p>Enrollment: 2405101200042</p><p class="note">Add your institution name in the page source.</p>`],
 resume:["📋","Resume",CONFIG.resume?`<h3>Resume</h3><a class="btn" href="${esc(CONFIG.resume)}" target="_blank" rel="noopener">Open resume</a>`:`<h3>Resume</h3><p>My resume will be added here soon. Set CONFIG.resume to the file path once you have it.</p>`],
 contact:["✉️","Contact",`<h3>Contact</h3>${CONFIG.location?`<p>Location: ${esc(CONFIG.location)}</p>`:""}<div class="cta">${contactHtml}</div>`]
};
const os=$("#os"),icons=$("#icons"),dock=$("#dock");let zi=5,order=[];
Object.entries(APPS).forEach(([k,[ic,name,html]],n)=>{
 icons.insertAdjacentHTML("beforeend",`<button class="ic" data-k="${k}"><span>${ic}</span>${name}</button>`);
 os.insertAdjacentHTML("beforeend",`<div class="win" id="w-${k}" role="dialog" aria-label="${name}" style="left:${150+n*28}px;top:${50+n*22}px"><div class="wh"><span class="mono">${name}</span><button aria-label="Close ${name}" data-x="${k}">✕</button></div><div class="wb">${html}</div></div>`)});
function focusWin(k){$$(".win").forEach(w=>w.classList.remove("act"));const w=$("#w-"+k);w.classList.add("act");w.style.zIndex=++zi;order=order.filter(x=>x!==k).concat(k);drawDock()}
function openWin(k){$("#w-"+k).classList.add("open");focusWin(k)}
function closeWin(k){$("#w-"+k).classList.remove("open","act");order=order.filter(x=>x!==k);drawDock();if(order.length)focusWin(order[order.length-1])}
function closeActive(){if(order.length)closeWin(order[order.length-1])}
function drawDock(){dock.innerHTML=order.map(k=>`<button data-d="${k}" class="${$("#w-"+k).classList.contains("act")?"act":""}">${APPS[k][1]}</button>`).join("")}
icons.onclick=e=>{const b=e.target.closest(".ic");if(b)openWin(b.dataset.k)};
dock.onclick=e=>{const b=e.target.closest("[data-d]");if(b)focusWin(b.dataset.d)};
os.addEventListener("click",e=>{const x=e.target.closest("[data-x]");if(x)return closeWin(x.dataset.x);const w=e.target.closest(".win");if(w)focusWin(w.id.slice(2))});

/* ===== extra animation layer ===== */
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(pointer:fine)").matches;
addEventListener("scroll",()=>{$("#prog").style.transform=`scaleX(${scrollY/((document.documentElement.scrollHeight-innerHeight)||1)})`},{passive:true});
$$("h2.rv").forEach(h=>{h.innerHTML=h.textContent.split(" ").map((w,i)=>`<span class="w" style="transition-delay:${i*.09}s">${w}</span>`).join(" ")});
$("#mq").innerHTML=Array(4).fill("<span>   ✦ Aspiring Developer ✦ Technology Enthusiast ✦ Creative Problem Solver ✦</span>").join("");
/* code rain */
const cv=$("#fx"),cx=cv.getContext("2d");let drops=[];
function sz(){cv.width=innerWidth;cv.height=innerHeight;drops=Array.from({length:Math.ceil(innerWidth/20)},()=>Math.random()*-40)}
sz();addEventListener("resize",sz);
const chars="01{}<>/;=+*#VU";let last=0;
function rain(t){requestAnimationFrame(rain);if(document.hidden||t-last<70)return;last=t;
 cx.fillStyle="rgba(5,5,5,.14)";cx.fillRect(0,0,cv.width,cv.height);cx.font="14px Consolas,monospace";
 drops.forEach((y,i)=>{cx.fillStyle=Math.random()<.04?"#FFE2A8":"#ff1744";cx.fillText(chars[Math.random()*chars.length|0],i*20,y*20);drops[i]=(y*20>cv.height&&Math.random()>.97)?0:y+1})}
if(!rm)requestAnimationFrame(rain);
/* cursor, tilt, magnetic */
if(fine&&!rm){const c=$("#cur");let x=0,y=0,tx=0,ty=0;
 addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;c.style.opacity=1});
 (function m(){x+=(tx-x)*.18;y+=(ty-y)*.18;c.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(m)})();
 document.addEventListener("pointerover",e=>c.classList.toggle("h",!!e.target.closest("a,button,.card")));
 document.addEventListener("pointermove",e=>{const c2=e.target.closest(".card");$$(".card").forEach(k=>{if(k!==c2)k.style.transform=""});
  if(c2){const r=c2.getBoundingClientRect();c2.style.transform=`perspective(700px) rotateX(${-((e.clientY-r.top)/r.height-.5)*10}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*10}deg) translateY(-4px)`}});
 $$(".btn").forEach(b=>{b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.2}px ${(e.clientY-r.top-r.height/2)*.3}px`});b.addEventListener("pointerleave",()=>b.style.translate="")})}
/* VU-bot mascot */
const bot=$("#bot"),bub=$("#bub");
function say(t){bub.textContent=t;bub.classList.add("on");clearTimeout(say.t);say.t=setTimeout(()=>bub.classList.remove("on"),3800)}
const MSG={home:"Hi, I'm VU-bot! Welcome to Vedant's digital world.",desktop:"Click an icon. Windows open like a real desktop!",story:"Vedant learns best by building things.",skills:"These skills are placeholders until he adds his own.",projects:"Click a card to open its details.",education:"BSc IT Hons, .",beyond:"Always exploring what's next.",contact:"Say hello. He'd love to hear from you!"};
const TIPS=["Move your mouse. My eyes follow it!","Press Esc to close windows.","Use the dock to switch between windows.","Tap me again for another tip."];let ti=0,seen="";
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.id!==seen&&intro.classList.contains("gone")){seen=e.target.id;say(MSG[seen])}}),{rootMargin:"-45% 0px -45% 0px"}).observe&&secs.forEach(s=>0);
const mio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.id!==seen&&intro.classList.contains("gone")){seen=e.target.id;say(MSG[seen])}}),{rootMargin:"-45% 0px -45% 0px"});
secs.forEach(s=>mio.observe(s));
intro.addEventListener("transitionend",()=>{seen="home";say(MSG.home)},{once:true});
bot.onclick=()=>{say(TIPS[ti++%TIPS.length]);bot.classList.remove("jump");void bot.offsetWidth;bot.classList.add("jump")};
addEventListener("pointermove",e=>{const r=bot.getBoundingClientRect(),a=Math.atan2(e.clientY-r.y-r.height/2,e.clientX-r.x-r.width/2);$$(".pp").forEach(p=>p.style.transform=`translate(${Math.cos(a)*3}px,${Math.sin(a)*3}px)`)},{passive:true});
/* cube parallax */
const cube=$("#cube");
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)addEventListener("pointermove",e=>{cube.style.translate=`${(e.clientX/innerWidth-.5)*30}px ${(e.clientY/innerHeight-.5)*30}px`},{passive:true});
