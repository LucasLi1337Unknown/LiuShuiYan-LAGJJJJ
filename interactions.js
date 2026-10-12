"use strict";
function chooseBudgetMenu(people,budget,flavor="all"){
  const cats=["荤菜","素菜","汤","凉菜","甜品","饮品"];
  const target=people<=4?6:people<=8?8:10;
  const items=[];let spent=0;
  for(const cat of cats){
    const pool=DISHES.filter(d=>d.cat===cat).sort((a,b)=>a.price-b.price);
    const d=pool[0];if(d&&spent+d.price<=budget){items.push(d);spent+=d.price;}
  }
  const pool=DISHES.filter(d=>!items.includes(d)).sort((a,b)=>{
    const fit=d=>flavor==="all"?0:(d.tags.join("")+d.desc).includes(flavor)?1:0;
    return fit(b)-fit(a)||Math.random()-.5;
  });
  for(const d of pool)if(items.length<target&&spent+d.price<=budget){items.push(d);spent+=d.price;}
  return {items,spent,target};
}
let voteTotals={},voteBusy=false,quizState=null;
const votedDishes=new Set(readJSON("lsy_voted_dishes_v1",[]));
function addChosenMenu(items){
  if(cartEntries().length&&!confirm("这会替换当前菜篮里的菜，确定继续吗？"))return false;
  state.cart={};items.forEach(d=>state.cart[d.id]=1);saveCart();renderCart();openCart();return true;
}
async function loadPopularity(){
  const c=cloudConfig();if(!c){$("#voteStatus").textContent="投票暂未连接";return;}
  try{
    const totals={};let start=0;
    while(true){const r=await fetch(c.SUPABASE_URL+"/rest/v1/dish_votes?select=dish_id&order=dish_id&offset="+start+"&limit=1000",{headers:cloudHeaders(c)});if(!r.ok)throw Error();const rows=await r.json();rows.forEach(x=>totals[x.dish_id]=(totals[x.dish_id]||0)+1);if(rows.length<1000)break;start+=rows.length;}
    voteTotals=totals;renderPopularity();$("#voteStatus").textContent="大家共享的票数 · 每个浏览器每道菜可投一次";
  }catch(e){$("#voteStatus").textContent="票数读取失败，请点击刷新重试";}
}
function renderPopularity(){
  const sorted=[...DISHES].sort((a,b)=>(voteTotals[b.id]||0)-(voteTotals[a.id]||0));
  $("#popularityList").innerHTML=sorted.map((d,i)=>'<div class="vote-row"><span class="vote-rank">'+(i+1)+'</span><img src="assets/menu/'+IMAGE_FILES[d.id]+'" alt="'+esc(d.name)+'" loading="lazy"><div><b>'+esc(d.name)+'</b><small>'+(voteTotals[d.id]||0)+' 票</small></div><button class="btn btn-outline" data-vote="'+d.id+'" '+(votedDishes.has(d.id)?'disabled':'')+'>'+(votedDishes.has(d.id)?'已投票':'投一票')+'</button></div>').join("");
}
async function voteDish(id){
  if(voteBusy||votedDishes.has(id)||!dishById(id))return;const c=cloudConfig();if(!c)return;
  voteBusy=true;const b=document.querySelector('[data-vote="'+id+'"]');b.disabled=true;
  try{const r=await fetch(c.SUPABASE_URL+"/rest/v1/dish_votes",{method:"POST",headers:cloudHeaders(c,{"Content-Type":"application/json",Prefer:"return=minimal"}),body:JSON.stringify({dish_id:id,device_id:getDeviceId()})});if(!r.ok&&r.status!==409)throw Error();votedDishes.add(id);writeJSON("lsy_voted_dishes_v1",[...votedDishes]);toast(r.status===409?"这道菜已经投过啦":"投票成功！");await loadPopularity();}
  catch(e){b.disabled=false;toast("投票失败，请稍后重试");}finally{voteBusy=false;}
}
function startFoodQuiz(){
  const pool=[...DISHES].sort(()=>Math.random()-.5).slice(0,5);
  quizState={pool,index:0,score:0,answered:false};renderFoodQuiz();
}
function renderFoodQuiz(){
  const q=quizState;if(!q)return;
  if(q.index===q.pool.length){const title=q.score===5?"流水宴美食家":q.score>=3?"识菜小能手":"潜力试吃员";const best=Math.max(readJSON("lsy_quiz_best",0),q.score);writeJSON("lsy_quiz_best",best);$("#foodQuiz").innerHTML='<h3>'+title+' 🎉</h3><p>答对 '+q.score+' / 5 道 · 本机最高 '+best+' / 5</p><button class="btn btn-primary" id="quizRestart">再挑战一次</button>';$("#quizRestart").onclick=startFoodQuiz;return;}
  const d=q.pool[q.index];const choices=[d,...DISHES.filter(x=>x.id!==d.id).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
  q.answered=false;$("#foodQuiz").innerHTML='<p>第 '+(q.index+1)+' / 5 题 · 看图片猜菜名</p><img class="quiz-photo" src="assets/menu/'+IMAGE_FILES[d.id]+'" alt="猜猜这道菜叫什么"><div class="quiz-options">'+choices.map(x=>'<button class="btn btn-outline" data-answer="'+x.id+'">'+esc(x.name)+'</button>').join("")+'</div><p id="quizFeedback" aria-live="polite"></p><button id="quizNext" class="btn btn-primary" hidden>下一题</button>';
  $("#quizNext").onclick=()=>{q.index++;renderFoodQuiz();};
}
function answerFoodQuiz(id){const q=quizState;if(!q||q.answered)return;q.answered=true;const correct=q.pool[q.index];if(id===correct.id)q.score++;$$("[data-answer]").forEach(b=>{b.disabled=true;if(b.dataset.answer===correct.id)b.classList.add("correct-answer");});$("#quizFeedback").textContent=(id===correct.id?"答对啦！":"正确答案是："+correct.name)+" "+correct.desc;$("#quizNext").hidden=false;}
document.addEventListener("DOMContentLoaded",()=>{
  const hub=document.createElement("section");hub.className="section-shell interaction-hub";hub.id="playground";
  hub.innerHTML=`<div class="section-head"><div><div class="section-label">07 / 流水宴互动馆</div><h2>选一席好菜，<br><em>玩一点花样。</em></h2></div><p>测口味、投人气、猜菜名，让这一席有你的参与。</p></div><div class="interaction-grid"><article class="interaction-card"><h3>你的口味是哪一派？</h3><form id="tasteForm"><label>最想吃的味道<select name="flavor"><option value="清爽">清爽鲜甜</option><option value="酸甜">酸甜开胃</option><option value="浓香">浓香过瘾</option><option value="家常">温暖家常</option></select></label><label>聚餐最期待什么？<select name="occasion"><option value="朋友">和朋友分享</option><option value="家人">家常团聚</option><option value="尝鲜">尝试新味道</option></select></label><label>最后想来一口？<select name="ending"><option value="甜品">甜品</option><option value="饮品">清茶或饮品</option></select></label><button class="btn btn-primary">揭晓我的菜单</button></form><div id="tasteResult" aria-live="polite"></div></article><article class="interaction-card"><h3>中华美食挑战</h3><p>五道图片题，看看你是不是美食家。</p><div id="foodQuiz"><button class="btn btn-primary" id="quizStart">开始挑战</button></div></article></div><article class="interaction-card popularity-card"><div class="section-head"><div><h3>谁是流水宴人气王？</h3><p id="voteStatus" aria-live="polite">正在读取票数…</p></div><button class="btn btn-outline" id="refreshVotes">刷新票数</button></div><div id="popularityList" class="popularity-list"></div></article>`;
  document.querySelector(".newsletter").before(hub);
  const budget=document.createElement("label");budget.className="budget-control";budget.innerHTML='整桌预算（元）<input id="tableBudget" type="number" min="1" max="100000" step="1" value="300"><small>按课堂参考价配菜，每道一份；份量仅供展示。</small>';
  $("#autoPlan").before(budget);$("#autoPlan").textContent="按预算配一桌 ✦";
  $("#autoPlan").onclick=()=>{
    const amount=Number($("#tableBudget").value);if(!Number.isFinite(amount)||amount<1||amount>100000){toast("请输入 1 到 100000 元的预算");return;}
    const result=chooseBudgetMenu(state.people,amount);
    if(!result.items.length){toast("预算还不够一道菜，请提高预算");return;}
    if(!addChosenMenu(result.items))return;
    $("#plannerPreview>p").textContent='为 '+state.people+' 位选了 '+result.items.length+' 道，总计 ¥'+result.spent+'，人均约 ¥'+(result.spent/state.people).toFixed(1)+'。'+(result.items.length<result.target?'预算较低，未凑齐建议菜数。':'');
  };
  const nameLabel=document.createElement("label");nameLabel.className="banquet-name";nameLabel.innerHTML='给这一席起个名字<input id="banquetName" maxlength="30" placeholder="例如：七人八口抢鸭席"><button type="button" class="text-button" id="randomBanquetName">帮我起一个 ✦</button>';
  $("#menuCardContent").after(nameLabel);$("#banquetName").value=readJSON("lsy_banquet_name","");
  $("#banquetName").oninput=e=>writeJSON("lsy_banquet_name",e.target.value);
  $("#randomBanquetName").onclick=()=>{const names=["同窗抢鸭席","一桌好菜不散场","今天我请菜单买单","流水有意干饭有力","七人八口欢乐席"];$("#banquetName").value=names[Math.floor(Math.random()*names.length)];writeJSON("lsy_banquet_name",$("#banquetName").value);};
  $("#tasteForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),flavor=f.get("flavor");const matches=DISHES.filter(d=>(d.tags.join("")+d.desc).includes(flavor));const items=[...matches.slice(0,4)];for(const cat of ["汤",f.get("ending")]){const d=DISHES.find(x=>x.cat===cat&&!items.includes(x));if(d)items.push(d);}const titles={清爽:"清风雅味派",酸甜:"酸甜快乐派",浓香:"浓香干饭派",家常:"暖心家常派"};$("#tasteResult").innerHTML='<h3>'+titles[flavor]+'</h3><p>适合你的'+esc(f.get("occasion"))+'小席：'+items.map(d=>d.name).join("、")+'</p><button id="useTasteMenu" class="btn btn-outline">把推荐放进菜篮</button>';$("#useTasteMenu").onclick=()=>addChosenMenu(items);};
  $("#quizStart").onclick=startFoodQuiz;$("#refreshVotes").onclick=loadPopularity;renderPopularity();loadPopularity();
  document.addEventListener("click",e=>{const v=e.target.closest("[data-vote]");if(v)voteDish(v.dataset.vote);const q=e.target.closest("[data-answer]");if(q)answerFoodQuiz(q.dataset.answer);});
  const note=document.createElement("p");note.className="simulation-note";note.textContent="课堂模拟预订，不产生真实订单。";$("#mainReserveButton").after(note);
  const brand=document.querySelector(".story-copy p:last-of-type");brand.textContent=brand.textContent.replace("调整人数和预算","调整人数与配桌预算");
  document.querySelectorAll(".desktop-nav,.mobile-nav").forEach(nav=>{const a=document.createElement("a");a.href="#playground";a.textContent="互动馆";nav.append(a);});
});
