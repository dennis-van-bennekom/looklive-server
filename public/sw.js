this.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

this.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        return caches.open('looklive-v1').then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

this.addEventListener('message', event => {
  switch (event.data.type) {
    case 'preload':
      preloadPage(event.data.content);
      break;
  }
});

function preloadPage(content) {
  var request = new Request(content);

  fetch(content)
    .then(response => {
      caches.open('looklive-v1').then(cache => {
        cache.put(request, response.clone());
      });
    });
}
