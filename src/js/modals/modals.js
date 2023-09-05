const modalSignUp = document.getElementById('sign-up-modal');
const openModalSignUpBtn = document.getElementById('login');
const closeModalSignUp = document.querySelector('.close-modal-btn');

openModalSignUpBtn.addEventListener('click', onClickSignUp);
// modalSignUp.addEventListener('click', onCloseSignUp);

function onClickSignUp(evt) {
  // document.body.classList.toggle('modal-open');
  modalSignUp.classList.toggle('is-hidden');
  modalSignUp.addEventListener('click', onCloseSignUp);
}
function onCloseSignUp(evt) {
  if (
    evt.target.parentNode.hasAttribute('data-modal-close') ||
    evt.target.hasAttribute('data-modal-close')
  ) {
    modalSignUp.classList.toggle('is-hidden');
    modalSignUp.removeEventListener('click', onCloseSignUp);
  }

  if (evt.target.hasAttribute('data-signin')) {
    console.log('modal sign in');
    document.querySelector('.js-form').children[0].style.display = 'none';
    document.querySelector('.signup-btn').textContent = 'Sign in';
  }

  if (evt.target.hasAttribute('data-signup')) {
    console.log('modal sign up');
    document.querySelector('.js-form').children[0].style.display = 'block';
    document.querySelector('.signup-btn').textContent = 'Sign up';
  }
}

// function toggleModal() {
//         document.body.classList.toggle('modal-open');

//       }
