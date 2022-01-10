"use strict";
let photographer

fetch("/data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        const photographers = json.photographers;
        let clickedName;
        if(window.location.pathname === "/"){
            displayData(photographers);
        }
        document.querySelectorAll(".home-fig").forEach((figure) => {
            figure.addEventListener("click",function(){
                photographers.forEach((photographer) => {
                    if(photographer.name === figure.firstElementChild.lastElementChild.innerHTML){
                        clickedName = photographer.name;
                        localStorage.setItem("photographerName",clickedName);
                    }
                });
            });
        });
    }
);


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}