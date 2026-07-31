/* Kikuubo service worker — offline-capable PWA caching. */
const VERSION = 'kikuubo-v1';
const PRECACHE = `${VERSION}-precache`;
const RUNTIME = `${VERSION}-runtime`;

const SCOPE = self.registration.scope; // e.g. https://user.github.io/kikuubo-market/
const rel = (p) => new URL(p, SCOPE).toString();

const PRECACHE_URLS = [
  rel('./'),
  rel('./index.html'),
  rel('./manifest.webmanifest'),
  rel('./icons/icon-192.png'),
  rel('./icons/icon-512.png'),
  rel('./icons/icon-maskable-512.png'),
  rel('./icons/icon-180.png'),
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for navigations (offline fallback to cached shell).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match(rel('./index.html')))
        )
    );
    return;
  }

  // Stale-while-revalidate for same-origin static assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
