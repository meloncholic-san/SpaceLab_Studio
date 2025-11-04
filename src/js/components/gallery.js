import throttle from 'lodash/throttle.js';

export function initGallery(gallerySelector, images) {
  const gallery = document.querySelector(gallerySelector);
  if (!gallery) return () => {};

  let currentIndex = 0;
  const showInterval = 250;
  const lifeTime = 1000;

  const createTrailImage = (x, y) => {
    const imgSrc = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;

    const imgEl = document.createElement('img');
    imgEl.src = imgSrc;
    imgEl.classList.add('gallery__image-trail');

    const rotation = (Math.random() * 24 - 12).toFixed(2);
    imgEl.style.setProperty('--rotation', `${rotation}deg`);

    imgEl.style.width = '211px';
    imgEl.style.height = '273px';
    imgEl.style.left = `${x}px`;
    imgEl.style.top = `${y}px`;

    gallery.appendChild(imgEl);

    requestAnimationFrame(() => {
      imgEl.classList.add('gallery__image-trail--visible');
    });

    setTimeout(() => {
      imgEl.classList.remove('gallery__image-trail--visible');
      setTimeout(() => {
        if (imgEl.parentNode) imgEl.parentNode.removeChild(imgEl);
      }, 500);
    }, lifeTime);
  };

  const handleMouseMove = throttle(event => {
    const rect = gallery.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createTrailImage(x, y);
  }, showInterval);

  const handleTouch = event => {
    const rect = gallery.getBoundingClientRect();
    let x, y;
    if (event.touches && event.touches[0]) {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }
    createTrailImage(x, y);
  };

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  if (isTouchDevice) {
    gallery.addEventListener('touchstart', handleTouch);
  } else {
    gallery.addEventListener('mousemove', handleMouseMove);
  }

  return () => {
    gallery.removeEventListener('mousemove', handleMouseMove);
    gallery.removeEventListener('touchstart', handleTouch);
  };
}
