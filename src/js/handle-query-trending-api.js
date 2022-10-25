import ApiService from './api-service';
import NormalizeDataApi from './normalize-data-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import RenderGallery from './render-gallery';

const apiService = new ApiService();
const normalizeDataApi = new NormalizeDataApi();
const renderGallery = new RenderGallery();

class HandleQueryTrendingApi {
  constructor() {}

  async handleQueryTrendingDataApi() {
    try {
      Loading.circle('Loading...');
      const data = await apiService.getTrendingArticles();
      const genres = await apiService.getGenres();
      const normalizedData = await normalizeDataApi.updateDataGenre(data, genres);
      renderGallery.renderGalleryMarkup(normalizedData);
      Loading.remove();
      return data;
    } catch (error) {
      Loading.remove();
      console.log(error);
    }
  }
}

export default HandleQueryTrendingApi;
