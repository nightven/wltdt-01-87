//--------------------Create markup of category-list------------------------------
function markupCategoryList(arr) {
  return arr
    .map(
      ({ list_name }) => 
    `
      <li><a href="" class="item-category">${list_name}</a></li>
    `
  ).join("");
}
//---------------------------------------------------------------------------------


export {markupCategoryList}