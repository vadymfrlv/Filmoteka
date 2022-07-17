const WATCED_FILMS_KEY = 'watched-films';
const QUEUE_FILMS_KEY = 'queue-films';

class LocalStorageHandle {
  constructor() {
    this.targetDataFilm = {};
    this.watchedDataFilm = [];
    this.queueDataFilms = [];
  }

  setToWatched() {
    // if (this.watchedDataFilm.includes(this.targetDataFilm)) {
    //   return;
    // }
    this.getLocalStorageWatched();
    this.watchedDataFilm.push(this.targetDataFilm);
    localStorage.setItem(
      WATCED_FILMS_KEY,
      JSON.stringify(this.watchedDataFilm)
    );
  }
  getLocalStorageWatched() {
    const watchedFilmsData = localStorage.getItem(WATCED_FILMS_KEY);
    const parsedWatchedFilmsData = JSON.parse(watchedFilmsData) ?? [];
    this.watchedDataFilm = parsedWatchedFilmsData;
    return this.watchedDataFilm;
  }

  setToQueue() {
    this.getLocalStorageQueue();
    this.queueDataFilms.push(this.targetDataFilm);
    localStorage.setItem(QUEUE_FILMS_KEY, JSON.stringify(this.queueDataFilms));
  }
  getLocalStorageQueue() {
    const queueFilmsData = localStorage.getItem(QUEUE_FILMS_KEY);
    const parsedQueueFilmsData = JSON.parse(queueFilmsData) ?? [];
    this.queueDataFilms = parsedQueueFilmsData;
    return this.queueDataFilms;
  }
}

export default LocalStorageHandle;
