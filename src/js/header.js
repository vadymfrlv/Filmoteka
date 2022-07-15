const refs = {
  linkHome: document.querySelector('.js-home_page'),
  linkLibrary: document.querySelector('.js-lib_page'),
  header: document.querySelector('.js-header'),
  form: document.querySelector('.js-form'),
  libBtns: document.querySelector('.js-buttons'),
  watchedBtn: document.querySelector('.js-btn_watched'),
  queueBtn: document.querySelector('.js-btn_queue'),
  formInput: document.querySelector('.js-form-input'),
  logo: document.querySelector('.js-logo'),
  headerNav: document.querySelector('.js-navi'),
};

const controlPageHome = function () {
  refs.linkLibrary.classList.remove('current');
  refs.linkHome.classList.add('current');
  refs.header.classList.remove('header-bg-library');
  refs.header.classList.add('header-bg-home');
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
