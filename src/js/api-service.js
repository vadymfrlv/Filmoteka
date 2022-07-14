const axios = require('axios').default;

const URL = 'https://api.themoviedb.org/3/';
const KEY = '82c59d753050746a09d77670604a0453';

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getTrendingArticles() {
    const response = await axios.get(
      `${URL}/trending/movie/week?api_key=${KEY}&page=${this.page}`
    );
    console.log(response.data.results);
    return response.data.results;
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  changePage(newPage) {
    this.page = newPage;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}

export default ApiService;
