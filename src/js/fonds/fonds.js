import $ from "jquery";
import "slick-carousel";

import { fonds } from '../api/api-fonds';

const liElements = fonds.map(({ title, url, img }, index) => {
      return `<li class="fonds__item">
      <a class="fonds__link" href="${url}" target="_blank">
        <div class="item_link">
          <span class="number__list">${(index+1).toString().padStart(2, '0')}</span>
          <img
            class="img__fonds"
            src="${img}"
            alt="${title}"
          />
        </div>
      </a>
    </li>`
}).join('');
const fondsList = document.querySelector('.fonds__list');


fondsList.insertAdjacentHTML('beforeend', liElements)

$(".fonds__list").slick({
    slidesToShow: 6,
    vertical: true,
    swipeToSlide: true,
  verticalSwiping: true,
    slidesToScroll: 1,
});
 