import { fonds } from '../api/api-fonds';

const li = ({ title, url, img }) => {
      return `<a href="${url}"
      ><li class="fonds__item">
        <span class="number__list">01</span>
        <img
          class="img__fonds"
          src="/src/images/fonds/save-the-children.png"
          alt="${title}"
        /></li
    ></a>`
}