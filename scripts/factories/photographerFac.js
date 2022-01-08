function photographerFactory(data) {
    if(data.city){//IF I AM PASSING PHOTOGRAPHER DATA
        const { name, portrait,city,country,tagline,price } = data;
        const foldername = name.replace(/ .*/,'');
        const picture = `assets/images/photographers-id-photos/${portrait}`;

        function getUserCardDOM() {//THE INDEX PHOTOGRAPHER CARDS
            let article = `
            <article class="home-fig">
                <a href="/photographe.html" class="link-photographer">
                    <img src="assets/images/photographers-id-photos/${portrait}" class="rounded-circle sq200 img-fluid mx-auto">
                    <h2 class"class="text-center secondary">${name}</h2>
                </a>
                <p class="text-center p-city primary">${city}, ${country}</p>
                <p class="text-center p-slogan">${tagline}</p>
                <p class="text-center p-price">${price} €/jour</p>
            </article>`;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

        function getHeaderDom(){//PHOTOGRAPHER HEADER
            let article = `
            <section class="row row-photographer-info bg-quaternary">
                <div class="col-4">
                    <div class="w-fit mx-auto">
                        <h1 tabindex="0" class="secondary">${name}</h1>
                        <p tabindex="0" class="primary">${city}, ${country}</p>
                        <p>${tagline}</p>
                    </div>
                </div>
                <div class="col-4">
                    <button aria-label="open contact form" id="contact_button" class=" btn-primary bgr-primary btn-lg mx-auto" data-bs-toggle="modal" data-bs-target="#contactModal">
                        Contactez-moi
                    </button>
                </div>
                <div class="col-4">
                    <img src="assets/images/photographers-id-photos/${portrait}" class="rounded-circle sq200 mx-auto" ></img>
                </div>
            </section>`;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

        function getSelectDOM() {//WHERE YOU SELECT THE SORT ORDER
            let article = `
            <div class="col-12">
                <label for="select-sort">Trier par</label>
                <select name="select-sort" id="select-sort" class="bgr-primary white select-sort">
                    <option value="Popularité">Popularité</option>
                    <option value="Date">Date</option>
                    <option value="Titre">Titre</option>
                </select>
            </div>`;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

        function getTotalLikesDOM(){//THE TOTAL LIKES DIV AT THE BOTTOM
            let totalLikes = localStorage.getItem("totalLikes");
            let article = `
            <div class="justify-content-end">
                <div class="likes-total row bg-secondary-beige">
                    <div class="col-6 d-flex">
                        <p id="likes-total">${totalLikes}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="col-2 bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                        </svg>
                    </div>
                    <div class="col-6">
                        <p id="price">${price} €/jour</p>
                    </div>
                </div>
            </div>
            `;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }
        function getContactModalDOM(){//THE TOTAL LIKES DIV AT THE BOTTOM
            let article = `
            <div class="modal fade" id="contactModal" style="display: none;" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-secondary-beige">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h2 class="modal-title">Modal Heading</h2>
                            <button aria-label="close concact form" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body">
                            <form id="contactForm">
                                <div class="mb-3">
                                    <label for="fname" class="form-label">Prénom</label>
                                    <input type="text" class="form-control" id="fname" name="fname">
                                </input></div>
                                <div class="mb-3">
                                    <label for="lname" class="form-label">Nom</label>
                                    <input type="text" class="form-control" id="lname" name="lname">
                                </input></div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email">
                                </input></div>
                                <div class="mb-3">
                                    <label for="message" class="form-label">Votre message</label>
                                    <textarea rows="5" class="form-control" id="message" name="message"></textarea>
                                </div>
                                <button id="submitButton" type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            `;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }
    return { name, picture, getUserCardDOM,getHeaderDom,getSelectDOM,getTotalLikesDOM, getContactModalDOM }
    }
    if(data.title){//IF I AM PASSING PHOTOS DATA
        const { title, image,video,likes} = data;
        let photographerName = localStorage.getItem("photographerName");
        const foldername = photographerName.replace(/ .*/,'');

        function getGalleryDom(){//GALLERY ELEMENT
            let imgElement;
            if(video){//SWITCHES BETWEEN PHOTO AND VIDEO
                imgElement = `<video tabindex=0 src="assets/images/${foldername}/${video}"></video>`;
            }
            else{
                imgElement = `<img src="assets/images/${foldername}/${image}" class="img-fluid" alt="">`;
            }
            let article = `
            <figure class="col-4 personal-fig">
                <a href="#" aria-label="open-image-fullscreen" class="p-0 button-like primary button-img">
                    ${imgElement}
                </a>
                <figcaption class="row h-fit">
                    <p class="col-9 p-0 primary">${title} </p>
                    <p class="col-2 primary">${likes} </p>
                    <button aria-label="add like" class=" col-1 p-0 button-like primary">
                        <em class="far fa-heart primary" aria-hidden="true"></em>
                    </button>
                </figcaption>
            </figure>`;
            let dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }
        return {title,image,likes,getGalleryDom }
    }
}
