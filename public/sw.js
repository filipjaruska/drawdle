/* eslint-disable */

self.addEventListener("push", function (event) {
  // @ts-ignore
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };
  // @ts-ignore
  event.waitUntil(self.registration.showNotification(data.title, options));
});
