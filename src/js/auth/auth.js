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
  unauthorized,
  modal,
  logoutButton,
  nameUserEl,
  authButton,
  logoutMob,
  nameUserMob,
} = refs;

const db = getDatabase(app);
const USER_KEY = 'auth';

const getLocalUser = localStorage.getItem(USER_KEY);
const userParsLocal = JSON.parse(getLocalUser);

//sign up the user
function onSignUp(e) {
  e.preventDefault();
  const login = signUpForm['signup-login'].value.trim();
  const email = signUpForm['signup-email'].value.trim();
  const password = signUpForm['signup-password'].value.trim();

  signUpCreateUser(login, email, password);

  signUpForm.reset();
}
async function signUpCreateUser(login = '', email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      modal.classList.toggle('is-hidden');
      Notify.success('Success registretion');
      const userId = auth.currentUser.uid;
      //write to db
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
async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    //check user in firebase and db
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      const userId = auth.currentUser.uid;
      //get user from db
      getUserFromDb(userId);
      authorizedUser();

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

// check user
function userAuth(auth) {
  return auth ? authorizedUser(auth, true) : false;
}
userAuth(userParsLocal);

// Перевіряємо стан авторизації та надаємо дступ до контенту
function authorizedUser(login = '', reg = false) {
  auth.onAuthStateChanged(user => {
    if (reg || user) {
      if (login.length > 7) {
        const userName = login.slice(0, 7) + '...';
        nameUserEl.textContent = userName;
        // nameUserMob.textContent = userName;
      }
      authorized.forEach(el => el.classList.remove('display-none'));
      unauthorized.forEach(el => el.classList.add('display-none'));
    } else {
      authorized.forEach(el => el.classList.add('display-none'));
      unauthorized.forEach(el => el.classList.remove('display-none'));
    }
  });
}
// function write user to db
function setUserToDb(id, login, email, password) {
  set(ref(db, 'users/' + id), {
    login,
    email,
    password,
  });
}

async function getUserFromDb(userId) {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users/${userId}`))
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

// Listening to the exit button
logoutButton.addEventListener('click', onClickLogout);
logoutMob?.addEventListener('click', onClickLogout);
// function to the exit user
function onClickLogout(e) {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('success');
    localStorage.clear(USER_KEY);
    location.reload();
  });
}
export { onSignIn, onSignUp };
