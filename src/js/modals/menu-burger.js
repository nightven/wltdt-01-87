import { onClickLogout } from "../auth/auth";
import refs from "../refs/refs";

const{btnOpenClose, modal }= refs;

//listhen burger-menu
btnOpenClose.addEventListener('click', onClickBurger);

//open/close modal burger-menu
function onClickBurger(evt){ 
    evt.currentTarget.classList.toggle('open');
    modal.classList.toggle("is-hidden");
    document.body.classList.toggle('no-scroll');
    
    
};





