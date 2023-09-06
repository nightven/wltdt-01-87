import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';

//-------------------Fetch Top Books Or Category List-------------------------------------------------

async function fetchBooks(end_point) {
  return await axios.get(`${BASE_URL}/${end_point}`);
}

//-------------------Fetch AllBooks of each category---------------------------------------

async function fetchAllBooksofCategory(searchQuery) {
  const param = new URLSearchParams({
    category: searchQuery,
  });

  return await axios.get(`${BASE_URL}/category?${param}`);
}

//-------------------Fetch Book by ID---------------------------------------

async function fetchBookByID(bookID) {
  return await axios.get(`${BASE_URL}/${bookID}`);
}

export { fetchBooks, fetchAllBooksofCategory, fetchBookByID };
