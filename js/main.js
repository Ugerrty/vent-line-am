/* Vent-Line v6 «Тёмный иммерсив» — нативный скролл + лёгкие сцены */
(function(){
'use strict';

var $  = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var hasST = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
if (hasST) gsap.registerPlugin(ScrollTrigger);

/* ── прелоадер: золотая линия 0→20 мм ─────────────────────────── */
var pre = $('#preloader');
var booted = false;
function boot(){
  if (booted) return;
  booted = true;
  document.documentElement.classList.add('is-booted');
  startReveals();
}
if (pre && !reduced && !document.hidden && document.documentElement.classList.contains('js')) {
  var mm = $('#preloader-mm'), pLine = $('#preloader-line');
  var t0 = null, DUR = 800;
  var step = function(ts){
    if (!t0) t0 = ts;
    var t = Math.min(1, (ts - t0) / DUR);
    var e = 1 - Math.pow(1 - t, 3);
    if (mm) mm.textContent = Math.round(e * 20);
    if (pLine) pLine.style.transform = 'scaleX(' + e + ')';
    if (t < 1) requestAnimationFrame(step);
    else setTimeout(function(){ pre.classList.add('is-done'); boot(); }, 350);
  };
  requestAnimationFrame(step);
  setTimeout(function(){ if (!booted) { pre.classList.add('is-done'); boot(); } }, 4000);
} else {
  if (pre) pre.classList.add('is-done');
  boot();
}

/* ── хедер ────────────────────────────────────────────────────── */
var header = $('#header');
function onScroll(){
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── мобильное меню ───────────────────────────────────────────── */
var burger = $('#burger'), menu = $('#menu');
function setInert(on){
  ['#main', '.footer'].forEach(function(s){
    var el = $(s);
    if (!el) return;
    if (on) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
}
function closeMenu(){
  if (!menu || !menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  if (burger) { burger.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
  setInert(false);
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
    closeMenu();
    if (burger) burger.focus();
  }
});
var mq = window.matchMedia('(min-width:1024px)');
var onMq = function(e){ if (e.matches) closeMenu(); };
if (mq.addEventListener) mq.addEventListener('change', onMq);
else if (mq.addListener) mq.addListener(onMq);
if (burger && menu) {
  burger.addEventListener('click', function(){
    var open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    setInert(open);
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    }
  });
}
$$('[data-scroll]').forEach(function(a){
  a.addEventListener('click', function(){ closeMenu(); });
});

/* ── появления + кадры-раскрытия ──────────────────────────────── */
function startReveals(){
  var els = $$('.reveal, .frame');
  if (!('IntersectionObserver' in window) || reduced) {
    els.forEach(function(el){ el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function(el){ io.observe(el); });
}

/* ── параллакс фото в кадрах ──────────────────────────────────── */
if (hasST && !reduced) {
  $$('[data-parallax]').forEach(function(img){
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.closest('.frame'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

/* ── «живой воздух»: золотые частицы в hero ───────────────────── */
(function(){
  var cv = $('#air-canvas');
  if (!cv || reduced) return;
  var ctx = cv.getContext('2d');
  var hero = $('#hero');
  var W = 0, H = 0, parts = [], running = false, rafId = 0, t = 0;
  function resize(){
    var r = hero.getBoundingClientRect();
    var w = Math.round(r.width), h = Math.round(r.height);
    if (w === W && h === H) return;
    W = cv.width = w; H = cv.height = h;
    var n = Math.min(190, Math.round(W * H / 14000));
    parts = [];
    for (var i = 0; i < n; i++) parts.push(spawn(true));
    ctx.fillStyle = '#07080B';
    ctx.fillRect(0, 0, W, H);
  }
  function spawn(anywhere){
    return { x: anywhere ? Math.random() * W : -10, y: Math.random() * H, g: Math.random() < 0.35 };
  }
  function frame(){
    if (!running) return;
    t += 1;
    ctx.fillStyle = 'rgba(7,8,11,0.08)';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var a = Math.sin(p.x * 0.0015 + t * 0.005) * 0.8 + Math.cos(p.y * 0.002 - t * 0.0035) * 0.8;
      var nx = p.x + Math.cos(a) * 0.45 + 0.55;
      var ny = p.y + Math.sin(a) * 0.3 + 0.04;
      ctx.strokeStyle = p.g ? 'rgba(201,169,106,0.20)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      p.x = nx; p.y = ny;
      if (p.x > W + 10 || p.y > H + 10 || p.y < -10) parts[i] = spawn(false);
    }
    rafId = requestAnimationFrame(frame);
  }
  var visible = true;
  function setRun(){
    var on = visible && !document.hidden;
    if (on === running) return;
    running = on;
    if (running) rafId = requestAnimationFrame(frame);
    else cancelAnimationFrame(rafId);
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', setRun);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(en){
      visible = en[0].isIntersecting;
      setRun();
    }, { threshold: 0.02 }).observe(hero);
  } else setRun();
})();

/* ── форма → письмо ───────────────────────────────────────────── */
var form = $('#form');
if (form) {
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(n){ return (form.elements[n] && form.elements[n].value || '').trim(); };
    var T = function(k){ return window.VL_I18N ? VL_I18N.t(k) : k; };
    var subject = 'Vent-Line — ' + (v('company') || v('name') || 'проект');
    var body = [
      T('form.name') + ': ' + v('name'),
      T('form.company') + ': ' + v('company'),
      T('form.contact') + ': ' + v('contact'),
      T('form.msg') + ': ' + v('msg'),
      '',
      '— ' + document.title
    ].join('\n');
    window.location.href = 'mailto:info+322987870@vent-line.ru?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

/* ── язык ─────────────────────────────────────────────────────── */
$$('.lang__btn').forEach(function(b){
  b.addEventListener('click', function(){
    if (window.VL_I18N) VL_I18N.setLang(b.getAttribute('data-lang'));
  });
});
try {
  var saved = localStorage.getItem('vl-lang');
  if (saved && saved !== 'ru' && window.VL_I18N) VL_I18N.setLang(saved);
} catch(e){}

window.addEventListener('load', function(){
  if (hasST) ScrollTrigger.refresh();
});

window.__vlReady = true;
})();
