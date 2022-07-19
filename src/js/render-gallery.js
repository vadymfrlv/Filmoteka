import articlesTpl from '../templates/articlesTpl.hbs';
import NormalizeDataApi from './normalize-data-api';
import LocalStorageHandle from './localeStorage';
import articlesTpl from '../templates/articlesTpl.hbs';

const localStorageHandle = new LocalStorageHandle();
const normalizeDataApi = new NormalizeDataApi();

const galleryListEl = document.querySelector('.gallery__grid');

class RenderGallery {
  constructor() {}
  renderGalleryMarkup(articles) {
    galleryListEl.innerHTML = articlesTpl(articles);
  }

  renderWatchedLibrary() {
    const watchedFilmsData = localStorageHandle.getLocalStorageWatched();
    const normalizedData = watchedFilmsData.map(el => {
      return normalizeDataApi.updateDataFilmsLibrary(el);
    });

    galleryListEl.innerHTML = articlesTpl(normalizedData);
  }
  renderQueueLibrary() {
    const queueFilmsData = localStorageHandle.getLocalStorageQueue();
    const normalizedData = queueFilmsData.map(el => {
      return normalizeDataApi.updateDataFilmsLibrary(el);
    });
    galleryListEl.innerHTML = articlesTpl(normalizedData);
  }
}

export default RenderGallery;
