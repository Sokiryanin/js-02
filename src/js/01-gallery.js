// ================================================================
// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const divGallery = document.querySelector('.gallery');
const gallaryMarkup = createGalleryCardMarkup(galleryItems);

divGallery.insertAdjacentHTML('beforeend', gallaryMarkup);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallety__item">
<a class="gallery__link"
  href="${original}">
  <img
  class="gallery__image"
  src="${preview}"
  data-source="${original}"
  alt="${description}">
</a>
</li>`
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
