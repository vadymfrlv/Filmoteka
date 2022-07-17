import ApiService from './api-service';
import modalInfoHbs from '../templates/modalInfo.hbs';

const apiService = new ApiService();

const refs = {
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  galleryList: document.querySelector('.gallery__grid'),
  modalContainer: document.querySelector('.modal__container'),
};

const onOpenModal = async e => {
  e.preventDefault();
  const targetItem = e.target.closest('li');

  const fullInfo = await apiService.getFullInfoById(targetItem.dataset.id);
  refs.modalContainer.innerHTML = modalInfoHbs(fullInfo);
  refs.modal.classList.remove('is-hidden');
};

refs.galleryList.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', () =>
  refs.modal.classList.add('is-hidden')
);
