import { fetchBookData } from '../api/api-books';
import { markupBookModal } from '../template/markup';
import refs from '../refs/refs';

import * as basicLightbox from 'basiclightbox';

const { listBookModalEl } = refs;

let currentInstance = null;

listBookModalEl.addEventListener('click', clickBookModalHandler);
document.addEventListener('keydown', closeModalByEscape);

async function clickBookModalHandler(event) {
  const cardBookEl = event.target.closest('.card-set-item');

  if (!cardBookEl) {
    return;
  }

  const cardBookID = cardBookEl.getAttribute('data-id');
  const bookData = await fetchBookData(cardBookID);

  showBookModal(bookData);
}

function showBookModal(bookData) {
  currentInstance = basicLightbox.create(markupBookModal(bookData), {
    onShow: instance => {
      addOverflowHidden();
      instance.element().querySelector('.close-modal-btn').onclick =
        instance.close;
    },
    onClose: () => {
      removeOverflowHidden();
    },
  });
  currentInstance.show();
}

function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    currentInstance.close();
  }
}
function addOverflowHidden() {
  document.body.classList.add('no-scroll');
  document.querySelector('.container.section').classList.add('no-scroll');
}

function removeOverflowHidden() {
  document.body.classList.remove('no-scroll');
  document.querySelector('.container.section').classList.remove('no-scroll');
}
