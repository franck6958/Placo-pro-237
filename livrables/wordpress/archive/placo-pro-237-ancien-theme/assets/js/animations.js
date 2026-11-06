/* =========================================================================
 * PLACO PRO 237 — Animations (sans bibliothèque externe)
 * ====================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ---------- Découpe des titres en mots ---------- */
  function splitWords(el) {
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';
    el.classList.add('split');
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            var wi = document.createElement('span'); wi.className = 'wi'; wi.style.setProperty('--i', i++);
            wi.textContent = part; w.appendChild(wi); frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(el);
  }
  $$('.hero h1, .section-head h2').forEach(splitWords);

  /* ---------- Cascade : délai progressif dans les grilles ---------- */
  ['.services-grid', '.gallery', '.steps', '.zones-grid', '.values', '.faq-list', '.foot-grid'].forEach(function (sel) {
    $$(sel).forEach(function (grid) {
      var cols = sel === '.steps' ? 4 : 3;
      $$(':scope > *', grid).forEach(function (el, i) { el.style.setProperty('--d', (i % cols) * 110 + 'ms'); });
    });
  });
  $$('.strip-item').forEach(function (el, i) { el.style.setProperty('--d', i * 120 + 'ms'); });

  /* ---------- Icônes qui se dessinent ---------- */
  $$('.strip, .card').forEach(function (box) {
    box.classList.add('draw-icons');
    $$('svg path, svg circle, svg rect, svg line, svg polyline', box).forEach(function (s) { s.setAttribute('pathLength', '1'); });
  });

  /* ---------- Observateur : .visible puis .settled (fin d'animation) ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting || root.classList.contains('is-loading')) return;
      var el = e.target;
      el.classList.add('visible');
      var d = parseInt(getComputedStyle(el).getPropertyValue('--d'), 10) || 0;
      setTimeout(function () { el.classList.add('settled'); }, d + 1300);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .strip').forEach(function (el) { if (!el.closest('.hero')) io.observe(el); });

  /* ---------- Écran d'introduction puis entrée du héro ---------- */
  function startHero() {
    $$('.hero .reveal').forEach(function (el) {
      el.classList.add('visible');
      setTimeout(function () { el.classList.add('settled'); }, 2000);
    });
  }
  if (root.classList.contains('show-preloader')) {
    var t0 = window.PLACO_T0 || Date.now();
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      var wait = Math.max(0, 1500 - (Date.now() - t0));
      setTimeout(function () {
        root.classList.add('preloader-done');
        try { sessionStorage.setItem('placoIntro', '1'); } catch (err) {}
        setTimeout(function () { root.classList.remove('is-loading'); startHero(); }, 250);
        setTimeout(function () { root.classList.remove('show-preloader'); }, 1100);
      }, wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    setTimeout(finish, 3500); // sécurité si une ressource tarde
  } else {
    root.classList.remove('is-loading');
    requestAnimationFrame(startHero);
  }

  if (reduce) return; // Pas d'effets de mouvement continus en mode « animations réduites ».

  /* ---------- Barre de progression + en-tête intelligent + parallaxe ---------- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var header = $('#header');
  var navLinks = $('#navLinks');
  var lastY = window.scrollY;
  var parallax = $$('.about-visual figure').map(function (el, i) { return { el: el, speed: [-0.06, 0.05, 0.09][i] || 0.05 }; });
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

    if (header && !(navLinks && navLinks.classList.contains('open'))) {
      if (y > 400 && y > lastY + 4) header.classList.add('header-hidden');
      else if (y < lastY - 4 || y < 400) header.classList.remove('header-hidden');
    }
    lastY = y;

    parallax.forEach(function (p) {
      var r = p.el.getBoundingClientRect();
      var center = r.top + r.height / 2 - window.innerHeight / 2;
      p.el.style.transform = 'translate3d(0,' + (center * p.speed).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Menu : lien actif selon la section visible ---------- */
  var links = $$('#navLinks a');
  var sections = links.map(function (a) {
    var id = (a.getAttribute('href') || '').split('#')[1];
    return id ? document.getElementById(id) : null;
  });
  if (sections.some(Boolean)) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a, i) { a.classList.toggle('active', sections[i] === e.target); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ---------- FAQ : ouverture / fermeture fluide ---------- */
  $$('details').forEach(function (d) {
    var summary = $('summary', d);
    var p = $('p', d);
    if (!summary || !p || !d.animate) return;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var start = d.offsetHeight;
      if (d.open) {
        var end = summary.offsetHeight + parseFloat(getComputedStyle(d).paddingTop) + parseFloat(getComputedStyle(d).paddingBottom);
        var a = d.animate({ height: [start + 'px', end + 'px'] }, { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var full = d.offsetHeight;
        d.animate({ height: [start + 'px', full + 'px'] }, { duration: 520, easing: 'cubic-bezier(.16,1,.3,1)' });
        p.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 80, easing: 'ease-out', fill: 'backwards' });
      }
    });
  });

  if (!finePointer) return; // Effets à la souris : ordinateurs uniquement.

  /* ---------- Cartes : relief 3D + reflet suivant la souris ---------- */
  $$('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      if (!card.classList.contains('settled')) return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', x * 100 + '%');
      card.style.setProperty('--my', y * 100 + '%');
      card.style.transform = 'perspective(900px) translateY(-6px) rotateX(' + ((0.5 - y) * 7).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 9).toFixed(2) + 'deg)';
    });
    card.addEventListener('pointerleave', function () { card.style.transform = ''; });
  });

  /* ---------- Boutons aimantés ---------- */
  $$('.btn').forEach(function (btn) {
    btn.classList.add('magnetic');
    btn.addEventListener('pointermove', function (e) {
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = 'translate(' + (dx * 0.22).toFixed(1) + 'px,' + (dy * 0.3).toFixed(1) + 'px)';
    });
    btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
  });

  /* ---------- Illustration du héro : relief à la souris ---------- */
  var hero = $('.hero');
  var ceiling = $('.hero-visual .ceiling');
  if (hero && ceiling) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ceiling.style.transform = 'rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
    });
    hero.addEventListener('pointerleave', function () { ceiling.style.transform = ''; });
  }
})();
