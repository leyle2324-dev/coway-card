/* BEREX 수면·매트리스 맞춤 진단 — 오프라인 캐시
   배포 위치: https://leyle2324-dev.github.io/coway-card/diagnosis/
   모든 경로는 이 파일(sw.js) 위치 기준 상대경로입니다. */
const CACHE = 'berex-diagnosis-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './img/elite.webp',
  './img/modi.webp',
  './img/prime.webp',
  './img/hybrid3.webp',
  './img/hybrid4.webp',
  './img/rounaire.webp',
  './img/signature.webp',
  './img/signature-hero.webp',
  './img/signature-fire.webp',
  './img/doubleside.webp',
  './img/compact.webp',
  './img/smart-s6.webp',
  './img/smart-s8.webp',
  './img/smart-s6-sync.webp',
  './img/smart-s8-sync.webp',
  './img/signature-fire-sync.webp',
  './img/r3.webp',
  './img/r5.webp',
  './img/r7.webp',
  './img/m-series.webp',
  './img/foundation.webp',
  './img/volume-frame.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
