const cacheName = 'v.1.0'; 
const precacheResources = [
    "index.html",
    "words.js",
    "main.js",
    "style.css",
    "favicon.ico",
    "touch-icon-iphone-retina.png",
    "manifest.json",
    "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
];

self.addEventListener('install', event => {
    // console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheAllowlist = [cacheName];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for:', event.request.url);
    // dont try to match resource from certain domain
    // if (event.request.url.indexOf('rex.com') > 1) return;
    
    event.respondWith(caches.match(event.request) 
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});