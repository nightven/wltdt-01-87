import { fetchBookData } from '../api/api-books';
import { markupModal } from '../template/markup';

import * as basicLightbox from 'basiclightbox';

const refs = {
  listEl: document.querySelector('.book-list'),
};

let currentInstance = null;

refs.listEl.addEventListener('click', clickBookHandler);
document.addEventListener('keydown', closeModalByEscape);

async function clickBookHandler(event) {
  const cardBookEl = event.target.closest('.card-set-item');

  if (!cardBookEl) {
    return;
  }

  const cardBookID = cardBookEl.getAttribute('data-id');
  const bookData = await fetchBookData(cardBookID);

  showBookModal(bookData);
}

function showBookModal(bookData) {
  currentInstance = basicLightbox.create(markupModal(bookData));
  currentInstance.show();

  const modalEl = currentInstance.element();

  modalEl.querySelector('.close-modal-btn').onclick = currentInstance.close;

  document.body.style.overflow = 'hidden';
}

function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    currentInstance.close();
  }
}
