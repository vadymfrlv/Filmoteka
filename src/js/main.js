import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';

const apiService = new ApiService();

const galleryListEl = document.querySelector('.gallery__grid');

const getNormalizeData = async () => {
  try {
    const data = await apiService.getTrendingArticles();
    const genres = await apiService.getGenres();

    const newData = data.results.map(el => {
      for (let i = 0; i <= genres.length - 1; i += 1) {
        for (let k = 0; k <= el.genre_ids.length - 1; k += 1) {
          if (el.genre_ids[k] === genres[i].id) {
            el.genre_ids[k] = genres[i].name;
          }
        }
      }
      return el;
    });
    return newData;
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
};

const handleQueryApi = async () => {
  Loading.circle('Loading...');
  const normalizedData = await getNormalizeData();
  console.log(normalizedData);
  renderArticlesMarkup(normalizedData);
  Loading.remove();
};

const renderArticlesMarkup = articles => {
  galleryListEl.innerHTML = articlesTpl(articles);
};

handleQueryApi();
