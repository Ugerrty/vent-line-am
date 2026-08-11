/* Vent-Line v6 — i18n: RU (в разметке) + EN (словарь) */
(function(){
'use strict';

var HTML_KEYS = {};

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see',
  'skip': 'Skip to content',
  'nav.line':'Grilles','nav.spaces':'Installation','nav.design':'Design','nav.service':'Service','nav.yerevan':'Yerevan','nav.contact':'Contact',
  'hero.kicker':'Ventilation design · installation · maintenance',
  'hero.h1a':'Ventilation,',
  'hero.h1b':'you never see',
  'hero.sub':'We design, install and maintain ventilation, turnkey. An engineering team trusted by the finest addresses of Moscow, Dubai and Bangkok.',
  'hero.btn1':'Discuss a project','hero.btn2':'See the installs',
  'mf.kicker':'Brand',
  'mf.a':'Since 2011 we have been making engineering invisible.',
  'mf.b':'We design, install and maintain ventilation',
  'mf.c':' — from the project section to quiet air in the finished interior. Moscow, Dubai, Bangkok, CIS cities. Now — Yerevan.',
  'mf.f1':'founded','mf.v2':'48 h','mf.f2':'specification from a floor plan','mf.v3':'1 day','mf.f3':'working documentation','mf.v4':'20 yrs','mf.f4':'profile warranty — up to',
  'line.kicker':'Manufacturing',
  'line.h2':'Grilles of our own make',
  'line.x':'The only thing we manufacture ourselves: extruded aluminium profile with no visible joints. Twelve series for ceilings, walls and floors — cut to your project, from 5 days.',
  'unit.mm':'mm',
  'line.l1':'visible slot','line.l2b':'any','line.l2':'length, no joints','line.l3':'RAL · anodising · veneer',
  'line.color':'Colour','line.cb':'Black','line.cw':'White',
  'sp.kicker':'Installation',
  'sp.h2':'Installed so you never see it',
  'fr1.t':'Ceiling','fr1.x':'concealed mounting · continuous lines · flush with the plaster',
  'fr2.t':'Floor','fr2.x':'by panoramic glazing · into stone and wood · load-bearing',
  'fr3.t':'Wall','fr3.x':'flush with the plane · no trims · any RAL',
  'sil.kicker':'Silence',
  'sil.a':'Good ventilation is never seen.',
  'sil.b':'Good ventilation is never heard.',
  'sil.c':'Only the air remains.',
  'unit.ms':'m/s','unit.m3h':'m³/h','unit.years':'yrs',
  'sil.s1':'speed in the slot — the silence threshold',
  'sil.s2':'airflow per line',
  'sil.s3':'profile warranty — up to',
  'ds.kicker':'Design',
  'ds.h2':'A ventilation section — for your project',
  'ds.lead':'We calculate air change for the layouts, build concealed grilles into the architecture and hand over documentation you can build from.',
  'ds1.t':'Calculation','ds1.x':'Air change, aerodynamics, acoustics: slot sections sized so the air stays quiet.','ds1.m':'≤ 2 m/s',
  'ds2.t':'Specification & estimate','ds2.x':'A preliminary specification and estimate from your floor plan — before the contract starts.','ds2.m':'48 hours',
  'ds3.t':'Working documentation','ds3.x':'The ventilation section and Revit BIM families — fitted into your design schedule.','ds3.m':'1 day',
  'sv.kicker':'Installation & service',
  'sv.h2':'We install — and stay close',
  'sv1.t':'Installation & commissioning','sv1.x':'Our crews: rough and finish stages, airflow balancing, sign-off. In Yerevan — our own team.','sv1.m':'turnkey',
  'sv2.t':'Scheduled maintenance','sv2.x':'Cleaning slots and grilles, checking fixings, re-balancing — on your building’s schedule.','sv2.m':'on schedule',
  'sv3.t':'Humidification service','sv3.x':'We maintain high-pressure mist systems: nozzles, filters, controls. 40–60 % humidity all year round.',
  'sv4.t':'Warranty','sv4.x':'Up to 20 years on the profile of our own make — and service support after handover.','sv4.m':'up to 20 yrs',
  'ye.kicker':'A new chapter',
  'ye.h2':'Yerevan',
  'ye.lead':'Armenia is building a record amount of premium housing — and the invisible-ventilation segment doesn’t exist on the market yet. We arrive with the full cycle at once: design, installation, humidification and maintenance — our own crews in Yerevan.',
  'ye.r1b':'No duties, no customs','ye.r1':'the single EAEU space; EAC certification is valid in Armenia',
  'ye.r2b':'Our own crews in Yerevan','ye.r2':'installation, commissioning and sign-off — no subcontractors',
  'ye.r3b':'48 hours','ye.r3':'a preliminary specification and estimate from your floor plan',
  'ye.msk':'Moscow','ye.evn':'Yerevan',
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
