/* ══════════════════════════════════════════════════
   PORTFOLIO JS — Mohammed Ameen Ulla
   Requires: anime.js (loaded via CDN in HTML)
══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CURSOR ───────────────────────────────── */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    const hoverEls = document.querySelectorAll('a, button, .skill-card, .tl-body, .stag');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '36px';
        cursor.style.height = '36px';
        cursor.style.opacity = '.4';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.opacity = '1';
      });
    });
  }

  /* ── HERO ANIME.JS ENTRANCE ───────────────── */
  function runHeroAnimation() {
    anime({
      targets: '.hero-eyebrow',
      opacity: [0, 1], translateY: [14, 0],
      duration: 700, delay: 150,
      easing: 'cubicBezier(0.16,1,0.3,1)'
    });
    anime({
      targets: '.hero-h1',
      opacity: [0, 1], translateY: [40, 0],
      duration: 950, delay: 350,
      easing: 'cubicBezier(0.16,1,0.3,1)'
    });
    anime({
      targets: '.hero-sub',
      opacity: [0, 1], translateY: [28, 0],
      duration: 850, delay: 550,
      easing: 'cubicBezier(0.16,1,0.3,1)'
    });
    anime({
      targets: '.hero-meta',
      opacity: [0, 1], translateY: [18, 0],
      duration: 750, delay: 700,
      easing: 'cubicBezier(0.16,1,0.3,1)'
    });
    anime({
      targets: '.hero-ctas',
      opacity: [0, 1], translateY: [16, 0],
      duration: 700, delay: 850,
      easing: 'cubicBezier(0.16,1,0.3,1)'
    });
    anime({
      targets: '.hero-stats',
      opacity: [0, 1], translateY: [20, 0],
      duration: 700, delay: 1000,
      easing: 'cubicBezier(0.16,1,0.3,1)',
      complete: runCounters
    });
  }

  /* ── STAT COUNTERS ────────────────────────── */
  function runCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      anime({
        targets: el,
        innerHTML: [0, target],
        duration: 1200,
        delay: Math.random() * 200,
        easing: 'easeOutExpo',
        round: 1
      });
    });
  }

  /* ── SCROLL REVEAL ────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = el.classList.contains('reveal-d1') ? 100
                    : el.classList.contains('reveal-d2') ? 200
                    : el.classList.contains('reveal-d3') ? 300 : 0;
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [36, 0],
          duration: 800,
          delay: delay,
          easing: 'cubicBezier(0.16,1,0.3,1)'
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── TIMELINE DOT ANIMATIONS ──────────────── */
  function initTimelineDots() {
    const dots = document.querySelectorAll('.tl-dot');
    const dotObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        anime({
          targets: entry.target,
          scale: [0, 1.15, 1],
          duration: 550,
          delay: 120,
          easing: 'spring(1, 80, 14, 0)'
        });
        dotObs.unobserve(entry.target);
      });
    }, { threshold: 0.8 });
    dots.forEach(d => dotObs.observe(d));
  }

  /* ── SKILL TAGS STAGGER ───────────────────── */
  function initSkillStagger() {
    document.querySelectorAll('.skill-card').forEach(card => {
      const cardObs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        anime({
          targets: card.querySelectorAll('.stag'),
          opacity: [0, 1],
          translateY: [10, 0],
          delay: anime.stagger(55, { start: 150 }),
          duration: 500,
          easing: 'cubicBezier(0.16,1,0.3,1)'
        });
        cardObs.disconnect();
      }, { threshold: 0.3 });
      cardObs.observe(card);
    });
  }

  /* ── ACTIVE NAV ───────────────────────────── */
  function initActiveNav() {
    const sections = ['about', 'experience', 'skills', 'contact'];
    const links = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec && window.scrollY >= sec.offsetTop - 130) current = id;
      });
      links.forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === '#' + current);
      });
    }, { passive: true });
  }

  /* ── MOBILE MENU ──────────────────────────── */
  function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', e => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  window.closeMobile = function () {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('menuBtn');
    if (menu) menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  /* ── CONTACT FORM ─────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const submit = document.getElementById('formSubmit');
    const note = document.getElementById('formNote');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        anime({
          targets: '.contact-form-wrap',
          translateX: [-8, 8, -6, 6, -3, 0],
          duration: 450, easing: 'easeInOutSine'
        });
        note.style.color = '#fc7c78';
        note.textContent = 'Please fill in all fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.style.color = '#fc7c78';
        note.textContent = 'Please enter a valid email address.';
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Sending…';

      const res = await fetch('https://formspree.io/f/mlgvllpy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        submit.textContent = 'Message Sent ✓';
        note.textContent = 'Thanks! I\'ll be in touch soon.';
      } else {
        note.textContent = 'Something went wrong. Please email me directly.';
      }
    });
  }

  /* ── PREFERS REDUCED MOTION ───────────────── */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── INIT ─────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion()) {
      runHeroAnimation();
      initTimelineDots();
      initSkillStagger();
    } else {
      // Make everything visible immediately for reduced motion
      document.querySelectorAll('.reveal, .hero-eyebrow, .hero-h1, .hero-sub, .hero-meta, .hero-ctas, .hero-stats').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      runCounters();
    }

    initScrollReveal();
    initActiveNav();
    initMobileMenu();
    initContactForm();
  });

})();
