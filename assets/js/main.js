(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, base=document) => base.querySelector(s);
  const $$ = (s, base=document) => [...base.querySelectorAll(s)];
  const progress = $('#scroll-progress');
  const hero = $('.hero');
  const vision = $('.vision');
  const visionSticky = $('#vision-sticky');
  let rafScheduled = false;
  const clamp = (n,min,max) => Math.min(max,Math.max(min,n));

  function updateMotion() {
    rafScheduled = false;
    const scrollMax = document.documentElement.scrollHeight - innerHeight;
    const y = window.scrollY || 0;
    if(progress) progress.style.width = `${scrollMax > 0 ? 100*y/scrollMax : 0}%`;
    if(reducedMotion.matches) return;
    if(hero && y <= hero.offsetHeight + 100){
      hero.style.setProperty('--hero-parallax',`${Math.round(y*.16)}px`);
      hero.style.setProperty('--decor-parallax',`${Math.round(y*.28)}px`);
    }
    if(vision && visionSticky){
      const rect = vision.getBoundingClientRect();
      const duration = Math.max(1,vision.offsetHeight-innerHeight);
      const fraction = clamp(-rect.top/duration,0,1);
      visionSticky.style.setProperty('--vision-reveal', `${Math.round(fraction*100)}%`);
      visionSticky.style.setProperty('--clip-vertical', `${(45*(1-fraction)).toFixed(2)}%`);
      visionSticky.style.setProperty('--clip-horizontal', `${(50*(1-fraction)).toFixed(2)}%`);
      visionSticky.style.setProperty('--vision-scaling',(1.05+fraction*.1).toFixed(3));
      visionSticky.style.setProperty('--vision-opacity',(.88-fraction*.7).toFixed(3));
    }
  }
  function scheduleUpdate(){if(!rafScheduled){rafScheduled=true;requestAnimationFrame(updateMotion)}}
  window.addEventListener('scroll',scheduleUpdate,{passive:true});
  window.addEventListener('resize',scheduleUpdate,{passive:true});
  reducedMotion.addEventListener?.('change',scheduleUpdate);
  scheduleUpdate();

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else{$$('.reveal').forEach(el=>el.classList.add('visible'))}

  const toggle = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  function setMenu(isOpen){
    if(!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded',String(isOpen));
    toggle.setAttribute('aria-label',isOpen?'Cerrar menú':'Abrir menú');
    mobileNav.classList.toggle('open',isOpen);
    mobileNav.inert = !isOpen;
    document.body.classList.toggle('menu-open',isOpen);
  }
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  $$('#mobile-nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  window.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(innerWidth>760)setMenu(false)});

  const filters = $$('.filter');
  const projects = $$('.project-item');
  function activateFilter(category){
    filters.forEach(other=>{
      const active=other.dataset.filter===category;
      other.classList.toggle('active',active);
      other.setAttribute('aria-pressed',String(active));
    });
    projects.forEach(item=>item.hidden = category!=='todos' && !item.dataset.category.split(' ').includes(category));
  }
  filters.forEach(button=>button.addEventListener('click',()=>activateFilter(button.dataset.filter)));
  $$('[data-open-filter]').forEach(link=>link.addEventListener('click',()=>activateFilter(link.dataset.openFilter)));

  const conceptDialog = $('#concept-dialog');
  $$('.project-open').forEach(button=>button.addEventListener('click',()=>{
    if(!conceptDialog) return;
    $('#concept-dialog-image').src=`assets/images/${button.dataset.image}`;
    $('#concept-dialog-image').alt=`Imagen conceptual de ${button.dataset.title}`;
    $('#concept-dialog-title').textContent=button.dataset.title;
    $('#concept-dialog-type').textContent=button.dataset.type;
    conceptDialog.showModal();
  }));
  $('#close-dialog')?.addEventListener('click',()=>conceptDialog.close());
  conceptDialog?.addEventListener('click',event=>{if(event.target===conceptDialog)conceptDialog.close()});

  const form = $('#contact-form');
  let messageText = '';
  form?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const name=$('#contact-name').value.trim();
    const service=$('#contact-service').value;
    const details=$('#contact-details').value.trim();
    if(!name || !service || !details)return;
    messageText = `Hola, soy ${name}.\nTipo de proyecto: ${service}.\n\n${details}\n\nQuisiera consultar por los próximos pasos.`;
    $('#message-preview').textContent=messageText;
    $('#contact-result').hidden=false;
    $('#copy-message').textContent='Copiar mensaje';
    $('#contact-result').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest'});
  });
  $('#copy-message')?.addEventListener('click',async()=>{
    try{
      if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(messageText)}
      else {
        const el=document.createElement('textarea');el.value=messageText;el.style.position='fixed';el.style.opacity='0';document.body.appendChild(el);el.select();const ok=document.execCommand('copy');el.remove();if(!ok)throw Error('Clipboard unavailable');
      }
      $('#copy-message').textContent='Mensaje copiado ✓';
    }catch(err){$('#copy-message').textContent='Seleccioná y copiá el texto de arriba'}
  });
  $('#year').textContent=String(new Date().getFullYear());
})();
