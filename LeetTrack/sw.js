const CACHE_NAME = "leet-track-v1";
const urlsToCache = [
  "/LeetTrack/",
  "/LeetTrack/index.html",
  "/LeetTrack/assets/css/style.css",
  "/LeetTrack/assets/js/script.js",
  "/LeetTrack/assets/icons/icon-192x192.png",
  "/LeetTrack/assets/icons/icon-512x512.png"
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