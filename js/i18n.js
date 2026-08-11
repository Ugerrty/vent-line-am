/* Vent-Line v6 — i18n: RU (в разметке) + EN (словарь) */
(function(){
'use strict';

var HTML_KEYS = {};

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see',
  'skip': 'Skip to content',
  'nav.brand':'Brand','nav.line':'Line','nav.spaces':'Spaces','nav.series':'Series','nav.contact':'Contact',
  'hero.kicker':'Concealed slot diffuser manufacturer',
  'hero.h1a':'Ventilation,',
  'hero.h1b':'you never see',
  'hero.sub':'We design, manufacture and install. A full cycle from the manufacturer trusted by the finest addresses of Moscow, Dubai and Bangkok.',
  'hero.btn1':'Discuss a project','hero.btn2':'See the line',
  'mf.kicker':'Brand',
  'mf.a':'Since 2011 we have been making engineering invisible.',
  'mf.b':'A thin line and quiet air remain in the interior',
  'mf.c':' — everything else is hidden within the architecture. Moscow, Dubai, Bangkok, CIS cities. Now — Yerevan.',
  'line.kicker':'Line',
  'line.h2':'A continuous line. Any length.',
  'line.x':'Extruded aluminium profile with no visible joints — follow it with your eyes, as along a finished ceiling.',
  'line.f2':'RAL coating · anodising · veneer',
  'sp.kicker':'Spaces',
  'sp.h2':'It works at night. Nobody knows where',
  'fr1.t':'Ceiling','fr1.x':'S PRO · continuous lines · 20 mm',
  'fr2.t':'Floor','fr2.x':'M-PL · by panoramic glazing · load-bearing',
  'fr3.t':'Wall','fr3.x':'L · flush with the plane · any RAL',
  'sil.kicker':'Silence',
  'sil.a':'Good ventilation is never seen.',
  'sil.b':'Good ventilation is never heard.',
  'sil.c':'Only the air remains.',
  'unit.ms':'m/s','unit.m3h':'m³/h','unit.years':'yrs',
  'sil.s1':'speed in the slot — the silence threshold',
  'sil.s2':'airflow per line',
  'sil.s3':'profile warranty — up to',
  'se.kicker':'Series',
  'se.h2':'A catalogue like vitrines in a dark gallery',
  'se.lead':'Twelve series for ceilings, walls and floors. Every line is made to your project’s dimensions — from 5 days.',
  's1.w':'ceiling','s1.x':'continuous lines · slot 20–50 mm',
  's2.w':'ceiling','s2.x':'plastered-in shadow profile · 30–50 mm',
  's3.w':'stretch ceiling','s3.x':'magnetic insert mounting · 20–30 mm',
  's4.w':'ceiling · walls','s4.x':'airflow damper and louvres · 30 mm',
  's5.w':'walls','s5.x':'transfer air · flush · 20–40 mm',
  's6.w':'floor','s6.x':'load-bearing · by panoramic glazing · 20–30 mm',
  'cy.kicker':'Full cycle',
  'cy.h2':'One contract — from design to quiet air',
  'cy1.t':'Design','cy1.x':'The ventilation section: air change rates, aerodynamics, specifications. Documentation in one day, Revit BIM families.',
  'cy2.t':'Manufacturing','cy2.x':'Our own facility near Moscow: aluminium, powder coating, anodising, veneer. From five days.',
  'cy3.t':'Humidification','cy3.x':'High-pressure mist humidification — as invisible as the diffusers. 40–60 % humidity all year round.',
  'cy4.t':'Installation & handover','cy4.x':'Our crews: rough and finish stages, commissioning, sign-off. In Yerevan — our own team.',
  'cy.note':'Delivery: Russia · CIS · UAE · Thailand · to Armenia — duty-free (EAEU, EAC)',
  'ct.kicker':'Contact',
  'ct.h2':'Let’s discuss your project',
  'ct.lead':'Send us a floor plan — within 48 hours we’ll return a preliminary specification, an estimate and lead times.',
  'ct.note':'Mon–Fri 9:00–18:00 (Moscow) · Russian / English',
  'form.name':'Name','form.company':'Company or project','form.contact':'Phone or Telegram',
  'form.msg':'About the task','form.send':'Send',
  'form.note':'The button opens a draft in your email client — nothing is sent without confirmation.',
  'footer.legal':'© 2011–2026 Vent-Line · Sole trader G. Spiridonov · TIN 772994390219 · Manufacturing — Moscow region · Installation — Yerevan'
}
};

var LOCALES = { ru:'ru-RU', en:'en-US' };
var ruSnapshot = null;

function snapshotRu(){
  if (ruSnapshot) return;
  ruSnapshot = { 'title': document.title };
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k = el.getAttribute('data-i18n');
    if (!(k in ruSnapshot)) ruSnapshot[k] = HTML_KEYS[k] ? el.innerHTML : el.textContent;
  });
}

function pick(lang, key){
  if (lang === 'ru') return ruSnapshot[key];
  var d = DICT[lang] || {};
  if (key in d) return d[key];
  return ruSnapshot[key];
}

function setLang(lang){
  if (lang !== 'ru' && !DICT[lang]) lang = 'ru';
  snapshotRu();
  document.documentElement.lang = lang;
  var t = pick(lang, 'title'); if (t) document.title = t;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k = el.getAttribute('data-i18n');
    var v = pick(lang, k);
    if (v == null) return;
    if (HTML_KEYS[k]) el.innerHTML = v; else el.textContent = v;
  });
  document.querySelectorAll('.lang__btn').forEach(function(b){
    var on = b.getAttribute('data-lang') === lang;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  try { localStorage.setItem('vl-lang', lang); } catch(e){}
  window.__vlLang = lang;
}

window.VL_I18N = {
  setLang: setLang,
  locale: function(){ return LOCALES[window.__vlLang || 'ru']; },
  t: function(key){ snapshotRu(); return pick(window.__vlLang || 'ru', key); }
};
window.__vlLang = 'ru';
})();
