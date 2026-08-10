/* Vent-Line · Yerevan — механика «линии воздуха» */
(function(){
'use strict';

var $  = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var GS = typeof gsap !== 'undefined';
var hasST = GS && typeof ScrollTrigger !== 'undefined';
if (hasST) gsap.registerPlugin(ScrollTrigger);

/* ── Lenis ─────────────────────────────────────────────────────── */
var lenis = null;
if (!reduced && typeof Lenis !== 'undefined' && GS) {
  try {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    document.documentElement.classList.add('has-lenis');
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    if (hasST) lenis.on('scroll', ScrollTrigger.update);
  } catch(e){ lenis = null; document.documentElement.classList.remove('has-lenis'); }
}

function scrollToEl(el){
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.2 });
  else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
$$('[data-scroll]').forEach(function(a){
  a.addEventListener('click', function(e){
    var id = a.getAttribute('href');
    if (!id || id.charAt(0) !== '#') return;
    var el = $(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    scrollToEl(el);
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
});

/* ── прелоадер: 0 → 20 мм, линия раскрывается ─────────────────── */
var pre = $('#preloader');
var booted = false;
function boot(){
  if (booted) return;
  booted = true;
  var hero = $('#hero');
  if (hero) hero.classList.add('is-ready');
  startReveals();
}
if (pre && !reduced && !document.hidden && document.documentElement.classList.contains('js')) {
  var mm = $('#preloader-mm'), pLine = $('#preloader-line');
  var t0 = null, DUR = 850;
  var step = function(ts){
    if (!t0) t0 = ts;
    var t = Math.min(1, (ts - t0) / DUR);
    var e = 1 - Math.pow(1 - t, 3);
    if (mm) mm.textContent = Math.round(e * 20);
    if (pLine) pLine.style.transform = 'scaleX(' + e + ')';
    if (t < 1) requestAnimationFrame(step);
    else {
      pre.classList.add('is-open');
      setTimeout(function(){ pre.classList.add('is-done'); boot(); }, 780);
    }
  };
  requestAnimationFrame(step);
  setTimeout(function(){
    if (!booted) { pre.classList.add('is-open'); pre.classList.add('is-done'); boot(); }
  }, 4500);
} else {
  if (pre) pre.classList.add('is-done');
  boot();
}

/* ── хедер ─────────────────────────────────────────────────────── */
var header = $('#header');
var onScrollHeader = function(){
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

/* ── мобильное меню ───────────────────────────────────────────── */
var burger = $('#burger'), menu = $('#menu');
function setInert(on){
  ['#main', '.footer', '#dex'].forEach(function(s){
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
  if (lenis) lenis.start();
  document.body.style.overflow = '';
  setInert(false);
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
    closeMenu();
    if (burger) burger.focus();
  }
});
var mqDesk = window.matchMedia('(min-width:1024px)');
var onMqDesk = function(e){ if (e.matches) closeMenu(); };
if (mqDesk.addEventListener) mqDesk.addEventListener('change', onMqDesk);
else if (mqDesk.addListener) mqDesk.addListener(onMqDesk);
if (burger && menu) {
  burger.addEventListener('click', function(){
    var open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (lenis) { open ? lenis.stop() : lenis.start(); }
    document.body.style.overflow = open ? 'hidden' : '';
    setInert(open);
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    }
  });
}

/* ── reveal + счётчики + щели ─────────────────────────────────── */
var counters = $$('b[data-count]').map(function(el){
  return { el: el, target: parseInt(el.getAttribute('data-count'), 10), done: false };
});
/* в разметке лежат финальные значения (no-JS/скринридер); при живом JS обнуляем для count-up */
if (!reduced) counters.forEach(function(c){ c.el.textContent = '0'; });
function fmtNum(n){
  try { return n.toLocaleString(window.VL_I18N ? VL_I18N.locale() : 'ru-RU'); }
  catch(e){ return String(n); }
}
function runCounter(c){
  if (c.done) return;
  c.done = true;
  if (reduced) { c.el.textContent = fmtNum(c.target); return; }
  var t0 = null, DUR = 1500;
  var step = function(ts){
    if (!t0) t0 = ts;
    var t = Math.min(1, (ts - t0) / DUR);
    var e = 1 - Math.pow(1 - t, 3);
    c.el.textContent = fmtNum(Math.round(c.target * e));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

var chartDrawn = false;
function startReveals(){
  if (!('IntersectionObserver' in window)) {
    $$('.reveal, .reveal-lines').forEach(function(el){ el.classList.add('is-in'); });
    $$('.shutter').forEach(function(el){ el.classList.add('is-open'); });
    counters.forEach(runCounter);
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.classList.contains('shutter')) el.classList.add('is-open');
      else el.classList.add('is-in');
      if (el.querySelector && el.querySelector('b[data-count]')) {
        counters.forEach(function(c){ if (el.contains(c.el)) runCounter(c); });
      }
      io.unobserve(el);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .reveal-lines').forEach(function(el){ io.observe(el); });
  var ioShutter = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      en.target.classList.add('is-open');
      ioShutter.unobserve(en.target);
    });
  }, { threshold: 0.22 });
  $$('.shutter').forEach(function(el){ ioShutter.observe(el); });
}

/* ── «живой воздух»: flow-field на 2D canvas ──────────────────── */
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
    W = cv.width = w;
    H = cv.height = h;
    var n = Math.min(240, Math.round(W * H / 11000));
    parts = [];
    for (var i = 0; i < n; i++) parts.push(spawn(true));
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);
  }
  function spawn(anywhere){
    return {
      x: anywhere ? Math.random() * W : -10,
      y: Math.random() * H,
      g: Math.random() < 0.12
    };
  }
  function frame(){
    if (!running) return;
    t += 1;
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var a = Math.sin(p.x * 0.0016 + t * 0.006) * 0.8 + Math.cos(p.y * 0.0021 - t * 0.004) * 0.8;
      var vx = Math.cos(a) * 0.5 + 0.6;
      var vy = Math.sin(a) * 0.32 + 0.05;
      var nx = p.x + vx, ny = p.y + vy;
      ctx.strokeStyle = p.g ? 'rgba(140,109,40,0.20)' : 'rgba(12,35,64,0.13)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      p.x = nx; p.y = ny;
      if (p.x > W + 10 || p.y > H + 10 || p.y < -10) {
        parts[i] = spawn(false);
      }
    }
    rafId = requestAnimationFrame(frame);
  }
  function setRun(on){
    on = on && !document.hidden;
    if (on === running) return;
    running = on;
    if (running) rafId = requestAnimationFrame(frame);
    else cancelAnimationFrame(rafId);
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function(){ setRun(visible); });
  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(en){
      visible = en[0].isIntersecting;
      setRun(visible);
    }, { threshold: 0.02 }).observe(hero);
  } else setRun(true);
})();

