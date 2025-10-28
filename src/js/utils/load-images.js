export function initLazyImages(container = document) {
  const lazyPictures = container.querySelectorAll('picture img[loading="lazy"]');

  if (!('IntersectionObserver' in window)) {
    lazyPictures.forEach(img => loadPicture(img.closest('picture')));
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadPicture(entry.target.closest('picture'));
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '500px 500px',
    threshold: 0.1
  });

  lazyPictures.forEach(img => observer.observe(img));
}

export function loadPicture(picture) {
  if (!picture) return;

  const img = picture.querySelector('img');
  const sources = picture.querySelectorAll('source');

  if (img && img.dataset.loaded) return;

  sources.forEach(source => {
    if (source.dataset.srcset) {
      source.srcset = source.dataset.srcset;
      source.removeAttribute('data-srcset');
    }
  });

  if (img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    img.dataset.loaded = 'true';

    img.addEventListener('load', () => {
      picture.classList.add('loaded');
    });
  }
}
