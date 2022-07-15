// import { imeges } from '../images/footer/comand-footer';
// import modalForm from '../templates/footerTpl.hbs';

// const loadModal = document.querySelector('.footer__link');
// console.dir(modalForm);

// loadModal.addEventListener('click', fetchModal);

// function fetchModal(event) {
//   event.preventDefault();
//   console.log(loadModal);
// }
import footerTpl from '../templates/footerTpl.hbs';
const imgContainer = document.querySelector('.gallery');
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// imgContainer.innerHTML = footerTpl();
imgContainer.insertAdjacentHTML();

console.log(imgContainer);
