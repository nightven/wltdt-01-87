function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o),o.register("kyEFX",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("kyEFX").register(JSON.parse('{"5ZPII":"index.485a9275.js","1C7b3":"save-the-children.164cf59f.png","9Icea":"hope.ac2f4725.png","hFTNj":"united24.eb8f4e7c.png","2zX6y":"medical-corps.f83b1230.png","60ZKo":"sans-frontieres.ce9fd46e.png","dUYMD":"razom.9be8270a.png","6nG7j":"hunger.21fd0d2d.png","iZsNm":"world-vision.aa02aa90.png","6fuIe":"prytula.ffd42f47.png"}'));var i;i=new URL(o("kyEFX").resolve("1C7b3"),import.meta.url).toString();var a;a=new URL(o("kyEFX").resolve("9Icea"),import.meta.url).toString();var l;l=new URL(o("kyEFX").resolve("hFTNj"),import.meta.url).toString();var s;s=new URL(o("kyEFX").resolve("2zX6y"),import.meta.url).toString();var u;u=new URL(o("kyEFX").resolve("60ZKo"),import.meta.url).toString();var d;d=new URL(o("kyEFX").resolve("dUYMD"),import.meta.url).toString();var c;c=new URL(o("kyEFX").resolve("6nG7j"),import.meta.url).toString();var g;g=new URL(o("kyEFX").resolve("iZsNm"),import.meta.url).toString();var p;p=new URL(o("kyEFX").resolve("6fuIe"),import.meta.url).toString();const f=[{title:"Save the Children",url:"https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis",img:new URL(i)},{title:"Project HOPE",url:"https://www.projecthope.org/country/ukraine/",img:new URL(a)},{title:"UNITED24",url:"https://u24.gov.ua/uk",img:new URL(l)},{title:"International Medical Corps",url:"https://internationalmedicalcorps.org/country/ukraine/",img:new URL(s)},{title:"Medicins Sans Frontieres",url:"https://www.msf.org/ukraine",img:new URL(u)},{title:"RAZOM",url:"https://www.razomforukraine.org/",img:new URL(d)},{title:"Action against hunger",url:"https://www.actionagainsthunger.org/location/europe/ukraine/",img:new URL(c)},{title:"World vision",url:"https://www.wvi.org/emergencies/ukraine",img:new URL(g)},{title:"Serhiy Prytula Charity Foundation",url:"https://prytulafoundation.org/en",img:new URL(p)}].map((({title:e,url:t,img:n},r)=>`<li class="fonds__item">\n      <a class="fonds__link" href="${t}" target="_blank">\n        <div class="item_link">\n          <span class="number__list">${(r+1).toString().padStart(2,"0")}</span>\n          <img\n            class="img__fonds"\n            src="${n}"\n            alt="${e}"\n          />\n        </div>\n      </a>\n    </li>`)).join("");document.querySelector(".fonds__list").insertAdjacentHTML("beforeend",f),document.addEventListener("DOMContentLoaded",(function(){["data-sign-up","data-sign-in"].forEach((e=>{const t=e+"-open",n=e+"-close",r=document.querySelectorAll(`[${t}]`),o=document.querySelectorAll(`[${n}]`),i=document.querySelector(`[${e}]`);function a(){document.body.classList.toggle("modal-open"),i.classList.toggle("is-hidden")}i||logModalError("Can`t find Modal with attribute "+i),0===r.length&&logModalError("Can`t find Open modal button with attribute "+t),0===o.length&&logModalError("Can`t find Close modal button with attribute "+n),i&&0!==r.length&&0!==o.length&&(r.forEach((e=>e.addEventListener("click",a))),o.forEach((e=>e.addEventListener("click",a))))}))}),!1);
//# sourceMappingURL=index.485a9275.js.map