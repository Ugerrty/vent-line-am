/* Vent-Line v5 — минимум JS: нативный скролл, лёгкие появления */
(function(){
'use strict';

var $  = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* хедер: прозрачный над фото → бумага при скролле */
var header = $('#header');
function onScroll(){
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* мобильное меню */
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

/* якоря: нативный smooth (scroll-behavior в CSS) + закрытие меню */
$$('[data-scroll]').forEach(function(a){
  a.addEventListener('click', function(){ closeMenu(); });
});

/* появления */
function startReveals(){
  var els = $$('.reveal');
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
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  els.forEach(function(el){ io.observe(el); });
}
startReveals();

/* мягкий наезд hero-фото после загрузки */
function boot(){ document.documentElement.classList.add('is-booted'); }
var heroImg = $('#hero-img');
if (heroImg && heroImg.complete) requestAnimationFrame(boot);
else if (heroImg) heroImg.addEventListener('load', function(){ requestAnimationFrame(boot); });
else boot();
setTimeout(boot, 1200); /* страховка */

/* форма → письмо */
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

/* язык */
$$('.lang__btn').forEach(function(b){
  b.addEventListener('click', function(){
    if (window.VL_I18N) VL_I18N.setLang(b.getAttribute('data-lang'));
  });
});
try {
  var saved = localStorage.getItem('vl-lang');
  if (saved && saved !== 'ru' && window.VL_I18N) VL_I18N.setLang(saved);
} catch(e){}

window.__vlReady = true;
})();
