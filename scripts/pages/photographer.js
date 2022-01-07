"use strict";
fetch("../data/photographers.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        const photographers = json.photographers;
        const media = json.media;
        let photos = [];


        let photographer;
        var photographerName = localStorage.getItem("photographerName");

        photographers.forEach((thisphotographer) => {
            if(thisphotographer.name === photographerName){
                photographer = thisphotographer;
            }
        });

        media.forEach((photo) => {
            if(photo.photographerId === photographer.id){
                photos.push(photo);
            }
        })

        console.log(photos)
        console.log(photographer);
        if(window.location.pathname === "/photographe.html"){
            async function displayData(photographers) {
                const photographersSection = document.querySelector(".gallery_section");

                photos.forEach((photo) => {
                    const photographerModel = photographerFactory(photo);
                    const userCardDOM = photographerModel.getGalleryDom();
                    photographersSection.appendChild(userCardDOM);
                });

                const photographerModel = photographerFactory(photographer);
                const headerDOM = photographerModel.getHeaderDom();
                const selectDOM = photographerModel.getSelectDOM();
                document.querySelector(".photograph-header").replaceWith(headerDOM);
                photographersSection.insertAdjacentElement("afterbegin",selectDOM);
            };
            displayData(photographers);
        }
    }
);
