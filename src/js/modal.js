import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';
import LocalStorageHandle from './localeStorage';
import NormalizeDataApi from './normalize-data-api';
import { onWatchTrailer } from './youtube-trailer';
import RenderGallery from './render-gallery';
import Pagination from 'tui-pagination';

const apiService = new ApiService();
const localStorageHandle = new LocalStorageHandle();
const normalizeDataApi = new NormalizeDataApi();
const renderGallery = new RenderGallery();

const container = document.getElementById('tui-pagination-container');

const refs = {
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  galleryList: document.querySelector('.gallery__grid'),
  modalContainer: document.querySelector('.modal__container'),
  btnAddToWatched: document.querySelector('.js-add-to-watched'),
  btnAddToQueue: document.querySelector('.js-add-to-queue'),
};

const handleBtnWatched = btn => {
  if (!btn.classList.contains('js-film-watched')) {
    localStorageHandle.setToWatched();
    btn.classList.add('js-film-watched');
    btn.textContent = 'REMOVE FROM WATCHED';
  } else {
    localStorageHandle.removeWatchedFilm();
    btn.classList.remove('js-film-watched');
    btn.textContent = 'ADD TO WATCHED';
  }
  if (
    refs.galleryList.classList.contains('js-library') &&
    !refs.galleryList.classList.contains('js-queue')
  ) {
    renderGallery.renderWatchedLibrary();
  }
};
const handleBtnQueue = btn => {
  if (!btn.classList.contains('js-film-queue')) {
    localStorageHandle.setToQueue();
    btn.classList.add('js-film-queue');
    btn.textContent = 'REMOVE FROM QUEUE';
  } else {
    localStorageHandle.removeQueueFilm();
    btn.classList.remove('js-film-queue');
    btn.textContent = 'ADD TO QUEUE';
  }
  if (
    refs.galleryList.classList.contains('js-library') &&
    refs.galleryList.classList.contains('js-queue')
  ) {
    // const checkLocalStorage = localStorageHandle.getLocalStorageQueue();
    // if (checkLocalStorage.length === 0) {
    //   container.remove();
    // }
    renderGallery.renderQueueLibrary();
  }
};

const modalInfoEventHandle = e => {
  if (e.target.nodeName !== 'BUTTON') return;
  if (e.target.classList.contains('js-add-to-watched')) {
    handleBtnWatched(e.target);
  }
  if (e.target.classList.contains('js-add-to-queue')) {
    handleBtnQueue(e.target);
  }
};

const addEventListeners = () => {
  const modalInfoHandle = document.querySelector('.modal-info');

  modalInfoHandle.addEventListener('click', modalInfoEventHandle);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalKeyboard);
};

const onOpenModal = async e => {
  e.preventDefault();
  const idTargetItem = e.target.closest('li').dataset.id;
  const fullInfo = await apiService.getFullInfoById(idTargetItem);

  fullInfo.popularity = normalizeDataApi.updatePopularityLibrary(fullInfo);

  refs.modalContainer.innerHTML = modalInfoHbs(fullInfo);

  const normalizedInfo = normalizeDataApi.updateDataFilmsLibrary(fullInfo);
  refs.modalContainer.innerHTML = modalInfoHbs(normalizedInfo);
  refs.modal.classList.remove('is-hidden');
  localStorageHandle.targetDataFilm = normalizedInfo;

  if (localStorageHandle.checkExistFilmsInWatchedLocalStorage(normalizedInfo)) {
    const btnWatched = document.querySelector('.js-add-to-watched');
    btnWatched.classList.add('js-film-watched');
    btnWatched.textContent = 'REMOVE FROM WATCHED';
  }
  if (localStorageHandle.checkExistFilmsInQueueLocalStorage(normalizedInfo)) {
    const btnQueue = document.querySelector('.js-add-to-queue');
    btnQueue.classList.add('js-film-queue');
    btnQueue.textContent = 'REMOVE FROM QUEUE';
  }

  refs.modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  addEventListeners();
  onWatchTrailer();
};

const onCloseModal = e => {
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

const onCloseModalKeyboard = e => {
  const isEscKey = e.code === 'Escape';
  if (!isEscKey) return;
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

const backdropEl = document.querySelector('.backdrop');
backdropEl.addEventListener('click', onCloseModalClickBackdrop);
function onCloseModalClickBackdrop(e) {
  if (e.target !== backdropEl) return;
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

refs.galleryList.addEventListener('click', onOpenModal);
