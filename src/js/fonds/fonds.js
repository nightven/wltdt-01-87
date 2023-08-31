import { fonds } from '../api/api-fonds';

// export function createMarkupFonds(fonds) {
//     return fonds.map(({title, url, img})=>`<a href="${url}"
//       ><li class="fonds__item">
//         <span class="number__list">01</span>
//         <img
//           class="img__fonds"
//           src="${img}"
//           alt="${title}"
//         /></li
//     ></a>`).join('');
// }
const li = ({ title, url, img }) => {
      return `<a href="${url}"
      ><li class="fonds__item">
        <span class="number__list">01</span>
        <img
          class="img__fonds"
          src="${img}"
          alt="${title}"
        /></li
    ></a>`
}
const liElements = fonds.map(li).join('');
//  