import { getDataFromLocalStorage, saveDataToLocalStorage } from "../localstorage/local";
import spriteSvg from '../../images/icons.svg';
import { set } from "firebase/database";


const shopListEl = document.querySelector('.shopping-list');
const emptyBinEL = document.querySelector('.empty-bin-wrapper');
const BOOK_KEY = 'chosen-books';
let bookData = null;

doMarkup();


const trashBtn = document.getElementById('delete-btn');

trashBtn.addEventListener('click', removeBookFromLocalStorage);


function removeBookFromLocalStorage(event) {
 
  const idBook = event.currentTarget.closest('.book-item').dataset.id;
  updateLocalStorageBooks(idBook);
}
  


function shopMarkup(array) {
    return array.map(({ _id, list_name, book_image, author, title, description }) => {
    return `
    <li class="book-item" data-id="${_id}">
    <img class="shop-book-img" src="${book_image}" alt="${title}" width="300" />
    <div class="book-item-descr">
    <h2>${title}</h2>
    <p>${list_name}</p>
    <p>${description}</p>
    <p>${author}</p>
    <button class="book-btn" id="delete-btn" type="button">
    <svg class="del-modal-icon" width="28" height="28">
    <use href="${spriteSvg}#icon-trash-bin"></use>
    </svg>
    </button>
    </div>
    </li>`
  }).join('')
}

function doMarkup() {
    const localStorageData = getDataFromLocalStorage(BOOK_KEY);
    if(localStorageData.length === 0) {
        emptyBinEL.classList.remove('visually-hidden');
    } else {
        emptyBinEL.classList.add('visually-hidden');
        shopListEl.insertAdjacentHTML("beforeend", shopMarkup(localStorageData));
    }
}

function updateLocalStorageBooks(id) {
  const localStorageBooks = getDataFromLocalStorage(BOOK_KEY);
  const existingBook = getBookFromLocalStorage(id, localStorageBooks);
  
  console.log(localStorageBooks);
  console.log(existingBook);
  
  if (!existingBook) {
    localStorageBooks.push(bookData);
    } else {
    const index = localStorageBooks.findIndex(
      book => book._id === bookData._id
    );
    localStorageBooks.splice(index, 1);
    
  }
  saveDataToLocalStorage(BOOK_KEY, localStorageBooks);
}

function getBookFromLocalStorage(id, localStorageBooks) {
  // const localStorageBooks = getDataFromLocalStorage(BOOK_KEY);
  console.log(localStorageBooks);
  return localStorageBooks.find(book => book._id === id);
} 