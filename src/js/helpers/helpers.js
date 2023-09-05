
import { amountFondsItems } from "../fonds/fonds";

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


//------------------Media query for JS--------------------------------

function mediaQuery(screenBreackPoint) { 
  if (window.matchMedia(`(max-width: ${screenBreackPoint})px`).matches) {
  // Viewport is less or equal to 768 pixels wide
  amountFondsItems(4,4);
  } else {
  // Viewport is greater than 768 pixels wide
  amountFondsItems(6,6);
  }

} 

export { addMarkupCategoryList, addMarkupTopBooks, changeColorOfTitleOfCategory, limitStr, makeActiveCategory, changeActiveCategory, mediaQuery };
