import { auth } from './firebase';
import refs from '../refs/refs';

const { fromEl, btnSignIn } = refs;

fromEl.addEventListener('submit', onSubmit);
btnSignIn.addEventListener('submit', onSetValueForm);

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

function onSetValueForm(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
