// اسم التخزين (يمكنك تغييره)
const CACHE_NAME = "daamkassab-cache-v1";

// الملفات التي نريد حفظها لتعمل بدون انترنت
const urlsToCache = [
  '/',
  '/index.html',
  'https://www.daami.space/', // رابط موقعك
  'https://www.daami.space/favicon.ico'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// عند الطلب (fetch) — جرب الشبكة، وإن فشلت استخدم الملفات من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// عند التحديث نحذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
