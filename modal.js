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
        ellieRoseWilkens = photographers[1];
        tracyGalindo = photographers[2];
        nabeelBradford = photographers[3];
        rhodeDubois = photographers[4];
        marcelNikolic = photographers[5];

        var path = window.location.pathname;
        var totalLikes = 0;
        let thisPhotographerMedia = [];
        var selectSort = document.getElementById("select-sort");

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

        console.log(thisPhotographerMedia)

        function setDefaultLikes() {
            for (let i = 0; i < 10; i++) {
                document.getElementById("photo-" + i + "-likes").innerHTML = thisPhotographerMedia[i].likes;
            }
        }
        setDefaultLikes()

        function addPhoto(imgID) {
            //IF THERE IS AN IMAGE CHANGE THE SOURCE AND TITLE
            if (thisPhotographerMedia[imgID].image != undefined) { //IF IMAGE
                document.getElementById("photo-" + imgID).src = thisPhotographer.folder + thisPhotographerMedia[imgID].image;
                document.getElementById("photo-" + imgID + "-title").innerHTML = thisPhotographerMedia[imgID].title;
            }
            //IF THERE IS NO IMAGE ADD A VIDEO REMOVE THE IMAGE CHANGES THE SOURCE
            if (thisPhotographerMedia[imgID].image == undefined) {
                if (document.querySelector("img#photo-" + imgID) != undefined) {
                    document.getElementById("photo-" + imgID).parentElement.insertAdjacentHTML("afterbegin", "<video src=\"" + thisPhotographer.folder + thisPhotographerMedia[imgID].video + "\"id=\"" + "photo-" + imgID + "\"class=\"img-fluid\">")
                    document.querySelector("img#photo-" + imgID).remove()
                }

                //document.getElementById("photo-"+imgID).remove()
            }
            //ADDS THE LIKES
            setDefaultLikes()
        }

        addPhoto(0)

        function Add() {
            for (var i = 0; i < 10; i++) {
                if (thisPhotographerMedia[i] != undefined) {
                    addPhoto(i);
                }
                if (thisPhotographerMedia[i] === undefined) {
                    document.getElementById("photo-" + i).parentElement.style.display = "none"
                }
            }
        }

        // SORTS PHOTOS BY LIKES
        function SortByLikes() {
            thisPhotographerMedia.sort((a, b) => {
                return a.likes - b.likes;
            });
        }

        // SORTS PHOTOS BY DATE
        function SortByDate() {
            thisPhotographerMedia.sort((a, b) => {
                return a.date.replaceAll('-', '') - b.date.replaceAll('-', '');
            });
        }

        // SORTS PHOTOS BY TITLE
        function SortByTitle() {
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

        // PHOTOS ARE SORTED BY LIKES BY DEFAULT
        SortByLikes()
        Add()

        // SORTS PHOTOS DEPENDING ON THE SELECTED OPTION
        selectSort.addEventListener('change', function() {
            if (selectSort.selectedIndex === 0) {
                SortByLikes()
            }
            if (selectSort.selectedIndex === 1) {
                SortByDate()
            }
            if (selectSort.selectedIndex === 2) {
                SortByTitle()
            }
            Add()
            setDefaultLikes()
            CalcTotalLikes(0)
            currentImage = 0
            document.getElementById("image-lb").src = "#"

        })

        function CalcTotalLikes(i) { //CALCULATES TOTAL LIKES
            totalLikes = 0
            thisPhotographerMedia.forEach(
                (item) => totalLikes = totalLikes + item.likes);
            document.getElementById("likes-total").innerHTML = totalLikes + i;
        }
        CalcTotalLikes(0)

        document.getElementById("photographer-name").innerHTML = thisPhotographer.name;

        // ADDS THE PHOTOGRAPHERS NAME
        document.getElementById("city-country").innerHTML = thisPhotographer.city + ", " + thisPhotographer.country;

        // ADDS THE PHOTOGRAPHERS SLOGAN
        document.getElementById("tagline").innerHTML = thisPhotographer.tagline;

        // ADDS THE PHOTOGRAPHERS PORTRAIT
        document.getElementById("portrait").src = "/media/sample-photos/photographers-id-photos/" + thisPhotographer.portrait;

        // ADDS THE PHOTOGRAPHERS PRICE
        document.getElementById("price").innerHTML = thisPhotographer.price + "€ / jour";

        //DISPLAYS CONTACT INFO ON SUBMIT
        document.getElementById("contactForm").addEventListener("submit", function(e) {
            let contactPrenom = document.getElementById("fname").value
            let contactNomFamille = document.getElementById("lname").value
            let contactEmail = document.getElementById("email").value
            let contactMessage = document.getElementById("message").value
            console.log("Vous êtes " + contactPrenom + " " + contactNomFamille)
            console.log("email = " + contactEmail)
            console.log("message = " + contactMessage)
            e.preventDefault()
        })

        //TOGGLES HEARTS AND LIKES
        function bla(i) {
            document.getElementById("photo-" + i + "-button-like").addEventListener('click', function() {
                let likesNumber = thisPhotographerMedia[i].likes
                let likesElement = document.getElementById("photo-" + i + "-likes")
                    //TOGGLES HEART
                document.getElementById("photo-" + i + "-icon-like").classList.toggle("fas")
                    //TOGGLES LIKES
                if (likesElement.innerHTML === likesNumber) {
                    likesElement.innerHTML = likesNumber + 1
                    CalcTotalLikes(1)
                } else {
                    likesElement.innerHTML = likesNumber
                    CalcTotalLikes(0)
                }
            })
        }
        for (var i = 0; i < 10; i++) {
            bla(i)
        }


        //LIGHTBOX
        function openMedia(i) {
            if (thisPhotographerMedia[i].image != undefined) { //IF CLIC ON IMAGE
                if (document.querySelector("video#img-lb") != undefined) { //IF VIDEO ELEMENT EXISTS
                    document.querySelector("video#img-lb").remove() //REMOVE VIDEO ELEMENT
                }
                if (document.querySelector("img#img-lb") === undefined) { //IF IMAGE ELEMENT NOT EXISTS ; ADDS IT AND SETS THE SOURCE
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", "<img id=\"img-lb\" class=\"col-10\" src=\"" + thisPhotographer.folder + thisPhotographerMedia[i].image + "\">")
                } else { //IF IMAGE ELEMENT EXISTS ; SET ITS SOURCE
                    document.getElementById("img-lb").src = thisPhotographer.folder + thisPhotographerMedia[i].image
                }
            } else { //IF CLIC ON VIDEO
                if (document.querySelector("img#img-lb") != undefined) { //IF IMAGE ELEMENT EXISTS
                    document.querySelector("img#img-lb").remove() //REMOVE THE ELEMENT
                }
                if (document.querySelector("video#img-lb") === undefined) { //IF VIDEO ELEMENT IS NOT ADDED
                    document.getElementById("button-left-lb").insertAdjacentHTML("afterend", "<video id=\"img-lb\" class=\"col-10\" src=\"" + thisPhotographer.folder + thisPhotographerMedia[i].video + "\" autoplay controls></video>")
                } else {
                    document.getElementById("img-lb").src = thisPhotographer.folder + thisPhotographerMedia[i].video
                }
            }
            document.querySelector(".modal-footer p").innerHTML = thisPhotographerMedia[i].title
            if (thisPhotographerMedia[i].title === undefined) {
                document.querySelector(".modal-footer p").innerHTML = ""
            }
        }

        const modalLb = new bootstrap.Modal(document.getElementById('modal-lb'), {
            keyboard: false
        })

        for (var i = 0; i < 10; i++) {
            document.getElementById("photo-" + i).addEventListener("click", function(e) {
                var mediaToOpen = e.path[0].id.substring(6, 7)
                modalLb.toggle()
                openMedia(mediaToOpen)
                document.getElementById("button-left-lb").addEventListener("click", function() {
                    mediaToOpen--
                    if (mediaToOpen < 0) {
                        mediaToOpen = 9
                    }
                    openMedia(mediaToOpen)
                })
                document.getElementById("button-right-lb").addEventListener("click", function() {
                    mediaToOpen++
                    if (mediaToOpen > 9) {
                        mediaToOpen = 0
                    }
                    openMedia(mediaToOpen)
                })
                document.body.addEventListener("keydown", function(event) {
                    if (event.key === "ArrowLeft") {
                        mediaToOpen--
                        if (mediaToOpen < 0) {
                            mediaToOpen = 9
                        }
                        openMedia(mediaToOpen)
                    }
                    if (event.key === "ArrowRight") {
                        mediaToOpen++
                        if (mediaToOpen > 9) {
                            mediaToOpen = 0
                        }
                        openMedia(mediaToOpen)
                    }
                })
            })
        }
        document.getElementById("button-close-lb").addEventListener("click", function() {
            modalLb.toggle()
        })
    })
    .catch(function() {
        this.dataError = true;
    })