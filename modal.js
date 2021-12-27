"use strict";
fetch('/media/data/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {

        let domFactory = function(){
            this.makeDom = function(type,place,i){
                let dom;
                if(type === "img" && place === "gallery"){
                    dom = new imgGallery(i);
                }
                if(type === "img" && place === "lb"){
                    dom = new imgLb(i);
                }
                if(type === "vid" && place === "gallery"){
                    dom = new vidGallery(i);
                }
                if(type === "vid" && place === "lb"){
                    dom = new vidLb(i);
                }
                return dom;
            }
        }
        const imgGallery = function(i){
            this.dom = "<img src= \"" + photographer.folder + arrayPhotos[i].image + "\"id= \"photo-" + i + " \"alt=\"" + arrayPhotos[i].title + "\" >";
        }
        const imgLb = function(i){
            this.dom = "<img src= \"" + photographer.folder + arrayPhotos[i].image + "\" class=\"col-10\" id=\"img-lb\"alt=\"" + arrayPhotos[i].title + "\" >";
        }
        const vidGallery = function(i){
            this.dom = "<video src= \"" + photographer.folder + arrayPhotos[i].video + "\"id= \"photo-" + i + " \"alt=\"" + arrayPhotos[i].title + "\" >";
        }
        const vidLb = function(i){
            this.dom = "<video src= \"" + photographer.folder + arrayPhotos[i].video + "\" class=\"col-10\" id=\"img-lb\"alt=\"" + arrayPhotos[i].title + "\" controls >";
        }


        let factory = new domFactory()
        let photographers = json.photographers;
        let media = json.media;
        let path = window.location.pathname;
        let arrayPhotos = [];
        let totalLikes = 0
        let allLiked = []
        const SELECT_SORT = document.getElementById("select-sort");
        const MODALLB = new bootstrap.Modal(document.getElementById('modal-lb'), {keyboard: false});
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
            }
        }

        arrayPhotos.forEach((item) => totalLikes += item.likes);

        document.getElementById("button-close-lb").addEventListener("click", function() {
            MODALLB.toggle()
        });



        //############ADDS-PHOTOS############//
        function addPhotos(i) {
            if (arrayPhotos[i].image != undefined) {
                let image = factory.makeDom("img","gallery",i)
                document.getElementById("but-" + i).firstElementChild.insertAdjacentHTML("afterend", image.dom)
            }
            if (arrayPhotos[i].video != undefined) {
                let video = factory.makeDom("vid","gallery",i)
                document.getElementById("but-" + i).firstElementChild.insertAdjacentHTML("afterend", video.dom);
            }
            document.getElementById("but-" + i).firstElementChild.remove()
        }

        //############Sets-Likes-Title############//
        function setLikesTitle(i) {
            //THIS_LIKES_ELEMENT.innerHTML = arrayPhotos[i].likes;
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

            if (document.getElementById("img-lb") != undefined) {
                document.getElementById("img-lb").remove()
            }
            if (arrayPhotos[clickedID].image != undefined) {
                let image = factory.makeDom("img","lb",clickedID)
                document.getElementById("button-left-lb").insertAdjacentHTML("afterend", image.dom)

            } else {
                let video = factory.makeDom("vid","lb",clickedID)
                document.getElementById("button-left-lb").insertAdjacentHTML("afterend", video.dom)
            }

            console.log(clickedID)
        }

        function loopInt(clickedID){

            if (clickedID < 0) {
                clickedID = 9;
            }
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

                document.getElementById("button-right-lb").addEventListener("click", function() {
                    clickedID++;
                    clickedID = loopInt(clickedID);
                });

                document.getElementById("button-left-lb").addEventListener("click", function() {
                    clickedID--;
                    clickedID = loopInt(clickedID);
                });

                document.body.addEventListener("keydown", function(event) {

                    if (event.key === "ArrowLeft") {
                        clickedID--
                        clickedID = loopInt(clickedID);
                    }

                    if (event.key === "ArrowRight") {
                        clickedID++
                        clickedID = loopInt(clickedID);
                    }

                    if (event.key === "Escape"){
                        MODALLB.hide()
                    }

                })
                MODALLB.show()
            });
        }

        for (let i = 0; i < 10; i++) {
            //let imageMain = domFactory.createDOM()

            let THIS_LIKES_BUTTON_ELEMENT = document.getElementById("photo-" + i + "-button-like");
            let THIS_LIKES_ICON_ELEMENT = document.getElementById("photo-" + i + "-icon-like");

            //############LIKES-BUTTON############//

            THIS_LIKES_BUTTON_ELEMENT.addEventListener('click', function() {

                if (!allLiked.includes(arrayPhotos[i].title)) {
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "fas fa-heart primary");
                    arrayPhotos[i].likes ++, totalLikes++;
                    allLiked.push(arrayPhotos[i].title)

                } else {
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "far fa-heart primary");
                    arrayPhotos[i].likes--, totalLikes--;
                    allLiked.splice(allLiked.indexOf(arrayPhotos[i].title), 1)
                }
                setLikesTitle(i)
            });

            SortByLikes()
            setLikesTitle(i);
            addPhotos(i)
            lightbox(i)

            //############SORTING############//
            SELECT_SORT.addEventListener('change', function() {

                if (SELECT_SORT.selectedIndex === 0) {
                    SortByLikes()
                }

                if (SELECT_SORT.selectedIndex === 1) {
                    arrayPhotos.sort((a, b) => {
                        return a.date.replaceAll('-', '') - b.date.replaceAll('-', '');
                    });
                }

                if (SELECT_SORT.selectedIndex === 2) {
                    arrayPhotos.sort((a, b) => {

                        if (a.title < b.title) {
                            return -1;
                        }

                        if (a.title > b.title) {
                            return 1;
                        }
                        return 0;
                    });
                }
                //MOVES LIKES AFTER REFRESH
                //IF THIS ELEMENT WAS LIKED
                if (!allLiked.includes(arrayPhotos[i].title)){
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "far fa-heart primary");
                }
                //IF THIS ELEMENT WAS NOT LIKES
                else{
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "fas fa-heart primary");
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
        document.getElementById("contactForm").addEventListener('submit', function(e) {
            console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("fname").value + " Email : " + document.getElementById("fname").value + " Message : " + document.getElementById("message").value)
            e.preventDefault()
        })
    })