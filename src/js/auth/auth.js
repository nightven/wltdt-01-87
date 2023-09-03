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
  btnLog,
  authorizedDiv,
  unauthorizedDiv,
  modal,
  logoutButton,
} = refs;
//signUp the user
function onSignUp(e) {
  e.preventDefault();
  const login = signUpForm['signup-login'].value;
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;

  signUp(email, password, login);
  signUpForm.reset();
}
function signUp(email, password, login) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      modal.classList.toggle('is-hidden');
      Notify.success('Success registretion');
      console.log('Пользователь успешно зарегестрировался в систему:', user);
      btnLog.innerText = login;
      // M.Modal.getInstance(refs.fromEl).close();

      authorizetion();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Ошибка регистрации:', errorMessage);
      Notify.failure('Error');
      // ..
    });
}

//logout
logoutButton.addEventListener('click', onClickLogout);
function onClickLogout(e) {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('success');
  });
}

//sign in the user
function onSignIn(e) {
  e.preventDefault();
  console.log(e);
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  signIn(email, password);
  signInEl.reset();
}
// Обробка входу
// loginButton.addEventListener('click', () => {});

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      authorizetion();
      modal.classList.toggle('is-hidden');
      Notify.success('Success');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('Error');
    });
}
// Перевіряємо стан авторизації
function authorizetion() {
  auth.onAuthStateChanged(user => {
    if (user) {
      authorizedDiv.style.display = 'block';
      unauthorizedDiv.style.display = 'none';
    } else {
      authorizedDiv.style.display = 'none';
      unauthorizedDiv.style.display = 'block';
    }
  });
}
export { onSignIn, onSignUp };
