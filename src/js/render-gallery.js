import articlesTpl from '../templates/articlesTpl.hbs';
const galleryListEl = document.querySelector('.gallery__grid');

class RenderGallery {
  constructor() {}
  renderGalleryMarkup(articles) {
    galleryListEl.innerHTML = articlesTpl(articles);
  }
}

export default RenderGallery;
