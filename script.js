// PT Arvion Electronics — premium interaction & motion
 document.addEventListener("DOMContentLoaded",()=>{
  const welcome=document.getElementById("welcome");
  if(welcome){setTimeout(()=>welcome.classList.add("hide"),2100);setTimeout(()=>welcome.remove(),2900);}
  const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
  if(toggle&&nav){toggle.addEventListener("click",()=>{nav.classList.toggle("open");toggle.setAttribute("aria-expanded",nav.classList.contains("open")?"true":"false");});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));}

  // Scroll progress, sticky header state, and back-to-top
  const progress=document.createElement("div");progress.className="scroll-progress";document.body.appendChild(progress);
  const back=document.createElement("button");back.className="back-top";back.type="button";back.setAttribute("aria-label","Kembali ke atas");back.innerHTML="↑";document.body.appendChild(back);
  back.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  const header=document.querySelector(".site-header");
  const onScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+"%";back.classList.toggle("show",window.scrollY>450);header?.classList.toggle("scrolled",window.scrollY>20);};
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();

  // Reveal animations with staggered children
  const revealTargets=document.querySelectorAll("main section,.feature-card,.pillar,.service-grid article,.project-grid article,.solution-list article,.values-grid>div,.vm-grid>div,.product-card,.brand-section-head,.brand-wall,.brand-directory>div,.contact-layout>*");
  revealTargets.forEach(el=>{el.classList.add("reveal");if(el.matches(".feature-grid,.pillar-grid,.service-grid,.project-grid,.product-grid,.values-grid,.vm-grid,.brand-wall")){el.classList.add("reveal-stagger");el.classList.remove("reveal");}});
  if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:"0px 0px -35px 0px"});revealTargets.forEach(el=>observer.observe(el));}else revealTargets.forEach(el=>el.classList.add("visible"));

  // Gentle pointer parallax on large hero for desktop
  const hero=document.querySelector(".hero"),heroContent=document.querySelector(".hero-content");
  if(hero&&heroContent&&matchMedia("(pointer:fine)").matches){hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;heroContent.style.transform=`translate3d(${x*-8}px,${y*-6}px,0)`;});hero.addEventListener("pointerleave",()=>heroContent.style.transform="");}

  // Count-up stats when visible
  const counters=document.querySelectorAll(".stats-grid strong");
  if("IntersectionObserver" in window&&counters.length){const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,raw=el.textContent.trim(),match=raw.match(/^(\d+)/);if(match&&!el.dataset.counted){el.dataset.counted="1";const target=Number(match[1]),suffix=raw.slice(match[1].length),start=performance.now(),duration=1300;const tick=now=>{const t=Math.min((now-start)/duration,1),ease=1-Math.pow(1-t,3);el.innerHTML=Math.round(target*ease)+suffix;if(t<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}countObserver.unobserve(el);}),{threshold:.6});counters.forEach(el=>countObserver.observe(el));}

  // Product catalogue filter/search
  const cards=[...document.querySelectorAll(".product-card")],filters=document.querySelectorAll(".filter"),search=document.getElementById("productSearch");let category="all";
  function filterProducts(){const term=(search?.value||"").toLowerCase();cards.forEach(card=>{const matchCat=category==="all"||card.dataset.category===category;const matchText=(card.dataset.name||"").toLowerCase().includes(term);card.style.display=matchCat&&matchText?"":"none";});}
  filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");category=btn.dataset.filter;filterProducts();}));if(search)search.addEventListener("input",filterProducts);

  // Product detail modal
  const modal=document.getElementById("productModal");if(modal){const close=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";};document.querySelectorAll(".product-open").forEach(btn=>btn.addEventListener("click",()=>{document.getElementById("modalTitle").textContent=btn.dataset.title;const brandBox=document.getElementById("modalBrands");brandBox.innerHTML="";(btn.dataset.brands||"").split(";").filter(Boolean).forEach(item=>{const [brand,price]=item.split("|");const row=document.createElement("div");row.className="modal-brand-row";const name=document.createElement("b");name.textContent=brand;const cost=document.createElement("strong");cost.textContent=price||"Hubungi kami";row.append(name,cost);brandBox.appendChild(row);});document.getElementById("modalDesc").textContent=btn.dataset.desc;document.getElementById("modalUse").textContent=btn.dataset.use;document.getElementById("modalImage").src=btn.dataset.image;document.getElementById("modalImage").alt=btn.dataset.title;modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}));modal.querySelector(".modal-close")?.addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close();});document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});}

  // Contact form to WhatsApp
  const form=document.getElementById("contactForm");if(form)form.addEventListener("submit",e=>{e.preventDefault();const data=new FormData(form);const message=`Halo PT Arvion Electronics,%0A%0ANama: ${encodeURIComponent(data.get("name"))}%0AEmail: ${encodeURIComponent(data.get("email"))}%0ASubjek: ${encodeURIComponent(data.get("subject"))}%0APesan: ${encodeURIComponent(data.get("message"))}`;window.open(`https://wa.me/6282229943537?text=${message}`,"_blank","noopener");});
 });
