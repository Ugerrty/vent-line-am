/* Vent-Line v6.1 — статичная золотая решётка: выглядывает справа в секции «Линия».
   Matcap-only, рендер по требованию (появление/resize/смена темы). */
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

(function(){
'use strict';

if (typeof DecompressionStream === 'undefined') return;

var canvas = document.getElementById('line-canvas');
var section = document.getElementById('line');
if (!canvas || !section) return;

var renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
} catch (e) { return; }
renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio || 1));

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(32, 1, 0.05, 60);
scene.add(camera);

function matcapTexture(stops, rim){
  var c = document.createElement('canvas');
  c.width = c.height = 256;
  var x = c.getContext('2d');
  var g = x.createRadialGradient(92, 80, 10, 128, 128, 152);
  stops.forEach(function(s){ g.addColorStop(s[0], s[1]); });
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  if (rim) {
    var g2 = x.createRadialGradient(190, 206, 6, 190, 206, 100);
    g2.addColorStop(0, rim);
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g2;
    x.fillRect(0, 0, 256, 256);
  }
  var t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* два реальных финиша: RAL 9005 (чёрная порошковая) и RAL 9003 (белая) */
var MATCAP_BLACK = matcapTexture(
  [[0.00, '#9B9EA6'], [0.26, '#4A4D55'], [0.55, '#26282E'], [0.82, '#131418'], [1.00, '#08090C']],
  'rgba(201,169,106,0.4)'
);
var MATCAP_WHITE = matcapTexture(
  [[0.00, '#FFFFFF'], [0.26, '#F5F3EE'], [0.55, '#DEDBD3'], [0.82, '#B7B3A9'], [1.00, '#807C72']],
  'rgba(201,169,106,0.28)'
);

var group = new THREE.Group();
var glow = null, shadow = null;

fetch('assets/rm30.stl.gz')
  .then(function(r){
    if (!r.ok) throw new Error('http ' + r.status);
    var ds = new DecompressionStream('gzip');
    return new Response(r.body.pipeThrough(ds)).arrayBuffer();
  })
  .then(function(buf){
    var geo = new STLLoader().parse(buf);
    geo.computeVertexNormals();
    geo.center();
    /* лицевая сторона −Y → к камере (+Z), длинная ось → X */
    var m = new THREE.Matrix4().makeBasis(
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(1, 0, 0)
    );
    geo.applyMatrix4(m);
    geo.computeBoundingBox();
    var size = new THREE.Vector3();
    geo.boundingBox.getSize(size);
    if (size.x < Math.max(size.y, size.z)) {
      var rot = new THREE.Matrix4();
      if (size.y >= size.x && size.y >= size.z) rot.makeRotationZ(Math.PI / 2);
      else rot.makeRotationY(Math.PI / 2);
      geo.applyMatrix4(rot);
      geo.computeBoundingBox();
      geo.boundingBox.getSize(size);
    }
    var LEN = 7.0;
    var s = LEN / size.x;
    geo.scale(s, s, s);
    geo.center();

    var material = new THREE.MeshMatcapMaterial({ matcap: MATCAP_BLACK });
    var mesh = new THREE.Mesh(geo, material);
    group.add(mesh);
    window.__vlSetGrille = function(color){
      material.matcap = color === 'white' ? MATCAP_WHITE : MATCAP_BLACK;
      material.needsUpdate = true;
      render();
    };
    document.addEventListener('vl:grille', function(){
      window.__vlSetGrille(document.documentElement.getAttribute('data-grille') || 'black');
    });

    geo.computeBoundingBox();
    var h = geo.boundingBox.max.y - geo.boundingBox.min.y;
    var glowC = document.createElement('canvas');
    glowC.width = 256; glowC.height = 64;
    var gx = glowC.getContext('2d');
    var gg = gx.createRadialGradient(128, 32, 4, 128, 32, 124);
    gg.addColorStop(0, 'rgba(201,169,106,0.5)');
    gg.addColorStop(0.5, 'rgba(201,169,106,0.14)');
    gg.addColorStop(1, 'rgba(201,169,106,0)');
    gx.save(); gx.scale(1, 0.25);
    gx.fillStyle = gg;
    gx.beginPath(); gx.arc(128, 128, 124, 0, Math.PI * 2); gx.fill();
    gx.restore();
    var glowT = new THREE.CanvasTexture(glowC);
    glowT.generateMipmaps = false;
    glowT.minFilter = THREE.LinearFilter;
    glow = new THREE.Mesh(
      new THREE.PlaneGeometry(LEN * 1.1, 1.4),
      new THREE.MeshBasicMaterial({
        map: glowT, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -h / 2 - 0.3;
    glow.scale.set(0.85, 0.7, 1);
    group.add(glow);

    /* мягкая тень — для светлой темы */
    var shC = document.createElement('canvas');
    shC.width = 256; shC.height = 64;
    var sx = shC.getContext('2d');
    var sg = sx.createRadialGradient(128, 32, 4, 128, 32, 124);
    sg.addColorStop(0, 'rgba(28,26,20,0.42)');
    sg.addColorStop(0.55, 'rgba(28,26,20,0.12)');
    sg.addColorStop(1, 'rgba(28,26,20,0)');
    sx.save(); sx.scale(1, 0.25);
    sx.fillStyle = sg;
    sx.beginPath(); sx.arc(128, 128, 124, 0, Math.PI * 2); sx.fill();
    sx.restore();
    var shT = new THREE.CanvasTexture(shC);
    shT.generateMipmaps = false;
    shT.minFilter = THREE.LinearFilter;
    shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(7.0 * 1.1, 1.4),
      new THREE.MeshBasicMaterial({ map: shT, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = glow.position.y;
    shadow.scale.copy(glow.scale);
    group.add(shadow);

    scene.add(group);
    window.__vlSetGrille(document.documentElement.getAttribute('data-grille') || 'black');

    /* статичная поза: решётка крупно, выглядывает справа, текст слева свободен */
    group.rotation.x = -0.09;
    group.rotation.y = -0.05;
    document.documentElement.classList.add('has-scene');
    layout();
    window.addEventListener('resize', layout);
    document.addEventListener('vl:theme', render);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(en){
        if (en[0].isIntersecting) { render(); io.disconnect(); }
      }, { threshold: 0.05 });
      io.observe(section);
    } else render();
  })
  .catch(function(){ /* остаёмся на статичном фолбэке */ });

function layout(){
  var w = section.clientWidth, h = section.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  var narrow = camera.aspect < 0.9;
  /* десктоп: правый конец уходит за кадр — решётка «выглядывает», текст слева
     свободен. Узкие экраны: профиль по центру резерв-полосы (padding-bottom:72vw),
     камера ближе и с лёгким разворотом — «продуктовый постамент». */
  if (narrow) {
    camera.position.set(0, 0.5, 12.2);
    camera.lookAt(0.15, -0.1, 0);
    group.rotation.set(-0.13, -0.12, 0);
    var V = camera.position.z * Math.tan(camera.fov * Math.PI / 360);
    group.position.set(0.5, V * (0.72 * camera.aspect - 1) - 0.12, 0);
  } else {
    camera.position.set(0, 0.4, 8.0);
    camera.lookAt(0.6, -0.15, 0);
    group.rotation.set(-0.09, -0.05, 0);
    group.position.set(4.0, -0.35, 0);
  }
  render();
}

function render(){
  var light = document.documentElement.getAttribute('data-theme') === 'light';
  if (glow) glow.visible = !light;
  if (shadow) shadow.visible = light;
  renderer.render(scene, camera);
}
})();
