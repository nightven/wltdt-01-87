!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var a=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,a.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=a),a("iE7OH").register(JSON.parse('{"4SWbF":"shopping-list.2663b042.js","410VS":"icons.e7f82428.svg"}'));var n=a("44iE8");a("aNJCr").getBundleURL("4SWbF"),a("iE7OH").resolve("410VS"),a("cokon");var i=a("aI4Bq"),r=a("cqmI4"),s=r.default.shopListEl,d=r.default.emptyBinEl,l="chosen-books";function c(){var e=(0,n.getDataFromLocalStorage)(l);0===e.length?d.classList.remove("visually-hidden"):(d.classList.add("visually-hidden"),s.insertAdjacentHTML("beforeend",(0,i.shopListMarkup)(e)))}c(),document.addEventListener("click",(function(e){if(e.target.closest("[data-delete]")){var t=e.target.closest(".book-item").dataset.id,o=(0,n.getDataFromLocalStorage)(l),a=o.findIndex((function(e){return e._id===t}));o.splice(a,1),(0,n.saveDataToLocalStorage)(l,o),s.innerHTML=(0,i.shopListMarkup)(o),c()}}))}();
//# sourceMappingURL=shopping-list.2663b042.js.map
