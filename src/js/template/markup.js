import axios from 'axios';

const $mainContainer = document.querySelector('.js-books');

let markup = `<h1 class="books-category-title-active">Best Sellers <span class="category-title-accent">Books</span></h1><ul class="best-sellers-container">`;

const markupContainer = document.getElementById('container-id');
let markup = '';

books.forEach(category => {
  markup += `<li class="home-books-container">
                   <h2 class="books-best">${category[0].list_name}</h2>
                   <ul class="book-by-category-list">`;

  if (category.length) {
    markup += category
      .map(({ _id, author, book_image, title }) => {
        return `<li class="home-book-card" book-id="${_id}">
                    </li>`;
      })
      .join('');
  } else {
    markup += '<p class="no-books">No books in this category.</p>';
  }
  markup += '</ul></li>';
});