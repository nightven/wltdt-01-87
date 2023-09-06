import { onClickLogout } from "../auth/auth";
import refs from "../refs/refs";
const{btnOpenClose, modal }= refs;
// const btnOpenClose = document.getElementById('burger-btn');
// const modal = document.getElementById("burger-modal");


btnOpenClose.addEventListener('click', onClickBurger);

function onClickBurger(evt){ 
    evt.currentTarget.classList.toggle('open');
    modal.classList.toggle("is-hidden");
    // window.addEventListener('click', onClickLogout);
    
};





