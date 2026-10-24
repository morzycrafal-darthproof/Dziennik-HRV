const CACHE = 'cisnienie-v9';
const PLIKI = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

// cache: 'reload' omija pamięć HTTP przeglądarki (GitHub Pages: max-age=600),
// żeby nowa wersja cache nie dostała starych plików.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PLIKI.map(u => new Request(u, {cache: 'reload'}))))
      .then(() => self.skipWaiting())
  );
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
