class NormalizeDataApi {
  constructor() {}

  updateDataGenre(data, genres) {
    const newData = data.results.map(el => {
      for (let i = 0; i <= genres.length - 1; i += 1) {
        for (let k = 0; k <= el.genre_ids.length - 1; k += 1) {
          if (el.genre_ids[k] === genres[i].id) {
            el.genre_ids[k] = ' ' + genres[i].name;
          }
        }
      }
      return el;
    });
    return newData;
  }
}

export default NormalizeDataApi;
