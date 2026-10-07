const NAME = "Akshu";
// Get a free key at https://web3forms.com (enter YOUR email, they send the key to it), paste it below.
const ACCESS_KEY = "5dc9077a-9f04-48f4-9a4c-c645fe7566c4";
let noClicks = 0;

// Love score per choice (0 = distant, 3 = very close). Edit freely.
const SCORES = {"Sleepy kiss":3,"Burnt toast":2,"The note":1,"River walk":2,"Cloud bed":3,"The cafe":2,
 "Door banter":1,"River dip":2,"Warm bubbles":3,"Tourist us":1,"Treehouse disco":2,"Total chaos":3,
 "Window seat":2,"Hold tight":3,"Sore feet":1,"Campfire":2,"Warm cottage":1,"Rooftop stars":3,
 "Pillow wall":1,"Cuddles":3,"Slow kisses":3};
function lovePercent(){
  const total = memories.reduce((a,x)=>a+(SCORES[x.m]||0),0);
  return Math.min(96, 55 + Math.round(total/21*41));   // 55% to 96%, never a full 100
}
function verdict(p){
  if(p>=90) return "Denial detected. Your heart already said yes, babygirl.";
  if(p>=78) return "So close, buggu. One more date and it's official.";
  if(p>=66) return "Warming up nicely, my baccha. I'm patient.";
  return "Hmm, a tough crowd. I'll just have to try harder.";
}

function notify(subject, message){
  if(!ACCESS_KEY) return;
  fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},
    body:JSON.stringify({access_key:ACCESS_KEY,subject,from_name:"Adventure Date",message})}).catch(()=>{});
}
const summary = () => memories.map((x,i)=>`${i+1}. ${x.e} ${x.m}`).join("\n");
// Put YOUR WhatsApp number with country code, digits only (e.g. 919876543210)
const HIS_NUMBER = "91XXXXXXXXXX";
let answer = "She is still thinking...";
const memories = [];
let prev = "";

const scenes = [
 { bg:"dawn", title:"Good morning, buggu",
   text:"We woke up in a treehouse, high above a misty mountain valley. I'm awake. You're still asleep, hair a mess, one foot out of the blanket. What do I do?",
   choices:[
    {e:"💋",t:"A forehead kiss to wake you up",m:"Sleepy kiss",r:"You woke up with a smile you tried to hide. 'Five more minutes,' you said, but you pulled me closer instead."},
    {e:"🍳",t:"Make your breakfast",m:"Burnt toast",r:"The toast burned. You ate it anyway and called it 'rustic'. Verdict: I'm hired as your breakfast guy."},
    {e:"🌄",t:"Sneak out to enjoy the view alone",m:"The note",r:"I left a note. You found me ten minutes later wearing the blanket like a cape. 'You left me alone?' Never again, babygirl."}]},
 { bg:"morning", title:"The valley is awake",
   text:"Birds, soft light, and the smell of pine. Where does the morning take us?",
   choices:[
    {e:"🌊",t:"Walk to the river",m:"River walk",r:"We walked barefoot to the river. You pretended not to hold my hand. Your hand disagreed."},
    {e:"☁️",t:"Lie on the cloud bed and watch the sunrise",m:"Cloud bed",r:"We lay on the cloud bed while sun rays fell across your face. I forgot the sunrise existed. I watched you instead."},
    {e:"☕",t:"Visit the little cafe nearby",m:"The cafe",r:"A tiny cafe with two chairs and one blanket. We shared one cup. Not because there was one cup. Just because."}]},
 { bg:"water", title:"Time to freshen up",
   text:"We're a little messy and very happy. How do we freshen up?",
   choices:[
    {e:"🚿",t:"Shower separately",m:"Door banter",r:"You sang loudly behind the door. Badly. I will never say anything. (I'm saving this forever.)"},
    {e:"🏞️",t:"Take a dip in the river together",m:"River dip",r:"The water was freezing. You screamed, then splashed me. That's an act of war, my baccha."},
    {e:"🛁",t:"Relax in the jacuzzi together",m:"Warm bubbles",r:"Warm water, bubbles up to your chin. You said 'don't look at me' and I said 'impossible'."}]},
 { bg:"noon", title:"Midday mood",
   text:"The whole day is ours and nobody is watching the clock. What now?",
   choices:[
    {e:"🏯",t:"Visit a nearby tourist spot",m:"Tourist us",r:"We took a hundred photos. Ninety were of you. Ten were of you looking at me looking at you."},
    {e:"🎶",t:"Stay in the treehouse: talk, sing, dance",m:"Treehouse disco",r:"We sang the wrong lyrics and danced on creaky floors. A bird judged us from the window."},
    {e:"✨",t:"Do something random",m:"Total chaos",secret:true,r:"You said 'do something random', so we raced to the nearest tree. You cheated. You always cheat. I love it."}]},
 { bg:"road", title:"Somewhere new",
   text:"The sun is turning gold. How do we get to the next adventure?",
   choices:[
    {e:"🚕",t:"Book a cab and wander",m:"Window seat",r:"You slept on my shoulder in the cab. I told the driver to take the longer road."},
    {e:"🏍️",t:"Take a bike ride",m:"Hold tight",r:"'Hold on tight,' I said. You held on so tight I could hardly breathe. Perfect."},
    {e:"🥾",t:"Go for a trek",m:"Sore feet",r:"We trekked up. You complained. You were also the one who wanted to keep going. Foot massage owed."}]},
 { bg:"night", title:"The night is cold",
   text:"The stars are out and the valley is dark and quiet. Where do we spend the night?",
   choices:[
    {e:"⛺",t:"Camp outside in the cold",m:"Campfire",r:"One tent, one fire, one blanket. You said 'I'm not cold.' Your teeth said otherwise."},
    {e:"🏡",t:"Go back to the cottage",m:"Warm cottage",r:"Back in the warmth, with soft lights and hot soup. You fell asleep on the couch with your feet in my lap."},
    {e:"🌌",t:"Rooftop with hot chocolate and stargazing",m:"Rooftop stars",r:"Lanterns, hot chocolate, and a question game. You asked me 'Do you like me?' I said 'Ask me again later.'"}]},
 { bg:"end", title:"The last scene",
   text:"The day is almost over. How do we end it?",
   choices:[
    {e:"🛏️",t:"Sleep separately",m:"Pillow wall",r:"Two separate beds. For ten minutes. Then I heard footsteps and a very quiet 'I'm cold.' Sure you are."},
    {e:"🫂",t:"Cuddle till we fall asleep",m:"Cuddles",r:"Your head on my chest, my arm around you. You said it was only for warmth. I let you have it."},
    {e:"😘",t:"Slow kisses while cuddling",m:"Slow kisses",r:"Slow kisses, quiet laughs, and your hand in my hair. The kind of kiss that makes time stop."}]}
];

