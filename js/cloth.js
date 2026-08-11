/* Vent-Line v6.3 — «бумага на ветру» в 03 «Пространства»: большие кадры
   влетают как листы, цепляются за рамки и продолжают едва заметно колыхаться.
   Один WebGL-канвас на секцию, перспективная камера 1px=1unit на z=0.
   Без PBR/теней GPU — только текстура + аналитическая подсветка волны. */
import * as THREE from 'three';

(function(){
'use strict';

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

var section = document.getElementById('spaces');
if (!section) return;
var frames = Array.prototype.slice.call(section.querySelectorAll('.frame'));
if (!frames.length) return;

var canvas = document.createElement('canvas');
canvas.className = 'cloth-canvas';
canvas.setAttribute('aria-hidden', 'true');

var renderer;
try {
  /* antialias выключен сознательно: MSAA на фреймбуфере во всю секцию
     кладёт Intel HD 4000 на лопатки (2 fps). DPR жёстко 1 по той же причине. */
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true });
} catch (e) { return; }
renderer.setPixelRatio(1);

section.appendChild(canvas);
document.documentElement.classList.add('has-cloth');

var scene = new THREE.Scene();
var FOV = 22;
var camera = new THREE.PerspectiveCamera(FOV, 1, 1, 8000);

var VERT = [
  'uniform float uTime;',
  'uniform float uAmp;',
  'uniform float uCurl;',
  'uniform float uPhase;',
  'uniform vec2  uSize;',
  'uniform vec2  uUvR;',
  'uniform vec2  uUvO;',
  'varying vec2 vUv;',
  'varying float vShade;',
  'void main(){',
  '  vUv = uv * uUvR + uUvO;',
  '  vec3 p = position;',
  '  vec2 n = p.xy / uSize;',                                    /* -0.5..0.5 */
  '  float edge = 0.35 + 0.65 * smoothstep(0.12, 0.5, max(abs(n.x), abs(n.y)));',
  '  float a1 = n.x * 10.0 + uTime * 2.05 + uPhase;',
  '  float a2 = n.x * 4.3  - uTime * 1.35 + uPhase * 2.1;',
  '  float a3 = n.y * 7.5  + uTime * 1.60 + uPhase * 1.4;',
  '  float wave = sin(a1) * 0.52 + sin(a2) * 0.30 + sin(a3) * 0.18;',
  '  float z = uAmp * edge * wave;',
  '  z += uCurl * (n.x + 0.5) * (n.x + 0.5) * uSize.x * 0.20;',  /* закрут хвоста в полёте */
  '  vShade = clamp(1.0 - uAmp * edge * (cos(a1) * 0.52 + cos(a2) * 0.30) * 0.030, 0.84, 1.16);',
  '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p.xy, z, 1.0);',
  '}'
].join('\n');

var FRAG = [
  'uniform sampler2D uMap;',
  'uniform float uBright;',                       /* аналог --img-filter: brightness(.92) тёмной темы */
  'varying vec2 vUv;',
  'varying float vShade;',
  'void main(){',
  '  vec4 c = texture2D(uMap, vUv);',
  '  gl_FragColor = vec4(c.rgb * vShade * uBright, 1.0);',
  '}'
].join('\n');

/* мягкая контактная тень под листом */
var shadowTex = (function(){
  var c = document.createElement('canvas');
  c.width = 128; c.height = 96;
  var x = c.getContext('2d');
  var g = x.createRadialGradient(64, 48, 6, 64, 48, 62);
  g.addColorStop(0, 'rgba(12,10,6,0.55)');
  g.addColorStop(0.6, 'rgba(12,10,6,0.22)');
  g.addColorStop(1, 'rgba(12,10,6,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 96);
  var t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();

var loader = new THREE.TextureLoader();
var papers = [];

frames.forEach(function(frame, i){
  var mask = frame.querySelector('.frame__mask');
  var img = frame.querySelector('img');
  if (!mask || !img) return;

  var mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uMap:   { value: null },
      uBright:{ value: 1 },
      uTime:  { value: 0 },
      uAmp:   { value: 0 },
      uCurl:  { value: 0 },
      uPhase: { value: i * 1.7 },
      uSize:  { value: new THREE.Vector2(1, 1) },
      uUvR:   { value: new THREE.Vector2(1, 1) },
      uUvO:   { value: new THREE.Vector2(0, 0) }
    }
  });
  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 32, 20), mat);
  mesh.visible = false;

  var shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0, depthWrite: false })
  );
  shadow.visible = false;

  scene.add(shadow);
  scene.add(mesh);

  var paper = {
    frame: frame, mask: mask, mesh: mesh, mat: mat, shadow: shadow,
    x: 0, y: 0, w: 10, h: 10, ampScale: 1, imgAspect: 16 / 9,
    t0: 0, landed: false,
    seed: i * 2.31 + 0.7, hover: 0
  };
  loader.load(img.currentSrc || img.src, function(t){
    /* даунскейл до ~1100px: texel/px ≈ 1 — без мипов нет серой полосы
       (волна раздувает UV-производные на кромке, и GPU уходил в дальний мип) */
    var im = t.image, MAX = 1100;
    var k = Math.min(1, MAX / Math.max(im.width, im.height));
    var c = document.createElement('canvas');
    c.width = Math.round(im.width * k);
    c.height = Math.round(im.height * k);
    c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
    var tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    t.dispose();
    paper.imgAspect = c.width / c.height;
    mat.uniforms.uMap.value = tex;
    paper.tex = tex;
    coverUv(paper);
    tryStart(paper);
  }, undefined, function(){
    /* текстура не доехала — возвращаем этому кадру обычный DOM-снимок */
    paper.failed = true;
    frame.classList.add('cloth-fallback');
  });
  frame.addEventListener('mouseenter', function(){ paper.hover = 1; wake(); });
  papers.push(paper);
});

