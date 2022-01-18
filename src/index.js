import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import NewFetchImages from './js/fetchimages';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
const newfetchImages = new NewFetchImages();

formEl.addEventListener('submit', onSearchImages);
galleryEl.addEventListener('click', onclickImages);
loadMoreBtnEl.addEventListener('click', onLoadMore);
loadMoreBtnEl.style.visibility = 'hidden';

async function onSearchImages(e) {
  e.preventDefault();

  galleryEl.innerHTML = '';
  newfetchImages.query = inputEl.value.trim();

  if (newfetchImages.query === '') {
    return;
  }

  newfetchImages.resetPage();
  const data = await newfetchImages.fetchImages();
  if (data.hits.length === 0) {
    Notiflix.Report.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else {
    Notiflix.Notify.success('Hooray! We found totalHits images.');
    renderImage(data);
    lightbox.refresh();
    loadMoreBtnEl.style.visibility = 'visible';
  }
}

async function onLoadMore() {
  newfetchImages.incrementPage();
  const data = await newfetchImages.fetchImages();
  renderImage(data);
  lightbox.refresh();
  if (data.hits.length < 40) {
    Notiflix.Report.warning("We're sorry, but you've reached the end of search results.");
    loadMoreBtnEl.style.visibility = 'hidden';
  }
}

function renderImage(images) {
  const markUpImage = images.hits
    .map(
      image =>
        `<div class="photo-card">   <a class="gallery__item" href="${image.largeImageURL}"> 
    <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> </a>  
    <div class="info">
      <p class="info-item">
        <b>Likes:${image.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${image.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${image.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${image.downloads}</b>
      </p>
    </div>
    </div> 
  `,
    )
    .join('');
  return galleryEl.insertAdjacentHTML('beforeend', markUpImage);
}

function onclickImages(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
}
var lightbox = new SimpleLightbox('.gallery a');
