const tabs = document.querySelectorAll('.tab');
const categories = document.querySelectorAll('.menu-category');
const searchInput = document.getElementById('menuSearch');
const emptyState = document.getElementById('emptyState');
let activeCategory = 'all';

function normalizeText(value) {
  return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterMenu() {
  const query = normalizeText(searchInput.value.trim());
  let visibleItems = 0;

  categories.forEach(category => {
    const categoryMatches = activeCategory === 'all' || category.dataset.category === activeCategory;
    let categoryHasVisibleItem = false;

    category.querySelectorAll('.menu-item').forEach(item => {
      const textMatches = normalizeText(item.innerText).includes(query);
      const show = categoryMatches && textMatches;
      item.hidden = !show;
      if (show) {
        categoryHasVisibleItem = true;
        visibleItems++;
      }
    });

    category.hidden = !categoryHasVisibleItem;
  });

  emptyState.hidden = visibleItems !== 0;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(button => button.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.target;
    filterMenu();
  });
});

searchInput.addEventListener('input', filterMenu);
document.getElementById('year').textContent = new Date().getFullYear();
