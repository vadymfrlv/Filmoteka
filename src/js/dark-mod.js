const darkModEL = document.querySelectorAll('.js-dark-mod');

document.querySelector('.themetoggle').addEventListener('click', evt => {
  evt.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHtml();
});

function addDarkClassToHtml() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      for (const darkMod of darkModEL) {
        darkMod.classList.add('dark');
        darkMod.classList.add('dark');
        document.querySelector('.themetoggle').textContent = '1';
      }
    } else {
      for (const darkMod of darkModEL) {
        darkMod.classList.remove('dark');
        darkMod.classList.remove('dark');
        document.querySelector('.themetoggle').textContent = '2';
      }
    }
  } catch (err) {}
}
addDarkClassToHtml();
