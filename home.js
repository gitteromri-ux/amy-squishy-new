/* ====================================================================
   AMY SQUISHY — HOME · engine (Maison Squish)
   ==================================================================== */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- data ---------- */
var CATS=[
 {id:"needoh",n:"נידו",img:"sq-001",t:"#F3DCE6"},
 {id:"butter",n:"ספוג / חמאה",img:"sq-027",t:"#F6EAC9"},
 {id:"orbiz",n:"אורביז",img:"sq-053",t:"#D7ECF5"},
 {id:"food",n:"אוכל וחטיפים",img:"sq-039",t:"#F6DEC9"},
 {id:"eyepop",n:"מוציא עיניים",img:"sq-015",t:"#E7DCF5"},
 {id:"animals",n:"בעלי חיים",img:"sq-057",t:"#F6E3CE"},
 {id:"chars",n:"דמויות וגיבורים",img:"sq-065",t:"#D9E2F5"},
 {id:"water",n:"סקווישי מים",img:"sq-022",t:"#D7ECF5"},
 {id:"ice",n:"סקווישי קרח",img:"sq-025",t:"#E0EFF5"},
 {id:"sand",n:"סקווישי חול",img:"sq-019",t:"#F3E7C9"},
 {id:"sticky",n:"דביק / הזרקה",img:"sq-070",t:"#F5D9E2"},
 {id:"kawaii",n:"קוואי",img:"sq-076",t:"#F5DAEA"},
 {id:"popup",n:"פופ-אפ ופידג'ט",img:"sq-078",t:"#F5EBC4"},
 {id:"mini",n:"מיני",img:"sq-080",t:"#F3DCE6"},
 {id:"giant",n:"ענק ופרימיום",img:"sq-083",t:"#E6DCF5"}
];
/* clean picks — each image clearly matches a single product */
var FEAT=[
 {img:"sq-004",n:"נידו דאמפלינג ענקי",p:49.9,b:"רב מכר",t:"#F6E3D2"},
 {img:"sq-057",n:"נידו קפיברה ענק",p:54.9,b:"רב מכר",t:"#F3EAD8"},
 {img:"sq-001",n:"תינוק נידו ביישן",p:12.9,b:"רב מכר",fast:true,t:"#F5DEE8"},
 {img:"sq-027",n:"ספוג חמאה זהב",p:19.9,b:"רב מכר",t:"#F7EDCB"},
 {img:"sq-025",n:"דאמפלינג קרח-מים מנצנץ",p:28.9,b:"רב מכר",t:"#DEEFF6"},
 {img:"sq-015",n:"ארנב נידו עיניים בולטות",p:15.9,b:"רב מכר",t:"#EADEF6"},
 {img:"sq-050",n:"נידו מנגו פרימיום",p:29.9,b:"פרימיום",t:"#F7EAD0"},
 {img:"sq-060",n:"נידו פנדה ביישנית",p:24.9,t:"#EDEDEF"},
 {img:"sq-039",n:"המבורגר נידו",p:28.9,t:"#F6E6CE"},
 {img:"sq-070",n:"פופ אפ תות דובי ורוד",p:12.9,fast:true,t:"#F5DEE8"}
];
var money=function(p){return "₪"+(Math.round(p*100)/100).toFixed(2);};
var imgUrl=function(id){return (window.__resources&&window.__resources[id])||('assets/products/'+id+'.webp');};

/* ---------- categories: premium slider ---------- */
(function(){
 var el=$('#catTrack');if(!el)return;
 el.innerHTML=CATS.map(function(c,i){
  var no=('0'+(i+1)).slice(-2);
  return '<a href="shop.html#'+c.id+'" class="fs-item cat-card"><div class="cat-thumb" style="--tint:'+c.t+'"><span class="cat-idx">'+no+'</span><img src="'+imgUrl(c.img)+'" alt=""></div>'+
   '<div class="body"><h3>'+c.n+'</h3><span class="go">לצפייה בדגמים ←</span></div></a>';
 }).join('');
}());

