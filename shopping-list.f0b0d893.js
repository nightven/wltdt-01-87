var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("9qS74");const i=document.querySelector(".shopping-list"),l=document.querySelector(".empty-bin-wrapper");(0,r.getDataFromLocalStorage)();0===(0,r.getDataFromLocalStorage)("book-el").length?l.classList.remove("visually-hidden"):(l.classList.add("visually-hidden"),function(e){const o=e.map((({list_name:e,book_image:o,author:n})=>`\n        <img class="shop-book-img" src="${o}" alt="" width="300" />\n        <h2>${e}</h2>\n        <p>${n}</p>`)).join("");i.innerHTML=o}());
//# sourceMappingURL=shopping-list.f0b0d893.js.map