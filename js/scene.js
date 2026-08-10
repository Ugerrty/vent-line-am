/* Vent-Line v3 — два 3D-эпизода на одном STL-профиле:
   hero  — золотой профиль на синем, лёгкое дыхание + drag-вращение;
   line  — графитовый профиль на белом, камера едет вдоль по скроллу.
   Только MeshMatcapMaterial (слабые GPU). Ошибка любого этапа — тихий фолбэк. */
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

(function(){
'use strict';

var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) return;
if (typeof DecompressionStream === 'undefined') return;

var heroCanvas = document.getElementById('hero-canvas');
var lineCanvas = document.getElementById('line-canvas');
var lineSection = document.getElementById('line');
var linePin = document.getElementById('line-pin');
var heroSection = document.getElementById('hero');

var DPR = Math.min(1.25, window.devicePixelRatio || 1);

function matcapTexture(stops, rim){
  var c = document.createElement('canvas');
  c.width = c.height = 256;
  var x = c.getContext('2d');
  var g = x.createRadialGradient(92, 80, 10, 128, 128, 152);
  stops.forEach(function(s){ g.addColorStop(s[0], s[1]); });
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  if (rim) {
    var g2 = x.createRadialGradient(rim[0], rim[1], 6, rim[0], rim[1], 100);
    g2.addColorStop(0, rim[2]);
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g2;
    x.fillRect(0, 0, 256, 256);
  }
  var t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

var GOLD = [
  [0.00, '#FFF6DF'],
  [0.22, '#EFD9A2'],
  [0.48, '#C9A96A'],
  [0.74, '#8F7238'],
  [1.00, '#3A2D12']
];
var GRAPHITE = [
  [0.00, '#8a8d92'],
  [0.28, '#3f4247'],
  [0.62, '#232528'],
  [1.00, '#0c0d0f']
];

function shadowTexture(alpha){
  var c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  var x = c.getContext('2d');
  var g = x.createRadialGradient(128, 32, 4, 128, 32, 120);
  g.addColorStop(0, 'rgba(4,10,20,' + alpha + ')');
  g.addColorStop(1, 'rgba(4,10,20,0)');
  x.save();
  x.scale(1, 0.25);
  x.fillStyle = g;
  x.beginPath();
  x.arc(128, 128, 120, 0, Math.PI * 2);
  x.fill();
  x.restore();
  var t = new THREE.CanvasTexture(c);
  t.generateMipmaps = false;
  t.minFilter = THREE.LinearFilter;
  return t;
}

/* ── геометрия: один STL на обе сцены ─────────────────────────── */
function loadGeometry(){
  return fetch('assets/rm30.stl.gz')
    .then(function(r){
      if (!r.ok) throw new Error('http ' + r.status);
      var ds = new DecompressionStream('gzip');
      return new Response(r.body.pipeThrough(ds)).arrayBuffer();
    })
    .then(function(buf){
      var geo = new STLLoader().parse(buf);
      geo.computeVertexNormals();
      geo.center();
      /* лицевая сторона геометрии — −Y; разворачиваем к камере (+Z) */
      var m = new THREE.Matrix4().makeBasis(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(1, 0, 0)
      );
      geo.applyMatrix4(m);
      geo.computeBoundingBox();
      var size = new THREE.Vector3();
      geo.boundingBox.getSize(size);
      /* самая длинная ось → X (профиль лежит горизонтально) */
      if (size.x < Math.max(size.y, size.z)) {
        var rot = new THREE.Matrix4();
        if (size.y >= size.x && size.y >= size.z) rot.makeRotationZ(Math.PI / 2);
        else rot.makeRotationY(Math.PI / 2);
        geo.applyMatrix4(rot);
        geo.computeBoundingBox();
        geo.boundingBox.getSize(size);
      }
      return { geo: geo, size: size };
    });
}

/* ── сцена HERO: золото на синем ──────────────────────────────── */
function initHero(src){
  if (!heroCanvas || !heroSection) return;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setPixelRatio(DPR);

  var LEN = 4.6;
  var geo = src.geo.clone();
  var s = LEN / src.size.x;
  geo.scale(s, s, s);
  geo.center();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.05, 60);
  scene.add(camera);

  var group = new THREE.Group();
  var mesh = new THREE.Mesh(geo, new THREE.MeshMatcapMaterial({
    matcap: matcapTexture(GOLD, [190, 205, 'rgba(18,48,95,0.4)'])
  }));
  group.add(mesh);

  geo.computeBoundingBox();
  var h = geo.boundingBox.max.y - geo.boundingBox.min.y;
  var shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(LEN * 1.3, 1.7),
    new THREE.MeshBasicMaterial({ map: shadowTexture(0.5), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -h / 2 - 0.32;
  group.add(shadow);
  scene.add(group);

  var baseRX = -0.26, baseRY = 0.14;
  var dragX = 0, dragY = 0, tDragX = 0, tDragY = 0;
  var dragging = false, px = 0, py = 0, t0 = null;
  var narrow = false;

  function resize(){
    var w = heroSection.clientWidth, hgt = heroSection.clientHeight;
    if (!w || !hgt) return;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
    narrow = camera.aspect < 0.9;
    camera.position.set(0, 0.35, narrow ? 12.5 : 8.8);
    camera.lookAt(0, 0.35, 0);
    group.position.set(narrow ? 0 : 1.12, narrow ? 1.85 : 0.95, 0);
  }

  heroCanvas.addEventListener('pointerdown', function(e){
    dragging = true; px = e.clientX; py = e.clientY;
    heroCanvas.setPointerCapture(e.pointerId);
  });
  heroCanvas.addEventListener('pointermove', function(e){
    if (!dragging) return;
    tDragY += (e.clientX - px) * 0.004;
    tDragX += (e.clientY - py) * 0.003;
    tDragX = Math.max(-0.5, Math.min(0.5, tDragX));
    px = e.clientX; py = e.clientY;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function(ev){
    heroCanvas.addEventListener(ev, function(){ dragging = false; });
  });

  var running = false, rafId = 0, visible = true;
  function frame(ts){
    if (!running) return;
    if (!t0) t0 = ts;
    var t = (ts - t0) / 1000;
    if (!dragging) { tDragX *= 0.97; tDragY *= 0.985; }
    dragX += (tDragX - dragX) * 0.08;
    dragY += (tDragY - dragY) * 0.08;
    group.rotation.x = baseRX + dragX + Math.sin(t * 0.5) * 0.02;
    group.rotation.y = baseRY + dragY + Math.sin(t * 0.32) * 0.05;
    group.position.y = (narrow ? 1.85 : 0.95) + Math.sin(t * 0.7) * 0.045;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(frame);
  }
  function setRun(){
    var on = visible && !document.hidden;
    if (on === running) return;
    running = on;
    if (running) rafId = requestAnimationFrame(frame);
    else { cancelAnimationFrame(rafId); t0 = null; }
  }
  new IntersectionObserver(function(en){
    visible = en[0].isIntersecting;
    setRun();
  }, { threshold: 0.02 }).observe(heroSection);
  document.addEventListener('visibilitychange', setRun);
  window.addEventListener('resize', resize);
  resize();
  renderer.render(scene, camera);
  setRun();
}

/* ── сцена LINE: проезд вдоль профиля ─────────────────────────── */
function initLine(src){
  if (!lineCanvas || !lineSection || !linePin) return;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: lineCanvas, antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setPixelRatio(DPR);

  var LEN = 5.6;
  var geo = src.geo.clone();
  var s = LEN / src.size.x;
  geo.scale(s, s, s);
  geo.center();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.05, 60);
  scene.add(camera);

  var group = new THREE.Group();
  var mesh = new THREE.Mesh(geo, new THREE.MeshMatcapMaterial({
    matcap: matcapTexture(GRAPHITE, [196, 208, 'rgba(201,169,106,0.18)'])
  }));
  group.add(mesh);

  geo.computeBoundingBox();
  var h = geo.boundingBox.max.y - geo.boundingBox.min.y;
  var shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(LEN * 1.25, 1.6),
    new THREE.MeshBasicMaterial({ map: shadowTexture(0.32), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -h / 2 - 0.22;
  group.add(shadow);
  scene.add(group);
  group.rotation.x = -0.07;
  group.position.y = -0.38;

  var target = 0, current = 0;
  var running = false, rafId = 0, needFrame = true, sectionActive = false;

  function resize(){
    var w = linePin.clientWidth, hgt = linePin.clientHeight;
    if (!w || !hgt) return;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
    needFrame = true;
  }

  function pose(p){
    var e = p < 0.72 ? p / 0.72 : 1;
    var travel = -LEN * 0.42 + e * LEN * 0.84;
    var back = p < 0.72 ? 0 : (p - 0.72) / 0.28;
    var bs = back * back * (3 - 2 * back);
    /* проезд — фронтальное скольжение вдоль фасада; отъезд — разворот сверху-спереди */
    var cx = travel * (1 - bs);
    camera.position.x = cx;
    camera.position.y = 0.35 + bs * 1.25;
    camera.position.z = 3.4 + bs * 4.3;
    camera.lookAt(new THREE.Vector3(cx, 0.28 - bs * 0.7, 0));
    group.rotation.x = -0.05 - p * 0.04;
  }

  function frame(){
    if (!running) return;
    var d = target - current;
    if (Math.abs(d) > 0.0004 || needFrame) {
      current += d * 0.12;
      pose(current);
      renderer.render(scene, camera);
      needFrame = Math.abs(d) > 0.0004;
    }
    rafId = requestAnimationFrame(frame);
  }
  function setRun(active){
    if (active !== undefined) sectionActive = active;
    var on = sectionActive && !document.hidden;
    if (on === running) return;
    running = on;
    if (running) { needFrame = true; rafId = requestAnimationFrame(frame); }
    else cancelAnimationFrame(rafId);
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: lineSection,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function(st){ target = st.progress; },
      onToggle: function(st){ setRun(st.isActive); }
    });
  } else {
    var onScroll = function(){
      var r = lineSection.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      target = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      setRun(r.bottom > 0 && r.top < window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  document.addEventListener('visibilitychange', function(){ setRun(); });
  window.addEventListener('resize', resize);
  resize();
  pose(0);
  renderer.render(scene, camera);
}

loadGeometry().then(function(src){
  document.documentElement.classList.add('has-scene');
  initHero(src);
  initLine(src);
}).catch(function(){ /* статичные фолбэки */ });
})();
