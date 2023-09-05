import './js/fonds/fonds';
import './js/modals/modals';
import './js/modals/book-modal';
import './js/modals/menu-burger';
import './js/helpers/scroll-up';
import './js/auth/auth';
import { switcherCheck } from './js/themes/theme-switcher';
import {
  fetchCategoryList,
  fetchAllBooks,
  fetchTopBooks,
} from './js/api/api-categories';
import {
  addMarkupCategoryList,
  changeColorOfTitleOfCategory,
  makeActiveCategory,
  changeActiveCategory,
} from './js/helpers/helpers';
import {
  markupCategoryList,
  markupAllBooks,
  markupBlock,
} from './js/template/markup';
import refs from './js/refs/refs';
import { switcherCheck } from './js/themes/theme-switcher';
import { onSignIn, onSignUp } from './js/auth/auth';





// showLoader
function showLoader() {
  if(refs.loader ){
    refs.loader.innerHTML = '';
    refs.loader.style.display = 'block';
  }
}

// hideLoader
function hideLoader() {
  if(refs.loader){
    refs.loader.style.display = 'none';
  }
  if( refs.loaderBackdrop){
    refs.loaderBackdrop.style.display = 'none';
  }
}


// switcherStatus
switcherCheck();

//!submit form register
// refs.seeButtonEl.addEventListener('click', e => {
//   const el = e.target;
//   if (el.nodeName === 'svg') {
//     const status = refs.signUpForm['signup-password'];

//     if (status.type === 'password') {
//       status.type = 'text';
//       console.dir(
//         el.children[0].setAttribute('href', '/src/images/icons.svg#icon-mail')
//       );
//     } else {
//       status.type = 'password';
//     }
//   } else {
//     return;
//   }
// });

refs.signUpForm?.addEventListener('submit', onSignUp);
refs.signInEl?.addEventListener('submit', onSignIn);


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

refs.listCategoryEl?.addEventListener('click', onShowAllBooks);
let nameOfCategory = 0;

async function onShowAllBooks(event) {
  event.preventDefault();

  if (!event.target.classList.contains('item-category')) return;

  nameOfCategory = event.target.textContent;

  changeActiveCategory(refs.listCategoryEl.children);

  changeColorOfTitleOfCategory(
    nameOfCategory,
    refs.spanNormalEl,
    refs.spanColorEl
  );

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
refs.listAllBooksEl?.addEventListener('click', onShowMoreBooks);

async function onShowMoreBooks(event) {
  event.preventDefault();

  if (!event.target.classList.contains('js-btn-books')) return;

  refs.categoryItemEl.classList.remove('active-category');
  nameOfCategory = event.target.dataset.js;

  changeColorOfTitleOfCategory(
    nameOfCategory,
    refs.spanNormalEl,
    refs.spanColorEl
  );

  try {
    showLoader();

    const resp = await fetchAllBooks(nameOfCategory);

    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));

    makeActiveCategory(refs.listCategoryEl.children, nameOfCategory);

    hideLoader();
  } catch (error) {
    console.log(error.message);
    hideLoader();
  }
}
//-----------------------------Change current page style-------------------------------------------------------
const navLinks = document.querySelectorAll('.header-nav-list-item');
navLinks.forEach(link => {
  // Перевіряємо, чи URL посилання співпадає з URL поточної сторінки
  if (link.href === window.location.href) {
    link.classList.add('current');
  } else {
    link.classList.remove('current');
  }

  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('current'));
    link.classList.add('current');
  });
});

