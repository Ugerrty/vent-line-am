/* Vent-Line v5 — i18n: RU (в разметке) + EN (словарь) */
(function(){
'use strict';

var HTML_KEYS = { 'night.h2':1 };

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see',
  'skip': 'Skip to content',
  'nav.brand':'Brand','nav.spaces':'Spaces','nav.series':'Series','nav.service':'Full cycle','nav.contact':'Contact',
  'hero.kicker':'Concealed slot diffusers',
  'hero.h1':'Ventilation you never see',
  'hero.sub':'We design, manufacture and install. Moscow · Dubai · Bangkok · Yerevan',
  'hero.btn':'Discuss a project',
  'intro.kicker':'Vent-Line · since 2011',
  'intro.h2':'We make engineering invisible. All that remains in the interior is a thin line — everything else is hidden within the architecture.',
  'intro.note':'Vent-Line diffusers are installed in the most demanding projects of Moscow, Dubai, Bangkok and CIS cities. Now our engineering team works in Yerevan as well.',
  'intro.f1':'diffuser series','intro.f2':'made-to-order models','intro.f3':'years — warranty up to',
  'sp1.kicker':'01 · Ceiling','sp1.h3':'A line that carries the light',
  'sp1.x':'Continuous lines of any length. Slot from 20 mm, plastered-in profile — no frames, no visible fixings.',
  'sp2.kicker':'02 · Wall','sp2.h3':'Flush with the plane',
  'sp2.x':'The diffuser disappears into the wall: supply and transfer models, finished in any RAL, anodised or veneered.',
  'sp3.kicker':'03 · Floor','sp3.h3':'At the panoramic glazing',
  'sp3.x':'Load-bearing floor lines in stone, wood or ceramics. Warm air rises along the glass; the diffuser stays unseen.',
  'night.kicker':'Silence',
  'night.h2':'Good ventilation is never seen. <em>Or heard.</em>',
  'night.x':'Air speed in the slot never exceeds 2 m/s — the threshold of silence. At night the system moves hundreds of cubic metres per hour, and nobody hears it.',
  'unit.ms':'m/s','unit.m3h':'m³/h','unit.years':'yrs',
  'night.s1':'air speed in the slot','night.s2':'airflow per line','night.s3':'profile warranty — up to',
  'series.kicker':'Catalogue',
  'series.h2':'Diffuser series',
  'series.lead':'Twelve series for ceilings, walls and floors. Every line is made to your project’s dimensions — from 5 days.',
  's1.w':'ceiling','s1.x':'continuous lines · slot 20–50 mm',
  's2.w':'ceiling','s2.x':'plastered-in shadow profile · 30–50 mm',
  's3.w':'stretch ceiling','s3.x':'magnetic insert mounting · 20–30 mm',
  's4.w':'ceiling · walls','s4.x':'airflow damper and louvres · 30 mm',
  's5.w':'walls','s5.x':'transfer air · flush with the plane · 20–40 mm',
  's6.w':'floor','s6.x':'load-bearing · by panoramic glazing · 20–30 mm',
  'series.foot':'Curved and corner elements, moisture-resistant versions and non-standard details — made to project.',
  'service.kicker':'Full cycle',
  'service.h2':'One contract — from design to quiet air',
  'service.lead':'A developer shouldn’t have to chain subcontractors: we cover the entire engineering scope and answer for the result.',
  'sv1.t':'Design','sv1.x':'The ventilation section of your project: air change rates, aerodynamics, specifications. Documentation in one day, Revit BIM families.',
  'sv2.t':'Manufacturing','sv2.x':'Our own facility near Moscow: extruded aluminium, powder coating, anodising, veneer. From five days.',
  'sv3.t':'Humidification','sv3.x':'High-pressure mist humidification — as invisible as the diffusers. A comfortable 40–60 % humidity all year round.',
  'sv4.t':'Installation & handover','sv4.x':'Our crews handle rough and finish stages, commissioning and sign-off. In Yerevan — our own installation team.',
  'service.note':'Delivery: Russia · CIS · UAE · Thailand. To Armenia — no duties or customs clearance (EAEU, EAC certification).',
  'places.kicker':'Trusted by',
  'places.h2':'Addresses with no room for error',
  'pl1':'business district towers','pl2':'residences, Moscow region','pl3':'commercial spaces',
  'pl4':'residential quarters, Moscow','pl5b':'Private residences','pl5':'Dubai, UAE',
  'pl6b':'Private villas','pl6':'Bangkok, Thailand',
  'cta.kicker':'Contact',
  'cta.h2':'Let’s discuss your project',
  'cta.lead':'Send us a floor plan — within 48 hours we’ll return a preliminary specification, an estimate and lead times.',
  'cta.note':'Mon–Fri, 9:00–18:00 (Moscow time) · we reply in Russian and English',
  'form.name':'Name','form.company':'Company or project','form.contact':'Phone or Telegram',
  'form.msg':'About the task','form.send':'Send',
  'form.note':'The button opens a draft in your email client — nothing is sent without your confirmation.',
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
