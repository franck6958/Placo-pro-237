(function () {

const CONFIG = window.PLACO_CONFIG || { whatsapp: "237672840122", email: "contact@placopro237.com" };

// En-tête au défilement
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll); onScroll();

// Menu mobile
const burger = document.getElementById('burger');
if (burger) {
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));
}

// Apparition au scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    if (document.documentElement.classList.contains('anim') && e.target.closest('.hero')) return; // héro géré par animations.js
    e.target.classList.add('visible'); io.unobserve(e.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Formulaire → WhatsApp ou e-mail (pas de serveur nécessaire)
const form = document.getElementById('quoteForm');
if (form) {
let via = 'whatsapp';
form.querySelectorAll('button[type=submit]').forEach(b => b.addEventListener('click', () => via = b.dataset.via));
form.addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const msgEl = document.getElementById('formMsg');
  if (!v('name') || !v('phone') || !v('city') || !v('service')) {
    msgEl.textContent = "Merci de remplir les champs marqués d'un *.";
    return;
  }
  const text =
`Bonjour PLACO PRO 237,
Je souhaite un devis.

Nom : ${v('name')}
Téléphone : ${v('phone')}
Ville : ${v('city')}
Travaux : ${v('service')}
Projet : ${v('msg') || '—'}`;
  if (via === 'whatsapp') {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  } else {
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Demande de devis — ' + v('service'))}&body=${encodeURIComponent(text)}`;
  }
  msgEl.textContent = "Merci ! Votre demande est prête à être envoyée.";
  form.reset();
});
}

// Filtres : afficher toute la galerie quand on filtre
const gallery = document.getElementById('gallery');
const moreWrap = document.getElementById('moreWrap');
const showAll = () => { if (gallery) gallery.classList.add('show-all'); if (moreWrap) moreWrap.classList.add('done'); };
const moreBtn = document.getElementById('moreBtn');
if (moreBtn) moreBtn.addEventListener('click', () => {
  showAll();
  gallery.querySelectorAll('.work.extra').forEach(el => el.classList.add('visible'));
});
// Filtres réalisations (avec transition animée)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let filterTimer;
const applyFilter = f => {
  if (f !== 'all') showAll();
  gallery.querySelectorAll('.work').forEach(w => {
    w.classList.toggle('hide', f !== 'all' && w.dataset.cat !== f);
    w.classList.add('visible');
  });
};
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  if (!gallery || btn.classList.contains('active')) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  if (reduceMotion || !gallery.animate) { applyFilter(f); return; }
  clearTimeout(filterTimer);
  gallery.classList.add('is-filtering');
  filterTimer = setTimeout(() => {
    applyFilter(f);
    gallery.classList.remove('is-filtering');
    [...gallery.querySelectorAll('.work')].filter(w => w.offsetParent !== null).forEach((w, i) => {
      w.animate(
        [{ opacity: 0, transform: 'translateY(28px) scale(.96)' }, { opacity: 1, transform: 'none' }],
        { duration: 700, delay: Math.min(i, 12) * 55, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }
      );
    });
  }, 260);
}));

// Visionneuse photo
const lb = document.getElementById('lightbox');
if (lb && gallery) {
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let current = 0;
  const items = () => [...gallery.querySelectorAll('.work')].filter(w => w.offsetParent !== null);
  const show = i => {
    const list = items(); if (!list.length) return;
    current = (i + list.length) % list.length;
    const w = list[current];
    lbImg.src = w.dataset.full; lbImg.alt = w.dataset.title; lbCap.textContent = w.dataset.title;
  };
  const open = w => { show(items().indexOf(w)); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  gallery.addEventListener('click', e => { const w = e.target.closest('.work'); if (w) open(w); });
  gallery.addEventListener('keydown', e => { const w = e.target.closest('.work'); if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(w); } });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}
})();
