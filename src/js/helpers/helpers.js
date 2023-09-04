//---------------Render category-list-------------------------
function addMarkupCategoryList(element, markup) {
  element.innerHTML = markup;
}

function addMarkupTopBooks(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

//---------------Change Color Of Title Of Category----------------
function changeColorOfTitleOfCategory(str, element1, element2){
  element1.textContent = splitStartOfTitle(str);
  element2.textContent = splitEndOfTitle(str);
}


//---------------Change Color Of Title Of Category----------------
function changeColorOfTitleOfCategory(str, element1, element2){
  element1.textContent = splitStartOfTitle(str);
  element2.textContent = splitEndOfTitle(str);
}


//------------------Split title-------------------------------------

function splitStartOfTitle(str) {
  const arr = str.split(" ");
  return arr.splice(0, arr.length-1).join(" ");
}

function splitEndOfTitle(str) {
  const arr = str.split(" ");  
  return arr[arr.length-1];
}

//-------------------Limit Title Of Books------------------------------
function limitStr(str, n, symb) {
  if (!n && !symb || str.length<=n) return str;  
  symb = "...";
  return str.substr(0, n-symb.length) + symb;
}

//-------------------Make Active Category------------------------------
function makeActiveCategory(element, nameOfCategory){
  for (const item of element) {
    if (item.textContent === nameOfCategory) {
      item.classList.add('active-category');
  
    }
  }
}

//-------------------Chane Active Category------------------------------
function changeActiveCategory(element){
  for(const item of element){
    if(item.classList.contains('active-category')){
      item.classList.remove('active-category');
    }
  }
}

export { addMarkupCategoryList, addMarkupTopBooks, changeColorOfTitleOfCategory, limitStr, makeActiveCategory, changeActiveCategory };