if (!papers.length) return;

function coverUv(p){
  var box = p.w / p.h, im = p.imgAspect;
  var r = p.mat.uniforms.uUvR.value, o = p.mat.uniforms.uUvO.value;
  if (im > box) { r.set(box / im, 1); o.set((1 - r.x) / 2, 0); }
  else { r.set(1, im / box); o.set(0, (1 - r.y) / 2); }
}

var laidOut = false;
function layout(){
  var w = section.clientWidth, h = section.clientHeight;
  if (!w || !h) return;
  laidOut = true;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  var dist = (h / 2) / Math.tan(FOV * Math.PI / 360);
  camera.position.set(w / 2, -h / 2, dist);
  camera.near = Math.max(1, dist - 900);
  camera.far = dist + 900;
  camera.lookAt(w / 2, -h / 2, 0);
  camera.updateProjectionMatrix();

  var s = section.getBoundingClientRect();
  papers.forEach(function(p){
    var r = p.mask.getBoundingClientRect();
    p.w = r.width; p.h = r.height;
    p.x = r.left - s.left + r.width / 2;
    p.y = -(r.top - s.top + r.height / 2);
    p.ampScale = Math.min(2.2, Math.max(1, p.w / 348));
    p.mesh.geometry.dispose();
    p.mesh.geometry = new THREE.PlaneGeometry(p.w, p.h, 32, 20);
    p.mat.uniforms.uSize.value.set(p.w, p.h);
    p.shadow.scale.set(p.w * 1.03, p.h * 1.03, 1);
    coverUv(p);
  });
}

/* ── таймлайн ─────────────────────────────────────────────────── */
var DUR = 1.35;
function outCubic(t){ return 1 - Math.pow(1 - t, 3); }
function outBack(t){ var s = 1.2; t -= 1; return 1 + t * t * ((s + 1) * t + s); }

var visible = false, rafId = 0;
/* сторож производительности: если кадр стабильно дольше 45 мс,
   выключаем вечное колыхание — листы замирают после посадки */
var ema = 16, ticks = 0, lastTick = 0, lowPower = false;

function frameTick(ts){
  rafId = 0;
  if (!visible || document.hidden) return;

  if (lastTick) {
    var dt = ts - lastTick;
    if (dt < 500) {
      ema = ema * 0.9 + dt * 0.1;
      ticks++;
      if (!lowPower && ticks > 30 && ema > 45) lowPower = true;
    }
  }
  lastTick = ts;

  var needRender = false, keepLooping = false;

  papers.forEach(function(p){
    if (!p.t0 || !p.inView) return;
    var t = (ts - p.t0) / 1000;
    if (t <= 0) { keepLooping = true; return; }
    p.mesh.visible = true;
    p.shadow.visible = true;
    var u = p.mat.uniforms;
    u.uTime.value = ts / 1000;
    var A = p.ampScale;
    needRender = true;

    var lt = t / DUR;
    if (lt < 1) {
      keepLooping = true;
      var eP = outBack(Math.min(1, lt));
      var eR = outCubic(Math.min(1, lt));
      var dx = (420 + (p.seed % 1) * 180) * A;
      var dy = (60 + (p.seed % 0.7) * 120) * A;
      p.mesh.position.set(
        p.x + dx * (1 - eP),
        p.y - dy * (1 - eP) + Math.sin(eR * Math.PI) * 30 * A,
        0
      );
      p.mesh.rotation.z = -(0.13 + (p.seed % 0.5) * 0.1) * (1 - eR);
      p.mesh.rotation.y = 0.5 * (1 - eR);
      u.uAmp.value = (15 - 9 * eR) * A;
      u.uCurl.value = 0.8 * (1 - eR);
      p.shadow.material.opacity = 0.12 * eR;
      p.shadow.position.set(p.mesh.position.x + 26 * (1 - eR) + 12, p.mesh.position.y - 30 * (1 - eR) - 16, -20);
    } else {
      if (!p.landed) { p.landed = true; p.snapT = t; }
      p.mesh.position.set(p.x, p.y, 0);
      p.mesh.rotation.set(0, 0, 0);
      u.uCurl.value = 0;
      p.hover *= 0.94;
      if (lowPower) {
        /* слабое железо: короткое затухание после посадки или ховера — и покой */
        var tail = Math.exp(-(t - p.snapT) * 2.6) * 8 * A + p.hover * 7 * A;
        u.uAmp.value = p.frozen ? (p.frozenAmp || 0) : tail;
        if (tail > 0.15) keepLooping = true;
      } else {
        /* щелчок фиксации: всплеск и экспоненциальное затухание */
        var snap = Math.exp(-(t - p.snapT) * 2.6) * 8 * A;
        /* порывы ветра: биение двух медленных синусов, только положительная фаза */
        var g = Math.sin(t * 0.53 + p.seed) * Math.sin(t * 0.221 + p.seed * 3.1);
        var gust = Math.max(0, g) * 2.6 * A;
        u.uAmp.value = p.frozen ? (p.frozenAmp || 0) : 1.8 * A + snap + gust + p.hover * 7 * A;
        keepLooping = true;
      }
      p.shadow.material.opacity = 0.14 + Math.min(0.07, u.uAmp.value * 0.004);
      p.shadow.position.set(p.x + 12, p.y - 16, -20);
    }
  });

  if (needRender) renderer.render(scene, camera);
  if (keepLooping) rafId = requestAnimationFrame(frameTick);
  else lastTick = 0;
}

