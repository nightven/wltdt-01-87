import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { addOverflowHidden, removeOverflowHidden } from '../modals/book-modal';
import anime from 'animejs/lib/anime.es.js';

import refs from '../refs/refs';
import { createMarkupTeam } from '../template/markup';

let instance = 0;
let currentInstance = null;

refs.footerEl.addEventListener('click', onShowTeam);

function onShowTeam() {
  currentInstance = basicLightbox.create(createMarkupTeam(), {
    onShow: instance => {
      addOverflowHidden();
      instance.element().addEventListener('click', handleFooterModalClick);
      document.addEventListener('keydown', closeFooterModalByEscape);
    },
    onClose: instance => {
      removeOverflowHidden();
      instance.element().removeEventListener('click', handleFooterModalClick);
      document.removeEventListener('keydown', closeFooterModalByEscape);
    },
  });

  currentInstance.show();
}

function handleFooterModalClick(event) {
  if (event.target.closest('.footer-close-modal-btn')) {
    currentInstance.close();
  }
}

function closeFooterModalByEscape(event) {
  if (event.code === 'Escape') {
    currentInstance.close();
  }
}
