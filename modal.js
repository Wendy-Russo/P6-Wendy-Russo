fetch('/media/data/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {

        photographers = json.photographers;
        media = json.media;

        let path = window.location.pathname;
        let thisPhotographerMedia = [];
        let totalLikes = 0
        let allLiked = []
        const SELECT_SORT = document.getElementById("select-sort");
        const MODALLB = new bootstrap.Modal(document.getElementById('modal-lb'), {
            keyboard: false
        });
        let thisImage;
        let thisVideo;
        let thisLikes;
        let imgElement;
        let vidElement;
        let thisTitle;

        // MATCHES FILES AND PHOTOGRAPHERS
        if (path == "/pages/mimi.html") {
            thisPhotographer = photographers[0]
        }

        // GETS ALL PHOTOS BY PHOTOGRAPHER
        for (var i = 0; i < media.length; i++) {
            if (media[i].photographerId == thisPhotographer.id) {
                thisPhotographerMedia.push(media[i]);
            }
        }

        thisPhotographerMedia.forEach((item) => totalLikes += item.likes);

        document.getElementById("button-close-lb").addEventListener("click", function() {
            MODALLB.toggle()
        });

        for (let i = 0; i < 10; i++) {
            const THIS_LIKES_ELEMENT = document.getElementById("photo-" + i + "-likes");
            const THIS_TITLE_ELEMENT = document.getElementById("photo-" + i + "-title");
            const TOTAL_LIKES_ELEMENT = document.getElementById("likes-total");
            const THIS_LIKES_BUTTON_ELEMENT = document.getElementById("photo-" + i + "-button-like");
            const THIS_LIKES_ICON_ELEMENT = document.getElementById("photo-" + i + "-icon-like");
            const THIS_FIGURE_ELEMENT = document.getElementById("fig-" + i);

            //############Sets-Likes-Title############//
            function setLikesTitle() {
                thisLikes = thisPhotographerMedia[i].likes;
                thisTitle = thisPhotographerMedia[i].title;
                THIS_LIKES_ELEMENT.innerHTML = thisLikes;
                THIS_TITLE_ELEMENT.innerHTML = thisTitle;
                TOTAL_LIKES_ELEMENT.innerHTML = totalLikes
            }

            //############ADDS-PHOTOS############//
            function addPhotos() {
                thisImage = thisPhotographerMedia[i].image;
                thisVideo = thisPhotographerMedia[i].video;
                imgElement = "<img src= \"" + thisPhotographer.folder + thisImage + "\"id= \"photo-" + i + " \"alt=\"" + thisTitle + "\" >"
                vidElement = "<video src= \"" + thisPhotographer.folder + thisVideo + "\"id= \"photo-" + i + " \"alt=\"" + thisTitle + "\" >"
                if (thisImage != undefined) {
                    THIS_FIGURE_ELEMENT.firstElementChild.insertAdjacentHTML("afterend", imgElement)
                }
                if (thisVideo != undefined) {
                    THIS_FIGURE_ELEMENT.firstElementChild.insertAdjacentHTML("afterend", vidElement);
                }
                THIS_FIGURE_ELEMENT.firstElementChild.remove()
            }

            //############LIKES-BUTTON############//
            THIS_LIKES_BUTTON_ELEMENT.addEventListener('click', function() {
                if (!allLiked.includes(thisPhotographerMedia[i].title)) {
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "fas fa-heart primary");
                    thisPhotographerMedia[i].likes++, totalLikes++;
                    allLiked.push(thisPhotographerMedia[i].title)
                } else {
                    THIS_LIKES_ICON_ELEMENT.setAttribute("class", "far fa-heart primary");
                    thisPhotographerMedia[i].likes--, totalLikes--;
                    allLiked.splice(allLiked.indexOf(thisPhotographerMedia[i].title), 1)
                }
                setLikesTitle()
            });

            //############SORTS-BY-LIKES############//
            function SortByLikes() {
                thisPhotographerMedia.sort((a, b) => {
                    return b.likes - a.likes;
                });
            }

            TOTAL_LIKES_ELEMENT.innerHTML = totalLikes
            SortByLikes()
            setLikesTitle()
            addPhotos()
            lightbox()

            //############SORTING############//
            SELECT_SORT.addEventListener('change', function() {
                if (SELECT_SORT.selectedIndex === 0) {
                    SortByLikes()
                }
                if (SELECT_SORT.selectedIndex === 1) {
                    thisPhotographerMedia.sort((a, b) => {
                        return a.date.replaceAll('-', '') - b.date.replaceAll('-', '');
                    });
                }
                if (SELECT_SORT.selectedIndex === 2) {
                    thisPhotographerMedia.sort((a, b) => {
                        if (a.title < b.title) {
                            return -1;
                        }
                        if (a.title > b.title) {
                            return 1;
                        }
                        return 0;
                    });
                }
                setLikesTitle()
                addPhotos()
                lightbox()
            });

            function openLb(clickedID) {
                if (document.getElementById("img-lb") != undefined) {
                    document.getElementById("img-lb").remove()
                }
                if (thisPhotographerMedia[clickedID].image != undefined) {
                    imgElement = "<img src= \"" + thisPhotographer.folder + thisPhotographerMedia[clickedID].image + "\" class=\"col-10\" id=\"img-lb\"alt=\"" + thisTitle + "\" >"
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", imgElement)

                } else {
                    vidElement = "<video src= \"" + thisPhotographer.folder + thisPhotographerMedia[clickedID].video + "\" class=\"col-10\" id=\"img-lb\"alt=\"" + thisTitle + "\" controls >"
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", vidElement)
                }
            }

            function lightbox() {
                THIS_FIGURE_ELEMENT.firstElementChild.addEventListener("click", function(e) {
                    let clickedID = e.path[0].id.substring(6, 7)
                    openLb(clickedID)
                    document.getElementById("button-right-lb").addEventListener("click", function() {
                        clickedID++
                        if (clickedID > 9) {
                            clickedID = 0;
                        }
                        openLb(clickedID);
                    })
                    document.getElementById("button-left-lb").addEventListener("click", function() {
                        clickedID--
                        if (clickedID < 0) {
                            clickedID = 9
                        }
                        openLb(clickedID)
                    })
                    document.body.addEventListener("keydown", function(event) {
                        if (event.key === "ArrowLeft") {
                            clickedID--
                            if (clickedID < 0) {
                                clickedID = 9
                            }
                            openLb(clickedID)
                        }
                        if (event.key === "ArrowRight") {
                            clickedID++
                            if (clickedID > 9) {
                                clickedID = 0
                            }
                            openLb(clickedID)
                        }
                    })
                    MODALLB.toggle()
                    console.log(imgElement)
                });
            }
        }
        const CONTACT_FORM_ELEMENT = document.getElementById("contactForm")
        const CONTACT_FIRST_NAME_INPUT = document.getElementById("fname")
        const CONTACT_LAST_NAME_INPUT = document.getElementById("lname")
        const CONTACT_EMAIL_INPUT = document.getElementById("email")
        const CONTACT_MESSAGE_INPUT = document.getElementById("message")

        document.getElementById("photographer-name").innerHTML = thisPhotographer.name;
        document.getElementById("city-country").innerHTML = thisPhotographer.city + ", " + thisPhotographer.country;
        document.getElementById("tagline").innerHTML = thisPhotographer.tagline;
        document.getElementById("portrait").src = "/media/sample-photos/photographers-id-photos/" + thisPhotographer.portrait;
        document.getElementById("price").innerHTML = thisPhotographer.price + "€ / jour";

        CONTACT_FORM_ELEMENT.addEventListener('submit', function(e) {
            console.log("Prénom : " + CONTACT_FIRST_NAME_INPUT.value + " Nom : " + CONTACT_LAST_NAME_INPUT.value + " Email : " + CONTACT_EMAIL_INPUT.value + " Message : " + CONTACT_MESSAGE_INPUT.value)
            e.preventDefault()
        })
    })
    .catch(function() {
        this.dataError = true;
    })