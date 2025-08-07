const CACHE_NAME = "leet-track-v1";
const urlsToCache = [
  "/PWA-LeetTrack/",  // Changed from /LeetTrack/
  "/PWA-LeetTrack/index.html",
  "/PWA-LeetTrack/assets/css/style.css",
  "/PWA-LeetTrack/assets/js/script.js",
  "/PWA-LeetTrack/assets/icons/icon-192x192.png",
  "/PWA-LeetTrack/assets/icons/icon-512x512.png",
  "/PWA-LeetTrack/manifest.json"  // Added manifest to cache
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