/* ---------- featured products ---------- */
(function(){
 var el=$('#featTrack');if(!el)return;
 el.innerHTML=FEAT.map(function(p){
  return '<div class="fs-item prod-card"><div class="prod-media" style="--tint:'+p.t+'">'+
   (p.b?'<span class="pbadge">'+p.b+'</span>':'')+
   (p.fast?'<span class="pfast">אקספרס</span>':'')+
   '<img src="'+imgUrl(p.img)+'" alt="'+p.n+'"></div>'+
   '<div class="prod-body"><h3>'+p.n+'</h3><div class="prod-meta"><span class="price">'+money(p.p)+'</span></div>'+
   '<button class="add" aria-label="הוספה לעגלה"><span class="cartico">🛒</span> הוספה לעגלה</button></div></div>';
 }).join('');
}());

/* ---------- marquee ---------- */
(function(){
 var el=$('#kmar');if(!el)return;
 var words=['סקווישי','רוגע','איימי','לחיצה','כיף','אושר'];
 var html='';for(var k=0;k<3;k++){html+=words.map(function(w,i){return '<span'+(i%2?' class="o"':'')+'>'+w+'</span>';}).join('');}
 el.innerHTML=html;
}());

/* ---------- slider engine ---------- */
function initSlider(root){
 var track=$('.fs-track',root),fill=$('.fs-bar i',root),
     prev=$('[data-prev]',root),next=$('[data-next]',root);
 function update(){
  if(!fill)return;var max=track.scrollWidth-track.clientWidth,
   p=max>4?Math.min(1,Math.abs(track.scrollLeft)/max):0,
   frac=Math.min(1,track.clientWidth/track.scrollWidth);
  fill.style.width=(frac*100)+'%';fill.style.marginRight=(p*(1-frac)*100)+'%';
 }
 track.addEventListener('scroll',function(){requestAnimationFrame(update);},{passive:true});
 window.addEventListener('resize',update);setTimeout(update,80);
 function step(d){track.scrollBy({left:d*track.clientWidth*0.82,behavior:'smooth'});}
 if(next)next.addEventListener('click',function(){step(-1);});
 if(prev)prev.addEventListener('click',function(){step(1);});
 var down=false,sx=0,sl=0,moved=0;
 track.addEventListener('pointerdown',function(e){if(e.pointerType==='touch')return;down=true;moved=0;sx=e.clientX;sl=track.scrollLeft;track.classList.add('dragging');});
 window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));track.scrollLeft=sl-dx;});
 window.addEventListener('pointerup',function(){if(!down)return;down=false;track.classList.remove('dragging');update();});
 track.addEventListener('click',function(e){if(moved>6){e.preventDefault();e.stopPropagation();}},true);
}
$$('[data-slider]').forEach(initSlider);

/* ---------- count-up ---------- */
(function(){
 var nums=$$('.snum[data-count]');if(!nums.length)return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;io.unobserve(e.target);
  var el=e.target,to=+el.getAttribute('data-count'),t0=null,dur=1200;
  if(reduce){el.textContent=to;return;}
  el.classList.add('counting');setTimeout(function(){el.classList.remove('counting');},650);
  (function tick(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/dur),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=v;if(k<1)requestAnimationFrame(tick);})(performance.now());
 });},{threshold:.5});
 nums.forEach(function(n){io.observe(n);});
}());

/* ---------- add to cart ---------- */
var count=0;
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('.add');if(!a)return;
 e.preventDefault();count++;
 var n=$('#cartN');if(n){n.textContent=count;n.classList.add('pop');setTimeout(function(){n.classList.remove('pop');},300);}
 var dot=$('.tab .dot');if(dot)dot.textContent=count;
 a.style.transform='scale(.8)';setTimeout(function(){a.style.transform='';},170);
 if(reduce)return;
 var r=a.getBoundingClientRect(),c=$('#cartN').getBoundingClientRect(),s=document.createElement('span');
 s.textContent='♥';s.style.cssText='position:fixed;z-index:200;left:'+(r.left+r.width/2)+'px;top:'+r.top+'px;font-size:18px;color:#E8889E;pointer-events:none;transition:transform .6s cubic-bezier(.4,0,.2,1),opacity .6s;transform:translate(-50%,-50%)';
 document.body.appendChild(s);
 requestAnimationFrame(function(){s.style.transform='translate('+(c.left-r.left-r.width/2+c.width/2)+'px,'+(c.top-r.top+c.height/2)+'px) scale(.4)';s.style.opacity='0';});
 setTimeout(function(){s.remove();},650);
});

