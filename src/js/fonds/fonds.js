import $ from 'jquery';
import 'slick-carousel';

import { fonds } from '../api/api-fonds';
import { mediaQuery } from '../helpers/helpers';

const liElements = fonds
  .map(({ title, url, img }, index) => {
    return `<li class="fonds__item">
      <a class="fonds__link" href="${url}" target="_blank">
        <div class="item_link">
          <span class="number__list">${(index + 1)
            .toString()
            .padStart(2, '0')}</span>
          <img
            class="img__fonds"
            src="${img}"
            alt="${title}"
          />
        </div>
      </a>
    </li>`;
  })
  .join('');
const fondsList = document.querySelector('.fonds__list');

fondsList.insertAdjacentHTML('beforeend', liElements);

mediaQuery(
  () => amountFondsItems(4, 4),
  () => amountFondsItems(6, 6),
  () => amountFondsItems(6, 6),
);

// if (window.matchMedia("(max-width: 767px)").matches) {
//   // Viewport is less or equal to 768 pixels wide
//   amountFondsItems(4,4);
// } else {
//   // Viewport is greater than 768 pixels wide
//   amountFondsItems(6,6);
// }

function amountFondsItems(number, amount) {
  $('.fonds__list').slick({
  slidesToShow: number,
  vertical: true,
  // swipeToSlide: true,
  verticalSwiping: true,
  slidesToScroll: amount,
});
}

//export { amountFondsItems }
