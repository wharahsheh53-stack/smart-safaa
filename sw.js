// اسم النسخة لتخزين الملفات
const CACHE_NAME = 'safaa-app-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

// تثبيت مشغل الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // تفعيل المشغل فوراً دون انتظار إغلاق الصفحات المفتوحة
    self.skipWaiting();
});

// تفعيل المشغل وتنظيف النسخ القديمة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// التعامل مع طلبات الملفات لضمان العمل بدون إنترنت
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
