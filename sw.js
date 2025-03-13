const CACHE_NAME = 'legal-associate-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/favicon.ico',
    '/law_firm_logo.jpg',
    '/background.png',
    '/family-law-icon.png',
    '/criminal-law-icon.png',
    '/civil-law-icon.png',
    '/cyber-law-icon.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/favicon-16x16.png',
    '/favicon-32x32.png',

];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return Promise.all(
          urlsToCache.map(url =>
            fetch(url).then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
              }
              return cache.put(url, response);
            }).catch(err => {
              console.log(`Error caching ${url}:`, err);
            })
          )
        );
      })
    );
  });

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached resource if available, else fetch from network.
        return response || fetch(event.request);
      })
  );
});
