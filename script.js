"use strict";

const DISHES = [
  {id:"cola-wings",name:"可乐鸡翅",cat:"荤菜",price:38,emoji:"🍗",colors:["#d26a39","#6b1714"],desc:"甜咸酱汁裹住焦香鸡翅，入口软嫩，回味带一点可乐焦糖香。",tags:["甜咸","人气"]},
  {id:"squirrel-fish",name:"松鼠桂鱼",cat:"荤菜",price:68,emoji:"🐟",colors:["#e0a43c","#a73221"],desc:"花刀桂鱼炸至酥脆，淋上酸甜酱汁，形似松鼠、色泽明亮。",tags:["酸甜","经典"]},
  {id:"char-siu",name:"叉烧肉",cat:"荤菜",price:42,emoji:"🥩",colors:["#c95031","#6d1d1a"],desc:"蜜汁慢烤，肉香与焦边相衬，是一桌宴席里稳稳的浓香担当。",tags:["蜜汁","浓香"]},
  {id:"peking-duck",name:"北京烤鸭",cat:"荤菜",price:78,emoji:"🦆",colors:["#cc7134","#7a221c"],desc:"皮脆肉嫩，配饼、葱丝与甜面酱，一卷就是北方宴席的仪式感。",tags:["招牌","果木香"]},
  {id:"seafood",name:"海鲜",cat:"荤菜",price:58,emoji:"🦐",colors:["#db7b54","#216b7b"],desc:"当季海味拼盘，鲜甜清爽，适合作为全桌共享的海味中心。",tags:["鲜味","分享"]},
  {id:"apple-carrot",name:"苹果丝拌胡萝卜",cat:"素菜",price:18,emoji:"🥕",colors:["#e3a145","#83a860"],desc:"苹果清甜、胡萝卜爽脆，一口唤醒味蕾，让丰盛宴席轻盈起来。",tags:["清爽","脆甜"]},
  {id:"mixian",name:"蜜线",cat:"素菜",price:22,emoji:"🍜",colors:["#c19b55","#79682e"],desc:"细线交织、酱香温润，口感柔韧，是小组创意菜单中的特别一味。",tags:["创意","柔韧"]},
  {id:"vegetable-rice",name:"菜饭",cat:"素菜",price:20,emoji:"🍚",colors:["#8baa64","#436c50"],desc:"米香吸收青菜清气，朴素却耐吃，像家里永远让人安心的一碗饭。",tags:["主食","家常"]},
  {id:"roasted-cabbage",name:"烤白菜",cat:"素菜",price:24,emoji:"🥬",colors:["#bad36a","#547741"],desc:"高温锁住白菜甜味，叶边微焦，清甜里多了一层炭火香。",tags:["微焦","清甜"]},
  {id:"sea-cucumber-eggs",name:"海参番茄炒蛋",cat:"素菜",price:38,emoji:"🍅",colors:["#e6663d","#c9a43b"],desc:"番茄炒蛋的熟悉味道，加入海参般的创意口感，酸香下饭。",tags:["酸香","下饭"]},
  {id:"veg-abalone",name:"素鲍鱼",cat:"素菜",price:32,emoji:"🍄",colors:["#a77b52","#5b4933"],desc:"菌菇慢煨出丰润口感，形味兼具，不用荤食也能撑起宴席排面。",tags:["菌香","仿荤"]},
  {id:"luffa-eggs",name:"丝瓜炒蛋",cat:"素菜",price:26,emoji:"🥒",colors:["#7ca85b","#d2ae43"],desc:"丝瓜清润、鸡蛋柔嫩，颜色清新，是浓味之间恰好的停顿。",tags:["清润","柔嫩"]},
  {id:"garlic-eggplant",name:"蒜蓉炒茄子",cat:"素菜",price:24,emoji:"🍆",colors:["#79558c","#41244f"],desc:"软糯茄子吸满蒜香酱汁，香而不腻，拌饭尤其合适。",tags:["蒜香","软糯"]},
  {id:"lotus-starch",name:"藕粉",cat:"甜品",price:12,emoji:"🪷",colors:["#d6aa8e","#9c6a79"],desc:"温润顺滑，淡淡莲藕香，是热闹之后慢慢安静下来的甜。",tags:["温润","传统"]},
  {id:"double-milk",name:"双皮奶",cat:"甜品",price:16,emoji:"🥛",colors:["#e8ddc8","#b79d86"],desc:"奶香细密、口感柔滑，冰凉入口，像给一桌热菜画上轻柔句号。",tags:["奶香","细滑"]},
  {id:"eight-porridge",name:"八宝粥",cat:"甜品",price:14,emoji:"🥣",colors:["#8f3840","#4b2631"],desc:"谷物、豆类与果仁慢熬，甜度克制，每一勺都有不同口感。",tags:["谷香","暖甜"]},
  {id:"dough-soup",name:"疙瘩汤",cat:"汤",price:28,emoji:"🍲",colors:["#db9d45","#b5552b"],desc:"面疙瘩筋软、汤底鲜香，一碗下肚，从胃里暖到心里。",tags:["家常","暖胃"]},
  {id:"tomato-soup",name:"西红柿蛋汤",cat:"汤",price:16,emoji:"🍅",colors:["#e24d38","#e5ac3b"],desc:"酸甜番茄与蛋花相遇，简单、明亮，是永远不会出错的汤。",tags:["酸甜","经典"]},
  {id:"seaweed-soup",name:"紫菜汤",cat:"汤",price:12,emoji:"🌊",colors:["#315e61","#182f35"],desc:"紫菜鲜味融进清汤，轻盈不抢味，适合在菜与菜之间润口。",tags:["鲜香","清淡"]},
  {id:"rib-soup",name:"排骨汤",cat:"汤",price:18,emoji:"🥘",colors:["#c29d70","#75614b"],desc:"排骨慢炖至软，汤色清亮而有厚度，一桌人分享最有温度。",tags:["慢炖","醇厚"]},
  {id:"chicken-soup",name:"鸡汤",cat:"汤",price:20,emoji:"🍗",colors:["#dcb456","#9c773a"],desc:"清炖鸡香，入口鲜醇，适合把热气腾腾的关心盛进碗里。",tags:["滋味","鲜醇"]},
  {id:"garden-soup",name:"田园蔬菜汤",cat:"汤",price:16,emoji:"🥦",colors:["#84a451","#3f735b"],desc:"多种时蔬汇成清甜汤底，颜色丰富，为宴席补上一抹田园绿。",tags:["时蔬","清甜"]},
  {id:"kelp-salad",name:"海带丝",cat:"凉菜",price:16,emoji:"🌿",colors:["#315f55","#173b39"],desc:"海带爽脆，微酸微辣，开席第一口就把食欲轻轻提起来。",tags:["爽脆","开胃"]},
  {id:"jellyfish",name:"海蜇头",cat:"凉菜",price:28,emoji:"🪼",colors:["#d19062","#8b5a46"],desc:"脆嫩弹牙，清爽酱汁提鲜，是凉菜里很有存在感的一盘。",tags:["弹脆","鲜爽"]},
  {id:"lemon-feet",name:"酸辣柠檬无骨凤爪",cat:"凉菜",price:32,emoji:"🍋",colors:["#d8b943","#b54934"],desc:"柠檬清香、酸辣上头、无骨好入口，聚会聊天时最容易光盘。",tags:["酸辣","人气"]},
  {id:"plum-drink",name:"酸梅汤",cat:"饮品",price:12,emoji:"🥤",colors:["#742d35","#391d2c"],desc:"乌梅酸甜、生津解腻，冰镇后尤其适合搭配烤鸭与叉烧。",tags:["解腻","冰饮"]},
  {id:"fruit-juice",name:"果汁",cat:"饮品",price:10,emoji:"🍹",colors:["#eb9d37","#d85234"],desc:"当季水果调和，明亮清甜，给不喝茶的朋友一杯简单快乐。",tags:["果香","清甜"]},
  {id:"ya-shi-xiang",name:"鸭屎香",cat:"饮品",price:18,emoji:"🍵",colors:["#b39a48","#5f6c38"],desc:"名字有趣，香气却高雅。凤凰单丛清香回甘，适合慢慢品。",tags:["茶饮","回甘"]},
  {id:"mung-soup",name:"绿豆汤",cat:"饮品",price:10,emoji:"🫘",colors:["#829b56","#46603f"],desc:"绿豆煮至开花，清凉柔和，夏日宴席里最朴实的舒适感。",tags:["清凉","家常"]},
  {id:"milk-tea",name:"丝袜奶茶",cat:"饮品",price:16,emoji:"🧋",colors:["#c89161","#76513d"],desc:"茶味浓、奶香滑，口感圆润，传统宴席里的一点港风趣味。",tags:["奶香","港风"]}
];

