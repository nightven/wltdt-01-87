import refs from "../refs/refs";


const{ modalSignUp,openModalSignUpBtn} = refs;

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
    
    document.querySelector('.js-form').children[0].style.display = 'none';
    document.querySelector('.signup-btn').textContent = 'Sign in';
  }

  if (evt.target.hasAttribute('data-signup')) {
    
    document.querySelector('.js-form').children[0].style.display = 'block';
    document.querySelector('.signup-btn').textContent = 'Sign up';
  }
}


