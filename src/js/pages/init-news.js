export function initNews() {
  const filterButtons = document.querySelectorAll('.news-hero__header__filters-btn');
  const filterSelect = document.querySelector('.news-hero__header__filters-select');
  const newsContainers = document.querySelectorAll('.news-hero__news-container > div');
  const projectRooms = document.querySelectorAll('.project-room');

function filterNews(selectedCategory) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === selectedCategory);
  });
  newsContainers.forEach((container) => {
    const matches = selectedCategory === 'all' || container.dataset.category === selectedCategory;

    if (matches) {
        setTimeout(()=>{
          container.classList.add('show');
        }, 10)
    } else {
        setTimeout(()=> {
          container.classList.remove('show');
        }, 300)
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


    projectRooms.forEach(container => {
    const linkElement = container.querySelector('[data-link]');
    const linkTarget = linkElement.dataset.link;
    if (linkTarget) {
      container.addEventListener('click', () => {
        window.location.href = `${linkTarget}.html`;
      });
    }
  });

  filterNews('all');
}