/* ---------- squish playground (juicy: rainbow + celebration) ---------- */
(function(){
 var sq=$('#squishy'),c=$('#squishCount'),n=0,hue=0;if(!sq)return;
 var img=sq.querySelector('img');
 if(c)c.style.transition='transform .2s cubic-bezier(.2,.9,.25,1.7)';
 function pop(){
  sq.classList.add('squishing','touched');clearTimeout(sq._t);
  sq._t=setTimeout(function(){sq.classList.remove('squishing');},160);
  n++;if(c){c.textContent=n;c.style.transform='scale(1.4)';setTimeout(function(){c.style.transform='';},200);}
  hue=(hue+42)%360;if(img)img.style.setProperty('--hue',hue+'deg');
  if(reduce)return;
  var r=sq.getBoundingClientRect();
  celebrate(r.left+r.width/2,r.top+r.height*0.42,n%10===0?28:14);
 }
 sq.addEventListener('pointerdown',function(e){e.preventDefault();pop();});
}());

/* ---------- topbar ---------- */
(function(){var tb=$('#topbar');if(!tb)return;window.addEventListener('scroll',function(){
 tb.style.background=window.scrollY>40?'rgba(242,235,221,.92)':'rgba(242,235,221,.72)';
},{passive:true});}());

/* ---------- juicy celebration burst (hearts + stars + sparkles) ---------- */
var PARTS=['♥','★','✦','♥','✿','●'];
var PCOL=['#E8889E','#7FC4DD','#FF6FA0','#BFEFD2','#F7B5C4','#FFD56B'];
function celebrate(x,y,power){
 if(reduce)return;
 var n=power||14;
 for(var k=0;k<n;k++){(function(){
  var s=document.createElement('span');
  s.textContent=PARTS[Math.floor(Math.random()*PARTS.length)];
  var col=PCOL[Math.floor(Math.random()*PCOL.length)];
  var sz=11+Math.random()*18;
  s.style.cssText='position:fixed;z-index:240;pointer-events:none;color:'+col+';font-size:'+sz+'px;left:'+x+'px;top:'+y+'px;transform:translate(-50%,-50%);will-change:transform,opacity;text-shadow:0 0 8px '+col+'66';
  document.body.appendChild(s);
  var ang=Math.random()*Math.PI*2, dist=50+Math.random()*120, dx=Math.cos(ang)*dist, dy=Math.sin(ang)*dist-60-Math.random()*60, rot=(Math.random()-.5)*220, dur=700+Math.random()*600;
  s.animate([
   {transform:'translate(-50%,-50%) translate(0,0) scale(.3) rotate(0deg)',opacity:1},
   {transform:'translate(-50%,-50%) translate('+dx+'px,'+dy+'px) scale('+(0.8+Math.random()*0.8)+') rotate('+rot+'deg)',opacity:1,offset:.7},
   {transform:'translate(-50%,-50%) translate('+(dx*1.2)+'px,'+(dy+90)+'px) scale(.5) rotate('+(rot*1.4)+'deg)',opacity:0}
  ],{duration:dur,easing:'cubic-bezier(.2,.7,.3,1)'});
  setTimeout(function(){s.remove();},dur);
 })();}
}

/* (interactions removed from shop products, categories & hero — kept only in dedicated fun folds) */

