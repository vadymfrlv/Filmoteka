const showOnPx = 100;
import { refs } from './refs';

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

  if (scrollContainer().scrollTop > showOnPx) {
    refs.backToTopBtn.classList.remove('hidden');
  } else {
    refs.backToTopBtn.classList.add('hidden');
  }
});

refs.backToTopBtn.addEventListener('click', goToTop);
