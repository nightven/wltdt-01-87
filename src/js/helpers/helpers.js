//---------------Render category-list-------------------------
function addMarkupCategoryList(element, markup) {
  element.innerHTML = markup;
}

function addMarkupTopBooks(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

//---------------Change Color Of Title Of Category----------------

function changeColorOfTitleOfCategory(str) {
  const arr = str.split(" ");  
  return arr[arr.length-1];
}

//------------------Split title-------------------------------------
function splitTitle(str) {
  const arr = str.split(" ");
  return arr.splice(0, arr.length-1).join(" ");
}


export { addMarkupCategoryList, addMarkupTopBooks, changeColorOfTitleOfCategory, splitTitle };