/* ---------- whatsapp chat ---------- */
(function(){
 var fab=$('#waFab'),panel=$('#waPanel'),close=$('#waClose'),body=$('#waBody');if(!fab||!panel)return;
 fab.addEventListener('click',function(){panel.classList.toggle('open');});
 if(close)close.addEventListener('click',function(){panel.classList.remove('open');});
 var ANS={
  'איזה דגם הכי נמכר?':'הדאמפלינג נידו הענק והקפיברה הם הלהיטים הכי גדולים שלנו! 🩷',
  'מתי המשלוח מגיע?':'משלוח רגיל 14-21 ימי עסקים, ויש 6 דגמים באקספרס תוך 4 ימים בלבד ⚡',
  'יש קוד הנחה?':"בטח! הזינו גיטה'לה בתשלום ל-15% הנחה על כל האתר 🎁"
 };
 document.addEventListener('click',function(e){
  var q=e.target.closest&&e.target.closest('.wa-q');if(!q||!body.contains(q))return;
  var quick=q.parentElement;
  var me=document.createElement('div');me.className='wa-msg me';me.textContent=q.textContent;
  body.insertBefore(me,quick);
  var ans=ANS[q.textContent]||"איימי תחזור אליכם בוואטסאפ ממש עוד רגע 🩷";
  setTimeout(function(){var b=document.createElement('div');b.className='wa-msg bot';b.textContent=ans;body.insertBefore(b,quick);body.scrollTop=body.scrollHeight;},520);
  body.scrollTop=body.scrollHeight;
 });
}());

/* ---------- FUN 1: SQUISH-O-METER (hold to squish, jelly physics) ---------- */
(function(){
 var pad=$('#squoPad'),img=$('#squoImg'),fill=$('#squoFill'),hint=$('#squoHint'),res=$('#squoResult');
 if(!pad)return;
 var holding=false,level=0,raf=null,maxed=false;
 var REWARD={img:'sq-057',n:'נידו קפיברה ענק'};
 function setSquish(t){ // t 0..1 jelly compression
  var sx=1+t*0.34, sy=1-t*0.30; // squash & stretch
  img.style.transform='scale('+sx.toFixed(3)+','+sy.toFixed(3)+')';
  fill.style.width=Math.round(level*100)+'%';
 }
 function loop(){
  if(maxed){ level=1; setSquish(1); raf=null; return; } // locked full at max
  if(holding){ level=Math.min(1,level+0.022); }
  else { level=Math.max(0,level-0.05); }
  // springy easing for visual squish
  setSquish(level);
  if(holding && level>=1 && !maxed){ maxed=true; reward(); raf=null; return; }
  if(holding || level>0){ raf=requestAnimationFrame(loop); } else { raf=null; img.style.transform=''; }
 }
 function start(e){ if(e&&e.cancelable)e.preventDefault(); if(maxed)return; holding=true; pad.classList.add('squishing'); if(hint)hint.style.opacity='0'; if(!raf)raf=requestAnimationFrame(loop); }
 function end(){ holding=false; pad.classList.remove('squishing'); if(!raf)raf=requestAnimationFrame(loop); }
 function reward(){
  pad.classList.add('pop');
  var r=pad.getBoundingClientRect();celebrate(r.left+r.width/2,r.top+r.height*0.35,34);
  if(res){res.hidden=false;res.innerHTML='<span class="squo-kick">לחצתם למקסימום! 🎉</span>'+
   '<span class="squo-prize">קוד מתנה ללחיצה המושלמת</span>'+
   '<span class="squo-code"><b>גיטה׳לה</b> — 15% הנחה על כל האתר</span>'+
   '<button class="squo-again" type="button">ללחוץ שוב ↺</button>';}
  holding=false;
 }
 pad.addEventListener('pointerdown',start);
 window.addEventListener('pointerup',end);
 pad.addEventListener('pointercancel',end);
 pad.addEventListener('pointerleave',function(){ if(!maxed)end(); });
 if(res){res.addEventListener('click',function(e){ if(e.target.closest('.squo-again')){ maxed=false;level=0;img.style.transform='';if(fill)fill.style.width='0%';res.hidden=true;pad.classList.remove('pop');if(hint)hint.style.opacity=''; } });}
}());