const CATEGORIES = ["全部","荤菜","素菜","甜品","汤","凉菜","饮品"];
const IMAGE_FILES = {
  "cola-wings":"cola-chicken-wings.webp","squirrel-fish":"squirrel-mandarin-fish.webp","char-siu":"char-siu.webp","peking-duck":"peking-duck.webp","seafood":"seafood-platter.webp",
  "apple-carrot":"apple-carrot-slaw.webp","mixian":"mixian.webp","vegetable-rice":"vegetable-rice.webp","roasted-cabbage":"roasted-cabbage.webp","sea-cucumber-eggs":"sea-cucumber-tomato-eggs.webp","veg-abalone":"vegetarian-abalone.webp","luffa-eggs":"luffa-eggs.webp","garlic-eggplant":"garlic-eggplant.webp",
  "lotus-starch":"lotus-root-starch.webp","double-milk":"double-skin-milk.webp","eight-porridge":"eight-treasure-porridge.webp",
  "dough-soup":"dough-drop-soup.webp","tomato-soup":"tomato-egg-soup.webp","seaweed-soup":"seaweed-soup.webp","rib-soup":"pork-rib-soup.webp","chicken-soup":"chicken-soup.webp","garden-soup":"garden-vegetable-soup.webp",
  "kelp-salad":"kelp-salad.webp","jellyfish":"jellyfish-head.webp","lemon-feet":"lemon-chicken-feet.webp",
  "plum-drink":"sour-plum-drink.webp","fruit-juice":"fruit-juice.webp","ya-shi-xiang":"ya-shi-xiang-tea.webp","mung-soup":"mung-bean-soup.webp","milk-tea":"silk-stocking-milk-tea.webp"
};
const STORE = {cart:"lsy_cart_v3",favorites:"lsy_favorites_v3",reserved:"lsy_reserved_v3",reviews:"lsy_reviews_v3",theme:"lsy_theme_v3",device:"lsy_device_v3"};
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const state = {
  category:"全部", search:"", favoritesOnly:false,
  cart:readJSON(STORE.cart,{}), favorites:new Set(readJSON(STORE.favorites,[])),
  people:6, reviewIndex:0, cloudReviews:[], cloudReviewsLoaded:false
};

