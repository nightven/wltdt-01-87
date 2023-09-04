export default {
  //loader
  loader: document.querySelector('.loader'),
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

  unauthorizedDiv: document.getElementById('unauthorized'),
  logoutButton: document.getElementById('logout'),
  loginButton: document.getElementById('login'),
  nameUserEl: document.querySelector('.js-login-user'),
  authButton: document.querySelector('.js-button '),
  seeButtonEl: document.querySelector('#password'),

  //book modal
  listBookModalEl: document.querySelector('.book-list'),
};
