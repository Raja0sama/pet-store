var cacheName = "petstore-v1";
var cacheFiles = [
  "/",
  "index.html",
  "products.js",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg",
  "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
  //   "https://www.gettyimages.ae/gi-resources/images/500px/983794168.jpg",
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

// 3:26
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
