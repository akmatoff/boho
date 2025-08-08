const CACHE_NAME = "boho-v1";
const API_CACHE_NAME = "api-cache-v1";

const urlsToCache = [
  "/",
  "/menyu",
  "/bar",
  "/menyu?lang=ru",
  "/menyu?lang=ky",
  "/menyu?lang=en",
  "/kitchen?lang=ru",
  "/kitchen?lang=ky",
  "/kitchen?lang=en",
  "/menu?lang=ru",
  "/menu?lang=ky",
  "/menu?lang=en",
  "/?lang=ru",
  "/?lang=ky",
  "/?lang=en",
  "/bar?lang=ru",
  "/bar?lang=ky",
  "/bar?lang=en",
  "/detskoe-menyu?lang=ky",
  "/detskoe-menyu?lang=en",
  "/background-image.png",
  "/favicon.ico",
  "/hero-background.png",
  "/hero-background-light.png",
  "/hero-background.svg",
  "/boho-logo.png",
  "/boho-logo-secondary.svg",
  "/close.svg",
  "/hamburger.svg",
  "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
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