function wake(){
  if (!rafId && visible && !document.hidden) { lastTick = 0; rafId = requestAnimationFrame(frameTick); }
}

/* старт полёта только когда кадр доехал И текстура готова */
function tryStart(p){
  if (p.wantStart && p.tex && !p.t0 && !p.failed) {
    if (!laidOut) layout();
    p.t0 = performance.now() + 120;
    wake();
  }
}

/* секция видима → рендерим; каждый кадр стартует, когда доезжает сам.
   IO отдаёт ПАЧКУ записей (старые первыми) — актуально последнее состояние */
var secIo = new IntersectionObserver(function(en){
  visible = en[en.length - 1].isIntersecting;
  if (visible && !laidOut) layout();
  wake();
}, { threshold: 0.02, rootMargin: '120px 0px' });
secIo.observe(section);

var frameIo = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if (!en.isIntersecting) return;
    papers.forEach(function(p){
      if (p.frame === en.target) { p.wantStart = true; tryStart(p); }
    });
    frameIo.unobserve(en.target);
  });
}, { threshold: 0.22 });
papers.forEach(function(p){ frameIo.observe(p.frame); });

/* видимость каждого листа: вне вьюпорта его не обсчитываем и не рисуем */
var visIo = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    papers.forEach(function(p){
      if (p.frame === en.target) p.inView = en.isIntersecting;
    });
  });
  wake();
}, { rootMargin: '200px 0px' });
papers.forEach(function(p){ visIo.observe(p.frame); });

/* яркость листа следует за темой (--img-filter: brightness(.92) в тёмной) */
function applyBright(){
  var light = document.documentElement.getAttribute('data-theme') === 'light';
  papers.forEach(function(p){ p.mat.uniforms.uBright.value = light ? 1 : 0.92; });
  wake();
}
applyBright();
document.addEventListener('vl:theme', applyBright);

document.addEventListener('visibilitychange', wake);
window.addEventListener('resize', function(){ if (laidOut) layout(); });
/* поздняя загрузка шрифтов/картинок двигает раскладку — держим листы в рамках */
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(function(){ if (laidOut) layout(); }).observe(section);
}
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(function(){ if (laidOut) layout(); });
}

/* отладочный хук: мгновенно перейти к «уложенному» состоянию */
window.__cloth = {
  finish: function(){
    layout();
    var now = performance.now();
    papers.forEach(function(p){
      if (!p.tex) return;
      p.t0 = now - 20000; p.landed = false; p.frozen = false; p.inView = true;
    });
    visible = true;
    wake();
  },
  freeze: function(amp){
    window.__cloth.finish();
    papers.forEach(function(p){ p.frozen = true; p.frozenAmp = amp || 0; });
  },
  report: function(){
    var s = section.getBoundingClientRect();
    return papers.map(function(p){
      var r = p.mask.getBoundingClientRect();
      return {
        mask: [Math.round(r.left - s.left), Math.round(r.top - s.top), Math.round(r.width), Math.round(r.height)],
        mesh: [Math.round(p.mesh.position.x), Math.round(p.mesh.position.y)],
        amp: +p.mat.uniforms.uAmp.value.toFixed(2), t0: !!p.t0
      };
    });
  }
};
})();
