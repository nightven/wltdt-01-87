import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBx8XcZ9v4GIKfGUANJ4MKJoQD7B4cDP-4',
  authDomain: 'library-b40eb.firebaseapp.com',
  projectId: 'library-b40eb',
  storageBucket: 'library-b40eb.appspot.com',
  messagingSenderId: '799722991022',
  appId: '1:799722991022:web:75afe5d43e76e1bb3f6c3f',
  measurementId: 'G-PRG7KMYKBB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const btnEl = document.querySelector('.js-button');
const modal = document.querySelector('.backdrop');
const fromEl = document.querySelector('.js-form');
btnEl.addEventListener('click', onclick);
fromEl.addEventListener('submit', onSubmit);

function onclick() {
  modal.hidden = false;
}

function onSubmit(e) {
  e.preventDefault();
  const login = e.currentTarget.elements.login.value;
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  signUp(email, password);
  fromEl.reset();
}

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      console.log(userCredential);
      const user = userCredential.user;
      console.log(user);
      user.emailVerified = true;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}