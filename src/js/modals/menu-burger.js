

const btnOpenClose = document.getElementById('burger-btn');
const modal = document.getElementById("burger-modal");

btnOpenClose.addEventListener('click', onClickBurger);

function onClickBurger(evt){ 
    
    evt.currentTarget.classList.toggle('open');
    modal.classList.toggle("is-hidden");
};



// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

