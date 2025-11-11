const CACHE_NAME = "daamkassab-offline-v2";

// عند التثبيت نحفظ كل الملفات المهمة ليعمل التطبيق بالكامل بدون إنترنت
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/", // الصفحة الرئيسية
        "/index.html",
        "https://www.daami.space/",
        "https://www.daami.space/favicon.ico",
        "https://www.daami.space/css/style.css", // غيّر حسب ملف CSS إن وجد
        "https://www.daami.space/js/script.js"   // غيّر حسب ملف JavaScript إن وجد
      ]);
    })
  );
  console.log("✅ Files cached for offline use");
});

// عند الجلب (fetch)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إن وجد في الكاش، أعطه، وإلا حاول من الإنترنت
      return response || fetch(event.request);
    })
  );
});

// عند التفعيل نحذف الكاش القديم إن وجد
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  console.log("⚙️ Service worker activated and old cache cleared");
});
