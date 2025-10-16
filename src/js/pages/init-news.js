export function initNews() {
  const filterButtons = document.querySelectorAll('.news-hero__header__filters-btn');
  const filterSelect = document.querySelector('.news-hero__header__filters-select');
  const newsContainers = document.querySelectorAll('.news-hero__news-container > div');

  function filterNews(selectedCategory) {

    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === selectedCategory);
    });

    newsContainers.forEach(container => {
      if (selectedCategory === 'all' || container.dataset.category === selectedCategory) {
        container.style.display = container.classList.contains('news-hero__news-container-double') ? 'flex' : 'block';
      } else {
        container.style.display = 'none';
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.filter;
      filterNews(selectedCategory);

      if (filterSelect) {
        filterSelect.value = selectedCategory;
      }
    });
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      filterNews(selectedCategory);
    });
  }
}
