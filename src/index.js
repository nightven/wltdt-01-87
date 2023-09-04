import * as fonds from './js/fonds/fonds';
import * as modals from './js/modals/modals';
import * as bookModal from './js/modals/book-modal';
import * as burger from './js/modals/menu-burger';

import { onSignIn, onSignUp } from './js/auth/auth';
import {
  fetchCategoryList,
  fetchAllBooks,
  fetchTopBooks,
} from './js/api/api-categories';
import {
  addMarkupCategoryList,
  addMarkupTopBooks,
  changeColorOfTitleOfCategory,
  splitTitle,
} from './js/helpers/helpers';
import {
  markupCategoryList,
  markupAllBooks,
  markupBlock,
} from './js/template/markup';
import refs from './js/refs/refs';
import { data } from 'jquery';
import axios from 'axios';

//!submit form register
refs.signUpForm.addEventListener('submit', onSignUp);
refs.signInEl.addEventListener('submit', onSignIn);

//----------------------Category List-----------------------------------------

const allCategories = async () => {
  try {
    const resp = await fetchCategoryList();

    resp.data.sort((x, y) => x.list_name.localeCompare(y.list_name));

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

  refs.spanColorEl.textContent = changeColorOfTitleOfCategory(nameOfCategory);
  refs.spanNormalEl.textContent = splitTitle(nameOfCategory);

  try {
    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));
  } catch (error) {
    console.log(error.message);
  }
}

//---------------------------Top Books Of Category 3 ver---------------------------------------

const topBooks = async () => {
  try {
    const resp = await fetchTopBooks();

    refs.listAllBooksEl.innerHTML = '';

    refs.listAllBooksEl.insertAdjacentHTML('beforeend', markupBlock(resp.data));
  } catch (error) {
    console.log(error.message);
  }
};

topBooks();

//-----------------------------See More Books-------------------------------------------------------
refs.listAllBooksEl.addEventListener('click', onShowMoreBooks);

async function onShowMoreBooks(event) {
  event.preventDefault();

  if (!event.target.classList.contains('js-btn-books')) return;

  nameOfCategory = event.target.dataset.js;

  refs.spanColorEl.textContent = changeColorOfTitleOfCategory(nameOfCategory);
  refs.spanNormalEl.textContent = splitTitle(nameOfCategory);

  try {
    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));
  } catch (error) {
    console.log(error.message);
  }
}

//-----------------------------Theme Switcher-------------------------------------------------------

const switcherEl = document.querySelector('.switch__input');

switcherEl.addEventListener('change', onColorSwitch);

function onColorSwitch() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if(currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

//---------------------------------------------------------------------------------------------------