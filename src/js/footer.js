// import { comandFooter } from '../images/footer/comand-footer';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import footerTpl from '../templates/footerTpl.hbs';
import '../sass/index.scss';

// const imgContainer = document.querySelector('.gallery');
const modal = document.getElementById('myModal');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

btn.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

new SimpleLightbox('.gallery a', {
  navText: ['<=', '=>'],
  animationSpeed: '250ms',
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: '250ms',
});

// }
// imgContainer.innerHTML = footerTpl();
// imgContainer.insertAdjacentHTML();

// console.log(imgContainer);
// const loadModal = document.querySelector('.footer__link');
// console.dir(modalForm);

// loadModal.addEventListener('click', fetchModal);

// function fetchModal(event) {
//   event.preventDefault();
//   console.log(loadModal);
// }
