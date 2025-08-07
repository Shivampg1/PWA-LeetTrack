const CACHE_NAME = "leet-track-v1";
const urlsToCache = [
  "/Pwa-LeetTrack/",  // Changed from /LeetTrack/
  "/Pwa-LeetTrack/index.html",
  "/Pwa-LeetTrack/assets/css/style.css",
  "/Pwa-LeetTrack/assets/js/script.js",
  "/Pwa-LeetTrack/assets/icons/icon-192x192.png",
  "/Pwa-LeetTrack/assets/icons/icon-512x512.png",
  "/Pwa-LeetTrack/manifest.json"  // Added manifest to cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

