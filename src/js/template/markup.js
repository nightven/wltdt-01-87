import amazonImage from '../../images/shops/amazon.png';
import appleShopImage from '../../images/shops/apple-shop.png';
import bookShopImage from '../../images/shops/book-shop.png';
import crossSvg from '../../images/icons.svg';
import defaultImg from '../../images/empty-img_lap@_1x.png';
import { limitStr } from '../helpers/helpers';
import spriteSvg from '../../images/icons.svg';
import refs from '../refs/refs';
import { mediaQueriLimitStr } from '../helpers/helpers';
import OksanaPhoto from '../../images/team/Oksana.png';
import VikaPhoto from '../../images/team/Vika.png';
import MarinaPhoto from '../../images/team/Marina.png';
import AnastasiaPhoto from '../../images/team/Anastasia.png';
import ServerPhoto from '../../images/team/Server.png';
import DimaPhoto from '../../images/team/Dima.png';
import RomanPhoto from '../../images/team/Roman.png';
import VladPhoto from '../../images/team/Vlad.png';
import VitaliyPhoto from '../../images/team/Vitaliy.png';

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
   
          <img class="book-img" src="${
            book_image || defaultImg
          }" alt="${title}" loading="lazy"/>
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
            <img src="${
              book_image || defaultImg
            }" alt="${title}" data-img-id="${_id}" loading="lazy" class="img-books"/>
            
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
                    ><img src="${shopIcons[buyLink.name]}" alt="${
                buyLink.name
              }" class="${buyLink.name.toLowerCase()}"
                  /></a>
                </li>`
            )
            .join('')}
        </ul>
      </div>
    </div>
    <div class="modal-btn-wrap">
          <button class="modal-book-btn modal-btn authorized" type="button"></button>
      <button class="modal-btn modal-btn-for-login button-sign-up unauthorized" type="button"><span class='selected-words'>Login</span>
       or <span class='selected-words'>Register</span> , please!</a></button>
      <p class="modal-congrats-text is-hidden">
        Congratulations! You have added the book to the shopping list. To
        delete, press the button &#8220;Remove from the shopping list&#8221;.
      </p>
    </div>
  </div>`;
}

// -----------------------Create markUp in ShopingList---------------------------

const { shopListEl } = refs;

function shopListMarkup(array) {
  shopListEl.innerHTML = '';

  return array
    .map(
      ({
        _id,
        list_name,
        book_image,
        author,
        title,
        description,
        buy_links,
      }) => {
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

        return `<li class="book-item" data-id="${_id}">
    <div class="book-image-wrapper">
    <img class="shop-book-img" src="${book_image}" alt="${title}" width="300" />
    </div>
    <div class="book-item-descr">
    <h2 class="book-shop-title">${limitStr(title, 16)}</h2>
    <p class="book-genre">${list_name}</p>
    <p class="book-descr">${mediaQueriLimitStr(description, 84, 249, 500)}</p>
    <div class="author-shop-wrp">
    <p class="shop-book-author">${author}</p>
        <ul class="modal-list-partners">
          ${buyLinks
            .map(
              buyLink => `
              <li class="modal-item-partners">
                  <a
                    href="${buyLink.url}"
                    class="shop-partners-link"
                    target="_blank"
                    rel="noopener no-referrer">
                    <img src="${shopIcons[buyLink.name]}" alt="${
                buyLink.name
              }"/></a>
              </li>`
            )
            .join('')}
        </ul>
    
    </div>
    <button class="book-btn" data-delete  type="button">
    <svg class="del-modal-icon" width="18" height="18">
    <use href="${spriteSvg}#icon-trash-03"></use>
    </svg>
    </button>
    </div>
    </li>`;
      }
    )
    .join('');
}

//--------------------------Create Markup of Team-------------------------------------------------------------
function createMarkupTeam() {
  // return `
  // <card>
  // <div class="photo-wrapper">
  //       <img src="${defaultImg}" alt="books" width="300px" />
  //       <p>Created by <a class="js-team-modal">Dream team</a></p>
  //   </div>
  // </card>

  // `
  return `

  <div class="footer-modal-container">
  <button class="footer-close-modal-btn" type="button">
      <svg class="footer-close-modal-icon">
        <use href="${crossSvg}#icon-x-close"></use>
      </svg>
    </button>
  <div class="team-lead">
  <ul class="team-list">
  <li class="team-item">
  <a class='footer-img-link' href='https://github.com/nightven' target="_blank" rel="noopener no-referrer">
  <img src="${VitaliyPhoto}" class="team-img"/>
  <div class="footer-title-wrap">
  <h2 class="footer-title">Vitaliy</h2>
  <p class="footer-modal-text">Team Lead, Developer</p>
</div></a></li>
<li class="team-item">
<a class='footer-img-link' href='https://github.com/Viktoriia-Ch08' target="_blank" rel="noopener no-referrer">
<img src="${VikaPhoto}" class="team-img"/>
<div class="footer-title-wrap">
<h2 class="footer-title">Viktoriia</h2>
<p class="footer-modal-text">Scrum-master, Developer</p>
</div></a></li>
<ul class="team-list">
    <li class="team-item"> 
  <a class='footer-img-link' href='https://github.com/hotgorod' target="_blank" rel="noopener no-referrer">
    <img src="${MarinaPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Marina</h2>
  <p class="footer-modal-text">Developer</p>
</div>
</a>
    </li>
    <li class="team-item"> 
    <a class='footer-img-link' href='https://github.com/AnastasiiaDia' target="_blank" rel="noopener no-referrer">
    <img src="${AnastasiaPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Anastasia</h2>
  <p class="footer-modal-text">Developer</p>
</div> 
</a>
</li>
<li class="team-item"> 
<a class='footer-img-link' href='https://github.com/Oksana-Tnt' target="_blank" rel="noopener no-referrer">
  <img src="${OksanaPhoto}" class="team-img" />
  <div class="footer-title-wrap">
    <h2 class="footer-title">Oksana</h2>
    <p class="footer-modal-text">Developer</p>
  </div>
  </a>
</li>
    <li class="team-item-second"> 
    <a class='footer-img-link' href='https://github.com/Dimzie' target="_blank" rel="noopener no-referrer">
    <img src="${DimaPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Dmitriy</h2>
  <p class="footer-modal-text">Developer</p>
</div>
</a>
    </li>
    <li class="team-item-second"> 
    <a class='footer-img-link' href='https://github.com/Roman80-IT' target="_blank" rel="noopener no-referrer">
    <img src="${RomanPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Roman</h2>
  <p class="footer-modal-text">Developer</p>
</div>
</a>
    </li>
    <li class="team-item-second"> 
    <a class='footer-img-link' href='https://github.com/ServerIbraimovUa' target="_blank" rel="noopener no-referrer">
    <img src="${ServerPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Server</h2>
  <p class="footer-modal-text">Developer</p>
</div>
</a>
    </li>
    <li class="team-item-second"> 
    <a class='footer-img-link' href='https://github.com/maodzhedun' target="_blank" rel="noopener no-referrer">
    <img src="${VladPhoto}" class="team-img"/>
    <div class="footer-title-wrap">
  <h2 class="footer-title">Vladislav</h2>
  <p class="footer-modal-text">Developer</p>
</div>
</a>
    </li>
  </ul>
  </div>  
  `;
}

export {
  markupCategoryList,
  markupAllBooks,
  markupBlock,
  markupBookModal,
  shopListMarkup,
  createMarkupTeam,
};
