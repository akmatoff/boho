const CACHE_NAME = "social-coffee-v3";
const API_CACHE_NAME = "api-cache-v3";

const urlsToCache = [
  "/",
  "/menyu",
  "/bar",
  "/detskoe-menyu",
  "/menyu?lang=ru",
  "/menyu?lang=ky",
  "/menyu?lang=en",
  "/?lang=ru",
  "/?lang=ky",
  "/?lang=en",
  "/bar?lang=ru",
  "/bar?lang=ky",
  "/bar?lang=en",
  "/detskoe-menyu?lang=ru",
  "/detskoe-menyu?lang=ky",
  "/detskoe-menyu?lang=en",
  "/background-image.png",
  "/favicon.ico",
  "/hero-background.png",
  "/social-coffee-logo-text.png",
  "/social-coffee-logo.png",
  "/social-coffee-logo.svg",
  "/close.svg",
  "/hamburger.svg",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.eot",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.eot?#iefix",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.woff2",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.woff",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.ttf",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.svg#FuturaDemiC",
];

// Install: precache known shell assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME && key !== API_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: use stale-while-revalidate for everything
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // HTML navigations
  if (request.mode === "navigate") {
    event.respondWith(swrStrategy(request, CACHE_NAME));
    return;
  }

  // Static assets: images, styles, scripts, fonts
  if (
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(swrStrategy(request, CACHE_NAME));
    return;
  }

  // API data (GET only, with language-aware key)
  if (request.url.includes("/api/") && request.method === "GET") {
    event.respondWith(
      (async () => {
        const reqClone = request.clone();
        const acceptLang = reqClone.headers.get("Accept-Language") || "ru";
        const cacheKey = new Request(request.url + "::lang=" + acceptLang);
        return swrStrategy(cacheKey, API_CACHE_NAME, request);
      })()
    );
    return;
  }

  // Other GET requests (HTML partials, JSON, etc.)
  if (request.method === "GET") {
    event.respondWith(swrStrategy(request, CACHE_NAME));
  }
});

// ✅ Reusable stale-while-revalidate strategy
async function swrStrategy(cacheKey, cacheName, fallbackRequest) {
  const cache = await caches.open(cacheName);
  const requestToUse = fallbackRequest || cacheKey;

  const cached = await cache.match(cacheKey);

  // Update in background
  fetch(requestToUse)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.ok) {
        cache.put(cacheKey, networkResponse.clone());
      }
    })
    .catch(() => {
      // Silently fail if offline or error
    });

  return (
    cached ||
    fetch(requestToUse).catch(() => new Response("Offline", { status: 503 }))
  );
}
