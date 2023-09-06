import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import anime from 'animejs/lib/anime.es.js';

import refs from '../refs/refs';
import { createMarkupTeam } from '../template/markup';

let instance = 0;

refs.footerEl.addEventListener("click", onShowTeam);

function onShowTeam() {
    console.log("hi");
  instance = basicLightbox.create(createMarkupTeam());
  instance.show();

}





