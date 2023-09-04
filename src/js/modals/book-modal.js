import { fetchBookData } from '../api/api-books';
import { markupBookModal } from '../template/markup';
import refs from '../refs/refs';
import {
  getBookFromLocalStorage,
  updateLocalStorageBooks,
} from '../localstorage/local';

import * as basicLightbox from 'basiclightbox';

const { listBookModalEl } = refs;

let currentInstance = null;
let bookData = null;

listBookModalEl.addEventListener('click', clickBookModalHandler);
document.addEventListener('keydown', closeModalByEscape);

async function clickBookModalHandler(event) {
  const cardBookEl = event.target.closest('.card-set-item');

  if (!cardBookEl) {
    return;
  }

  const cardBookID = cardBookEl.getAttribute('data-id');
  bookData = await fetchBookData(cardBookID);

  showBookModal(bookData);
}

function showBookModal(bookData) {
  currentInstance = basicLightbox.create(markupBookModal(bookData), {
    onShow: instance => {
      addOverflowHidden();
      instance.element().querySelector('.close-modal-btn').onclick =
        instance.close;
      instance.element().querySelector('.modal-btn').onclick = () => {
        updateLocalStorageBooks(bookData);
      };
    },
    onClose: () => {
      removeOverflowHidden();
    },
  });
  const existingBook = getBookFromLocalStorage(bookData._id);
  updateModalButtonSection(Boolean(existingBook));

  currentInstance.show();
}

function updateModalButtonSection(isBookExists) {
  const modalEl = currentInstance.element();
  const btnEl = modalEl.querySelector('.modal-btn');
  const textEl = modalEl.querySelector('.modal-congrats-text');

  if (isBookExists) {
    btnEl.innerText = 'remove from shopping list';
    textEl.classList.remove('is-hidden');
  } else {
    btnEl.innerText = 'add to shopping list';
    textEl.classList.add('is-hidden');
  }
}

function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    currentInstance.close();
  }
}

function addOverflowHidden() {
  document.body.classList.add('no-scroll');
}

function removeOverflowHidden() {
  document.body.classList.remove('no-scroll');
}

export { updateModalButtonSection };

