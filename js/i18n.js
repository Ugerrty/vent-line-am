/* Vent-Line v3 — i18n: RU (в разметке) + EN (словарь) */
(function(){
'use strict';

var HTML_KEYS = { 'hero.h1b':1, 'night.m2':1 };

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see',
  'brand.tag': 'air engineering',
  'skip': 'Skip to content',
  'menu.open': 'Open menu',
  'nav.brand':'Brand','nav.slots':'Slots','nav.system':'System','nav.product':'Product',
  'nav.process':'Process','nav.trust':'Addresses','nav.silence':'Silence','nav.contact':'Contact',
  'cta.headBtn':'Request a quote',
  'hero.kicker':'Concealed slot diffuser manufacturer',
  'hero.h1a':'Ventilation',
  'hero.h1b':'you never see',
  'hero.sub':'Design, manufacturing, humidification and installation — a full cycle from the manufacturer trusted by the finest addresses of Moscow, Dubai and Bangkok.',
  'hero.btn1':'Request a quote','hero.btn2':'Open the slots',
  'hero.hint':'scroll',
  'slots.kicker':'Slots',
  'slots.h2':'All the client ever sees is a line',
  'slots.lead':'Everything else hides behind the ceiling. Pull the line — every slot on this page opens the way our profile opens in an interior.',
  'slots.c1':'Ceiling · S PRO series','slots.t1':'Ceiling','slots.x1':'continuous line · any length',
  'slots.c2':'Wall · L series','slots.t2':'Wall','slots.x2':'flush with the plane · transfer air',
  'slots.c3':'Floor · M-PL series','slots.t3':'Floor','slots.x3':'load-bearing · by panoramic glazing',
  'unit.day':'day','unit.days':'days',
  'marquee.line':'Design — Manufacturing — Delivery — Installation — Service — ',
  'brandsec.kicker':'Brand',
  'brandsec.h2':'Air is part of architecture',
  'brandsec.lead':'Since 2011 Vent-Line has been making ventilation invisible. Our lines run through the finest properties of Moscow, Dubai, Bangkok and CIS cities — where architecture tolerates no extra details. Now our engineering team works in Yerevan as well.',
  'geo.msk':'Moscow','geo.dxb':'Dubai','geo.bkk':'Bangkok','geo.evn':'Yerevan',
  'line.kicker':'Line',
  'line.h2':'A continuous line. Any length.',
  'line.x':'Extruded aluminium profile with no visible joints. Follow it with your eyes — just like on a finished ceiling.',
  'line.f3':'RAL · anodising · veneer',
  'system.kicker':'System',
  'system.h2':'A to Z — one team',
  'system.lead':'Four disciplines, one contract, one point of responsibility. Hover a row — it opens.',
  'system.c1t':'Design',
  'system.c1x':'The ventilation section of your project: air change rates, aerodynamics, specifications. Complete documentation in 1 day, Revit BIM families.',
  'system.c2t':'Diffusers',
  'system.c2x':'Our own production: extruded aluminium, any RAL, anodising, veneer. Continuous lines of any length.',
  'system.c3t':'Humidification',
  'system.c3x':'High-pressure mist humidification — as invisible as the diffusers. Humidity stays in the comfort zone all year round.',
  'system.c4t':'Installation',
  'system.c4x':'Our crews handle rough and finish stages, commissioning and sign-off. In Yerevan — our own installation team.',
  'product.kicker':'Product',
  'product.h2':'Diffuser range',
  'product.lead':'12 series, over 30 models. Everything is made to order — to your project’s dimensions and details.',
  'product.w1':'ceiling','product.w2':'ceiling · plastered in','product.w3':'stretch ceiling',
  'product.w4':'ceiling · walls','product.w5':'walls · transfer air','product.w6':'floor',
  'product.n1':'continuous lines of any length','product.n2':'frameless shadow-gap profile',
  'product.n3':'magnetic insert mounting','product.n4':'airflow damper and louvres',
  'product.n5':'flush with the wall plane','product.n6':'load-bearing, for panoramic glazing',
  'unit.mm':'mm','unit.m3h':'m³/h','unit.ms':'m/s',
  'product.hSeries':'Series','product.hWhere':'Mounting','product.hSlot':'Slot','product.hNote':'Detail',
  'product.finish':'Profile finishes',
  'product.f1':'RAL 9003 · white','product.f2':'RAL 9005 · black','product.f3':'anodised',
  'product.f4':'champagne','product.f5':'veneer','product.fAny':'+ any RAL to project',
  'product.callout':'all of this room’s ventilation — in a single line',
  'product.silent':'silent','product.anyForm':'curved and corner units — made to order',
  'night.kicker':'Silence',
  'night.h2':'22:00. The city falls asleep. The ventilation keeps working.',
  'night.m1':'Good ventilation is never seen.',
  'night.m2':'Good ventilation is never <em>heard</em>.',
  'night.s1':'m/s — air speed in the slot: the silence threshold',
  'night.s2':'m³/h — maximum airflow per line',
  'night.s3':'years — maximum warranty term on profile and geometry',
  'process.kicker':'Process',
  'process.h2':'From floor plan to quiet air',
  'process.t1':'Floor plan','process.m1':'day 0',
  'process.t2':'Specification & estimate','process.m2':'48 hours',
  'process.t3':'Manufacturing','process.m3':'from 5 days',
  'process.t4':'Delivery','process.m4':'RU · CIS · UAE · Thailand',
  'process.t5':'Installation & handover','process.m5':'turnkey',
  'process.note':'To Armenia — no duties or customs clearance: the single EAEU space, EAC certification',
  'trust.kicker':'Addresses',
  'trust.h2':'Trusted when there is no room for error',
  'trust.lead':'Since 2011 — premium residential and public spaces across Russia, the UAE, Thailand and CIS cities.',
  'addr.g1':'Moscow · business district towers',
  'addr.g2':'Moscow region · residences',
  'addr.g3':'Moscow · commercial spaces',
  'addr.g4':'Moscow · residential quarters',
  'addr.n5':'Private residences','addr.g5':'Dubai, UAE',
  'addr.n6':'Private villas','addr.g6':'Bangkok, Thailand',
  'trust.f1':'production founded','trust.f2':'diffuser series in the catalogue',
  'trust.f3':'models: ceilings, walls, floors','trust.f4b':'1 day','trust.f4':'full documentation package',
  'cta.kicker':'Vent-Line · 2026',
  'cta.h2':'Let’s discuss your project',
  'cta.lead':'Send us a floor plan — within 48 hours we’ll return a preliminary specification, an estimate and lead times. We work with Russia and the CIS, the UAE and Thailand; in Yerevan we have our own installation crews.',
  'cta.phone':'Phone · Moscow',
  'cta.note':'Mon–Fri 9:00–18:00 · we reply in Russian and English',
  'form.name':'Name','form.namePh':'Name',
  'form.company':'Company / project','form.companyPh':'Residential complex, hotel, residence…',
  'form.contact':'Phone or Telegram',
  'form.msg':'Your task','form.msgPh':'Floors, apartments, timeline…',
  'form.send':'Send request',
  'form.note':'The button opens a draft in your email client — nothing is sent without your confirmation.',
  'footer.mission':'Invisible air engineering — from drawing to installation.',
  'footer.nav':'Sections','footer.contacts':'Contacts','footer.now':'Now',
  'footer.msk':'Moscow','footer.evn':'Yerevan',
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
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
    var k = el.getAttribute('data-i18n-ph') + '@ph';
    if (!(k in ruSnapshot)) ruSnapshot[k] = el.getAttribute('placeholder') || '';
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
    var k = el.getAttribute('data-i18n-aria') + '@aria';
    if (!(k in ruSnapshot)) ruSnapshot[k] = el.getAttribute('aria-label') || '';
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
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
    var phKey = el.getAttribute('data-i18n-ph');
    var v = lang === 'ru' ? ruSnapshot[phKey + '@ph'] : pick(lang, phKey);
    if (v != null) el.setAttribute('placeholder', v);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
    var k = el.getAttribute('data-i18n-aria');
    var v = lang === 'ru' ? ruSnapshot[k + '@aria'] : pick(lang, k);
    if (v != null) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('.lang__btn').forEach(function(b){
    var on = b.getAttribute('data-lang') === lang;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  try { localStorage.setItem('vl-lang', lang); } catch(e){}
  window.__vlLang = lang;
  window.dispatchEvent(new CustomEvent('vl:lang', { detail: { lang: lang } }));
}

window.VL_I18N = {
  setLang: setLang,
  locale: function(){ return LOCALES[window.__vlLang || 'ru']; },
  t: function(key){ snapshotRu(); return pick(window.__vlLang || 'ru', key); }
};
window.__vlLang = 'ru';
})();
