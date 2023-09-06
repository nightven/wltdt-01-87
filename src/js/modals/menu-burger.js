import { onClickLogout } from "../auth/auth";
import refs from "../refs/refs";

const{btnOpenClose, modal }= refs;


btnOpenClose.addEventListener('click', onClickBurger);

function onClickBurger(evt){ 
    evt.currentTarget.classList.toggle('open');
    modal.classList.toggle("is-hidden");
    // window.addEventListener('click', onClickLogout);
    
};





