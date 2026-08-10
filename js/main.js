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
    $$('.slit').forEach(function(el){ el.classList.add('is-open'); });
    counters.forEach(runCounter);
    drawChart();
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.classList.contains('slit')) el.classList.add('is-open');
      else el.classList.add('is-in');
      if (el.querySelector && el.querySelector('b[data-count]')) {
        counters.forEach(function(c){ if (el.contains(c.el)) runCounter(c); });
      }
      if (el.id === 'chart' && !chartDrawn) drawChart();
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .reveal-lines, .slit').forEach(function(el){ io.observe(el); });
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

/* ── параллакс фото ───────────────────────────────────────────── */
if (hasST && !reduced) {
  $$('[data-parallax]').forEach(function(img){
    var box = img.closest('.hero__strip-mask, .wide__mask, .gal__item') || img.parentElement;
    gsap.fromTo(img, { yPercent: -9 }, {
      yPercent: 9, ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

/* ── стек карточек системы ────────────────────────────────────── */
if (hasST && !reduced) {
  var cards = $$('.deck .card');
  cards.forEach(function(card, i){
    if (i === cards.length - 1) return;
    var next = cards[i + 1];
    gsap.to(card.querySelector('.card__in'), {
      scale: 0.964, y: -12, ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom-=60', end: 'top top+=160', scrub: true }
    });
  });
}

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

/* ── график климата ───────────────────────────────────────────── */
var OUT = [81,74,64,58,56,49,47,46,52,63,73,80];
var INN = [22,25,32,45,54,48,46,45,50,40,30,24];
var CX0 = 60, CDX = 56, CY = function(v){ return 292 - v * 2.55; };
function smoothPath(data){
  var pts = data.map(function(v, i){ return [CX0 + i * CDX, CY(v)]; });
  var d = 'M' + pts[0][0] + ' ' + pts[0][1];
  for (var i = 0; i < pts.length - 1; i++) {
    var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += 'C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ',' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ',' + p2[0] + ' ' + p2[1];
  }
  return d;
}
function renderMonths(){
  var g = $('#chart-months');
  if (!g || !window.VL_I18N) return;
  var m = VL_I18N.months();
  var out = '';
  for (var i = 0; i < 12; i++) out += '<text x="' + (CX0 + i * CDX) + '" y="318">' + m[i] + '</text>';
  g.innerHTML = out;
}
function drawChart(){
  var pOut = $('#chart-out'), pIn = $('#chart-in');
  if (!pOut || !pIn || chartDrawn) return;
  chartDrawn = true;
  pOut.setAttribute('d', smoothPath(OUT));
  pIn.setAttribute('d', smoothPath(INN));
  renderMonths();
  var chartFig = $('#chart');
  if (!reduced) {
    [pOut, pIn].forEach(function(p, k){
      var L = p.getTotalLength();
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) ' + (k * 0.35) + 's';
      p.style.strokeDashoffset = '0';
    });
    setTimeout(function(){ if (chartFig) chartFig.classList.add('is-drawn'); }, 2000);
  } else if (chartFig) {
    chartFig.classList.add('is-drawn');
  }
  /* hover-слой */
  var hov = $('#chart-hover'), tip = $('#chart-tip'), chart = $('#chart'), svg = $('#chart-svg');
  if (!hov || !tip || !chart || !svg) return;
  var ns = 'http://www.w3.org/2000/svg';
  var vline = document.createElementNS(ns, 'line');
  vline.setAttribute('y1', 60); vline.setAttribute('y2', 292);
  var dotO = document.createElementNS(ns, 'circle'); dotO.setAttribute('r', 4); dotO.setAttribute('fill', '#2F5DA8');
  var dotI = document.createElementNS(ns, 'circle'); dotI.setAttribute('r', 4); dotI.setAttribute('fill', '#A8853B');
  hov.appendChild(vline); hov.appendChild(dotO); hov.appendChild(dotI);
  for (var i = 0; i < 12; i++) {
    (function(i){
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', CX0 + i * CDX - CDX / 2);
      r.setAttribute('y', 40); r.setAttribute('width', CDX); r.setAttribute('height', 262);
      hov.appendChild(r);
      r.addEventListener('mouseenter', function(){
        var x = CX0 + i * CDX;
        vline.setAttribute('x1', x); vline.setAttribute('x2', x);
        vline.style.opacity = 1;
        dotO.setAttribute('cx', x); dotO.setAttribute('cy', CY(OUT[i])); dotO.style.opacity = 1;
        dotI.setAttribute('cx', x); dotI.setAttribute('cy', CY(INN[i])); dotI.style.opacity = 1;
        var m = window.VL_I18N ? VL_I18N.months() : [];
        var lo = window.VL_I18N ? VL_I18N.t('climate.labOut') : '';
        var li = window.VL_I18N ? VL_I18N.t('climate.labIn') : '';
        tip.textContent = (m[i] || '') + ' · ' + lo + ' ' + OUT[i] + ' % · ' + li + ' ' + INN[i] + ' %';
        var cr = chart.getBoundingClientRect(), sr = svg.getBoundingClientRect();
        var px = sr.left - cr.left + (x / 760) * sr.width;
        var py = sr.top - cr.top + (Math.min(CY(OUT[i]), CY(INN[i])) / 340) * sr.height;
        tip.style.left = px + 'px';
        tip.style.top = py + 'px';
        tip.classList.add('is-on');
      });
    })(i);
  }
  svg.addEventListener('mouseleave', function(){
    tip.classList.remove('is-on');
    vline.style.opacity = 0; dotO.style.opacity = 0; dotI.style.opacity = 0;
  });
}

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
  renderMonths();
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
