import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';
import NormalizeDataApi from './normalize-data-api';
import LocalStorageHandle from './localeStorage';

const apiService = new ApiService();
const normalizeDataApi = new NormalizeDataApi();
const localStorageHandle = new LocalStorageHandle();

const refs = {
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  galleryList: document.querySelector('.gallery__grid'),
  modalContainer: document.querySelector('.modal__container'),
  btnAddToWatched: document.querySelector('.js-addToWatched'),
  btnAddToQueue: document.querySelector('.js-addToQueue'),
};

const modalInfoEventHandle = e => {
  if (e.target.nodeName !== 'BUTTON') return;
  if (e.target.classList.contains('js-addToWatched')) {
    localStorageHandle.setToWatched();
  }
  if (e.target.classList.contains('js-addToQueue')) {
    localStorageHandle.setToQueue();
  }
};

const onOpenModal = async e => {
  e.preventDefault();
  const idTargetItem = e.target.closest('li').dataset.id;

  const fullInfo = await apiService.getFullInfoById(idTargetItem);
  refs.modalContainer.innerHTML = modalInfoHbs(fullInfo);

  refs.modal.classList.remove('is-hidden');

  localStorageHandle.targetDataFilm = fullInfo;

  const modalInfoHandle = document.querySelector('.modal-info');
  modalInfoHandle.addEventListener('click', modalInfoEventHandle);
};

refs.galleryList.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', () =>
  refs.modal.classList.add('is-hidden')
);
