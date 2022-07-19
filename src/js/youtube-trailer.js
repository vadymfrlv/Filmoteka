import ApiService from './api-service';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const apiService = new ApiService();

export function watchTrailer() {
  let idBtn = document.querySelector('.film__button');

  apiService.movieId = idBtn.dataset.id;

  apiService
    .getTrailers()
    .then(data => {
      let results = data.results[0];
      let key = results.key;
      return key;
    })
    .then(key => iframeRender(key))
    .catch(err => console.log(err));
}

function iframeRender(key) {
  const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
  const instance = basicLightbox.create(
    `<button type="button" id="youtube-close-btn"><i class="fa-regular fa-circle-xmark"></i></button>
      <iframe
        src="${BASE_YOUTUBE_URL}${key}?autoplay=1"&mute=1&controls=1>
      </iframe> 
    `,
    {
      onShow: instance => {
        instance.element().querySelector('#youtube-close-btn').onclick =
          instance.close;
      },
    }
  );

  instance.show();
}
export const onWatchTrailer = e => {
  const youtubeBtn = document.querySelector('.film__trailer__btn');
  youtubeBtn.addEventListener('click', e => {
    e.preventDefault();
    watchTrailer();
  });
};
