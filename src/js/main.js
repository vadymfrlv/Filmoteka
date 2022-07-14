import ApiService from './api-service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import articlesTpl from '../templates/articlesTpl.hbs';

const apiService = new ApiService();

async function handleQueryApi() {
  try {
    Loading.circle('Loading...');
    const data = await apiService.getTrendingArticles();

    appendArticlesMarkup(data);
    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.log(error);
  }
}

function appendArticlesMarkup(articles) {}
