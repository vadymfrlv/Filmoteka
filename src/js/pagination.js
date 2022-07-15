import Pagination from 'tui-pagination';
import ApiService from './api-service';
import articlesTpl from '../templates/articlesTpl.hbs';

const apiService = new ApiService();
const galleryListEl = document.querySelector('.gallery__grid');

let windowWidth = null;

if (window.innerWidth < 768) windowWidth = 4;
else if (window.innerWidth < 1200) windowWidth = 8;
else windowWidth = 9;

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
  itemsPerPage: 9,
  visiblePages: 5,
  centerAlign: true,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchPerPage(currentPage);
});

async function fetchPerPage(page) {
  apiService.query = '';
  apiService.page = page;

  const response = await apiService.getTrendingArticles();

  galleryListEl.innerHTML = articlesTpl(response.results);
  if (page === 1) pagination.reset(response.total_results);
}

document.onload = fetchPerPage(1);
