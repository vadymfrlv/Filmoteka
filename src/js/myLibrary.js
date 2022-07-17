import NormalizeDataApi from './normalize-data-api';
import articlesTpl from '../templates/articlesTpl.hbs';
import LocalStorageHandle from './localeStorage';

const refs = {
  linkPageHome: document.querySelector('.js-home_page'),
  linkPageLibrary: document.querySelector('.js-lib_page'),
  btnPageWatched: document.querySelector('.js-btn_watched'),
  btnPageQueue: document.querySelector('.js-btn_queue'),
  galleryList: document.querySelector('.gallery__grid'),
};

const normalizeDataApi = new NormalizeDataApi();
const localStorageHandle = new LocalStorageHandle();

const btnPageQueueHandler = () => {
  const queueFilmsData = localStorageHandle.getLocalStorageQueue();
  refs.galleryList.innerHTML = articlesTpl(queueFilmsData);
};

const btnPageWatchedHandler = () => {
  const watchedFilmsData = localStorageHandle.getLocalStorageWatched();
  refs.galleryList.innerHTML = articlesTpl(watchedFilmsData);
};

const onLinkPageLibrary = async e => {
  btnPageWatchedHandler();
};

refs.linkPageLibrary.addEventListener('click', onLinkPageLibrary);
refs.btnPageQueue.addEventListener('click', btnPageQueueHandler);
refs.btnPageWatched.addEventListener('click', btnPageWatchedHandler);
