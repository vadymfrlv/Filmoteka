const axios = require('axios').default;

const URL = 'https://api.themoviedb.org/3/';
const KEY = '82c59d753050746a09d77670604a0453';

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getArticlesBySearch() {
    axios.defaults.params = {
      api_key: KEY,
      query: this.query,
      page: this.page,
    };
    return await axios(`${URL}search/movie`).then(response => response.data);
  }

  async getGenres() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`
    );

    return response.data.genres;
  }

  async getTrendingArticles() {
    const response = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${this.page}`);

    return response.data;
  }
  async getFullInfoById(id) {
    const response = await axios.get(`${URL}movie/${id}?api_key=${KEY}&language=en-US`);

    return response.data;
  }

  async getTrailers() {
    try {
      let { data } = await axios(`${URL}movie/${this.id}/videos?api_key=${KEY}&language=en-US`, {
        params: {
          api_key: KEY,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

   get movieId() {
     return this.id;
  }

   set movieId(newId) {
     this.id = newId;
  }
}

export default ApiService;
