import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../localstorage/local';
import spriteSvg from '../../images/icons.svg';
import { set } from 'firebase/database';

const shopListEl = document.querySelector('.shopping-list');
const emptyBinEL = document.querySelector('.empty-bin-wrapper');
const BOOK_KEY = 'chosen-books';

doMarkup();

const trashBtn = document.querySelector('.book-btn');
console.log(trashBtn);

document.addEventListener('click', removeBookFromLocalStorage);

function removeBookFromLocalStorage(event) {
  console.log();
  const deleteBtn = event.target.closest('[data-delete]');
  if (deleteBtn) {
    const idBook = event.target.closest('.book-item').dataset.id;
    const localStorageBooks = getDataFromLocalStorage(BOOK_KEY);
    const bookToDelete = localStorageBooks.findIndex(
      book => book._id === idBook
    );
    localStorageBooks.splice(bookToDelete, 1);
    saveDataToLocalStorage(BOOK_KEY, localStorageBooks);
    shopListEl.insertAdjacentHTML('beforeend', shopMarkup(localStorageBooks));
    doMarkup();
  }
}

function shopMarkup(array) {
  console.log(array);
  shopListEl.innerHTML = '';
  return array
    .map(({ _id, list_name, book_image, author, title, description }) => {
      return `
    <li class="book-item" data-id="${_id}">
    <img class="shop-book-img" src="${book_image}" alt="${title}" width="300" />
    <div class="book-item-descr">
    <h2>${title}</h2>
    <p>${list_name}</p>
    <p>${description}</p>
    <p>${author}</p>
    <button class="book-btn" data-delete type="button">
    <svg class="del-modal-icon" width="28" height="28">
    <use href="${spriteSvg}#icon-trash-bin"></use>
    </svg>
    </button>
    </div>
    </li>`;
    })
    .join('');
}

function doMarkup() {
  const localStorageData = getDataFromLocalStorage(BOOK_KEY);
  if (localStorageData.length === 0) {
    emptyBinEL.classList.remove('visually-hidden');
  } else {
    emptyBinEL.classList.add('visually-hidden');
    shopListEl.insertAdjacentHTML('beforeend', shopMarkup(localStorageData));
  }
}
