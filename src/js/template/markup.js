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
      <a href="" >
      <img src="${book_image}" width="180px" height="226px" class="book-img"/>
      <h3 class="book-title">${title}</h3>
      <p class="book-author">${author}</p>
      </a></li>
    `
    )
    .join('');
}

export { markupCategoryList, markupAllBooks };

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
