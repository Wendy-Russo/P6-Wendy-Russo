"use strict";
fetch("../data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        const photographers = json.photographers;
        const media = json.media;
        let photos = [];

        //GETS THE CURRENT PHOTOGRAPHER
        let photographer;
        var photographerName = localStorage.getItem("photographerName");
        photographers.forEach((thisphotographer) => {
            if(thisphotographer.name === photographerName){
                photographer = thisphotographer;
            }
        });
        //GETS THE RIGHT PHOTOS
        media.forEach((photo) => {
            if(photo.photographerId === photographer.id){
                photos.push(photo);
            }
        })
        //CALCS TOTAL LIKES
        let totalLikes;
        function calcTotalLikes(){
            totalLikes = 0
            photos.forEach((photo) => {
                totalLikes += photo.likes;
            });
            localStorage.setItem("totalLikes",totalLikes);
        }
        calcTotalLikes();

        //ADDS HEADER SELECT AND TOTAL LIKES SECTION FROM THE FACTORY
        async function displayData() {
            const photographerModel = photographerFactory(photographer);
            const photographersSection = document.querySelector(".gallery_section");
            //ADDS THE HEADER
            const headerDOM = photographerModel.getHeaderDom();
            document.querySelector(".photograph-header").replaceWith(headerDOM);
            //ADDS THE SELECT
            const selectDOM = photographerModel.getSelectDOM();
            photographersSection.insertAdjacentElement("afterbegin",selectDOM);
            //ADDS THE TOTAL LIKES
            const totalLikesDOM = photographerModel.getTotalLikesDOM();
            photographersSection.lastElementChild.insertAdjacentElement("afterend",totalLikesDOM);
            //ADDS THE CONTACT MODAL
            const contactModalDOM = photographerModel.getContactModalDOM();
            document.getElementById("main" ).insertAdjacentElement("afterend",contactModalDOM);
            //ADDS THE LIGHTBOX MODAL
            const lightboxModalDom = photographerModel.getLightboxDOM();
            document.getElementById("contactModal").insertAdjacentElement("afterend",lightboxModalDom);
        }
        //ADDS REMOVES EVERY GALLERY FIGURE AND RE ADDS THEM + LIKES TOGGLE
        function refreshallery(){
            const photographersSection = document.querySelector(".gallery_section");
            while(document.querySelector(".personal-fig")){
                document.querySelector(".personal-fig").remove();
            }
            photos.forEach((photo) => {
                let photographerModel = photographerFactory(photo);
                const userCardDOM = photographerModel.getGalleryDom();
                photographersSection.appendChild(userCardDOM);
                let likedDOM = userCardDOM.lastElementChild.firstElementChild.nextElementSibling;
                let heartButtonDOM = userCardDOM.lastElementChild.lastElementChild;
                let heartIconDOM = heartButtonDOM.firstElementChild;
                let totalLikesDOM = document.getElementById("likes-total");
                calcTotalLikes();
                totalLikesDOM.innerHTML = totalLikes;
                //TOGGLES LIKES TOTAL LIKES AND ICONS
                heartButtonDOM.addEventListener("click",function(){
                    if(parseInt(likedDOM.innerHTML) === photo.likes){
                        likedDOM.innerHTML = photo.likes + 1;
                        heartIconDOM.setAttribute("class","fas fa-heart primary");
                        totalLikesDOM.innerHTML = totalLikes += 1;
                        heartButtonDOM.setAttribute("aria-label","Remove like");
                    }
                    else{
                        likedDOM.innerHTML = photo.likes;
                        heartIconDOM.setAttribute("class","far fa-heart primary");
                        totalLikesDOM.innerHTML = totalLikes -= 1;
                        heartButtonDOM.setAttribute("aria-label","Add Like")
                    }
                });
            });
        }
        //SORTS BY LIKES
        function SortByLikes() {
            photos.sort((a, b) => {
                return b.likes - a.likes;
            });
        }

        if(window.location.pathname === "/photographe.html"){

            SortByLikes();
            displayData();
            refreshallery();
            modalFunction();
            lightboxFunction();

            //############SORTING############//
            document.getElementById("select-sort").addEventListener('change', function() {
                //IF SELECT SORT BY POPULARITY
                if (document.getElementById("select-sort").selectedIndex === 0) {
                    SortByLikes();
                }
                //IF SELECT SORT BY DATE
                if (document.getElementById("select-sort").selectedIndex === 1) {
                    photos.sort((a, b) => {
                        return a.date.replaceAll("-", "") - b.date.replaceAll("-", "");
                    });
                }
                //IF SELECT SORT BY NAME
                if (document.getElementById("select-sort").selectedIndex === 2) {
                    photos.sort((a, b) => {
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
                refreshallery();
            });
        }
    }
);