/* ---------- FUN 2: color the squishy ---------- */
/* ---------- FUN 2: squishy finder quiz ---------- */
(function(){
 var card=$('#quizCard');if(!card)return;
 var QS=[
  {q:'מה הוייב שלכם היום?',o:[['רגוע ושליו',0],['משחקי ושמח',1],['מתוק ומפנק',2]]},
  {q:'איזה גודל מתחשק?',o:[['מיני לאיסוף',0],['בינוני קלאסי',1],['ענק ומפנק',2]]},
  {q:'איזה צבע מושך אתכם?',o:[['ורוד רך',0],['תכלת רגוע',1],['צבעוני ופופ',2]]}
 ];
 var step=0,score=0;
 function render(){
  if(step<QS.length){
   var Q=QS[step];
   card.innerHTML='<div class="quiz-prog">שאלה '+(step+1)+' מתוך '+QS.length+'</div>'+
    '<h3 class="quiz-q">'+Q.q+'</h3>'+
    '<div class="quiz-opts">'+Q.o.map(function(o,i){return '<button class="quiz-opt" type="button" data-v="'+o[1]+'">'+o[0]+'</button>';}).join('')+'</div>';
  } else {
   var p=FEAT[(score)%FEAT.length];
   card.innerHTML='<div class="quiz-result"><span class="qr-kick">ההתאמה שלכם 🩷</span>'+
    '<div class="qr-media"><img src="'+imgUrl(p.img)+'" alt="'+p.n+'"></div>'+
    '<h3 class="qr-name">'+p.n+'</h3>'+
    '<div class="qr-price">'+money(p.p)+'</div>'+
    '<button class="qr-add add" type="button" aria-label="הוספה לעגלה"><span class="cartico">🛒</span> הוספה לעגלה</button>'+
    '<button class="qr-again" type="button">לבוחן מחדש ↺</button></div>';
   var r=card.getBoundingClientRect();celebrate(r.left+r.width/2,r.top+r.height*0.34,22);
  }
 }
 card.addEventListener('click',function(e){
  var opt=e.target.closest('.quiz-opt');
  if(opt){score+=(+opt.getAttribute('data-v'))*(step+1);step++;render();return;}
  if(e.target.closest('.qr-again')){step=0;score=0;render();return;}
 });
 render();
}());

/* ---------- FUN 3: BLIND BAG MYSTERY REVEAL ---------- */
(function(){
 var bag=$('#blindBag'),out=$('#blindReveal');if(!bag||!out)return;
 // wide pool from the catalog for variety
 var POOL=['sq-057','sq-001','sq-015','sq-039','sq-070','sq-076','sq-022','sq-019','sq-080','sq-082','sq-045'];
 // map ids to FEAT names/prices where known, else generic
 function info(id){
  for(var i=0;i<FEAT.length;i++){if(FEAT[i].img===id)return FEAT[i];}
  var names={'sq-076':'קוואי דובי ורוד','sq-022':'סקווישי מים נוצץ','sq-019':'סקווישי חול רך','sq-080':'מיני תות מתוק','sq-082':'ביצים פרצופים','sq-045':'אפוני נידו מצחיק'};
  var prices={'sq-076':14.9,'sq-022':22.9,'sq-019':18.9,'sq-080':11.9,'sq-082':13.9,'sq-045':15.9};
  return {img:id,n:names[id]||'סקווישי מפתיע',p:prices[id]||19.9};
 }
 var opened=false;
 bag.addEventListener('click',function(){
  if(opened){reset();return;}
  opened=true;bag.classList.add('opening');
  setTimeout(function(){
   var id=POOL[Math.floor(Math.random()*POOL.length)],p=info(id);
   bag.classList.add('torn');
   out.hidden=false;
   out.innerHTML='<div class="br-burst" aria-hidden="true"></div>'+
    '<div class="br-media"><img src="'+imgUrl(p.img)+'" alt="'+p.n+'"></div>'+
    '<span class="br-kick">קיבלתם 🎉</span>'+
    '<h3 class="br-name">'+p.n+'</h3>'+
    '<div class="br-price">'+money(p.p)+'</div>'+
    '<div class="br-actions">'+
      '<a class="br-buy" href="shop.html">לקנייה בחנות ←</a>'+
      '<button class="br-again" type="button">פתחו עוד שקית ↺</button>'+
    '</div>';
   var r=out.getBoundingClientRect();celebrate(r.left+r.width/2,r.top+r.height*0.32,30);
   void out.offsetWidth;out.classList.add('show');
  },560);
  out.addEventListener('click',function(e){if(e.target.closest('.br-again'))reset();},{once:false});
 });
 function reset(){opened=false;bag.classList.remove('opening','torn');out.classList.remove('show');out.hidden=true;out.innerHTML='';}
}());

