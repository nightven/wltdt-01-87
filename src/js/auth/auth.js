//fireBase
import { auth, app } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
//notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//svg
import svg from '../../images/icons.svg';
//refs
import refs from '../refs/refs';

const {
  signUpForm,
  authorized,
  unauthorized,
  logoutButton,
  nameUserEl,
  authButton,
  logoutMob,
  nameUserMob,
  seeButtonEl
} = refs;



// crate data base
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

  if(document.querySelector('.js-label-login').style.display === 'block'){
    signUpForm.reset();
    signUpCreateUser(login, email, password);
  }else{
    signUpForm.reset();
    signIn(email, password)
  }
// login? signUpCreateUser(login, email, password): signIn(email, password);

}

async function signUpCreateUser(login = '', email, password) {
  try {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Signed in
    const user = userCredential.user;
    
    Notify.success('Success registretion');
    const userId = auth.currentUser.uid;
    //write to db
    setUserToDb(userId, login, email, password);
    getUserFromDb(userId);
    authorizedUser(login);
  } catch (error) {
    const errorMessage = error.message;
    Notify.failure('Registration error');
    // ..
  }
}

async function signIn(email, password) {
  try {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  
  // Signed in
    const userId = userCredential.user.auth.currentUser.uid;
    //get user from db
    getUserFromDb(userId);
    authorizedUser();

    // modal.classList.toggle('is-hidden');
    Notify.success('Success');
    // logoutButton.style.transform = "translateX(-500px)";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    Notify.failure("User is not defined");
  }
}

// check user
userAuth(userParsLocal);

function userAuth(auth) {
  return auth ? authorizedUser(auth, true) : false;
}

// Перевіряємо стан авторизації та надаємо дступ до контенту
function authorizedUser(login = '', reg = false) {
  auth.onAuthStateChanged(user => {
    if (reg || user) {
      if (login.length > 7) {
        const userName = login.slice(0, 7) + '...';
        nameUserEl.textContent = userName;
        nameUserMob.textContent = userName;
      } else {
        nameUserEl.textContent = login;
        nameUserMob.textContent = login;
      }
      authorized.forEach(el => el.classList.remove('display-none'));
      unauthorized.forEach(el => el.classList.add('display-none'));
    } else {
      authorized.forEach(el => el.classList.add('display-none'));
      unauthorized.forEach(el => el.classList.remove('display-none'));
    }
  });
}
// function write user to data base
function setUserToDb(id, login, email, password ) {
  set(ref(db, 'users/' + id), {
    login,
    email,
    password,
  
  });
}
// getting user from data base
async function getUserFromDb(userId) {
  const dbRef = ref(getDatabase());
  try {
  const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const userValue = snapshot.val();
      authorizedUser(userValue.login);
      localStorage.setItem(USER_KEY, JSON.stringify(userValue.login));
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
}
// Поява кнопки для виходу
if(authButton)
  authButton.addEventListener('click', onClickAuthButton);


function onClickAuthButton() {
  logoutButton.classList.toggle('logout-hidden');

   window.addEventListener('click', onClickLogout)
}

// Listening to the exit button
// function to the exit user
function onClickLogout(e) {
  e.preventDefault();

  if(!e.target.classList.contains('button-log-out')){
    return
  }

  auth.signOut().then(() => {
   
    localStorage.removeItem(USER_KEY);

    logoutButton.classList.toggle('logout-hidden');

    window.removeEventListener('click', onClickLogout);

    window.location.href = 'index.html';
  });
}

if(seeButtonEl){

 seeButtonEl.addEventListener('click', e => {
    
    if (e.target.nodeName === 'svg') {
      const signUp = refs.signUpForm['signup-password'];
      
      if ( signUp.type === 'password') {
        
        signUp.type = 'text';
        e.target.firstElementChild.setAttribute('href', `${svg}#icon-eye-blocked`);
      } else {
        e.target.firstElementChild.setAttribute('href', `${svg}#icon-eye`);
        
        signUp.type = 'password';
      }
    } else {
      return;
    }
  });
}
export { onSignUp, USER_KEY, onClickLogout};
