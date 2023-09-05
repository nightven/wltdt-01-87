export default {
  //loader
  loader: document.querySelector('.loader'),
  loaderBackdrop: document.querySelector('.loader-backdrop'),
  //main
  modal: document.querySelector('.backdrop'),
  signUpForm: document.querySelector('.js-form'),
  signInEl: document.querySelector('.js-sign-in'),
  btnSignIn: document.querySelector('.js-sign-in'),
  listCategoryEl: document.querySelector('.js-category'),
  listAllBooksEl: document.querySelector('.js-books'),
  categoryNameEl: document.querySelector('.category'),
  spanColorEl: document.querySelector('.color-title'),
  spanNormalEl: document.querySelector('.normal-title'),
  categoryItemEl: document.querySelector('.js-item-category'),

  //authorization
  authorized: document.querySelectorAll('.authorized'),

  unauthorized: document.querySelectorAll('.unauthorized'),
  logoutButton: document.getElementById('logout'),
  logoutMob: document.querySelector('.logout-mob'),
  loginButton: document.getElementById('login'),
  nameUserEl: document.querySelector('.js-login-user'),
  nameUserMob: document.querySelector('.js-user-mob '),
  authButton: document.querySelector('.js-button '),
  seeButtonEl: document.querySelectorAll('#password'),

  //book modal
  listBookModalEl: document.querySelector('.book-list'),

  //shop list
  shopListEl: document.querySelector('.shopping-list'),
  emptyBinEl: document.querySelector('.empty-bin-wrapper'),
};
