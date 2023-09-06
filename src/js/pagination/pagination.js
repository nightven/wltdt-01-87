import Pagination from 'tui-pagination';
import { getDataFromLocalStorage } from '../localstorage/local';
import { shopListMarkup } from '../template/markup';
import refs from '../refs/refs';

const container = document.getElementById('pagination');

export function addPagination() {
    const shoppingList = getDataFromLocalStorage('chosen-books')
    if(shoppingList.length === 0 || !shoppingList) {
        return;
    }

    let totalResults = shoppingList.length;

    const options = {
        totalItems: `${totalResults}`,
        itemsPerPage: 3,
        visiblePages: 3,
        currentPage: 1,
        centerAlign: true,
    }
    
    function chunkArray(array, itemsPerPage) {
        const chunkedArray = [];
        let index = 0;
        while (index < array.length) {
          const item = array.slice(index, itemsPerPage + index);
          chunkedArray.push(item);
          index += itemsPerPage;
        }
        return chunkedArray;
    }
    
    const chunkedSavedBooks = chunkArray(shoppingList, options.itemsPerPage);
    let booksForCurrentPage = chunkedSavedBooks[options.currentPage - 1];
    refs.shopListEl.innerHTML = shopListMarkup(booksForCurrentPage)

    const pagination = new Pagination(container, options); 

    pagination.reset(totalResults);

    pagination.on('beforeMove', e => { 
        options.currentPage = e.page;
        booksForCurrentPage = chunkedSavedBooks[options.currentPage - 1];
        refs.shopListEl.innerHTML = shopListMarkup(booksForCurrentPage)
    });

    pagination.reset(totalResults);
    console.log('1');
}