const CACHE = 'cisnienie-v1';
const PLIKI = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PLIKI)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(odp => odp || fetch(e.request).then(sieciowa => {
      const kopia = sieciowa.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopia));
      return sieciowa;
    }).catch(() => caches.match('./index.html')))
  );
});
