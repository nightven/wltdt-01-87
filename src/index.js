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
import { ref } from 'firebase/database';

// showLoader
function showLoader() {
  refs.loader.innerHTML = '';
  refs.loader.style.display = 'block';
}

// hideLoader
function hideLoader() {
  refs.loader.style.display = 'none';
}

//!submit form register
refs.signUpForm.addEventListener('submit', onSignUp);
refs.signInEl.addEventListener('submit', onSignIn);

//----------------------Category List-----------------------------------------

const allCategories = async () => {
  try {
    showLoader();

    const resp = await fetchCategoryList();

    resp.data.sort((x, y) => x.list_name.localeCompare(y.list_name));

    addMarkupCategoryList(refs.listCategoryEl, markupCategoryList(resp.data));

    refs.categoryItemEl.classList.add('active-category');

    hideLoader();
  } catch (error) {
    console.log(error.message);
    hideLoader();
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

  refs.categoryItemEl.classList.remove('active-category');

  try {
    showLoader();

    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));

    hideLoader();
  } catch (error) {
    console.log(error.message);
    hideLoader();
  }
}

//---------------------------Top Books Of Category 3 ver---------------------------------------

const topBooks = async () => {
  try {
    showLoader();

    const resp = await fetchTopBooks();

    refs.listAllBooksEl.innerHTML = '';

    refs.listAllBooksEl.insertAdjacentHTML('beforeend', markupBlock(resp.data));

    hideLoader();
  } catch (error) {
    console.log(error.message);

    hideLoader();
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
    showLoader();

    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));

    for (const item of refs.listCategoryEl.children) {
      if (item.textContent === nameOfCategory) {
        item.classList.add('active-category');
        refs.categoryItemEl.classList.remove('active-category');
      }
    }

    hideLoader();
  } catch (error) {
    console.log(error.message);
    hideLoader();
  }
}
//-----------------------------Change current page style-------------------------------------------------------
const navLinks = document.querySelectorAll('.header-nav-list-item');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('current')) {
      navLinks.forEach(item => item.classList.remove('current'));
      link.classList.add('current');
    }
  });
});
