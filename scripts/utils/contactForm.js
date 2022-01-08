const modal = document.getElementById("contact_modal");
function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function modalFunction(){
    const modal = document.getElementById("contact_modal");
    const contactButton = document.getElementById("contact_button");
    contactButton.addEventListener("click",function(){
        console.log(modal)
        if(modal.style.display = "none"){
            modal.style.display = "block";
        }
        else{
            modal.style.display = "none";
        };
    })
}
