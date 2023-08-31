import { fetchCategoryList, fetchAllBooks } from "./js/api/api";
import { addMarkupCategoryList } from "./js/helpers/helpers";
import { markupCategoryList } from "./js/template/markup";
import { refs } from "./js/refs/refs";

//----------------------Category List-----------------------------------------

window.addEventListener("load", onShowAllCategories);

async function onShowAllCategories() {
    try {
        
        const data = await fetchCategoryList();
        
        addMarkupCategoryList(refs.listCategoryEl, markupCategoryList(data.data));
    }
    catch (err){
        console.log(err.message);
        }
};
    

//-------------------All Books Each Of Category---------------------------------------
refs.listCategoryEl.addEventListener("click", onShowAllBooks);
let nameOfCategory = 0;

async function onShowAllBooks(event) {

    event.preventDefault();

    if (!event.target.classList.contains("item-category")) return;

    nameOfCategory = event.target.textContent;
    try {
        const data = await fetchAllBooks(nameOfCategory)
    
        console.log(data.data);
    }
    catch (err) {
        console.log(err.message);
    }
}   
 


