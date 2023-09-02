import amazonImage from '../../images/shops/amazon.png';
import appleShopImage from '../../images/shops/apple-shop.png';
import bookShopImage from '../../images/shops/book-shop.png';
import crossSvg from '../../images/icons.svg';

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
      <li class="card-set-item" data-id="${_id}">      
      <a href="#" >
      <img src="${book_image}" width="180px" height="226px" class="book-img"/>
      <h3 class="book-title">${title}</h3>
      <p class="book-author">${author}</p>
      </a></li>
    `
    )
    .join('');
}




//------------------ Create markup Top Books ---------------------------------------

export function markupList(books) {
  return books
    .map(({ book_image, title, author, _id }) => {
      return `<li class="js-item-book" id="${_id}">
            <img src="${book_image}" alt="${title}" data-id="${_id}" loading="lazy" class="img-books"/>
            <h3 class="js-named-book">${title}</h3>
            <p class="js-author-book">${author}</p>
        </li>`;
    })
    .join('');
}

export function markupBlock(data) {
  return data
    .map(({ list_name, books }) => {
      return `<div class="wrapper"><h3 class="js-list-name">${list_name}</h3>
        <ul class="js-list-books">${markupList(books)}</ul>
        <btn class="js-btn-books" data-js="${list_name}">See more</btn></div>`;
    })
    .join('');
}


// -------------------Create modal window---------------------------
function markupModal(bookData) {
  const { book_image, author, description, list_name } = bookData;
  return `<div class="modal-container container">
    <button class="close-modal-btn" type="button">
      <svg class="close-modal-icon">
        <use href="${crossSvg}#icon-x-close"></use>
      </svg>
    </button>
    <div class="modal-wrapper">
      <img class="modal-book-cover"
              src="${book_image}"
              alt="Book cover"
            />
            <div class="right-side-wrap">
            <div class="modal-titles">
              <h2 class="modal-book-name">${list_name}</h2>
               <h3 class="modal-book-author">${author}</h3>
             </div>
           <p class="modal-book-descr">${description}</p>
        <ul class="modal-list-partners">
          <li class="modal-item-partners">
            <a
              href="https://www.amazon.com/"
              class="modal-partners-link"
              target="_blank"
              rel="noopener no-referrer"
              ><img src="${amazonImage}" alt="Amazon"
            /></a>
          </li>
          <li class="modal-item-partners">
            <a
              href="https://www.apple.com/ua/apple-books/"
              class="modal-partners-link"
              target="_blank"
              rel="noopener no-referrer"
              ><img src="${appleShopImage}" alt="Apple-shop"
            /></a>
          </li>
          <li class="modal-item-partners">
            <a
              href=""
              class="modal-partners-link"
              target="_blank"
              rel="noopener no-referrer"
            >
              <img src="${bookShopImage}" alt="Book-shop"
            /></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal-btn-wrap">
      <button class="modal-btn" type="button">add to shopping list</button>
      <p class="modal-congrats-text is-hidden">
        Congratulations! You have added the book to the shopping list. To
        delete, press the button &#8220;Remove from the shopping list&#8221;.
      </p>
    </div>
  </div>`;
}

export { markupCategoryList, markupAllBooks, markupModal };

