let scrollToTopBtnEl = document.querySelector('.scroll-up');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollToTopBtnEl.style.display = 'flex';
  } else {
    scrollToTopBtnEl.style.display = 'none';
  }
}

scrollToTopBtnEl.addEventListener('click', backToTop);

export function backToTop(value = 0) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = value;
}
