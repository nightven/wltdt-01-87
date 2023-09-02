import axios from 'axios';

const BOOKS_URL = `https://books-backend.p.goit.global/books/`;

async function fetchBookByID(bookID) {
  return await axios.get(`${BOOKS_URL}${bookID}`);
}

async function fetchBookData(cardBookID) {
  const book = await fetchBookByID(cardBookID);
  console.log(book.data);
  return book.data;
}

export { fetchBookByID, fetchBookData };
