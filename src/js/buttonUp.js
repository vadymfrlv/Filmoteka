const showOnPx = 100;
const backToTopButton = document.querySelector('.back-to-top');
const pageProgressBar = document.querySelector('.progress-bar');

const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  });
};

document.addEventListener('scroll', () => {
  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  pageProgressBar.style.height = `${scrolledPercentage}%`;

  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});

backToTopButton.addEventListener('click', goToTop);

// import { refs } from './refs';
// window.onscroll = () => {
//   if (window.scrollY > 700) {
//     refs.btnGoTop.classList.remove('is-hidden');
//   } else {
//     refs.btnGoTop.classList.add('is-hidden');
//   }
// };
// refs.btnGoTop.onclick = () => {
//   window.scrollTo(0, 0);
// };
