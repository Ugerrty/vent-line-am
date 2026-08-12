/* Vent-Line v6 — i18n: RU (в разметке) + EN (словарь) */
(function(){
'use strict';

var HTML_KEYS = { 'sh.q': 1 };

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see',
  'skip': 'Skip to content',
  'nav.line':'Grilles','nav.design':'Design','nav.service':'Service','nav.yerevan':'Yerevan','nav.contact':'Contact',
  'hero.kicker':'Design · supply · installation · maintenance',
  'hero.h1a':'Ventilation',
  'hero.h1b':'you never see',
  'hero.sub':'We design, supply, install and maintain ventilation — turnkey. An engineering team trusted by the finest addresses of Moscow, Dubai and Bangkok.',
  'hero.btn1':'Discuss a project',
  'mf.kicker':'Brand',
  'mf.a':'Since 2011 we have been making engineering invisible.',
  'mf.b':'We design, supply, install and maintain ventilation',
  'mf.c':' — from a section in the drawings to quiet air in the finished interior. Moscow, Dubai, Bangkok, CIS cities. Now — Yerevan.',
  'mf.f1':'founded','mf.v2':'48 h','mf.f2':'specification from a floor plan','mf.v3':'1 day','mf.f3':'working drawings','mf.f4':'cities',
  'line.kicker':'Manufacturing',
  'line.h2':'Grilles of our own make',
  'line.x':'Our own large factory near Moscow: modern machinery, powder coating, anodising, veneer. Twelve grille series for ceilings, walls and floors — cut to your project, from 5 days.',
  'unit.mm':'mm',
  'line.l1':'visible slot','line.l2b':'any','line.l2':'length, no joints','line.l3':'coating · anodising · veneer',
  'line.color':'Colour','line.cb':'Black','line.cw':'White',
  'line.cta':'Request a quote','pj.cta':'Become the next project',
  'ds.cta':'Specification in 48 hours','sv.cta':'Discuss installation','sv.cont':'service goes on',
  'nav.spaces':'Projects',
  'hero.btn2':'See the projects',
  'pj.kicker':'Projects',
  'pj.h2':'Installed — and dissolved into the interior',
  'pj.lead':'Shots from our sites: the grilles already breathe in these ceilings and walls — you just can’t see them.',
  'pj.note':'more shots — @vent_line.ru',
  'sh.q':'The ventilation here is ours — <em>you simply can’t see it</em>',
  'stp.k':'Live feed',
  'sh1.c':'Moscow','sh2.c':'Armenia','sh2.t':'Projects in Yerevan',
  'sh3.c':'Moscow region','sh4.c':'UAE','sh4.t':'Private houses, Dubai',
  'sh5.c':'Thailand','sh5.t':'Residences, Bangkok',
  'sil.kicker':'Silence',
  'sil.a':'Good ventilation is never seen.',
  'sil.b':'Good ventilation is never heard.',
  'sil.c':'Only the air remains.',
  'unit.ms':'m/s','unit.m3h':'m³/h','unit.years':'yrs',
  'sil.s1':'speed in the slot — the silence threshold',
  'sil.s2':'airflow per line',
  'sil.s3':'humidity with mist humidification','unit.rh':'%',
  'ds.kicker':'Design',
  'ds.h2':'A ventilation section — for your project',
  'ds.lead':'We calculate air change rates for your layouts, build concealed grilles into the architecture and hand over documentation you can build from.',
  'ds1.t':'Calculation','ds1.x':'Air change rates, aerodynamics, acoustics: slot sections sized so the air stays quiet.','ds1.m':'≤ 2 m/s',
  'ds2.t':'Specification & estimate','ds2.x':'A preliminary specification and estimate from your floor plan — before the contract starts.','ds2.m':'48 hours',
  'ds3.t':'Working drawings','ds3.x':'The ventilation section and Revit BIM families — fitted into your design schedule.','ds3.m':'1 day',
  'sv.kicker':'Installation & service',
  'sv.h2':'We install — and stay close',
  'sv1.t':'Installation & commissioning','sv1.x':'Our crews: rough-in and finish stages, airflow balancing, sign-off. In Yerevan — our own team.','sv1.m':'turnkey',
  'sv2.t':'Scheduled maintenance','sv2.x':'Cleaning slots and grilles, checking fixings, re-balancing — on your building’s schedule.','sv2.m':'on schedule',
  'sv3.t':'Humidification service','sv3.x':'We maintain high-pressure mist systems: nozzles, filters, controls. 40–60 % humidity all year round.',
  'sv4.t':'Warranty & support','sv4.x':'Manufacturer warranty on the grilles and the completed installation — and service support after handover.','sv4.m':'after handover',
  'ye.kicker':'A new chapter',
  'ye.h2':'Yerevan',
  'ye.lead':'Armenia is building a record amount of premium housing — and the invisible-ventilation segment doesn’t exist on the market yet. We bring the full cycle from day one: design, supply, installation and maintenance — our own crews in Yerevan.',
  'ye.r1b':'No duties, no customs','ye.r1':'the EAEU single customs territory; EAC certification is valid in Armenia',
  'ye.r2b':'Our own crews in Yerevan','ye.r2':'installation, commissioning and sign-off — no subcontractors',
  'ye.r3b':'48 hours','ye.r3':'a preliminary specification and estimate from your floor plan',
  'ye.msk':'Moscow','ye.evn':'Yerevan',
  'ct.kicker':'Contact',
  'ct.h2':'Let’s discuss your project',
  'ct.lead':'Send us a floor plan — within 48 hours we’ll return a preliminary specification, an estimate and lead times.',
  'ct.note':'Mon–Fri 9:00–18:00 (Moscow) · Russian / English',
  'form.name':'Name','form.company':'Company or project','form.contact':'Phone or Telegram',
  'form.msg':'About your project','form.send':'Send',
  'form.note':'The button opens a draft in your email client — nothing is sent without confirmation.',
  'footer.legal':'© 2011–2026 Vent-Line · Sole trader G. G. Spiridonov · TIN 772994390219 · Manufacturing — Moscow region · Installation — Yerevan'
},
hy: {
  'title': 'Vent-Line — օդափոխություն, որը չի երևում',
  'skip': 'Անցնել բովանդակությանը',
  'nav.line':'Վանդակաճաղեր','nav.spaces':'Նախագծեր','nav.design':'Նախագծում','nav.service':'Սպասարկում','nav.yerevan':'Երևան','nav.contact':'Կապ',
  'hero.kicker':'ՆԱԽԱԳԾՈՒՄ · ՄԱՏԱԿԱՐԱՐՈՒՄ · ՄՈՆՏԱԺ · ՍՊԱՍԱՐԿՈՒՄ',
  'hero.h1a':'ՕԴԱՓՈԽՈՒԹՅՈՒՆ,',
  'hero.h1b':'ՈՐԸ ՉԻ ԵՐԵՎՈՒՄ',
  'hero.sub':'Նախագծում, մատակարարում, մոնտաժ և սպասարկում՝ «բանալին ձեռքին»։ Ինժեներական թիմ, որին վստահում են Մոսկվայի, Դուբայի և Բանգկոկի լավագույն հասցեները։',
  'hero.btn1':'Քննարկել նախագիծը','hero.btn2':'Դիտել նախագծերը',
  'mf.kicker':'ԱՊՐԱՆՔԱՆԻՇ',
  'mf.a':'2011 թվականից մենք ինժեներիան դարձնում ենք անտեսանելի։',
  'mf.b':'Նախագծում, մատակարարում, մոնտաժ և սպասարկում',
  'mf.c':'՝ նախագծի բաժնից մինչև հանգիստ օդը պատրաստի ինտերիերում։ Մոսկվա, Դուբայ, Բանգկոկ, ԱՊՀ քաղաքներ։ Այժմ՝ Երևան։',
  'mf.f1':'հիմնադրման տարի','mf.v2':'48 ժ','mf.f2':'նախնական հաշվարկ հատակագծով','mf.v3':'1 օր','mf.f3':'աշխատանքային փաստաթղթեր','mf.f4':'ներկայության քաղաքներ',
  'line.kicker':'ԱՐՏԱԴՐՈՒԹՅՈՒՆ',
  'line.h2':'Սեփական արտադրության վանդակաճաղեր',
  'line.x':'Սեփական խոշոր գործարան Մոսկվայի մարզում՝ ժամանակակից հաստոցներ, փոշային ներկում, անոդացում, երեսպատում։ Տասներկու սերիա՝ առաստաղի, պատերի և հատակի համար, ձեր նախագծի չափսերով՝ 5 օրից։',
  'unit.mm':'մմ',
  'line.l1':'տեսանելի ճեղք','line.l2b':'ցանկացած','line.l2':'երկարություն՝ առանց կցվանքների','line.l3':'ներկում · անոդացում · երեսպատում',
  'line.color':'Գույն','line.cb':'Սև','line.cw':'Սպիտակ',
  'line.cta':'Ստանալ հաշվարկ','pj.cta':'Դառնալ հաջորդ նախագիծը',
  'ds.cta':'Սպեցիֆիկացիա 48 ժամում','sv.cta':'Քննարկել մոնտաժը','sv.cont':'ՍՊԱՍԱՐԿՈՒՄԸ ՇԱՐՈՒՆԱԿՎՈՒՄ Է',
  'pj.kicker':'ՆԱԽԱԳԾԵՐ',
  'pj.h2':'Մոնտաժված է և ձուլված ինտերիերին',
  'pj.lead':'Կադրեր մեր օբյեկտներից. վանդակաճաղերն արդեն շնչում են այս առաստաղներում և պատերում՝ պարզապես դրանք չեն երևում։',
  'pj.note':'ԱՎԵԼԻ ՇԱՏ ԿԱԴՐԵՐ՝ @VENT_LINE.RU',
  'sh.q':'Այստեղ օդափոխությունը մերն է՝ <em>պարզապես այն չի երևում</em>',
  'stp.k':'ԿԵՆԴԱՆԻ ՖՈՏՈՇԱՐՔ',
  'sh1.c':'ՄՈՍԿՎԱ','sh2.c':'ՀԱՅԱՍՏԱՆ','sh2.t':'ՆԱԽԱԳԾԵՐ ԵՐԵՎԱՆՈՒՄ',
  'sh3.c':'ՄՈՍԿՎԱՅԻ ՄԱՐԶ','sh4.c':'ԱՄԷ','sh4.t':'ՄԱՍՆԱՎՈՐ ՏՆԵՐ, ԴՈՒԲԱՅ',
  'sh5.c':'ԹԱԻԼԱՆԴ','sh5.t':'ՌԵԶԻԴԵՆՑԻԱՆԵՐ, ԲԱՆԳԿՈԿ',
  'sil.kicker':'ԼՌՈՒԹՅՈՒՆ',
  'sil.a':'Լավ օդափոխությունը չի երևում։',
  'sil.b':'Լավ օդափոխությունը չի լսվում։',
  'sil.c':'Մնում է միայն օդը։',
  'unit.ms':'մ/վ','unit.m3h':'մ³/ժ','unit.years':'տարի','unit.rh':'%',
  'sil.s1':'օդի արագությունը ճեղքի մեջ՝ լռության շեմը',
  'sil.s2':'օդի ծախսը մեկ գծի հաշվով',
  'sil.s3':'խոնավություն ցողային խոնավացմամբ',
  'ds.kicker':'ՆԱԽԱԳԾՈՒՄ',
  'ds.h2':'Օդափոխության բաժին՝ ձեր նախագծի համար',
  'ds.lead':'Հաշվում ենք օդափոխանակությունը հատակագծերի համար, թաքնված վանդակաճաղերը ներկառուցում ենք ճարտարապետության մեջ և հանձնում փաստաթղթեր, որոնցով կարելի է կառուցել։',
  'ds1.t':'ՀԱՇՎԱՐԿ','ds1.x':'Օդափոխանակություն, աերոդինամիկա, ակուստիկա. ճեղքերի հատույթներն ընտրում ենք այնպես, որ օդը մնա հանգիստ։','ds1.m':'≤ 2 Մ/Վ',
  'ds2.t':'ՍՊԵՑԻՖԻԿԱՑԻԱ և ՆԱԽԱՀԱՇԻՎ','ds2.x':'Նախնական սպեցիֆիկացիա և նախահաշիվ հատակագծով՝ մինչև պայմանագրի կնքումը։','ds2.m':'48 ԺԱՄ',
  'ds3.t':'ԱՇԽԱՏԱՆՔԱՅԻՆ ՓԱՍՏԱԹՂԹԵՐ','ds3.x':'Օդափոխության բաժինը և Revit BIM ընտանիքները՝ ձեր նախագծման ժամանակացույցին համապատասխան։','ds3.m':'1 ՕՐ',
  'sv.kicker':'ՄՈՆՏԱԺ և ՍՊԱՍԱՐԿՈՒՄ',
  'sv.h2':'Մոնտաժում ենք և մնում ենք ձեր կողքին',
  'sv1.t':'ՄՈՆՏԱԺ և ԿԱՐԳԱԲԵՐՈՒՄ','sv1.x':'Մեր բրիգադները՝ նախնական և ավարտական փուլեր, օդի ծախսերի հավասարակշռում, հանձնում ակտով։ Երևանում՝ սեփական թիմ։','sv1.m':'«ԲԱՆԱԼԻՆ ՁԵՌՔԻՆ»',
  'sv2.t':'ՊԼԱՆԱՅԻՆ ՍՊԱՍԱՐԿՈՒՄ','sv2.x':'Ճեղքերի և վանդակաճաղերի մաքրում, ամրացումների ստուգում, կրկնական հավասարակշռում՝ ձեր օբյեկտի գրաֆիկով։','sv2.m':'ԳՐԱՖԻԿՈՎ',
  'sv3.t':'ԽՈՆԱՎԱՑՄԱՆ ՍՊԱՍԱՐԿՈՒՄ','sv3.x':'Սպասարկում ենք բարձր ճնշման ցողային համակարգերը՝ ցայտիչներ, ֆիլտրեր, ավտոմատիկա։ 40–60 % խոնավություն ամբողջ տարին։',
  'sv4.t':'ԵՐԱՇԽԻՔ և ԱՋԱԿՑՈՒԹՅՈՒՆ','sv4.x':'Արտադրողի երաշխիք վանդակաճաղերի և կատարված մոնտաժի համար, ինչպես նաև սերվիսային աջակցություն օբյեկտի հանձնումից հետո։','sv4.m':'ՀԱՆՁՆՈՒՄԻՑ ՀԵՏՈ',
  'ye.kicker':'ՆՈՐ ԳԼՈՒԽ',
  'ye.h2':'ԵՐԵՎԱՆ',
  'ye.lead':'Հայաստանը ռեկորդային ծավալով պրեմիում բնակարաններ է կառուցում, իսկ անտեսանելի օդափոխության հատվածը շուկայում դեռ չկա։ Մենք գալիս ենք ամբողջ ցիկլով միանգամից՝ նախագծում, մատակարարում, մոնտաժ և սպասարկում. սեփական բրիգադներ Երևանում։',
  'ye.r1b':'Առանց մաքսատուրքերի','ye.r1':'ԵԱՏՄ միասնական տարածք. EAC հավաստագրումը գործում է Հայաստանում',
  'ye.r2b':'Սեփական բրիգադներ Երևանում','ye.r2':'մոնտաժ, կարգաբերում և հանձնում ակտով՝ առանց ենթակապալի',
  'ye.r3b':'48 ժամ','ye.r3':'նախնական սպեցիֆիկացիա և նախահաշիվ ձեր հատակագծով',
  'ye.msk':'ՄՈՍԿՎԱ','ye.evn':'ԵՐԵՎԱՆ',
  'ct.kicker':'ԿԱՊ',
  'ct.h2':'Քննարկենք ձեր օբյեկտը',
  'ct.lead':'Ուղարկեք հատակագիծը՝ 48 ժամում կներկայացնենք նախնական սպեցիֆիկացիան, նախահաշիվը և ժամկետները։',
  'ct.note':'ԵՐԿ–ՈՒՐԲ 9:00–18:00 (ՄՈՍԿՎԱ) · ՌՈՒՍԵՐԵՆ / ԱՆԳԼԵՐԵՆ',
  'form.name':'Անուն','form.company':'Ընկերություն կամ նախագիծ','form.contact':'Հեռախոս կամ Telegram',
  'form.msg':'Առաջադրանքի մասին','form.send':'Ուղարկել',
  'form.note':'ԿՈՃԱԿԸ ԿԲԱՑԻ ՆԱՄԱԿԻ ՍԵՎԱԳԻՐ ՁԵՐ ՓՈՍՏՈՒՄ. ԱՌԱՆՑ ՀԱՍՏԱՏՄԱՆ ՈՉԻՆՉ ՉԻ ՈՒՂԱՐԿՎԻ։',
  'footer.legal':'© 2011–2026 VENT-LINE · ԱՁ Գ. ՍՊԻՐԻԴՈՆՈՎ · ՀՎՀՀ 772994390219 · ԱՐՏԱԴՐՈՒԹՅՈՒՆԸ՝ ՄՈՍԿՎԱՅԻ ՄԱՐԶ · ՄՈՆՏԱԺԸ՝ ԵՐԵՎԱՆ'
}
};

var LOCALES = { ru:'ru-RU', en:'en-US', hy:'hy-AM' };
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