/* ---------- FUN 4: make your own squishy from a photo ---------- */
(function(){
 var input=$('#makeInput'),canvas=$('#makeCanvas'),ph=$('#makePlaceholder'),load=$('#makeLoading'),save=$('#makeSave');
 if(!input||!canvas)return;
 var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
 // Real 3D squishy-toy template (transparent PNG): pink glossy body + ears, with a
 // cream face-window in the middle. We composite the user's face INTO that window so
 // the genuine rendered gloss/shadow/ears wrap their photo -> looks molded, not pasted.
 var TPL=new Image(); var tplReady=false;
 TPL.onload=function(){tplReady=true;};
 TPL.src='assets/img/squishy-template.png';
 // Face-window position inside the template (fractions, measured from the render)
 var FW={cx:0.485, cy:0.555, rx:0.232, ry:0.250};
 function squishify(photo){
  ctx.clearRect(0,0,W,H);
  // template is square; fit it centered into the canvas
  var S=Math.min(W,H), ox=(W-S)/2, oy=(H-S)/2;
  var cx=ox+FW.cx*S, cy=oy+FW.cy*S, rx=FW.rx*S, ry=FW.ry*S;
  // 1) paint the user's face into the cream window, masked to a soft oval
  ctx.save();
  ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);ctx.closePath();ctx.clip();
  // cover-fit the photo into the oval, framing the upper-face a touch higher
  var ratio=Math.max((rx*2)/photo.width,(ry*2)/photo.height)*1.04;
  var pw=photo.width*ratio, pdh=photo.height*ratio;
  ctx.filter='saturate(1.06) brightness(1.05) contrast(.97)';
  ctx.drawImage(photo, cx-pw/2, cy-pdh/2-ry*0.02, pw, pdh);
  ctx.filter='none';
  // warm cream tint so skin reads like the toy's material
  ctx.fillStyle='rgba(255,228,205,.16)';ctx.fillRect(cx-rx,cy-ry,rx*2,ry*2);
  // inner-rim shadow -> the face sinks INTO the molded window (kills the pasted seam)
  var rg=ctx.createRadialGradient(cx,cy-ry*0.12,Math.min(rx,ry)*0.55,cx,cy,Math.max(rx,ry)*1.04);
  rg.addColorStop(0,'rgba(120,70,40,0)');rg.addColorStop(.66,'rgba(120,70,40,0)');rg.addColorStop(1,'rgba(120,70,45,.50)');
  ctx.fillStyle=rg;ctx.fillRect(cx-rx,cy-ry,rx*2,ry*2);
  // soft top sheen across the face so it shares the toy's glossy light
  var tl=ctx.createLinearGradient(0,cy-ry,0,cy+ry*0.3);
  tl.addColorStop(0,'rgba(255,255,255,.30)');tl.addColorStop(.5,'rgba(255,255,255,0)');
  ctx.fillStyle=tl;ctx.fillRect(cx-rx,cy-ry,rx*2,ry*2);
  ctx.restore();
  // 2) draw the real toy template ON TOP -> its glossy edge laps over the face oval,
  //    blending the photo into the molded cream rim, plus real ears + body + shadow.
  if(tplReady){ ctx.drawImage(TPL, ox, oy, S, S); }
  // 3) a faint specular catchlight on the face glass to match the toy's sheen
  ctx.save();ctx.globalAlpha=.18;
  var sg=ctx.createRadialGradient(cx-rx*0.4,cy-ry*0.46,1,cx-rx*0.4,cy-ry*0.46,rx*0.26);
  sg.addColorStop(0,'#fff');sg.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=sg;ctx.beginPath();ctx.ellipse(cx-rx*0.4,cy-ry*0.46,rx*0.26,ry*0.16,-0.5,0,Math.PI*2);ctx.fill();ctx.restore();
 }
 var lastPhoto=null;
 function run(photo){
  lastPhoto=photo;
  function draw(){
   squishify(photo);
   if(ph)ph.classList.add('hide');
   if(load)load.classList.remove('show');
   canvas.classList.remove('empty');
   try{if(save){save.href=canvas.toDataURL('image/png');save.hidden=false;}}catch(err){}
   var r=canvas.getBoundingClientRect();celebrate(r.left+r.width/2,r.top+r.height*0.4,22);
  }
  setTimeout(draw,420);
 }
 input.addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  if(load)load.classList.add('show');
  var fr=new FileReader();
  fr.onload=function(){var img=new Image();img.onload=function(){run(img);};img.src=fr.result;};
  fr.readAsDataURL(f);
 });
 // tap to squish the result
 canvas.addEventListener('pointerdown',function(){
  if(canvas.classList.contains('empty'))return;
  canvas.classList.add('squish');clearTimeout(canvas._t);
  canvas._t=setTimeout(function(){canvas.classList.remove('squish');},160);
  var r=canvas.getBoundingClientRect();celebrate(r.left+r.width/2,r.top+r.height*0.4,8);
 });
 canvas.classList.add('empty');
}());

