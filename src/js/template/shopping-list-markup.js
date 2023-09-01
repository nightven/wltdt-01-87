import { getDataFromLocalStorage } from "../localstorage/local";

const ulListEl = document.querySelector('.ul-list');

const BOOK_KEY = 'book';

function emptyShopMarkup() {
    const markup = `<h1>empty books</h1>`;
    return ulListEl.innerHTML = markup;
}

function shopMarkup(arr) {
    return arr.map(() => {
        ``;
    })
}

function doMarkup() {
    console.log('2');
    const localStorageData = getDataFromLocalStorage(BOOK_KEY);
    if(localStorageData.length === 0) {
        emptyShopMarkup()
    } else {
        shopMarkup();
    }
}

doMarkup();
