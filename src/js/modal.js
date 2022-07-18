import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';
import LocalStorageHandle from './localeStorage';

const apiService = new ApiService();
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
  if (e.target.classList.contains('js-add-to-watched')) {
    localStorageHandle.setToWatched();
  }
  if (e.target.classList.contains('js-add-to-queue')) {
    localStorageHandle.setToQueue();
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
  refs.modalContainer.innerHTML = modalInfoHbs(fullInfo);
  refs.modal.classList.remove('is-hidden');

  localStorageHandle.targetDataFilm = fullInfo;
  addEventListeners();
};

const onCloseModal = e => {
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

const onCloseModalKeyboard = e => {
  const isEscKey = e.code === 'Escape';
  if (!isEscKey) return;
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onCloseModalKeyboard);
};

refs.galleryList.addEventListener('click', onOpenModal);
