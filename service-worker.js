const CACHE_NAME = 'rock-city-fm-cache-v1';
const urlsToCache = [
  '/RockFM/',
  '/RockFM/index.html',
  '/RockFM/style.css',
  '/RockFM/script.js',
  '/RockFM/background.gif',
  '/RockFM/icon-192x192.png',
  '/RockFM/icon-512x512.png'
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
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('sync', event => {
  if (event.tag === 'sync-tag') {
    event.waitUntil(syncFunction());
  }
});

async function syncFunction() {
  console.log('Sync function executed');
  // Perform your background sync operations here
}

self.addEventListener('periodicsync', event => {
  if (event.tag === 'periodic-sync-tag') {
    event.waitUntil(periodicSyncFunction());
  }
});

async function periodicSyncFunction() {
  console.log('Periodic sync function executed');
  // Perform your periodic sync operations here
}

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/RockFM/icon-192x192.png',
    badge: '/RockFM/icon-192x192.png'
  };
  event.waitUntil(
    self.registration.showNotification('Rock City FM', options)
  );
});

self.addEventListener('backgroundfetchsuccess', event => {
  console.log('Background fetch success:', event);
});

self.addEventListener('backgroundfetchfail', event => {
  console.log('Background fetch fail:', event);
});
