const CACHE_NAME = 'rock-city-fm-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/background.gif',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Adding background sync functionality
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tag') {
    event.waitUntil(syncFunction());
  }
});

async function syncFunction() {
  // Implementation of your background sync logic
  console.log('Sync function executed');
}

// Adding Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: 'icon-192x192.png',
    badge: 'icon-192x192.png'
  };
  event.waitUntil(
    self.registration.showNotification('Rock City FM', options)
  );
});
