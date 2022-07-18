//! const darkModEL = document.querySelectorAll('.js-dark-mod');


// document.querySelector('.themetoggle').addEventListener('click', evt => {
//   evt.preventDefault();
//   if (localStorage.getItem('theme') === 'dark') {
//     localStorage.removeItem('theme');
//   } else {
//     localStorage.setItem('theme', 'dark');
//   }
//   addDarkClassToHtml();
// });

// function addDarkClassToHtml() {
//   try {
//     if (localStorage.getItem('theme') === 'dark') {
//       bodyEL.classList.add('dark');
//       modalMod.classList.add('dark');
//       document.querySelector('.themetoggle span').textContent = 'dark_mode';
//     } else {
//       bodyEL.classList.remove('dark');
//       modalMod.classList.remove('dark');
//       document.querySelector('.themetoggle span').textContent = 'wb_sunny';
//     }
//   } catch (err) {}
// }
//! addDarkClassToHtml();




// function buttonActive() {
//     const buttons = document.querySelectorAll('.button');
//     for (const button of buttons) {
//       button.addEventListener('click', function () {
//         buttons.forEach(i => i.classList.remove('active-btn'));
//         this.classList.toggle('active-btn');
//       });
//     }
//   }