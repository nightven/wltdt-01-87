import { fetchBookByID } from '../api/api';
import { markupBookModal } from '../template/markup';
import refs from '../refs/refs';
import {
  getBookFromLocalStorage,
  updateLocalStorageBooks,
} from '../localstorage/local';
import { USER_KEY } from '../auth/auth';

import * as basicLightbox from 'basiclightbox';

const { listBookModalEl } = refs;

let currentInstance = null;
let bookData = null;

listBookModalEl?.addEventListener('click', clickBookModalHandler);

async function clickBookModalHandler(event) {
  const cardBookEl = event.target.closest('.card-set-item');

  if (!cardBookEl) {
    return;
  }

  const cardBookID = cardBookEl.getAttribute('data-id');
  const response = await fetchBookByID(cardBookID);
  bookData = response.data;
  showBookModal(bookData);
}

function showBookModal(bookData) {
  currentInstance = basicLightbox.create(markupBookModal(bookData), {
    onShow: instance => {
      addOverflowHidden();
      instance.element().addEventListener('click', handleBookModalClick);
      document.addEventListener('keydown', closeModalByEscape);
    },
    onClose: instance => {
      removeOverflowHidden();
      instance.element().removeEventListener('click', handleBookModalClick);
      document.removeEventListener('keydown', closeModalByEscape);
    },
  });
  const existingBook = getBookFromLocalStorage(bookData._id);
  updateModalButtonSection(Boolean(existingBook));

  const getLocalUser = localStorage.getItem(USER_KEY);
  isUserAuthorized(getLocalUser, currentInstance);

  currentInstance.show();
}

function handleBookModalClick(event) {
  if (event.target.closest('.close-modal-btn')) {
    currentInstance.close();
  } else if (event.target.closest('.modal-btn-for-login')) {
    currentInstance.close();
    removeOverflowHidden();
  } else if (event.target.closest('.modal-book-btn')) {
    updateLocalStorageBooks(bookData);
  }
}

function isUserAuthorized(isAuthorized, instance) {
  const authorizedBtn = instance
    .element()
    .querySelector('.modal-btn.authorized');
  const unauthorizedBtn = instance
    .element()
    .querySelector('.modal-btn.unauthorized');
  if (isAuthorized) {
    authorizedBtn.style.display = 'block';
    unauthorizedBtn.style.display = 'none';
  } else {
    authorizedBtn.style.display = 'none';
    unauthorizedBtn.style.display = 'block';
  }
}

function updateModalButtonSection(isBookExists) {
  const modalEl = currentInstance.element();
  const btnEl = modalEl.querySelector('.modal-book-btn');
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
