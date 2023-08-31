import axios from "axios";

//-------------------Fetch Category List-------------------------------------------------

const URL_CATEGORY_LIST = "https://books-backend.p.goit.global/books/category-list";

async function fetchCategoryList() {
    return await axios.get(URL_CATEGORY_LIST);
};



//-------------------Fetch AllBooks of each category---------------------------------------

const URL_ALL_BOOKS = "https://books-backend.p.goit.global/books/category";

async function fetchAllBooks(searchQuery){
    const param = new URLSearchParams({        
        category : searchQuery,
        
    });

    return await axios.get(`${URL_ALL_BOOKS}?${param}`);
};





export { fetchCategoryList, fetchAllBooks }