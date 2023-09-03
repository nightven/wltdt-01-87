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

//-------------------Limit Title Of Books------------------------------
function limitStr(str, n, symb) {
  if (!n && !symb || str.length<=n) return str;  
  symb = "...";
  return str.substr(0, n-symb.length) + symb;
}


export { addMarkupCategoryList, addMarkupTopBooks, changeColorOfTitleOfCategory, splitTitle, limitStr };