/* ── щели-фото: кадр раскрывается из центральной линии ────────── */
(function(){
  var slots = $$('[data-slot]');
  if (!slots.length) return;
  if (hasST && !reduced) {
    slots.forEach(function(slot){
      var body = slot.querySelector('.slot__body');
      if (!body) return;
      body.style.transition = 'none'; /* скраб управляет клипом сам */
      gsap.fromTo(body,
        { clipPath: 'inset(49.55% 0% 49.55% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: slot, start: 'top 82%', end: 'top 30%', scrub: 0.4 }
        });
      var img = body.querySelector('img');
      if (img) {
        gsap.fromTo(img, { yPercent: -5 }, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: slot, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
    });
  } else if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if (!e.isIntersecting) return;
        e.target.querySelector('.slot__body').classList.add('is-open');
        io.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    slots.forEach(function(s){ io.observe(s); });
  } else {
    slots.forEach(function(s){ s.querySelector('.slot__body').classList.add('is-open'); });
  }
})();

/* ── система: щели-строки (hover открывает, клик — для тача) ──── */
(function(){
  var rows = $$('#rows .row');
  if (!rows.length) return;
  function setOpen(row, on){
    row.classList.toggle('is-open', on);
    row.setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  rows.forEach(function(row){
    row.addEventListener('click', function(){
      var on = !row.classList.contains('is-open');
      rows.forEach(function(r){ setOpen(r, false); });
      setOpen(row, on);
    });
    row.addEventListener('mouseenter', function(){
      if (window.matchMedia('(hover: none)').matches) return;
      rows.forEach(function(r){ setOpen(r, r === row); });
    });
  });
  /* первая строка открыта по умолчанию — видно, что строки живые */
  setOpen(rows[0], true);
})();

/* ── hover-превью для списков (реестр решёток, адреса) ────────── */
function initHoverPreview(containerSel, previewSel){
  var reg = $(containerSel), prev = $(previewSel);
  if (!reg || !prev || window.matchMedia('(hover: none)').matches) return;
  var img = prev.querySelector('img');
  var tx = 0, ty = 0, cx = 0, cy = 0, on = false, raf = 0;
  function loop(){
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    prev.style.left = cx + 'px';
    prev.style.top  = cy + 'px';
    if (on || Math.abs(tx - cx) > 0.5) raf = requestAnimationFrame(loop);
    else raf = 0;
  }
  reg.addEventListener('mousemove', function(e){
    tx = Math.min(window.innerWidth - 300, e.clientX + 28);
    ty = Math.max(12, Math.min(window.innerHeight - 210, e.clientY - 95));
    if (!raf) raf = requestAnimationFrame(loop);
  });
  $$('.reg__row', reg).forEach(function(row){
    row.addEventListener('mouseenter', function(){
      var src = row.getAttribute('data-img');
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
      on = true;
      prev.classList.add('is-on');
    });
  });
  reg.addEventListener('mouseleave', function(){
    on = false;
    prev.classList.remove('is-on');
  });
}
initHoverPreview('#reg', '#reg-preview');
initHoverPreview('#addr', '#addr-preview');

/* ── нить таймлайна ───────────────────────────────────────────── */
(function(){
  var line = $('#tl-line');
  if (!line) return;
  line.setAttribute('pathLength', '100');
  if (hasST && !reduced) {
    gsap.fromTo(line, { strokeDashoffset: 100 }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: '#tl', start: 'top 80%', end: 'bottom 72%', scrub: true }
    });
  } else {
    line.style.strokeDashoffset = 0;
  }
})();

