!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i),i("iE7OH").register(JSON.parse('{"4SWbF":"shopping-list.9a70153e.js","410VS":"icons.e7f82428.svg"}'));var a,s=i("44iE8");a=i("aNJCr").getBundleURL("4SWbF")+i("iE7OH").resolve("410VS"),i("cokon"),i("2MzH6");var c,r,l=document.querySelector(".shopping-list"),d=document.querySelector(".empty-bin-wrapper"),u="chosen-books";0===(c=(0,s.getDataFromLocalStorage)(u)).length?d.classList.remove("visually-hidden"):(d.classList.add("visually-hidden"),l.insertAdjacentHTML("beforeend",(r=c,console.log(r),r.map((function(n){var o=n._id,t=n.list_name,i=n.book_image,s=n.author,c=n.title,r=n.description;return'\n    <li class="book-item" data-id="'.concat(o,'">\n    <img class="shop-book-img" src="').concat(i,'" alt="').concat(c,'" width="300" />\n    <div class="book-item-descr">\n    <h2>').concat(c,"</h2>\n    <p>").concat(t,"</p>\n    <p>").concat(r,"</p>\n    <p>").concat(s,'</p>\n    <button class="book-btn" id="delete-btn" type="button">\n    <svg class="del-modal-icon" width="28" height="28">\n    <use href="').concat(e(a),'#icon-trash-bin"></use>\n    </svg>\n    </button>\n    </div>\n    </li>')})).join(""))));var p=document.getElementById("delete-btn");console.log(p),p.addEventListener("click",(function(e){var n=e.currentTarget.closest(".book-item").dataset.id;console.log(n)}))}();
//# sourceMappingURL=shopping-list.9a70153e.js.map
