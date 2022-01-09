function modalFunction(){
    document.getElementById("contactForm").addEventListener("submit", function(e) {
        console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("lname").value + " Email : " + document.getElementById("email").value + " Message : " + document.getElementById("message").value);
        e.preventDefault();
    });
}
function lightboxFunction(){
    const imageLink = document.getElementsByClassName("button-img");
    const MODALLB = new bootstrap.Modal(document.getElementById("modal-lb"), {keyboard: false});
    Array.prototype.forEach.call(imageLink,function(imageLink){
        imageLink.addEventListener("click",function(){
            let media = imageLink.firstElementChild;
            media.setAttribute("class",'col-10')
            document.getElementById("button-left-lb").insertAdjacentElement("afterend",media);
            MODALLB.show();

        });
    });
    /* const MODALLB = new bootstrap.Modal(document.getElementById("modal-lb"), {keyboard: false});
    document.getElementById("but-").addEventListener("click", function() {
        let clickedID = 1;
        openLb(clickedID);
        //OPENS NEXT IMAGE IF CLICK RIGHT BUTTON
        document.getElementById("button-right-lb").addEventListener("click", function() {
            clickedID++;
            clickedID = loopInt(clickedID);
        });
        //OPENS PREVIOUS IMAGE IF I CLICK THE LEFT BUTTON
        document.getElementById("button-left-lb").addEventListener("click", function() {
            clickedID--;
            clickedID = loopInt(clickedID);
        });
        document.getElementById("button-close-lb").addEventListener("click", function() {
            MODALLB.hide();
        });
        //LISTENS TO KEYSTROKES
        document.body.addEventListener("keydown", function(event) {
            //OPENS PREVIOUS IMAGE IF I HIT LEFT ARROW
            if (event.key === "ArrowLeft") {
                clickedID--;
                clickedID = loopInt(clickedID);
            }
            //OPENS NEXT IMAGE IF I HIT RIGHT ARROW
            if (event.key === "ArrowRight") {
                clickedID++;
                clickedID = loopInt(clickedID);
            }
            //CLOSE THE MODAL IF I HIT ESCAPE
            if (event.key === "Escape"){
                MODALLB.hide();
            }
        })
        MODALLB.show();
    }); */
}
function openLb(clickedID) {
    //REMOVES THE OLD MEDIA IF A NEW ONE IS ADDED
    if (document.getElementById("img-lb")) {
        document.getElementById("img-lb").remove();
    }
    //ADDS AN IMAGE IF IT EXISTS IN THE ARRAY
    if (arrayPhotos[clickedID].image) {
        let image = factory.makeDom("img","lb",clickedID);
        document.getElementById("button-left-lb").insertAdjacentHTML("afterend", image.dom);
    //ADDS A VIDEO IF IT EXISTS IN THE ARRAY
    } else {
        let video = factory.makeDom("vid","lb",clickedID);
        document.getElementById("button-left-lb").insertAdjacentHTML("afterend", video.dom);
    }
}