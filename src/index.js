import * as fonds from './js/fonds/fonds';
import * as modals from './js/modals/modals';

import * as burger from './js/modals/menu-burger';


import { onSignIn, onSignUp } from './js/auth/auth';

import { fetchCategoryList, fetchAllBooks } from './js/api/api-categories';
import { addMarkupCategoryList } from './js/helpers/helpers';
import { markupCategoryList, markupAllBooks } from './js/template/markup';
import refs from './js/refs/refs';

//!submit form register
refs.fromEl.addEventListener('submit', onSignUp);
refs.signInEl.addEventListener('submit', onSignIn);
//----------------------Category List-----------------------------------------

const allCategories = async () => {
  try {
    const resp = await fetchCategoryList();

    addMarkupCategoryList(refs.listCategoryEl, markupCategoryList(resp.data));
  } catch (error) {
    console.log(error.message);
  }
};

allCategories();

//-------------------All Books Of Category---------------------------------------

refs.listCategoryEl.addEventListener('click', onShowAllBooks);
let nameOfCategory = 0;

async function onShowAllBooks(event) {
  event.preventDefault();

  if (!event.target.classList.contains('item-category')) return;

  nameOfCategory = event.target.textContent;

  refs.categoryNameEl.textContent = nameOfCategory;

  try {
    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));
  } catch (error) {
    console.log(error.message);
  }

}





