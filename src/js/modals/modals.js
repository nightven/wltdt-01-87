document.addEventListener(
  'DOMContentLoaded',
  function () {
    // виберіть ваше меню тут
    const modals = ['data-sign-up', 'data-sign-in'];

    modals.forEach(element => {
      // дл відкриття модалки на кнопку  додаємо атрибут "your-data-modal"-open
      const openModalSelector = element + '-open';
      // для закриття модалки на ваку кнопку додаємо атрибут "your-data-modal"-close
      const closeModalSelector = element + '-close';

      const openModalBtns = document.querySelectorAll(`[${openModalSelector}]`);
      const closeModalBtns = document.querySelectorAll(
        `[${closeModalSelector}]`
      );
      const modal = document.querySelector(`[${element}]`);

      openModalBtns.forEach(openBtn =>
        openBtn.addEventListener('click', toggleModal)
      );
      closeModalBtns.forEach(closeBtn =>
        closeBtn.addEventListener('click', toggleModal)
      );

      function toggleModal() {
        document.body.classList.toggle('modal-open');
        modal.classList.toggle('is-hidden');
      }
    });
  },
  false
);
