import { initGallery } from "../components/gallery.js";

export function initProjects() {
  const images = [
    'img/gallery/gallery-photo1.png',
    'img/gallery/gallery-photo2.png',
    'img/gallery/gallery-photo3.png',
    'img/gallery/gallery-photo4.png',
    'img/gallery/gallery-photo5.png',
  ];

  initGallery('.gallery__projects', images);

  const filterButtons = document.querySelectorAll('.projects__header__filters-btn');
  const filterSelect = document.querySelector('.projects__header__filters-select');
  const projectContainers = document.querySelectorAll('.projects__news-container > div');

  function filterProjects(selectedCategory) {
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === selectedCategory);
    });

    projectContainers.forEach(container => {
      const matches = selectedCategory === 'all' || container.dataset.category === selectedCategory;

      container.style.display = matches ? 'block' : 'none';
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.filter;
      filterProjects(selectedCategory);
      if (filterSelect) filterSelect.value = selectedCategory;
    });
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      filterProjects(selectedCategory);
    });
  }

  filterProjects('House');
}
