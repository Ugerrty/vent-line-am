/* Vent-Line · Yerevan — i18n (RU по умолчанию в разметке, EN/HY словарями) */
(function(){
'use strict';

var HTML_KEYS = { 'hero.h1b':1, 'night.m2':1 };

var DICT = {
en: {
  'title': 'Vent-Line — ventilation you never see. Design, manufacturing, installation — Yerevan',
  'brand.tag': 'air engineering',
  'skip': 'Skip to content',
  'menu.open': 'Open menu',
  'nav.market':'Market','nav.system':'System','nav.product':'Product','nav.process':'Process',
  'nav.trust':'About','nav.silence':'Silence','nav.climate':'Climate','nav.contact':'Contact',
  'cta.headBtn':'Request a quote',
  'hero.kicker':'Slot diffuser manufacturer · full cycle',
  'hero.h1a':'Ventilation',
  'hero.h1b':'you never <em>see</em>',
  'hero.sub':'We design, manufacture and install ventilation and humidification systems — from the first drawing to quiet air in a finished apartment. Made in the Moscow region. Installed and serviced in Yerevan.',
  'hero.btn1':'Request a quote','hero.btn2':'How the system works',
  'hero.callout':'slot diffuser · 20 mm visible line','hero.hint':'scroll',
  'marquee.line':'Design — Manufacturing — Delivery — Installation — Service — ',
  'market.kicker':'Market',
  'market.h2':'Yerevan is building like never before',
  'market.lead':'We are entering a market growing at a record pace — bringing a segment Armenia doesn’t have yet: concealed slot ventilation and high-pressure humidification straight from the manufacturer.',
  'market.s1':'m² of housing completed in Armenia in 2025',
  'market.s2':'annual growth in housing completions',
  'market.s3':'of Yerevan deals are new builds',
  'market.src':'Data: RA Statistical Committee and industry reviews, 2025–2026',
  'market.nicheCap':'What you can buy in Armenia today — and what you can’t',
  'market.colWhat':'Capability','market.col1':'Stock grilles','market.col2':'Installation firms',
  'market.r1':'Slot diffusers made to your project’s dimensions',
  'market.r2':'Frameless shadow-gap profile, plastered in',
  'market.r3':'High-pressure mist humidification',
  'market.r4':'Design, manufacturing and installation by one team',
  'market.half':'installation only',
  'table.yes':'yes','table.no':'no',
  'market.nicheFoot':'Market research, August 2026: Armenia has no local manufacturing of concealed slot diffusers and no professional mist humidification suppliers.',
  'system.kicker':'System',
  'system.h2':'Ventilation from A to Z — one team',
  'system.lead':'A developer shouldn’t have to chain five subcontractors. We cover the entire engineering scope and answer for the result under a single contract.',
  'system.c1t':'Design',
  'system.c1x':'The ventilation section of your project: air change rates, aerodynamics, specifications. A complete documentation package in 1 day — quote, DWG drawings, 3D models and Revit BIM families (RFA).',
  'system.c2t':'Diffusers',
  'system.c2x':'Our own production of concealed slot diffusers: extruded aluminium, powder coating in any RAL, anodising, veneer. Continuous lines of any length. Lead time from 5 days.',
  'system.c3t':'Humidification',
  'system.c3x':'High-pressure mist humidification — a new line built for Yerevan’s dry climate. The system is as invisible as the diffusers: nozzles are hidden, humidity stays in the comfort zone all year round.',
  'system.c4t':'Installation',
  'system.c4x':'Installation in Yerevan is done by our own crews: rough and finish stages, templates, commissioning, sign-off. One engineer stays with your project from selection to handover.',
  'product.kicker':'Product',
  'product.h2':'Diffuser range',
  'product.lead':'12 series and over 30 models: ceilings, walls, floors. Everything is made to order — to your project’s dimensions, colours and details.',
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
  'night.h2':'22:00. Yerevan falls asleep. The ventilation keeps working.',
  'night.m1':'Good ventilation is never seen.',
  'night.m2':'Good ventilation is never <em>heard</em>.',
  'night.s1':'m/s — air speed in the slot: the silence threshold',
  'night.s2':'m³/h — maximum airflow per line',
  'night.s3':'years — maximum warranty term on profile and geometry',
  'climate.kicker':'Climate',
  'climate.h2':'The driest air is in summer. The driest apartments are in January.',
  'climate.lead':'In summer Yerevan’s humidity sits at the lower edge of the comfort zone. In winter outdoor humidity is high, but heating dries apartments out: outdoor air warmed to +22 °C drops to 20–30 % relative humidity. The 40–60 % comfort zone is only reachable with a humidification system.',
  'climate.band':'comfort zone 40–60 %',
  'climate.labOut':'outdoors','climate.labIn':'indoors in winter',
  'climate.chartAlt':'Chart of air humidity in Yerevan by month: outdoors from 47% in summer to 81% in winter; in a heated apartment it drops to 22% in winter',
  'climate.src':'Average monthly relative humidity, Yerevan; “indoors” is calculated for outdoor air heated to +22 °C during the heating season',
  'climate.out':'That’s why every Yerevan project we deliver includes mist humidification — hidden just like the diffusers: you see only a line of light on the ceiling and hear only the air.',
  'process.kicker':'Process',
  'process.h2':'From floor plan to quiet air',
  'process.t1':'Floor plan','process.x1':'Send us a floor plan or the HVAC section. We’ll sign an NDA if the project is confidential.','process.m1':'day 0',
  'process.t2':'Design & specification','process.x2':'We calculate air change rates, select diffusers and plenums, and return a preliminary specification, an estimate and lead times.','process.m2':'48 hours',
  'process.t3':'Manufacturing','process.x3':'The profile is cut, coated and assembled to your dimensions at our facility in the Moscow region.','process.m3':'from 5 days',
  'process.t4':'Delivery','process.x4':'Armenia is an EAEU member: cargo travels with no customs duties or clearance, under the unified EAC technical regulations.','process.m4':'duty-free',
  'process.t5':'Installation & handover','process.x5':'A Vent-Line crew installs at rough and finish stages, commissions the system and hands the site over with an acceptance report.','process.m5':'Yerevan',
  'process.e1b':'EAEU since 2015','process.e1x':'a single customs territory for Russia and Armenia',
  'process.e2b':'EAC','process.e2x':'certification valid across the whole union',
  'process.e3b':'RU · HY · EN','process.e3x':'project and correspondence in the language you prefer',
  'trust.kicker':'About',
  'trust.h2':'Trusted when there is no room for error',
  'trust.lead':'Since 2011 we have been making ventilation invisible for Russia’s leading developers, architects and private clients. Now that experience works in Armenia.',
  'trust.f1':'production founded','trust.f2':'diffuser series in the catalogue',
  'trust.f3':'models: ceilings, walls, floors','trust.f4b':'1 day','trust.f4':'full documentation package',
  'cta.kicker':'Yerevan · 2026',
  'cta.h2':'Building in Yerevan?',
  'cta.lead':'Send us a floor plan — within 48 hours we’ll return a diffuser specification, an estimate and lead times. Free, with an NDA if needed.',
  'cta.phone':'Phone · Moscow',
  'cta.note':'Mon–Fri 9:00–18:00 · we reply in Russian, Armenian and English',
  'form.name':'Name','form.namePh':'Aram',
  'form.company':'Company / project','form.companyPh':'Residential complex in Arabkir',
  'form.contact':'Phone or Telegram',
  'form.msg':'Your task','form.msgPh':'Floors, apartments, timeline…',
  'form.send':'Send request',
  'form.note':'The button opens a draft in your email client — nothing is sent without your confirmation.',
  'footer.mission':'Invisible air engineering — from drawing to installation.',
  'footer.nav':'Sections','footer.contacts':'Contacts','footer.now':'Now',
  'footer.msk':'Moscow','footer.evn':'Yerevan',
  'footer.legal':'© 2011–2026 Vent-Line · Sole trader G. Spiridonov · TIN 772994390219 · Manufacturing — Moscow region · Installation — Yerevan'
},
hy: {
  'title': 'Vent-Line — օդափոխություն, որը չի երևում։ Նախագիծ, արտադրություն, մոնտաժ — Երևան',
  'brand.tag': 'օդի ինժեներիա',
  'skip': 'Անցնել բովանդակությանը',
  'menu.open': 'Բացել ընտրացանկը',
  'nav.market':'Շուկա','nav.system':'Համակարգ','nav.product':'Արտադրանք','nav.process':'Ընթացք',
  'nav.trust':'Մեր մասին','nav.silence':'Լռություն','nav.climate':'Կլիմա','nav.contact':'Կապ',
  'cta.headBtn':'Հաշվարկել նախագիծը',
  'hero.kicker':'Ճեղքային օդաբաշխիչների արտադրող · ամբողջական ցիկլ',
  'hero.h1a':'Օդափոխություն,',
  'hero.h1b':'որը <em>չի երևում</em>',
  'hero.sub':'Նախագծում, արտադրում և տեղադրում ենք օդափոխության և խոնավացման ինժեներական համակարգեր՝ առաջին գծագրից մինչև հանգիստ օդը պատրաստի բնակարանում։ Արտադրությունը՝ Մոսկվայի մարզ։ Մոնտաժն ու սպասարկումը՝ Երևան։',
  'hero.btn1':'Հաշվարկել նախագիծը','hero.btn2':'Ինչպես է աշխատում համակարգը',
  'hero.callout':'ճեղքային օդաբաշխիչ · տեսանելի գիծը՝ 20 մմ','hero.hint':'ոլորեք',
  'marquee.line':'Նախագիծ — Արտադրություն — Առաքում — Մոնտաժ — Սպասարկում — ',
  'market.kicker':'Շուկա',
  'market.h2':'Երևանը կառուցվում է ինչպես երբեք',
  'market.lead':'Մենք մուտք ենք գործում ռեկորդային տեմպերով աճող շուկա՝ բերելով մի հատված, որը Հայաստանում դեռ չկա՝ թաքնված մոնտաժի ճեղքային օդափոխություն և բարձր ճնշման խոնավացում՝ անմիջապես արտադրողից։',
  'market.s1':'մ² բնակելի տարածք է հանձնվել Հայաստանում 2025-ին',
  'market.s2':'բնակարանաշինության տարեկան աճ',
  'market.s3':'Երևանի գործարքներից՝ նորակառույցներ',
  'market.src':'Տվյալները՝ ՀՀ վիճակագրական կոմիտե և ոլորտային ակնարկներ, 2025–2026',
  'market.nicheCap':'Ինչ կարելի է գնել Հայաստանում այսօր, և ինչ՝ ոչ',
  'market.colWhat':'Հնարավորություն','market.col1':'Պատրաստի վանդակաճաղեր','market.col2':'Մոնտաժային ընկերություններ',
  'market.r1':'Ճեղքային օդաբաշխիչներ՝ ձեր նախագծի չափերով',
  'market.r2':'Ստվերային պրոֆիլ թաքնված մոնտաժի համար',
  'market.r3':'Բարձր ճնշման մառախուղային խոնավացում',
  'market.r4':'Նախագիծ, արտադրություն և մոնտաժ՝ մեկ թիմով',
  'market.half':'միայն մոնտաժ',
  'table.yes':'այո','table.no':'ոչ',
  'market.nicheFoot':'Շուկայի ուսումնասիրություն, օգոստոս 2026. Հայաստանում չկա թաքնված մոնտաժի ճեղքային օդաբաշխիչների տեղական արտադրություն, չկան նաև մառախուղային խոնավացման պրոֆեսիոնալ մատակարարներ։',
  'system.kicker':'Համակարգ',
  'system.h2':'Օդափոխություն Ա-ից Ֆ՝ մեկ թիմով',
  'system.lead':'Կառուցապատողը կարիք չունի հինգ կապալառուից բաղկացած շղթա հավաքելու։ Մենք ամբողջությամբ ստանձնում ենք ինժեներական մասը և մեկ պայմանագրով պատասխանատու ենք արդյունքի համար։',
  'system.c1t':'Նախագծում',
  'system.c1x':'Օդափոխության բաժինը ձեր նախագծի համար՝ օդափոխանակություն, աերոդինամիկա, տեխնիկական բնութագրեր։ Փաստաթղթերի ամբողջական փաթեթ 1 օրում՝ առաջարկ, DWG գծագրեր, 3D մոդելներ և Revit BIM ընտանիքներ (RFA)։',
  'system.c2t':'Օդաբաշխիչներ',
  'system.c2x':'Թաքնված մոնտաժի ճեղքային օդաբաշխիչների սեփական արտադրություն՝ արտամղված ալյումին, փոշեներկում ցանկացած RAL գույնով, անոդացում, շպոն։ Անընդհատ գծեր՝ ցանկացած երկարությամբ։ Արտադրությունը՝ 5 օրից։',
  'system.c3t':'Խոնավացում',
  'system.c3x':'Բարձր ճնշման մառախուղային խոնավացում՝ նոր ուղղություն Երևանի չոր կլիմայի համար։ Համակարգը նույնքան անտեսանելի է, որքան օդաբաշխիչները՝ ցայտիչները թաքնված են, խոնավությունն ամբողջ տարին մնում է հարմարավետ գոտում։',
  'system.c4t':'Մոնտաժ',
  'system.c4x':'Երևանում մոնտաժն իրականացնում են մեր բրիգադները՝ սև և մաքուր փուլեր, շաբլոններ, գործարկում, հանձնում ակտով։ Ինժեներն ուղեկցում է օբյեկտը՝ ընտրությունից մինչև ավարտ։',
  'product.kicker':'Արտադրանք',
  'product.h2':'Օդաբաշխիչների ցանկ',
  'product.lead':'12 սերիա և ավելի քան 30 մոդել՝ առաստաղ, պատեր, հատակ։ Ամեն ինչ պատրաստվում է պատվերով՝ ձեր նախագծի չափերով, գույնով և հանգույցներով։',
  'product.w1':'առաստաղ','product.w2':'առաստաղ · ծեփի տակ','product.w3':'ձգվող առաստաղ',
  'product.w4':'առաստաղ · պատեր','product.w5':'պատեր · օդի փոխանցում','product.w6':'հատակ',
  'product.n1':'անընդհատ գծեր՝ ցանկացած երկարությամբ','product.n2':'ստվերային պրոֆիլ առանց շրջանակի',
  'product.n3':'ներդիրի մագնիսական ամրացում','product.n4':'հոսքի փական և շերտավարագույրներ',
  'product.n5':'պատի հարթության հետ համահարթ','product.n6':'բեռնակիր, պանորամային ապակեպատման համար',
  'unit.mm':'մմ','unit.m3h':'մ³/ժ','unit.ms':'մ/վ',
  'product.hSeries':'Սերիա','product.hWhere':'Մոնտաժ','product.hSlot':'Ճեղք','product.hNote':'Առանձնահատկություն',
  'product.finish':'Պրոֆիլի ծածկույթներ',
  'product.f1':'RAL 9003 · սպիտակ','product.f2':'RAL 9005 · սև','product.f3':'անոդացում',
  'product.f4':'շամպայն','product.f5':'շպոն','product.fAny':'+ ցանկացած RAL՝ ըստ նախագծի',
  'product.callout':'այս սենյակի ամբողջ օդափոխությունը՝ մեկ գծի մեջ',
  'product.silent':'անաղմուկ','product.anyForm':'շառավղային և անկյունային՝ պատվերով',
  'night.kicker':'Լռություն',
  'night.h2':'22:00։ Երևանը քնում է։ Օդափոխությունն աշխատում է։',
  'night.m1':'Լավ օդափոխությունը չի երևում։',
  'night.m2':'Լավ օդափոխությունը <em>չի լսվում</em>։',
  'night.s1':'մ/վ՝ հոսքի արագությունը ճեղքում. լռության շեմը',
  'night.s2':'մ³/ժ՝ օդի առավելագույն ծախսը մեկ գծի վրա',
  'night.s3':'տարի՝ պրոֆիլի և երկրաչափության երաշխիքի առավելագույն ժամկետ',
  'climate.kicker':'Կլիմա',
  'climate.h2':'Ամենաչոր օդը ամռանն է։ Ամենաչոր բնակարանները՝ հունվարին։',
  'climate.lead':'Ամռանը Երևանի խոնավությունը հարմարավետ գոտու ստորին սահմանին է։ Ձմռանը դրսում այն բարձր է, բայց ջեռուցումը չորացնում է բնակարանները՝ մինչև +22 °C տաքացած օդի հարաբերական խոնավությունն իջնում է մինչև 20–30 %։ 40–60 % հարմարավետ գոտին հասանելի է միայն խոնավացման համակարգով։',
  'climate.band':'հարմարավետ գոտի 40–60 %',
  'climate.labOut':'դրսում','climate.labIn':'բնակարանում ձմռանը',
  'climate.chartAlt':'Երևանի օդի խոնավության գծապատկերն ըստ ամիսների. դրսում՝ ամռանը 47 %-ից մինչև ձմռանը 81 %, ջեռուցվող բնակարանում ձմռանը իջնում է մինչև 22 %',
  'climate.src':'Միջին ամսական հարաբերական խոնավություն, Երևան։ «Բնակարանում»՝ հաշվարկ ջեռուցման սեզոնին մինչև +22 °C տաքացած փողոցային օդի համար',
  'climate.out':'Այդ իսկ պատճառով Երևանի յուրաքանչյուր նախագծում ներառում ենք մառախուղային խոնավացում՝ նույնքան թաքնված, որքան օդաբաշխիչները։ Երևում է միայն լույսի գիծն առաստաղին, լսվում է միայն օդը։',
  'process.kicker':'Ընթացք',
  'process.h2':'Հատակագծից մինչև հանգիստ օդ',
  'process.t1':'Հատակագիծ','process.x1':'Ուղարկում եք հատակագիծը կամ օդափոխության բաժինը։ Կստորագրենք NDA, եթե նախագիծը փակ է։','process.m1':'օր 0',
  'process.t2':'Նախագիծ և սպեցիֆիկացիա','process.x2':'Հաշվում ենք օդափոխանակությունը, ընտրում օդաբաշխիչներն ու ադապտերները, վերադարձնում ենք նախնական սպեցիֆիկացիան, նախահաշիվը և ժամկետները։','process.m2':'48 ժամ',
  'process.t3':'Արտադրություն','process.x3':'Պրոֆիլը կտրվում, ներկվում և հավաքվում է ձեր չափերով՝ Մոսկվայի մարզի մեր արտադրամասում։','process.m3':'5 օրից',
  'process.t4':'Առաքում','process.x4':'Հայաստանը ԵԱՏՄ անդամ է՝ բեռը տեղափոխվում է առանց մաքսատուրքերի և մաքսազերծման՝ EAC միասնական տեխնիկական կանոնակարգերով։','process.m4':'առանց տուրքերի',
  'process.t5':'Մոնտաժ և հանձնում','process.x5':'Vent-Line-ի բրիգադը տեղադրում է սև և մաքուր փուլերում, գործարկում է համակարգը և հանձնում օբյեկտը՝ ընդունման ակտով։','process.m5':'Երևան',
  'process.e1b':'ԵԱՏՄ՝ 2015-ից','process.e1x':'Ռուսաստանի և Հայաստանի միասնական մաքսային տարածք',
  'process.e2b':'EAC','process.e2x':'հավաստագրումը գործում է ամբողջ միության տարածքում',
  'process.e3b':'RU · HY · EN','process.e3x':'նախագիծն ու նամակագրությունը՝ ձեզ հարմար լեզվով',
  'trust.kicker':'Մեր մասին',
  'trust.h2':'Մեզ վստահում են, երբ սխալվել չի կարելի',
  'trust.lead':'2011 թվականից մենք օդափոխությունը դարձնում ենք անտեսանելի Ռուսաստանի առաջատար կառուցապատողների, ճարտարապետների և մասնավոր պատվիրատուների համար։ Այժմ այդ փորձն աշխատում է Հայաստանում։',
  'trust.f1':'արտադրության հիմնադրման տարին','trust.f2':'օդաբաշխիչների սերիա կատալոգում',
  'trust.f3':'մոդել՝ առաստաղ, պատեր, հատակ','trust.f4b':'1 օր','trust.f4':'փաստաթղթերի ամբողջական փաթեթ',
  'cta.kicker':'Երևան · 2026',
  'cta.h2':'Կառուցո՞ւմ եք Երևանում',
  'cta.lead':'Ուղարկեք հատակագիծը՝ 48 ժամում կվերադարձնենք օդաբաշխիչների սպեցիֆիկացիան, նախահաշիվը և ժամկետները։ Անվճար, անհրաժեշտության դեպքում՝ NDA-ով։',
  'cta.phone':'Հեռախոս · Մոսկվա',
  'cta.note':'երկ–ուրբ 9:00–18:00 · պատասխանում ենք հայերեն, ռուսերեն և անգլերեն',
  'form.name':'Անուն','form.namePh':'Արամ',
  'form.company':'Ընկերություն / նախագիծ','form.companyPh':'Բնակելի համալիր Արաբկիրում',
  'form.contact':'Հեռախոս կամ Telegram',
  'form.msg':'Ձեր խնդիրը','form.msgPh':'Հարկեր, բնակարաններ, ժամկետներ…',
  'form.send':'Ուղարկել հարցումը',
  'form.note':'Կոճակը կբացի նամակ ձեր փոստում. ոչինչ չի ուղարկվի առանց ձեր հաստատման։',
  'footer.mission':'Օդի անտեսանելի ինժեներիա՝ գծագրից մինչև մոնտաժ։',
  'footer.nav':'Բաժիններ','footer.contacts':'Կապ','footer.now':'Հիմա',
  'footer.msk':'Մոսկվա','footer.evn':'Երևան',
  'footer.legal':'© 2011–2026 Vent-Line · ԱՁ Գ. Սպիրիդոնով · Արտադրությունը՝ Մոսկվայի մարզ · Մոնտաժը՝ Երևան'
}
};

var MONTHS = {
  ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  hy: ['Հնվ','Փտվ','Մրտ','Ապր','Մյս','Հնս','Հլս','Օգս','Սեպ','Հոկ','Նոյ','Դեկ']
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
  return ruSnapshot[key]; /* фолбэк на русский, чтобы не оставить пустоту */
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
  months: function(){ return MONTHS[window.__vlLang || 'ru']; },
  locale: function(){ return LOCALES[window.__vlLang || 'ru']; },
  t: function(key){ snapshotRu(); return pick(window.__vlLang || 'ru', key); }
};
window.__vlLang = 'ru';
})();
