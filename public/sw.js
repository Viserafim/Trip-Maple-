const CACHE_NAME = 'tripmate-v2-2026-09';

const APP_SHELL = [
  '/Trip-Maple-/',
  '/Trip-Maple-/index.html',
  '/Trip-Maple-/manifest.webmanifest',
  '/Trip-Maple-/icon-192.png',
  '/Trip-Maple-/icon-512.png',
  '/Trip-Maple-/apple-touch-icon.png',
  '/Trip-Maple-/tripmate-toronto-hero.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
