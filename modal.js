

fetch('/Media/Data/photographers.json')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(json => {

    photographers    = json.photographers;
    media            = json.media;
    mimiKeel         = photographers[0];
    ellieRoseWilkens = photographers[1];
    tracyGalindo     = photographers[2];
    nabeelBradford   = photographers[3];
    rhodeDubois      = photographers[4];
    marcelNikolic    = photographers[5];

    var path = window.location.pathname;
    var totalLikes = 0;
    let mimiKeelPhotos = [];
    var selectSort = document.getElementById("select-sort");


    // MATCHES FILES AND PHOTOGRAPHERS
    if(path == "/mimi.html"){
        var photographerName = mimiKeel
    }
    // GETS ALL PHOTOS BY PHOTOGRAPHER
    for(var i=0 ; i<media.length; i++) {
        if(media[i].photographerId == photographerName.id){
            mimiKeelPhotos.push(media[i]);
        }
    }

    function addphoto(htmlID,imgID){
        document.getElementById("photo-"+htmlID).src = photographerName.folder + mimiKeelPhotos[imgID].image ;
        document.getElementById("photo-"+htmlID+"-title").innerHTML = mimiKeelPhotos[imgID].title ;
        document.getElementById("photo-"+htmlID+"-likes").innerHTML = mimiKeelPhotos[imgID].likes ;
    }

    function Add(){
        addphoto(0,0);
        addphoto(1,1);
        addphoto(2,2);
        addphoto(3,3);
        addphoto(4,4);
        addphoto(5,5);
        addphoto(6,6);
        addphoto(7,7);
        addphoto(8,8);
        addphoto(9,9);
    }

    // SORTS PHOTOS BY LIKES
    function SortByLikes() {
        mimiKeelPhotos.sort((a,b) =>{
            return a.likes - b.likes;
        });
    }
    // SORTS PHOTOS BY DATE
    function SortByDate(){
        mimiKeelPhotos.sort((a,b) =>{
            return a.date.replaceAll('-','') - b.date.replaceAll('-','');
        });
    }
    // SORTS PHOTOS BY TITLE
    function SortByTitle(){
        mimiKeelPhotos.sort((a, b) => {
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
    selectSort.addEventListener('change',function(){
        if (selectSort.selectedIndex == 0){
            SortByLikes()
            Add()
            console.log('popularité')
        }
        if(selectSort.selectedIndex == 1){
            SortByDate()
            Add()
            console.log('date')
        }
        if(selectSort.selectedIndex == 2){
            SortByTitle()
            Add()

        }
    })

    //CALCULATES TOTAL LIKES
    mimiKeelPhotos.forEach(
        item => totalLikes = totalLikes + item.likes);

    document.getElementById("photographer-name").innerHTML=photographerName.name;
    document.getElementById("city-country").innerHTML=photographerName.city +", "+ photographerName.country ;
    document.getElementById("tagline").innerHTML= photographerName.tagline ;
    document.getElementById("portrait").src = "/Media/Sample Photos/Photographers ID Photos/" + photographerName.portrait ;
    document.getElementById("likes-total").innerHTML = totalLikes;
    document.getElementById("price").innerHTML = photographerName.price+"€ / jour";

    //GETS CONTACT NAME

    document.getElementById("contactForm").addEventListener("submit",function(e){
        let contactPrenom = document.getElementById("fname").value
        let contactNomFamille = document.getElementById("lname").value
        let contactEmail = document.getElementById("email").value
        let contactMessage = document.getElementById("message").value
        console.log("Vous êtes " + contactPrenom + " " + contactNomFamille)
        console.log("email = " + contactEmail)
        console.log("message = " + contactMessage)
        e.preventDefault()
    })




})
.catch(function () {
    this.dataError = true;
})