const $ = id => document.getElementById(id);
const show = id => ["landing","scene","finale"].forEach(s => $(s).classList.toggle("hidden", s !== id));

function renderScene(i){
  const s = scenes[i];
  document.body.dataset.bg = s.bg;
  const dots = scenes.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join("");
  $("scene").innerHTML = `<div class="dots">${dots}</div>
    ${prev ? `<p class="beat">${prev}</p>` : ""}
    <h2>${s.title}</h2><p class="text">${s.text}</p>
    <div class="choices">${s.choices.map((c,k)=>`<button class="choice${c.secret?' secret':''}" data-k="${k}"><span class="e">${c.e}</span><span>${c.t}</span></button>`).join("")}</div>`;
  $("scene").style.animation = "none"; void $("scene").offsetWidth; $("scene").style.animation = "";
  $("scene").querySelectorAll(".choice").forEach(b => b.onclick = () => {
    const c = s.choices[b.dataset.k];
    memories.push({e:c.e === "✨" ? "🎲" : c.e, m:c.m});
    prev = c.r;
    i + 1 < scenes.length ? renderScene(i + 1) : renderFinale();
  });
}

function renderFinale(){
  document.body.dataset.bg = "end";
  show("finale");
  notify("Akshu finished the adventure date", "Her choices:\n"+summary());
  $("finale").innerHTML = `<p class="beat">${prev}</p>
    <h2>This day has been saved</h2>
    <div class="strip">${memories.map(x=>`<div class="polaroid"><b>${x.e}</b>${x.m}</div>`).join("")}</div>
    <p class="msg">${NAME}, my baccha, this was only a make-believe day, but every part of it was real to me. I just wanted you to smile, and to know that I'd pick you in every version of this story.</p>
    <p class="msg">Now, one last thing. A report on your feelings for me:</p>
    <p>Likes me: <b>100%</b></p><div class="meter"><span id="m1" style="width:100%"></span></div>
    <p>Loves me: <b id="pct">0%</b> </p><div class="meter"><span id="m2"></span></div><p class="msg" id="verdict"></p>
    <p class="msg">Do you love me yet, buggu?</p>
    <div class="row"><button id="yes" class="btn big">Yes 💗</button><button id="no" class="btn">Not yet</button></div>
    <p class="saved" id="out"></p>`;
  setTimeout(()=>{ const L=lovePercent(); $("m2").style.width=L+"%"; let n=0; const t=setInterval(()=>{ $("pct").textContent=(++n)+"%"; if(n>=L){ clearInterval(t); $("verdict").textContent=verdict(L); } },28); },400);
  const no = $("no"); const run = () => { noClicks++; answer = "Tried to say not yet, but the button ran away 😜"; no.style.position="absolute"; no.style.left=Math.random()*60+"%"; no.style.top=Math.random()*60+"px"; no.textContent=["Not yet","Really?","Think again","Nope, caught you"][Math.floor(Math.random()*4)]; };
  no.onmouseenter = run; no.onclick = run; no.ontouchstart = e => { e.preventDefault(); run(); };
  $("yes").onclick = () => { notify("Akshu said YES 💗", "Love score: "+lovePercent()+"%\nShe said yes after trying 'Not yet' "+noClicks+" time(s).\n\nHer choices:\n"+summary()); answer = "Yes, I love you 💗"; $("out").textContent = "I Knew it, babygirl. 💗"; $("yes").disabled = true; };
  $("send").onclick = () => {
    const msg = `Our adventure date, saved 💌\n\n` + memories.map((x,k)=>`${k+1}. ${x.e} ${x.m}`).join("\n") + `\n\nDo I love you yet? ${answer}\n- ${NAME}`;
    window.open(`https://wa.me/${HIS_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };
}
 
$("start").onclick = () => { show("scene"); renderScene(0); };