function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function writeJSON(key,value){localStorage.setItem(key,JSON.stringify(value))}
function esc(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
function dishById(id){return DISHES.find(d=>d.id===id)}
function artMarkup(d,small=false){return `<div class="dish-art${small?" cart-thumb":""}" style="--art-a:${d.colors[0]};--art-b:${d.colors[1]}"><img class="dish-photo" src="assets/menu/${IMAGE_FILES[d.id]}" alt="${d.name}" loading="${small?"eager":"lazy"}" decoding="async"><span class="food-emoji photo-fallback" aria-hidden="true">${d.emoji}</span></div>`}
function toast(message){const el=document.createElement("div");el.className="toast";el.textContent=message;$("#toastStack").append(el);setTimeout(()=>el.classList.add("hide"),2600);setTimeout(()=>el.remove(),3000)}

function init(){
  applySavedTheme(); renderTabs(); renderDishes(); renderCart(); renderReviews(); setupUI(); setupReveal(); setupReservation(); setupReviews(); renderHeroArt();
  const date=$("input[name='visitDate']"); if(date){const today=new Date();date.min=today.toISOString().slice(0,10);const next=new Date(today);next.setDate(today.getDate()+1);date.value=next.toISOString().slice(0,10)}
}

function renderHeroArt(){const d=dishById("peking-duck");$$('[data-art="peking-duck"]').forEach(el=>{el.style.setProperty("--art-a",d.colors[0]);el.style.setProperty("--art-b",d.colors[1]);el.innerHTML=`<img class="dish-photo" src="assets/menu/${IMAGE_FILES[d.id]}" alt="北京烤鸭招牌菜"><span class="food-emoji photo-fallback" aria-hidden="true">${d.emoji}</span>`})}
function renderTabs(){
  $("#categoryTabs").innerHTML=CATEGORIES.map(c=>`<button role="tab" aria-selected="${state.category===c}" class="${state.category===c?"active":""}" data-cat="${c}">${c}</button>`).join("");
}
function visibleDishes(){const q=state.search.trim().toLowerCase();return DISHES.filter(d=>(state.category==="全部"||d.cat===state.category)&&(!q||`${d.name}${d.cat}${d.desc}${d.tags.join("")}`.toLowerCase().includes(q))&&(!state.favoritesOnly||state.favorites.has(d.id)))}
function renderDishes(){
  const list=visibleDishes();$("#resultCount").textContent=`${list.length} 道菜`;$("#emptyState").hidden=list.length!==0;
  $("#dishGrid").innerHTML=list.map((d,i)=>`<article class="dish-card" data-id="${d.id}" tabindex="0" aria-label="查看${d.name}详情">
    <div class="dish-image">${artMarkup(d)}<span class="dish-number">${String(DISHES.indexOf(d)+1).padStart(2,"0")}</span><button class="favorite ${state.favorites.has(d.id)?"active":""}" data-favorite="${d.id}" aria-label="收藏${d.name}">${state.favorites.has(d.id)?"♥":"♡"}</button></div>
    <div class="dish-info"><div class="dish-info-header"><h3>${d.name}</h3><strong>¥${d.price}</strong></div><p>${d.desc}</p><div class="dish-bottom"><span class="dish-tag">${d.cat} · ${d.tags[0]}</span><button class="add-dish" data-add="${d.id}" aria-label="加入${d.name}">＋</button></div></div></article>`).join("");
}
function toggleFavorite(id){state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);writeJSON(STORE.favorites,[...state.favorites]);renderDishes();toast(state.favorites.has(id)?"已收藏这道菜":"已取消收藏")}
function openDish(id){const d=dishById(id);if(!d)return;$("#dishModalContent").innerHTML=`<div class="dish-modal-layout"><div class="dish-modal-art">${artMarkup(d)}</div><div class="dish-modal-copy"><span class="category">${d.cat.toUpperCase()} · LIU SHUI YAN</span><h2>${d.name}</h2><span class="price">¥${d.price}</span><p>${d.desc}</p><div class="modal-tags">${d.tags.map(t=>`<span>${t}</span>`).join("")}<span>适合分享</span></div><button class="btn btn-primary" data-modal-add="${d.id}">加入菜篮 <span>＋</span></button></div></div>`;$("#dishModal").showModal()}

