import { refs } from './refs.js';

const controlPageHome = function () {
  refs.linkLibrary.classList.remove('current');
  refs.linkHome.classList.add('current');
  refs.header.classList.remove('header-bg-library');
  refs.header.classList.add('header-bg-home');
  refs.header.classList.remove('header-library');
  refs.header.classList.add('header-home');
  refs.form.classList.remove('visually-hidden');
  refs.libBtns.classList.add('visually-hidden');
  refs.watchedBtn.classList.add('active-btn');
  refs.queueBtn.classList.remove('active-btn');
};

const controlPageLib = function () {
  refs.linkHome.classList.remove('current');
  refs.linkLibrary.classList.add('current');
  refs.header.classList.remove('header-bg-home');
  refs.header.classList.add('header-bg-library');
  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-library');
  refs.libBtns.classList.remove('visually-hidden');
  refs.form.classList.add('visually-hidden');
  refs.formInput.value = '';
};

refs.headerNav.addEventListener('click', e => {
  if (e.target === refs.linkLibrary) {
    controlPageLib();
  } else if (e.target === refs.linkHome) {
    controlPageHome();
    return;
  }
});

refs.logo.addEventListener('click', e => {
  controlPageHome();
});

const buttons = document.querySelectorAll('.lib__btn');
for (const button of buttons) {
  button.addEventListener('click', function () {
    buttons.forEach(i => i.classList.remove('active-btn'));
    this.classList.toggle('active-btn');
  });
}
