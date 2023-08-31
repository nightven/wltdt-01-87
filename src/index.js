import { fetchCategoryList, fetchAllBooks } from "./js/api/api";
import { addMarkupCategoryList } from "./js/helpers/helpers";
import { markupCategoryList } from "./js/template/markup";
import { refs } from "./js/refs/refs";

//----------------------Category List-----------------------------------------
fetchCategoryList().then((resp) => {
    console.log(resp.data)
    addMarkupCategoryList(refs.listCategoryEl, markupCategoryList(resp.data));
})
//------------------------------------------------------------------------------

//-------------------Get Name Of Category---------------------------------------
refs.listCategoryEl.addEventListener("click", onShowAllBooks);
let nameOfCategory = 0;

function onShowAllBooks(event) {

    event.preventDefault();

    if (!event.target.classList.contains("item-category")) return;

    nameOfCategory = event.target.textContent;     

    fetchAllBooks(nameOfCategory).then((resp) => {
    
        console.log(resp.data);
        
        //------------------Should be render of markup of All Books (Roman)---------------
})
}