function addCart(id,qty=1){state.cart[id]=(state.cart[id]||0)+qty;saveCart();renderCart();toast(`${dishById(id).name} 已加入菜篮`)}
function changeCart(id,delta){state.cart[id]=(state.cart[id]||0)+delta;if(state.cart[id]<=0)delete state.cart[id];saveCart();renderCart()}
function saveCart(){writeJSON(STORE.cart,state.cart)}
function cartEntries(){return Object.entries(state.cart).filter(([id,q])=>dishById(id)&&q>0)}
function renderCart(){
  const entries=cartEntries();const count=entries.reduce((s,[,q])=>s+q,0);$("#cartCount").textContent=count;
  $("#cartItems").innerHTML=entries.map(([id,q])=>{const d=dishById(id);return `<div class="cart-item">${artMarkup(d,true)}<div><h4>${d.name}</h4><small>¥${d.price*q}</small><div class="qty"><button data-qty="${id}" data-delta="-1" aria-label="减少">−</button><span>${q}</span><button data-qty="${id}" data-delta="1" aria-label="增加">＋</button></div></div><button class="remove-item" data-remove="${id}" aria-label="删除${d.name}">×</button></div>`}).join("");
  $("#cartTotal").textContent=entries.reduce((s,[id,q])=>s+dishById(id).price*q,0);$("#cartEmpty").hidden=entries.length>0;$("#cartFoot").hidden=entries.length===0;$("#cartItems").hidden=entries.length===0;
}
function openCart(){$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");$("#backdrop").classList.add("open");document.body.classList.add("no-scroll")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");$("#backdrop").classList.remove("open");document.body.classList.remove("no-scroll")}

function planTable(people=state.people){
  state.people=Math.max(2,Math.min(16,people));$("#peopleCount").textContent=state.people;
  const wanted=state.people<=4?6:state.people<=8?8:10;const groups={"荤菜":2,"素菜":2,"汤":1,"凉菜":1,"甜品":1,"饮品":1};if(wanted===10){groups["荤菜"]=3;groups["素菜"]=3}
  const selection=[];Object.entries(groups).forEach(([cat,count])=>{const pool=DISHES.filter(d=>d.cat===cat).sort(()=>Math.random()-.5);selection.push(...pool.slice(0,count))});
  state.cart={};selection.slice(0,wanted).forEach(d=>state.cart[d.id]=1);saveCart();renderCart();
  const table=$(".round-table");table.querySelectorAll(".mini-dish").forEach(x=>x.remove());selection.slice(0,8).forEach((d,i)=>{const s=document.createElement("span");s.className="mini-dish";s.style.setProperty("--i",i);s.textContent=d.emoji;s.title=d.name;table.append(s)});
  $("#plannerPreview>p").textContent=`已为 ${state.people} 位客人配好 ${selection.slice(0,wanted).length} 道菜，总计 ¥${selection.slice(0,wanted).reduce((s,d)=>s+d.price,0)}。菜单已经放进菜篮。`;toast("一桌好菜已经配好啦")
}

function allReviews(){return state.cloudReviewsLoaded?state.cloudReviews:[]}
function renderReviews(){
  const reviews=allReviews(),prev=$("#reviewPrev"),next=$("#reviewNext");
  if(!reviews.length){
    state.reviewIndex=0;
    $("#reviewTrack").innerHTML='<article class="review-card review-empty active"><div class="quote">还没有真人评价</div><div class="stars">☆☆☆☆☆</div><small>成为第一位留下感受的食客吧</small></article>';
    $("#reviewDots").innerHTML="";prev.disabled=true;next.disabled=true;return;
  }
  prev.disabled=false;next.disabled=false;state.reviewIndex=Math.min(state.reviewIndex,reviews.length-1);
  $("#reviewTrack").innerHTML=reviews.map((r,i)=>`<article class="review-card ${i===state.reviewIndex?"active":""}"><div class="quote">“${esc(r.text)}”</div><div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div><small>${esc(r.name)}</small></article>`).join("");
  $("#reviewDots").innerHTML=reviews.map((_,i)=>`<button class="${i===state.reviewIndex?"active":""}" data-review="${i}" aria-label="第${i+1}条评价"></button>`).join("")
}
function moveReview(delta){const n=allReviews().length;if(!n)return;state.reviewIndex=(state.reviewIndex+delta+n)%n;renderReviews()}

function setupUI(){
  document.addEventListener("click",e=>{
    const tab=e.target.closest("[data-cat]");if(tab){state.category=tab.dataset.cat;renderTabs();renderDishes();return}
    const fav=e.target.closest("[data-favorite]");if(fav){e.stopPropagation();toggleFavorite(fav.dataset.favorite);return}
    const add=e.target.closest("[data-add]");if(add){e.stopPropagation();addCart(add.dataset.add);return}
    const modalAdd=e.target.closest("[data-modal-add]");if(modalAdd){addCart(modalAdd.dataset.modalAdd);$("#dishModal").close();openCart();return}
    const card=e.target.closest(".dish-card");if(card){openDish(card.dataset.id);return}
    const qty=e.target.closest("[data-qty]");if(qty){changeCart(qty.dataset.qty,Number(qty.dataset.delta));return}
    const rem=e.target.closest("[data-remove]");if(rem){delete state.cart[rem.dataset.remove];saveCart();renderCart();return}
    if(e.target.closest("[data-close-drawer]")){closeCart();return}
    if(e.target.closest("[data-close-modal]")){e.target.closest("dialog").close();return}
    const plan=e.target.closest(".event-plan");if(plan){planTable(Number(plan.dataset.people));$("#planner").scrollIntoView();return}
    const dot=e.target.closest("[data-review]");if(dot){state.reviewIndex=Number(dot.dataset.review);renderReviews()}
  });
  $("#dishSearch").addEventListener("input",e=>{state.search=e.target.value;renderDishes()});
  $("#favoritesOnly").onclick=()=>{state.favoritesOnly=!state.favoritesOnly;$("#favoritesOnly").classList.toggle("active",state.favoritesOnly);renderDishes()};
  $("#openCart").onclick=openCart;$("#backdrop").onclick=closeCart;
  $("#clearCart").onclick=()=>{if(confirm("确定清空菜篮吗？")){state.cart={};saveCart();renderCart()}};
  $("#confirmOrder").onclick=()=>{const num=`LSY-${String(Date.now()).slice(-6)}`;closeCart();toast(`菜单已确认 · 编号 ${num}`);setTimeout(()=>$("#reserveModal").showModal(),500)};
  $("#peopleMinus").onclick=()=>{state.people=Math.max(2,state.people-1);$("#peopleCount").textContent=state.people};
  $("#peoplePlus").onclick=()=>{state.people=Math.min(16,state.people+1);$("#peopleCount").textContent=state.people};$("#autoPlan").onclick=()=>planTable();
  $("#reviewPrev").onclick=()=>moveReview(-1);$("#reviewNext").onclick=()=>moveReview(1);$("#openReview").onclick=()=>$("#reviewModal").showModal();
  $("#reviewForm").onsubmit=handleReview;
  $("#newsletterForm").onsubmit=handleNewsletter;
  $$('[data-open-reserve]').forEach(b=>b.onclick=()=>openReserve());
  $("#themeToggle").onclick=toggleTheme;$("#menuToggle").onclick=()=>$("#mobileNav").classList.toggle("open");$$('#mobileNav a').forEach(a=>a.onclick=()=>$("#mobileNav").classList.remove("open"));
  $("#backToTop").onclick=()=>scrollTo({top:0,behavior:"smooth"});
  $("#playStory").onclick=playStory;
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("dish-card")){e.preventDefault();openDish(e.target.dataset.id)}});
  addEventListener("scroll",onScroll,{passive:true});onScroll();
}
function onScroll(){const y=scrollY;$(".site-header").classList.toggle("scrolled",y>30);$("#backToTop").classList.toggle("show",y>700);const max=document.documentElement.scrollHeight-innerHeight;$("#pageProgress").style.width=`${max?y/max*100:0}%`}
function setupReveal(){const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");io.unobserve(x.target)}}),{threshold:.12});$$('.reveal').forEach(x=>io.observe(x))}
function applySavedTheme(){if(localStorage.getItem(STORE.theme)==="night"){document.body.classList.add("night");$("#themeToggle").textContent="☀"}}
function toggleTheme(){document.body.classList.toggle("night");const night=document.body.classList.contains("night");localStorage.setItem(STORE.theme,night?"night":"day");$("#themeToggle").textContent=night?"☀":"☾";toast(night?"夜宴模式已开启":"日间模式已开启")}
function playStory(){if(!("speechSynthesis" in window)){toast("这个浏览器暂不支持语音讲述");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("流水宴，取流水不息、宾朋相聚之意。水把远方带来，宴让彼此坐近。流水有意，佳肴成席。");u.lang="zh-CN";u.rate=.9;speechSynthesis.speak(u);toast("正在讲述流水宴的故事")}

function getDeviceId(){let id=localStorage.getItem(STORE.device);if(!id){id=crypto.randomUUID?crypto.randomUUID():`lsy-${Date.now()}-${Math.random().toString(16).slice(2)}`;localStorage.setItem(STORE.device,id)}return id}
function cloudConfig(){const c=window.LSY_CONFIG||{};return c.SUPABASE_URL&&c.SUPABASE_ANON_KEY?c:null}
function cloudHeaders(c,extra={}){const headers={apikey:c.SUPABASE_ANON_KEY,...extra};if(!c.SUPABASE_ANON_KEY.startsWith("sb_publishable_"))headers.Authorization=`Bearer ${c.SUPABASE_ANON_KEY}`;return headers}
async function cloudCount(){const c=cloudConfig();if(!c)return null;const res=await fetch(`${c.SUPABASE_URL}/rest/v1/reservations?select=party_size`,{headers:cloudHeaders(c)});if(!res.ok)throw new Error("count failed");const rows=await res.json();return rows.reduce((total,row)=>total+Number(row.party_size||0),0)}
async function cloudReserve(data){const c=cloudConfig();if(!c)return null;const res=await fetch(`${c.SUPABASE_URL}/rest/v1/reservations`,{method:"POST",headers:cloudHeaders(c,{"Content-Type":"application/json",Prefer:"return=minimal"}),body:JSON.stringify(data)});if(!res.ok){const body=await res.text();if(res.status===409||body.includes("duplicate"))throw new Error("duplicate");throw new Error("save failed")}return true}
async function cloudSubscribe(email){const c=cloudConfig();if(!c)return null;const res=await fetch(`${c.SUPABASE_URL}/rest/v1/newsletter_subscribers`,{method:"POST",headers:cloudHeaders(c,{"Content-Type":"application/json",Prefer:"return=minimal"}),body:JSON.stringify({email})});if(!res.ok){const body=await res.text();if(res.status===409||body.includes("duplicate"))return "duplicate";throw new Error("subscribe failed")}return "saved"}
async function cloudLoadReviews(){const c=cloudConfig();if(!c)return null;const res=await fetch(`${c.SUPABASE_URL}/rest/v1/reviews?select=name,rating,text,created_at&order=created_at.desc&limit=100`,{headers:cloudHeaders(c)});if(!res.ok)throw new Error("reviews load failed");return await res.json()}
async function cloudSaveReview(review){const c=cloudConfig();if(!c)return null;const res=await fetch(`${c.SUPABASE_URL}/rest/v1/reviews`,{method:"POST",headers:cloudHeaders(c,{"Content-Type":"application/json",Prefer:"return=representation"}),body:JSON.stringify(review)});if(!res.ok)throw new Error("review save failed");const rows=await res.json();return rows[0]||review}
async function setupReviews(){if(!cloudConfig()){state.cloudReviews=[];state.cloudReviewsLoaded=true;renderReviews();return}try{const reviews=await cloudLoadReviews();state.cloudReviews=reviews||[];state.cloudReviewsLoaded=true;state.reviewIndex=0;renderReviews()}catch(err){console.warn(err);state.cloudReviews=[];state.cloudReviewsLoaded=true;renderReviews();toast("云端评价读取失败，请检查 Supabase 连接")}}
async function handleReview(e){e.preventDefault();const form=e.currentTarget;const button=form.querySelector("button[type='submit'],button:not([type])");const fd=new FormData(form);const review={name:String(fd.get("name")).trim(),rating:Number(fd.get("rating")),text:String(fd.get("text")).trim()};button.disabled=true;button.textContent="正在发布…";try{if(!cloudConfig())throw new Error("cloud");const saved=await cloudSaveReview(review);state.cloudReviews.unshift(saved);state.cloudReviewsLoaded=true;state.reviewIndex=0;renderReviews();$("#reviewModal").close();form.reset();toast("评价已同步，所有人都能看到")}catch(err){toast("评价发布失败，请检查 Supabase 连接")}finally{button.disabled=false;button.textContent="发布评价"}}
async function handleNewsletter(e){
  e.preventDefault();const form=e.currentTarget;const input=form.elements.email;const button=form.querySelector("button[type='submit']");const email=input.value.trim().toLowerCase();if(!email)return;
  button.disabled=true;button.textContent="正在订阅…";
  try{
    const cloudResult=await cloudSubscribe(email);const local=readJSON("lsy_newsletter_local_v1",[]);if(!local.some(x=>x.email===email)){local.unshift({email,created_at:new Date().toISOString()});writeJSON("lsy_newsletter_local_v1",local)}
    const status=$("#newsletterStatus");status.hidden=false;status.textContent=cloudResult==="duplicate"?`${email} 已经订阅过流水信。`:`订阅成功：${email}`;form.reset();toast(cloudResult==="duplicate"?"这个邮箱已经订阅过了":"订阅成功，下一封流水信见");
  }catch(err){toast("暂时无法保存，请稍后再试")}finally{button.disabled=false;button.textContent="订阅流水信"}
}
async function setupReservation(){
  if(!cloudConfig()){updateCount("—","尚未连接云端","请确认 config.js 已上传到当前仓库根目录");return}
  try{const count=await cloudCount();updateCount(count,"云端实时","所有设备共享的真实人数")}
  catch(e){console.warn(e);updateCount("—","云端连接失败","请确认已运行最新版 Supabase SQL")}
}
function updateCount(count,status,note){$("#reserveCount").textContent=count;$("#heroReserveCount").textContent=count;$("#syncStatus").textContent=status;$("#countNote").textContent=note}
function openReserve(){const existing=readJSON(STORE.reserved,null);const form=$("#reserveForm"),success=$("#reserveSuccess");if(existing){form.hidden=true;success.hidden=false;$("#successText").textContent=`${existing.nickname||"同学"}，你已预订 ${existing.partySize||""} 位，开宴见！`}else{form.hidden=false;success.hidden=true}$("#reserveModal").showModal()}
$("#reserveForm")?.addEventListener("submit",async e=>{
  e.preventDefault();const button=e.target.querySelector("button[type=submit]");button.disabled=true;button.textContent="正在留席…";const fd=new FormData(e.target);const data={device_id:getDeviceId(),nickname:String(fd.get("nickname")).trim(),party_size:Number(fd.get("partySize")),visit_date:fd.get("visitDate"),visit_time:fd.get("visitTime"),seating:fd.get("seating")};
  try{if(!cloudConfig())throw new Error("cloud");await cloudReserve(data);writeJSON(STORE.reserved,{nickname:data.nickname,partySize:data.party_size,date:data.visit_date});e.target.hidden=true;$("#reserveSuccess").hidden=false;$("#successText").textContent=`${data.nickname}，已为 ${data.party_size} 位客人留席，${data.visit_date} 开宴见！`;const count=await cloudCount();updateCount(count,"云端实时","所有设备共享的真实人数");$("#mainReserveButton").textContent="已预订 ✓";toast("预订成功，已同步到云端")}
  catch(err){toast(err.message==="duplicate"?"这台设备已经预订过了":"云端预订失败，请检查 Supabase 连接")}
  finally{button.disabled=false;button.textContent="确认预订"}
});

document.addEventListener("DOMContentLoaded",init);
