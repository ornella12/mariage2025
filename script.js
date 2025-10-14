/* ============
   script.js — interactions simples
   - Compte à rebours (à configurer)
   - Scroll doux pour les liens internes
   - Petite amélioration de l'en-tête collante
   ============ */

/* 👉 TODO: mets la date & l'heure de la cérémonie (format ISO local si possible).
   Exemple: '2025-07-24T16:00:00' (heure locale du lieu).
*/
const WEDDING_DATE = new Date('2025-07-24T16:00:00');

function updateCountdown(){
  const el = document.getElementById('countdown');
  if(!el || isNaN(WEDDING_DATE.getTime())) return;

  const now = new Date();
  const diff = WEDDING_DATE - now;

  if(diff <= 0){
    el.textContent = 'C’est le grand jour ✨';
    return;
  }

  const days  = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins  = Math.floor((diff / (1000*60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);

  el.textContent = `${days} j  ${hours} h  ${mins} min  ${secs} s`;
}

function smoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    });
  });
}

function enhanceStickyNav(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  const onScroll = ()=>{
    if(window.scrollY > 10){
      nav.style.boxShadow = '0 6px 20px rgba(0,0,0,.08)';
    }else{
      nav.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', ()=>{
  smoothScroll();
  enhanceStickyNav();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

/* (Optionnel) validation légère d’un formulaire RSVP
   - Ajoute id="rsvp-form" à ton <form> pour activer.
*/
const rsvpForm = document.getElementById('rsvp-form');
if(rsvpForm){
  rsvpForm.addEventListener('submit', (e)=>{
    const name = rsvpForm.querySelector('input[name="nom"]');
    if(!name || !name.value.trim()){
      e.preventDefault();
      alert('Merci d’indiquer votre nom 🙏');
      name?.focus();
    }
  });
}
