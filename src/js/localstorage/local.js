import { updateModalButtonSection } from '../modals/book-modal';
const BOOKS_KEY = 'chosen-books';

const saveDataToLocalStorage = (key, value) => {
  try {
    const result = JSON.stringify(value);
    localStorage.setItem(key, result);
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

const getDataFromLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    const result = JSON.parse(data) || [];
    return result;
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

function getBookFromLocalStorage(id) {
  const localStorageBooks = getDataFromLocalStorage(BOOKS_KEY);
  return localStorageBooks.find(book => book._id === id);
}

function updateLocalStorageBooks(bookData) {
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

const removeDataFromLocalStorage = key => {
  localStorage.removeItem(key);
};

export {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
  getBookFromLocalStorage,
  updateLocalStorageBooks,
  removeDataFromLocalStorage,
};
