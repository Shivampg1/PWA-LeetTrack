const CACHE_VERSION = "v3";  // Updated version
const CACHE_NAME = `leet-track-${CACHE_VERSION}`;
const OFFLINE_URL = "/Pwa-LeetTrack/index.html";  

const urlsToCache = [
  "/Pwa-LeetTrack/",
  "/Pwa-LeetTrack/index.html",
  "/Pwa-LeetTrack/assets/css/style.css",
  "/Pwa-LeetTrack/assets/js/script.js",
  "/Pwa-LeetTrack/assets/icons/icon-192x192.png",
  "/Pwa-LeetTrack/assets/icons/icon-512x512.png",
  "/Pwa-LeetTrack/assets/icons/icon-maskable-512x512.png", 
  "/Pwa-LeetTrack/manifest.json",
  "/Pwa-LeetTrack/assets/screenshots/desktop.png"  
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
       
        if (response) return response;
        
        return fetch(event.request)
          .catch(() => caches.match(OFFLINE_URL))
      )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())  // Control all pages
  );
});
