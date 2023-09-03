import * as fonds from './js/fonds/fonds';
import * as modals from './js/modals/modals';

import * as burger from './js/modals/menu-burger';

import { onSignIn, onSignUp } from './js/auth/auth';
import {
  fetchCategoryList,
  fetchAllBooks,
  fetchTopBooks,
} from './js/api/api-categories';
import { addMarkupCategoryList, addMarkupTopBooks } from './js/helpers/helpers';
import { markupCategoryList, markupAllBooks } from './js/template/markup';
import refs from './js/refs/refs';

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

//---------------------------Top Books Of Category 2 ver---------------------------------------
const categoriesRendered = {};
const topBooks = async () => {
  try {
    const resp = await fetchTopBooks();
    for (const item of resp.data) {
      if (!categoriesRendered[item.list_name]) {
        refs.listAllBooksEl.insertAdjacentHTML(
          'beforeend',
          `<h2>${item.list_name}</h2>`
        );

        categoriesRendered[item.list_name] = true;
      }

      const rowMarkup = markupAllBooks(item.books);
      refs.listAllBooksEl.insertAdjacentHTML('beforeend', rowMarkup);
    }
  } catch (error) {
    console.log(error.message);
  }
};

topBooks();

refs.toggleEl.addEventListener('click', onClickCheckbox);

function onClickCheckbox(e) {
  document.body.classList.toggle('dark');
  [...refs.listCategoryEl.children].map(el => el.classList.toggle('light'));
  refs.textEl.classList.toggle('light');
  refs.hederEl.classList.toggle('black-header');
  switchThem(e.target.checked);
}

function switchThem(result) {
  if (result) {
  }
}

//!submit form register
refs.signUpForm.addEventListener('submit', onSignUp);
refs.signInEl.addEventListener('submit', onSignIn);
