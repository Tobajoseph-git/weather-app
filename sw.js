const staticCacheName = 'core-content-v1';
const resources = [
  '/',
  '/image/logo.png',
  '/index.html',
  '/js/app.js',
  '/style.css',
  '/js/script.js',
  'https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&family=Rye&display=swap',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
  'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2',
  'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
  'https://fonts.gstatic.com/s/rye/v8/r05XGLJT86YzEZ7t.woff2',
  'https://code.jquery.com/jquery.js',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.woff2?v=4.5.0',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.ttf?v=4.5.0',
];

//Event listeners for service worker installation
self.addEventListener('install', evt => {
  //console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell resources');
      cache.addAll(resources);
    })
  );
  
});

//Event listener for service worker activation
self.addEventListener('activate', evt => {
  //console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(
        keys.filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
}); 

//Event listener for a fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});