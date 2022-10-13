import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../sass/index.scss';

const modal = document.getElementById('myModal');
const modalCont = document.querySelector('.modal-content');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];

let timerId = null;
btn.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
  modalCont.classList.add('one');
  modalCont.classList.remove('out');
  clearInterval(timerId);
};

span.addEventListener('click', fetchArticles);

function fetchArticles() {
  modalCont.classList.add('out');
  modalCont.classList.remove('one');
  timerId = setInterval(() => {
    modal.style.display = 'none';
  }, 3000);
}

new SimpleLightbox('.gallery a', {
  navText: ['&#5130;', '&#5125;'],
  animationSpeed: '250ms',
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: '250ms',
});
