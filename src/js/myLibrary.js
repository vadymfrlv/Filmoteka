import NormalizeDataApi from './normalize-data-api';
import articlesTpl from '../templates/articlesTpl.hbs';
import Pagination from 'tui-pagination';
import LocalStorageHandle from './localeStorage';
import RenderGallery from './render-gallery';

const refs = {
  linkPageHome: document.querySelector('.js-home_page'),
  linkPageLibrary: document.querySelector('.js-lib_page'),
  btnPageWatched: document.querySelector('.js-btn_watched'),
  btnPageQueue: document.querySelector('.js-btn_queue'),
  galleryList: document.querySelector('.gallery__grid'),
};
const container = document.getElementById('tui-pagination-container');

const renderGallery = new RenderGallery();
const normalizeDataApi = new NormalizeDataApi();
const localStorageHandle = new LocalStorageHandle();

let cardsQuantity = null;

if (window.innerWidth < 768) cardsQuantity = 4;
else if (window.innerWidth < 1200) cardsQuantity = 8;
else cardsQuantity = 9;

const paginationLibrary = new Pagination(container, {
  itemsPerPage: cardsQuantity,
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

paginationLibrary.on('afterMove', event => {
  const currentPage = event.page;
  onLibPerPage(currentPage);
});

let libraryData = null;

const startPaginationWithFirstRender = () => {
  const firstPageData = libraryData.slice(0, cardsQuantity);
  refs.galleryList.innerHTML = articlesTpl(firstPageData);
  refs.galleryList.classList.add('js-library');
  paginationLibrary.reset(libraryData.length);
};

const btnPageQueueHandler = () => {
  const queueFilmsData = localStorageHandle.getLocalStorageQueue();
  libraryData = queueFilmsData.map(el => {
    return normalizeDataApi.updateDataFilmsLibrary(el);
  });

  startPaginationWithFirstRender();
  removePaginationWithFirstRender;
};

const btnPageWatchedHandler = () => {
  const watchedFilmsData = localStorageHandle.getLocalStorageWatched();
  libraryData = watchedFilmsData.map(el => {
    return normalizeDataApi.updateDataFilmsLibrary(el);
  });
  startPaginationWithFirstRender();
  removePaginationWithFirstRender;
};

const onLinkPageLibrary = async e => {
  btnPageWatchedHandler();
  removePaginationWithFirstRender();
  // startPaginationWithFirstRender();
};

async function onLibPerPage(page) {
  const currentPageData = libraryData.slice(
    (page - 1) * cardsQuantity,
    page * cardsQuantity
  );

  window.scrollTo({
    top: 0,
  });
  renderGallery.renderGalleryMarkup(currentPageData);
}

const removePaginationWithFirstRender = () => {
  // console.log('oops');
  // console.log(libraryData);
  if (libraryData.length === 0) container.remove();
};

refs.linkPageLibrary.addEventListener('click', onLinkPageLibrary);
refs.btnPageQueue.addEventListener('click', btnPageQueueHandler);
refs.btnPageWatched.addEventListener('click', btnPageWatchedHandler);
