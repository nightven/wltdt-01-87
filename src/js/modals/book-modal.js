import { fetchBookData } from '../api/api-books';
import { markupBookModal } from '../template/markup';
import refs from '../refs/refs';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../localstorage/local';

import * as basicLightbox from 'basiclightbox';

const { listBookModalEl } = refs;

let currentInstance = null;
let bookData = null;

const BOOKS_KEY = 'chosen-books';

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
      instance.element().querySelector('.modal-btn').onclick =
        updateLocalStorageBooks;
    },
    onClose: () => {
      removeOverflowHidden();
    },
  });
  const existingBook = getBookFromLocalStorage(bookData._id);
  updateModalButtonSection(Boolean(existingBook));

  currentInstance.show();
}

function getBookFromLocalStorage(id) {
  const localStorageBooks = getDataFromLocalStorage(BOOKS_KEY);
  return localStorageBooks.find(book => book._id === id);
}

function updateLocalStorageBooks() {
  const localStorageBooks = getDataFromLocalStorage(BOOKS_KEY);
  const existingBook = getBookFromLocalStorage(bookData._id);

  if (!existingBook) {
    localStorageBooks.push(bookData);
    updateModalButtonSection(true);
  } else {
    const index = localStorageBooks.findIndex(
      book => book._id === bookData._id
    );
    localStorageBooks.splice(index, 1);
    updateModalButtonSection(false);
  }

  saveDataToLocalStorage(BOOKS_KEY, localStorageBooks);
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

export { getBookFromLocalStorage };