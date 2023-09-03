import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from '../refs/refs';

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
authButton.addEventListener('click', onClickAuthButton)
function onClickAuthButton(){
  logoutButton.classList.toggle("logout-hidden");

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
}

function userIf(auth) {
  return auth ? authorizetion(auth.login, true) : false;
}
userIf(authUserLocal);



export { onSignIn, onSignUp }
