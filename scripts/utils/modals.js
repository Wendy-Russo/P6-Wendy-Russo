function modalFunction(){
    document.getElementById("contactForm").addEventListener("submit", function(e) {

        console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("lname").value + " Email : " + document.getElementById("email").value + " Message : " + document.getElementById("message").value);
        e.preventDefault();
    });
}

function lightboxFunction(){
    const MODALLB = new bootstrap.Modal(document.getElementById("modal-lb"), {keyboard: false});
    const imageLink = Array.from(document.getElementsByClassName("button-img"));
    const medias = Array.from(document.getElementsByClassName("media"));
    const leftButton  = document.getElementById("button-left-lb");
    const rightButton = document.getElementById("button-right-lb");
    for(let i = 0 ; i < imageLink.length;i++){
        imageLink[i].addEventListener("click",function(e){
            let clickedID = i;
            let media = medias[i].cloneNode();
            media.setAttribute("class",'col-10');
            if(leftButton.nextElementSibling.nodeName != "BUTTON"){
                leftButton.nextElementSibling.remove();
            }
            leftButton.insertAdjacentElement("afterend",media);
            MODALLB.show();
            //console.log(imageLink[i].firstElementChild)
            //console.log(media)
            rightButton.addEventListener("click",function(){
                clickedID+=1
                if(clickedID > medias.length-1){
                    clickedID = 0;
                }
                media = medias[clickedID].cloneNode();
                media.setAttribute("class",'col-10');
                if(leftButton.nextElementSibling){
                    leftButton.nextElementSibling.remove();
                }
                leftButton.insertAdjacentElement("afterend",media);
            })
            leftButton.addEventListener("click",function(){
                clickedID-=1
                if(clickedID < 0){
                    clickedID = medias.length-1;
                };
                media = medias[clickedID].cloneNode();
                media.setAttribute("class",'col-10');
                if(leftButton.nextElementSibling){
                    leftButton.nextElementSibling.remove();
                };
                leftButton.insertAdjacentElement("afterend",media);
            })
        })
    }
    document.getElementById("button-close-lb").addEventListener("click",function(){
        MODALLB.hide()
    })
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