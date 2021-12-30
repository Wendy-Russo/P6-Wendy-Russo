
"use strict";
fetch('/media/data/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })

    .then((json) => {
        let DomFactory = function(){
            this.makeDom = function(type,place,i){
                let dom;
                if(type === "img" && place === "gallery"){
                    dom = new ImgGallery(i);
                }
                if(type === "img" && place === "lb"){
                    dom = new ImgLb(i);
                }
                if(type === "vid" && place === "gallery"){
                    dom = new VidGallery(i);
                }
                if(type === "vid" && place === "lb"){
                    dom = new VidLb(i);
                }
                return dom;
            }}

        const ImgGallery = function(i){
            this.dom = "<img src= \"" + photographer.folder + arrayPhotos[i].image + "\"id= \"photo-" + i + " \" tabindex=0 alt=\"" + arrayPhotos[i].title + "\" >";
        }

        const ImgLb = function(i){
            this.dom = "<img src= \"" + photographer.folder + arrayPhotos[i].image + "\"  class=\"col-10\" id=\"img-lb\" tabindex=0 alt=\"" + arrayPhotos[i].title + "\" >";
        }

        const VidGallery = function(i){
            this.dom = "<video src= \"" + photographer.folder + arrayPhotos[i].video + "\"id= \"photo-" + i + " \" tabindex=0 alt=\"" + arrayPhotos[i].title + "\" >";
        }

        const VidLb = function(i){
            this.dom = "<video src= \"" + photographer.folder + arrayPhotos[i].video + "\" class=\"col-10\" id=\"img-lb\" tabindex=0 alt=\"" + arrayPhotos[i].title + "\" controls >";
        }

        let factory = new DomFactory()
        let photographers = json.photographers;
        let media = json.media;
        let path = window.location.pathname;
        let arrayPhotos = [];
        let totalLikes = 0
        let allLiked = []


        if(path != "/index.html"){
            console.log("index")
            const MODALLB      = new bootstrap.Modal(document.getElementById('modal-lb'), {keyboard: false});
            const MODALCONTACT = new bootstrap.Modal(document.getElementById('contactModal'), {keyboard: false});
            const SELECT_SORT  = document.getElementById("select-sort");
            let photographer;
            let TOTAL_LIKES_ELEMENT = document.getElementById("likes-total")
            // MATCHES FILES AND PHOTOGRAPHERS
            if (path == "/pages/mimi.html") {
                photographer = photographers[0]
            }
            // GETS ALL PHOTOS BY PHOTOGRAPHER
            for (var i = 0; i < media.length; i++) {
                if (media[i].photographerId === photographer.id) {
                    arrayPhotos.push(media[i]);
            }}
            //CALCULATES TOTAL LIKES
            arrayPhotos.forEach((item) => totalLikes += item.likes);
            //############ADDS-PHOTOS############//
            function addPhotos(i) {
                //ADDS PHOTO IF IT EXISTS IN THE ARRAY
                if (arrayPhotos[i].image != undefined) {
                    let image = factory.makeDom("img","gallery",i)
                    document.getElementById("but-" + i).firstElementChild.insertAdjacentHTML("afterend", image.dom)
                }
                //ADDS VIDEO IF IT EXISTS IN THE ARRAY
                if (arrayPhotos[i].video != undefined) {
                    let video = factory.makeDom("vid","gallery",i)
                    document.getElementById("but-" + i).firstElementChild.insertAdjacentHTML("afterend", video.dom);
                }
                document.getElementById("but-" + i).firstElementChild.remove()
            }
            //############Sets-Likes-Title############//
            function setLikesTitle(i) {
                document.getElementById("photo-" + i + "-likes").innerHTML = arrayPhotos[i].likes;
                document.getElementById("photo-" + i + "-title").innerHTML = arrayPhotos[i].title;
                TOTAL_LIKES_ELEMENT.innerHTML = totalLikes;
            }
            //############SORTS-BY-LIKES############//
            function SortByLikes() {
                arrayPhotos.sort((a, b) => {
                    return b.likes - a.likes;
                });
            }
            //############OPENS A FILLE IN THE LB############//
            function openLb(clickedID) {
                //REMOVES THE OLD MEDIA IF A NEW ONE IS ADDED
                if (document.getElementById("img-lb") != undefined) {
                    document.getElementById("img-lb").remove()
                }
                //ADDS AN IMAGE IF IT EXISTS IN THE ARRAY
                if (arrayPhotos[clickedID].image != undefined) {
                    let image = factory.makeDom("img","lb",clickedID)
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", image.dom)
                //ADDS A VIDEO IF IT EXISTS IN THE ARRAY
                } else {
                    let video = factory.makeDom("vid","lb",clickedID)
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", video.dom)
                }
                console.log(clickedID)
            }
            function loopInt(clickedID){
                //SETS ID TO LAST IF TOO LOW
                if (clickedID < 0) {
                    clickedID = 9;
                }
                //SETS ID TO FIRST IF TOO HIGH
                if (clickedID > 9) {
                    clickedID = 0;
                }
                console.log(clickedID)
                openLb(clickedID);
                return clickedID;
            }
            //############OPENS THE RIGHT FILE DEPENTING ON INPUT ############//
            function lightbox(i) {
                document.getElementById("but-" + i).addEventListener("click", function(e) {
                    let clickedID = i
                    openLb(clickedID)
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

                    document.body.addEventListener("keydown", function(event) {
                        //OPENS PREVIOUS IMAGE IF I HIT LEFT ARROW
                        if (event.key === "ArrowLeft") {
                            clickedID--
                            clickedID = loopInt(clickedID);
                        }
                        //OPENS NEXT IMAGE IF I HIT RIGHT ARROW
                        if (event.key === "ArrowRight") {
                            clickedID++
                            clickedID = loopInt(clickedID);
                        }
                        //CLOSE THE MODAL IF I HIT ESCAPE
                        if (event.key === "Escape"){
                            MODALLB.hide()
                        }
                    })
                    MODALLB.show()
                });
            }
            for (let i = 0; i < 10; i++) {
                let LIKES_BUTTON_ELEMENT = document.getElementById("photo-" + i + "-button-like");
                let LIKES_ICON_ELEMENT = document.getElementById("photo-" + i + "-icon-like");
                //############LIKES-BUTTON############//
                LIKES_BUTTON_ELEMENT.addEventListener('click', function() {
                    //IF ELEMENT IS ALREADY LIKED
                    if (!allLiked.includes(arrayPhotos[i].title)) {
                        LIKES_ICON_ELEMENT.setAttribute("class", "fas fa-heart primary");
                        arrayPhotos[i].likes ++, totalLikes++;
                        allLiked.push(arrayPhotos[i].title)
                        LIKES_BUTTON_ELEMENT.ariaLabel = "remove like"
                    //IF ELEMENT IS NOT LIKED
                    } else {
                        LIKES_ICON_ELEMENT.setAttribute("class", "far fa-heart primary");
                        arrayPhotos[i].likes--, totalLikes--;
                        allLiked.splice(allLiked.indexOf(arrayPhotos[i].title), 1)
                        LIKES_BUTTON_ELEMENT.ariaLabel = "add like"
                    }
                    setLikesTitle(i)
                });

                SortByLikes()
                setLikesTitle(i);
                addPhotos(i)
                lightbox(i)

                //############SORTING############//
                SELECT_SORT.addEventListener('change', function() {
                    //IF SELECT SORT BY POPULARITY
                    if (SELECT_SORT.selectedIndex === 0) {
                        SortByLikes()
                    }
                    //IF SELECT SORT BY DATE
                    if (SELECT_SORT.selectedIndex === 1) {
                        arrayPhotos.sort((a, b) => {
                            return a.date.replaceAll('-', '') - b.date.replaceAll('-', '');
                        });
                    }
                    //IF SELECT SORT BY NAME
                    if (SELECT_SORT.selectedIndex === 2) {
                        arrayPhotos.sort((a, b) => {
                            //IF A IS ALPHABETICALLY FIRST
                            if (a.title < b.title) {
                                return -1;
                            }
                            //IF B IS ALPHABETICALLY FIRST
                            if (a.title > b.title) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    //MOVES LIKES AFTER REFRESH
                    //IF THIS ELEMENT WAS LIKED
                    if (!allLiked.includes(arrayPhotos[i].title)){
                        LIKES_ICON_ELEMENT.setAttribute("class", "far fa-heart primary");
                        LIKES_BUTTON_ELEMENT.ariaLabel = "remove like"
                    }
                    //IF THIS ELEMENT WAS NOT LIKES
                    else{
                        LIKES_ICON_ELEMENT.setAttribute("class", "fas fa-heart primary");
                        LIKES_BUTTON_ELEMENT.ariaLabel = "add like"
                    }
                    setLikesTitle(i)
                    addPhotos(i)
                });
            }
            document.getElementById("photographer-name").innerHTML = photographer.name;
            document.getElementById("city-country").innerHTML = photographer.city + ", " + photographer.country;
            document.getElementById("tagline").innerHTML = photographer.tagline;
            document.getElementById("portrait").src = "/media/sample-photos/photographers-id-photos/" + photographer.portrait;
            document.getElementById("price").innerHTML = photographer.price + "€ / jour";
            //LOGS THE 3 FIELDS WHEN FORM IS SUBMITTED
            document.getElementById("contactForm").addEventListener('submit', function(e) {
                console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("fname").value + " Email : " + document.getElementById("fname").value + " Message : " + document.getElementById("message").value)
                e.preventDefault()
            })
            document.body.addEventListener("keydown", function(event) {
                //CLOSE THE MODAL IF I HIT ESCAPE
                if (event.key === "Escape"){
                    MODALCONTACT.hide()
                }
            })
        }
        else{
            //console.log(photographers)
            for(let i = 0; i<6;i++){
                let PHOTOGRAPHER_PORTRAIT = document.querySelector("#photographer-"+i+" img");
                let PHOTOGRAPHER_NAME = document.querySelector("#photographer-"+i+" h2");
                let PHOTOGRAPHER_LOCATION = document.querySelector("#photographer-"+i+" #location");
                let PHOTOGRAPHER_SLOGAN = document.querySelector("#photographer-"+i+" #slogan");
                let PHOTOGRAPHER_PRICE = document.querySelector("#photographer-"+i+" #price");
                PHOTOGRAPHER_PORTRAIT.src = "../media/sample-photos/photographers-id-photos/" + photographers[i].portrait;
                PHOTOGRAPHER_PORTRAIT.alt = photographers[i].name
                PHOTOGRAPHER_NAME.innerHTML = photographers[i].name;
                PHOTOGRAPHER_LOCATION.innerHTML = photographers[i].city+", "+photographers[i].country;
                PHOTOGRAPHER_SLOGAN.innerHTML = photographers[i].tagline;
                PHOTOGRAPHER_PRICE.innerHTML = photographers[i].price+"€ /jour";

                //console.log(i)
            }
        }
    }
)