/* ---------- reveal ---------- */
(function(){
 var reveals=$$('.reveal');
 function showAll(){reveals.forEach(function(el){el.classList.add('in');});}
 if(!('IntersectionObserver' in window)){showAll();return;}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.06,rootMargin:'0px 0px -6% 0px'});
 reveals.forEach(function(el){io.observe(el);});
 function inView(){var h=window.innerHeight||document.documentElement.clientHeight;reveals.forEach(function(el){if(el.getBoundingClientRect().top<h*0.97)el.classList.add('in');});}
 requestAnimationFrame(inView);
 window.addEventListener('scroll',inView,{passive:true});
 window.addEventListener('load',inView);
 setTimeout(showAll,1500);
}());

/* ---------- PREMIUM MOTION LAYER ---------- */
(function(){
 if(reduce)return;

 /* 1. scroll progress bar */
 var bar=document.createElement('div');bar.className='scroll-prog';bar.setAttribute('aria-hidden','true');
 document.body.appendChild(bar);
 var ticking=false;
 function onScroll(){
  if(ticking)return;ticking=true;
  requestAnimationFrame(function(){
   var st=window.pageYOffset||document.documentElement.scrollTop;
   var h=(document.documentElement.scrollHeight-window.innerHeight)||1;
   bar.style.transform='scaleX('+Math.min(1,Math.max(0,st/h))+')';
   ticking=false;
  });
 }
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();

 /* 2. stagger indices for reveal-group children */
 $$('.reveal-group').forEach(function(g){
  Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty('--si',i);});
 });

 /* 3. DESKTOP-ONLY GSAP scroll-telling (hero parallax). Mobile stays pure CSS. */
 var isDesktop=window.matchMedia('(min-width:900px) and (pointer:fine)').matches;
 if(!isDesktop)return;
 var s=document.createElement('script');
 s.src='https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
 s.onload=function(){
  var st=document.createElement('script');
  st.src='https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
  st.onload=initGsap;document.head.appendChild(st);
 };
 s.onerror=function(){};
 document.head.appendChild(s);

 function initGsap(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  /* hero background gentle parallax */
  var heroImg=document.querySelector('.hero-bg img');
  if(heroImg){
   gsap.to(heroImg,{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
  }
  /* hero copy lifts slightly slower than scroll */
  var heroCopy=document.querySelector('.hero-copy');
  if(heroCopy){
   gsap.to(heroCopy,{yPercent:-8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
  }
  /* owner portrait subtle parallax if present */
  var ownerImg=document.querySelector('.owner-sec img');
  if(ownerImg){
   gsap.fromTo(ownerImg,{yPercent:8},{yPercent:-8,ease:'none',scrollTrigger:{trigger:'.owner-sec',start:'top bottom',end:'bottom top',scrub:.8}});
  }
 }
}());

})();
