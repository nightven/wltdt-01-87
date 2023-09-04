import { getDataFromLocalStorage, saveDataToLocalStorage } from "../localstorage/local";
import { set } from "firebase/database";
import { shopListMarkup } from "./markup";
import {
  getBookFromLocalStorage,
  updateLocalStorageBooks,
} from '../localstorage/local';


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
  



function doMarkup() {
    const localStorageData = getDataFromLocalStorage(BOOK_KEY);
    if(localStorageData.length === 0) {
        emptyBinEL.classList.remove('visually-hidden');
    } else {
        emptyBinEL.classList.add('visually-hidden');
        shopListEl.insertAdjacentHTML("beforeend", shopListMarkup(localStorageData));
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
    const index = localStorageBooks.findIndex(book => book._id === bookData._id);
    localStorageBooks.splice(index, 1);
    
  }
  saveDataToLocalStorage(BOOK_KEY, localStorageBooks);
}

function getBookFromLocalStorage(id, localStorageBooks) {
  // const localStorageBooks = getDataFromLocalStorage(BOOK_KEY);
  console.log(localStorageBooks);
  return localStorageBooks.find(book => book._id === id);
} 