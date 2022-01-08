function modalFunction(){
    document.getElementById("contactForm").addEventListener("submit", function(e) {
        console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("lname").value + " Email : " + document.getElementById("email").value + " Message : " + document.getElementById("message").value);
        e.preventDefault();
    });
}
