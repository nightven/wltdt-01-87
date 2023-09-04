import amazonImage from '../../images/shops/amazon.png';
import appleShopImage from '../../images/shops/apple-shop.png';
import bookShopImage from '../../images/shops/book-shop.png';
import crossSvg from '../../images/icons.svg';
import defaultImg from '../../images/empty-img_lap@_1x.png';
import { limitStr } from '../helpers/helpers';
import spriteSvg from '../../images/icons.svg';

//--------------------Create markup of category-list------------------------------

function markupCategoryList(arr) {
  return arr
    .map(
      ({ list_name }) =>
        `
      <li><a href="" class="item-category">${list_name}</a></li>
    `
    )
    .join('');
}
//------------------Create markup of All Books---------------------------------------

function markupAllBooks(arr) {
  return arr
    .map(
      ({ _id, title, author, book_image }) =>
        `
      <li class="card-set-item js-item-books js-item-book" data-id="${_id}">
        <a href="#" >
   
          <img class="book-img" src="${book_image}" alt="${title}" loading="lazy"/>
          <div class="book-overlay">
            <p class="book-overlay-text">QUICK VIEW</p>
          </div>

          <div>
            <h3 class="book-title">${limitStr(title, 20)}</h3>
            <p class="book-author">${author}</p>
          </div>
        </a>
      </li>
    `
    )
    .join('');
}

//------------------ Create markup Top Books ---------------------------------------

function markupList(books) {
  return books
    .map(({ book_image, title, author, _id }) => {
      return `<li class="js-item-books card-set-item" data-id="${_id}">
            <img src="${book_image}" alt="${title}" data-img-id="${_id}" loading="lazy" class="img-books"/>
            
            <div class="book-overlay">
              <p class="book-overlay-text">QUICK VIEW</p>
            </div>
            
            <h3 class="js-named-book">${limitStr(title, 20)}</h3>
            <p class="js-author-book">${author}</p>
        </li>`;
    })
    .join('');
}

function markupBlock(data) {
  return data
    .map(({ list_name, books }) => {
      return `<div class="wrapper"><h2 class="js-category-name">${list_name}</h2>
        <ul class="js-list-books book-list">${markupList(books)}</ul>
        <btn class="js-btn-books" data-js="${list_name}">See more</btn></div>`;
    })
    .join('');
}

// -------------------Create modal window---------------------------
function markupBookModal(bookData) {
  const { book_image, author, description, title, buy_links } = bookData;

  const buyLinks = buy_links.filter(
    el =>
      el.name === 'Amazon' ||
      el.name === 'Apple Books' ||
      el.name === 'Bookshop'
  );

  const shopIcons = {
    Amazon: amazonImage,
    'Apple Books': appleShopImage,
    Bookshop: bookShopImage,
  };

  return `<div class="modal-container">
    <button class="close-modal-btn" type="button">
      <svg class="close-modal-icon">
        <use href="${crossSvg}#icon-x-close"></use>
      </svg>
    </button>
    <div class="modal-wrapper">
      <img class="modal-book-cover"
              src="${book_image || defaultImg}"
              alt="Book cover"
            />
            <div class="right-side-wrap">
            <div class="modal-titles">
              <h2 class="modal-book-name">${title}</h2>
               <h3 class="modal-book-author">${author}</h3>
             </div>
          ${
            description === ''
              ? ''
              : ` <p class="modal-book-descr">${description}</p>`
          }
        <ul class="modal-list-partners">
          ${buyLinks
            .map(
              buyLink => `<li class="modal-item-partners">
                  <a
                    href="${buyLink.url}"
                    class="modal-partners-link"
                    target="_blank"
                    rel="noopener no-referrer"
                    ><img src="${shopIcons[buyLink.name]}" alt="${buyLink.name}"
                  /></a>
                </li>`
            )
            .join('')}
        </ul>
      </div>
    </div>
    <div class="modal-btn-wrap">
      <button class="modal-btn" type="button"></button>
      <p class="modal-congrats-text is-hidden">
        Congratulations! You have added the book to the shopping list. To
        delete, press the button &#8220;Remove from the shopping list&#8221;.
      </p>
    </div>
  </div>`;
}

// -----------------------Create markUp in ShopingList---------------------------
function shopListMarkup(array) {
  return array
    .map(({ _id, list_name, book_image, author, title, description }) => {
      return `
    <li class="book-item" data-id="${_id}">
    <img class="shop-book-img" src="${book_image}" alt="${title}" width="300" />
    <div class="book-item-descr">
    <h2>${title}</h2>
    <p>${list_name}</p>
    <p>${description}</p>
    <p>${author}</p>
    <button class="book-btn" id="delete-btn" type="button">
    <svg class="del-modal-icon" width="28" height="28">
    <use href="${spriteSvg}#icon-trash-bin"></use>
    </svg>
    </button>
    </div>
    </li>`;
    })
    .join('');
}

export {
  markupCategoryList,
  markupAllBooks,
  markupBlock,
  markupBookModal,
  shopListMarkup,
};