/* ── боковой индекс ───────────────────────────────────────────── */
(function(){
  var dex = $('#dex');
  if (!dex || !hasST) return;
  var links = $$('a', dex);
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('data-dex')] = a; });
  ['brand','line','system','product','silence','process','trust','cta'].forEach(function(id){
    var sec = $('#' + id);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top center', end: 'bottom center',
      onToggle: function(st){
        if (st.isActive) links.forEach(function(a){ a.classList.toggle('is-active', a === map[id]); });
      }
    });
  });
  var darkCount = 0;
  ['#hero', '#cta', '.footer'].forEach(function(sel){
    var el = $(sel);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el, start: 'top center', end: 'bottom center',
      onToggle: function(st){
        darkCount += st.isActive ? 1 : -1;
        dex.classList.toggle('is-dark', darkCount > 0);
      }
    });
  });
})();

/* ── магнитные кнопки ─────────────────────────────────────────── */
if (GS && !reduced && !window.matchMedia('(hover: none)').matches) {
  $$('[data-magnet]').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.22,
        y: (e.clientY - r.top - r.height / 2) * 0.28,
        duration: 0.5, ease: 'power3.out'
      });
    });
    btn.addEventListener('mouseleave', function(){
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' });
    });
  });
}

/* ── курсор-щель ──────────────────────────────────────────────── */
(function(){
  var cur = $('#cursor');
  if (!cur || reduced || window.matchMedia('(hover: none)').matches) return;
  var tx = -100, ty = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
  function loop(){
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    cur.style.transform = 'translate(' + (cx - 4) + 'px,' + (cy - 4) + 'px)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  document.addEventListener('mouseover', function(e){
    var t = e.target;
    var interactive = !!(t.closest && t.closest('a, button, .reg__row, input, textarea, .finish__list li') && !t.closest('.dex'));
    cur.classList.toggle('is-link', interactive);
  });
})();

/* ── живые часы городов ([data-clock][data-tz]) ───────────────── */
(function(){
  var clocks = $$('[data-clock]');
  if (!clocks.length) return;
  function tick(){
    var now = new Date();
    clocks.forEach(function(el){
      try {
        el.textContent = new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
          timeZone: el.getAttribute('data-tz')
        }).format(now);
      } catch(e){}
    });
  }
  tick();
  setInterval(tick, 30000);
})();

/* ── форма → письмо ───────────────────────────────────────────── */
(function(){
  var form = $('#form');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(n){ return (form.elements[n] && form.elements[n].value || '').trim(); };
    var T = function(k){ return window.VL_I18N ? VL_I18N.t(k) : k; };
    var subject = 'Vent-Line · Yerevan — ' + (v('company') || v('name') || 'проект');
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
})();

/* ── язык ─────────────────────────────────────────────────────── */
$$('.lang__btn').forEach(function(b){
  b.addEventListener('click', function(){
    if (window.VL_I18N) VL_I18N.setLang(b.getAttribute('data-lang'));
  });
});
window.addEventListener('vl:lang', function(){
  counters.forEach(function(c){ if (c.done) c.el.textContent = fmtNum(c.target); });
  if (hasST) setTimeout(function(){ ScrollTrigger.refresh(); }, 60);
});
try {
  var saved = localStorage.getItem('vl-lang');
  if (saved && saved !== 'ru' && window.VL_I18N) VL_I18N.setLang(saved);
} catch(e){}

/* рефреш триггеров после загрузки шрифтов/картинок */
window.addEventListener('load', function(){
  if (hasST) ScrollTrigger.refresh();
});

/* флаг «main.js дожил до конца» — инлайн-страховка снимет .js, если что-то упало раньше */
window.__vlReady = true;
})();
