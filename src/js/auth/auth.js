//fireBase
import { auth, app } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
//notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//refs
import refs from '../refs/refs';

const {
  signUpForm,
  signInEl,
  authorized,
  unauthorizedDiv,
  modal,
  logoutButton,
  nameUserEl,
  authButton,
} = refs;

const db = getDatabase(app);
const USER_KEY = 'auth';

const getLocalUser = localStorage.getItem(USER_KEY);
const userParsLocal = JSON.parse(getLocalUser);

//sign up the user
function onSignUp(e) {
  e.preventDefault();
  const login = signUpForm['signup-login'].value;
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;

  signUpCreateUser(login, email, password);

  signUpForm.reset();
}

function signUpCreateUser(login = '', email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      modal.classList.toggle('is-hidden');
      Notify.success('Success registretion');
      const userId = auth.currentUser.uid;

      setUserToDb(userId, login, email, password);
      getUserFromDb(userId);
      authorizedUser(login);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Ошибка регистрации:', errorMessage);
      Notify.failure('Error');
      // ..
    });
}

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
      authorizedUser(login);

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
//====================
function userAuth(auth) {
  return auth ? authorizedUser(auth, true) : false;
}
userAuth(userParsLocal);

// Перевіряємо стан авторизації
function authorizedUser(login = '', reg = false) {
  auth.onAuthStateChanged(user => {
    if (reg || user) {
      authorized.forEach(el => el.classList.remove('display-none'));
      unauthorizedDiv.style.display = 'none';
      nameUserEl.textContent = login;
    } else {
      authorized.forEach(el => el.classList.remove('display-none'));
      unauthorizedDiv.style.display = 'block';
    }
  });
}

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
        const userValue = snapshot.val();
        authorizedUser(userValue.login);
        localStorage.setItem(USER_KEY, JSON.stringify(userValue.login));
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
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
    localStorage.clear(USER_KEY);
    location.reload();
  });
}
export { onSignIn, onSignUp };
