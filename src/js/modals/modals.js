import refs from "../refs/refs";
const{ modalSignUp} = refs;

window.addEventListener('click',onClickSignUp)


//open modal
function onClickSignUp(evt) {
  if(!evt.target.closest('.button-sign-up')){
    return
  }
  //open and listen to the form
  modalSignUp.classList.toggle('is-hidden');
  modalSignUp.addEventListener('click', onCloseSignUp);
  document.addEventListener('keydown', onCloseSignUp);
}


function onCloseSignUp(evt) {

  if (
    evt.target.parentNode.hasAttribute('data-modal-close') ||
    evt.target.hasAttribute('data-modal-close') || evt.code === 'Escape') {
    modalSignUp.classList.toggle('is-hidden');
    modalSignUp.removeEventListener('click', onCloseSignUp);
    document.removeEventListener('keydown', onCloseSignUp);
  }
 //Hide the login field
  if (evt.target.hasAttribute('data-signin')) {
    
    document.querySelector('.js-form').children[0].style.display = 'none';
    document.querySelector('.signup-btn').textContent = 'Sign in';
  }
//show the field with the login
  if (evt.target.hasAttribute('data-signup')) {
    
    document.querySelector('.js-form').children[0].style.display = 'block';
    document.querySelector('.signup-btn').textContent = 'Sign up';
  }
}


