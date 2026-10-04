document.querySelectorAll('.faq-q').forEach(button=>{
  button.addEventListener('click',()=>{
    const expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden=expanded;
  });
});
const form=document.getElementById('contactForm');
let enquirySent=false;
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(enquirySent)return;
  const status=document.getElementById('form-status');
  const button=form.querySelector('button[type=submit]');
  if(!['refinebycharlotte.co.uk','www.refinebycharlotte.co.uk'].includes(location.hostname)){
    status.textContent='Preview only — no message has been sent.';
    status.focus();return;
  }
  button.disabled=true;button.textContent='Sending…';
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
    if(!response.ok)throw new Error('Form service did not accept the enquiry');
    status.textContent='Thank you — your enquiry has been sent. Charlotte will be in touch to arrange the next step.';
    enquirySent=true;
    // Keep fields available for the existing automatic enhanced-conversion setup.
    // Tracking failure must never turn an accepted enquiry into a send error.
    try{
      if(typeof window.gtag==='function')window.gtag('event','conversion',{send_to:'AW-18320579867/jAeLCJil4M8cEJu6959E'});
    }catch(trackingError){}
  }catch(error){
    status.textContent=error.name==='AbortError'?'We could not confirm delivery. Please contact Charlotte on WhatsApp before sending again.':'Your enquiry could not be sent. Your details are still here; please try again or message Charlotte on WhatsApp.';
  }finally{
    clearTimeout(timeout);button.disabled=enquirySent;button.textContent=enquirySent?'Enquiry sent':'Request my consultation';status.focus();
  }
});
document.querySelectorAll('#waBtn, .mobile-cta-wa').forEach(link=>link.addEventListener('click',()=>{
  if(typeof window.gtag==='function')window.gtag('event','conversion',{send_to:'AW-18320579867/BjUDCJul4M8cEJu6959E'});
}));

// Hide the quick-contact bar while the contact section is on screen so it never covers the form.
(()=>{const bar=document.querySelector('.mobile-cta'),contact=document.getElementById('contact');if(!bar||!contact||!('IntersectionObserver' in window))return;new IntersectionObserver(([e])=>bar.classList.toggle('is-hidden',e.isIntersecting),{rootMargin:'0px 0px -20% 0px'}).observe(contact);})();
