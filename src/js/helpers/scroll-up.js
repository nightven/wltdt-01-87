let scrollToTopBtnEl = document.querySelector('.scroll-up');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  scrollToTopBtnEl.style.display =
     document.documentElement.scrollTop > 300
      ? 'flex'
      : 'none';
}

scrollToTopBtnEl.addEventListener('click', backToTop);

export function backToTop(value = 0) {
  document.documentElement.scrollTop = value;
}
