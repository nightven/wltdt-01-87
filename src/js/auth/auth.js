import { auth, app } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from '../refs/refs';
const db = getDatabase(app);

const {
  signUpForm,
  signInEl,
  authorizedDiv,
  unauthorizedDiv,
  modal,
  logoutButton,
  nameUserEl,
  authButton,
} = refs;
let signUpUser = {};
const AUTH_KEY = 'loginUser';
const LOCAL_USER = 'localUser';

// let userId = {};
//sign up the user
function onSignUp(e) {
  e.preventDefault();

  signUpUser = {
    login: signUpForm['signup-login'].value,
    email: signUpForm['signup-email'].value,
  };
  const password = signUpForm['signup-password'].value;

  localStorage.setItem(AUTH_KEY, JSON.stringify(signUpUser));
  signUp(signUpUser.login, signUpUser.email, password);

  signUpForm.reset();
}

function signUp(login = '', email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      modal.classList.toggle('is-hidden');
      Notify.success('Success registretion');
      const userId = auth.currentUser.uid;

      setUserToDb(userId, login, email, password);
      getUserFromDb(userId);
      authorizetion(login);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Ошибка регистрации:', errorMessage);
      Notify.failure('Error');
      // ..
    });
}

const user = localStorage.getItem(AUTH_KEY);
const authUserLocal = JSON.parse(user);

//sign in the user
function onSignIn(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  signIn(email, password);
  signInEl.reset();
}

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      const userId = auth.currentUser.uid;

      getUserFromDb(userId);
      authorizetion(login);

      modal.classList.toggle('is-hidden');
      Notify.success('Success');
      // logoutButton.style.transform = "translateX(-500px)";
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('Error');
    });
}
// Перевіряємо стан авторизації
function authorizetion(login = '', userBool = false) {
  auth.onAuthStateChanged(user => {
    if (userBool || user) {
      authorizedDiv.style.display = 'block';
      unauthorizedDiv.style.display = 'none';
      nameUserEl.textContent = login;
    } else {
      authorizedDiv.style.display = 'none';
      unauthorizedDiv.style.display = 'block';
    }
  });
}

// Поява кнопки для виходу
authButton.addEventListener('click', onClickAuthButton);
function onClickAuthButton() {
  logoutButton.classList.toggle('logout-hidden');
}

//logout
logoutButton.addEventListener('click', onClickLogout);

function onClickLogout(e) {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('success');

    // localStorage.removeItem(AUTH_KEY);
    location.reload();
  });
}

// function userIf(auth) {
//   return auth ? authorizetion(auth.login, true) : false;
// }
// userIf(authUserLocal);

function setUserToDb(id, login, email, password) {
  set(ref(db, 'users/' + id), {
    login,
    email,
    password,
  });
}

function getUserFromDb(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export { onSignIn, onSignUp };
