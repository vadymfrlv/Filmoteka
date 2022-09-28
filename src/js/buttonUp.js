import { refs } from './refs';

window.onscroll = () => {
  if (window.scrollY > 700) {
    refs.backToTopBtn.classList.remove('is-hidden');
  } else {
    refs.backToTopBtn.classList.add('is-hidden');
  }
};

refs.backToTopBtn.onclick = () => {
  window.scrollTo(0, 0);
};
