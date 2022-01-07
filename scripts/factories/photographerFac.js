function photographerFactory(data) {
    if(data.city){
        const { name, portrait,city,country,tagline,price } = data;
        const foldername = name.replace(/ .*/,'');
        const picture = `assets/images/photographers-id-photos/${portrait}`;
        console.log(data)

        function getUserCardDOM() {
            var article = `
            <article class="home-fig">
                <a href="/photographe.html" class="link-photographer">
                    <img src="assets/images/photographers-id-photos/${portrait}" class="rounded-circle sq200 img-fluid mx-auto">
                    <h2 class"class="text-center secondary">${name}</h2>
                </a>
                <p class="text-center p-city primary">${city}, ${country}</p>
                <p class="text-center p-slogan">${tagline}</p>
                <p class="text-center p-price">${price} €/jour</p>
            </article>`;
            var dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

        function getHeaderDom(){
            var article = `
            <figure class="row row-photographer-info bg-quaternary">
                <div class="col-4">
                    <div class="w-fit mx-auto">
                        <h1 tabindex="0" class="secondary">${name}</h1>
                        <p tabindex="0" class="primary">${city}, ${country}</p>
                        <p>${tagline}</p>
                    </div>
                </div>
                <div class="col-4">
                    <button aria-label="open contact form" class=" btn btn-primary bgr-primary btn-lg mx-auto" data-bs-toggle="modal" data-bs-target="#contactModal">
                        Contactez-moi
                    </button>
                </div>
                <div class="modal fade" id="contactModal">
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
                                        <input type="text" class="form-control" id="fname" name="fname"></input>
                                    </div>
                                    <div class="mb-3">
                                        <label for="lname" class="form-label">Nom</label>
                                        <input type="text" class="form-control" id="lname" name="lname"></input>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" name="email"></input>
                                    </div>
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
                <div class="col-4">
                    <img src="assets/images/photographers-id-photos/${portrait}" class="rounded-circle sq200 mx-auto" ></img>
                </div>


            </figure>`;
            var dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

        function getSelectDOM() {
            var article = `
            <div class="col-12">
                <label for="select-sort">Trier par</label>
                <select name="select-sort" id="select-sort" class="bgr-primary white select-sort">
                    <option value="Popularité">Popularité</option>
                    <option value="Date">Date</option>
                    <option value="Titre">Titre</option>
                </select>
            </div>`;
            var dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }

    return { name, picture, getUserCardDOM,getGalleryDom,getHeaderDom,getSelectDOM }
    }
    if(data.title){
        const { title, image,video,likes} = data;
        var photographerName = localStorage.getItem("photographerName");
        const foldername = photographerName.replace(/ .*/,'');
        function getGalleryDom(){
        var imgElement;
        if(video){
            imgElement = `<video tabindex=0 src="assets/images/${foldername}/${video}"></video>`;
        }
        else{
            imgElement = `<img src="assets/images/${foldername}/${image}" class="img-fluid" alt="">`;
        }
            var article = `
            <figure class="col-4 personal-fig">
                <a href="#" aria-label="open-image-fullscreen" class="p-0 button-like primary button-img">
                    ${imgElement}
                </a>
                <figcaption class="row h-fit">
                    <p class="col-9 primary">${title} </p>
                    <p class="col-2 primary">${likes} </p>
                    <div class="col-1 p-0 ">
                        <button aria-label="add like" id="photo-7-button-like" class="p-0 button-like primary">
                            <em id="photo-7-icon-like" class="far fa-heart primary" aria-hidden="true"></em>
                        </button>
                    </div>
                </figcaption>
            </figure>`;
            var dom = new DOMParser().parseFromString(article,"text/html");
            return(dom.body.firstChild);
        }
        return {title,image,likes,getGalleryDom }
    }
}
