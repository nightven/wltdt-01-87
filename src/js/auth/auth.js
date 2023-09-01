import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from '../refs/refs';

const {
  fromEl,
  btnSignIn,
  loginButton,
  authorizedDiv,
  unauthorizedDiv,
  modal,
} = refs;
// fromEl.addEventListener('submit', onSubmit);
// btnSignIn.addEventListener('submit', onSetValueForm);

function onSubmit(e) {
  e.preventDefault();
  const login = e.currentTarget.elements.login.value;
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  signUp(email, password);
  fromEl.reset();
}

function signUp(email, password) {
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then(userCredential => {
  //     // Signed in

  //     const user = userCredential.user;
  //     console.log('Пользователь успешно зарегестрировался в систему:', user);
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.error('Ошибка регистрации:', errorMessage);
  //     // ..
  //   });
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
// Обробка входу
// loginButton.addEventListener('click', () => {});

console.log(auth);
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
export { onSubmit };
