import ApiService from './api-service';
import Pagination from 'tui-pagination';
import { refs } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import NormalizeDataApi from './normalize-data-api';
import HandleQueryTrendingApi from './handle-query-trending-api';
import RenderGallery from './render-gallery';

const apiService = new ApiService();
const renderTrending = new HandleQueryTrendingApi();
const normalizeDataApi = new NormalizeDataApi();
const renderGallery = new RenderGallery();

const container = document.getElementById('tui-pagination-container');

refs.form.addEventListener('submit', onSearch);

const paginationSerch = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton: '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

paginationSerch.on('afterMove', event => {
  const currentPage = event.page;
  onSearchPerPage(currentPage);
});

async function onSearch(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.query = refs.formInput.value.trim();

  if (apiService.query === '') {
    refs.errWarning.classList.remove('visually-hidden');
    renderTrending.handleQueryTrendingDataApi();
    return;
  }
  refs.errWarning.classList.add('visually-hidden');

  try {
    Loading.circle('Loading...');
    const data = await apiService.getArticlesBySearch();
    if (data.results.length === 0) {
      refs.errWarning.classList.remove('visually-hidden');
      renderTrending.handleQueryTrendingDataApi();
      refs.formInput.value = '';
      return;
    }
    const genres = await apiService.getGenres();
    const normalizedData = await normalizeDataApi.updateDataTranding(data, genres);
    renderGallery.renderGalleryMarkup(normalizedData);
    refs.formInput.value = '';
    Loading.remove();
    paginationSerch.reset(data.total_results);
    return data;
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
}

async function onSearchPerPage(page) {
  apiService.page = page;
  const data = await apiService.getArticlesBySearch();
  if (data.results.length === 0) {
    refs.errWarning.classList.remove('visually-hidden');
    renderTrending.handleQueryTrendingDataApi();
    return;
  }
  const genres = await apiService.getGenres();
  const normalizedData = await normalizeDataApi.updateDataTranding(data, genres);
  renderGallery.renderGalleryMarkup(normalizedData);
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
