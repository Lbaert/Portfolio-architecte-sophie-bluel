// Envoyer la requête
async function getWorks(){
    const works = await fetch('http://localhost:5678/api/works');
    let worksToDisplay = await works.json();
    console.log(works.status);
    console.log(worksToDisplay);
    generateGallery(worksToDisplay);

    // Gestion du bouton All, ajout/suppression class active
    const boutonAll = document.querySelector(".btn-all")
    boutonAll.addEventListener("click", function() {
        const worksAll = worksToDisplay.filter(function(work) {
            return work.category.id === 1 || work.category.id === 2 || work.category.id === 3;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksAll);
        document.querySelectorAll("#filters button").forEach(function(btn) {
            btn.classList.remove("active");
        });
        boutonAll.classList.add("active");
    });

    // Gestion du bouton Objets, ajout/suppression class active
    const boutonObjets = document.querySelector(".btn-objets");
    boutonObjets.addEventListener("click", function() {
        const worksObjets = worksToDisplay.filter(function(work) {
            return work.category.id === 1;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksObjets);
        document.querySelectorAll(".filters button").forEach(function(btn) {
            btn.classList.remove("active");
        });
        boutonObjets.classList.add("active");
    });

    // Gestion du bouton Appartements, ajout/suppression class active
    const boutonAppartements = document.querySelector(".btn-appartements");
    boutonAppartements.addEventListener("click", function() {
        const worksAppartements = worksToDisplay.filter(function(work) {
            return work.category.id === 2;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksAppartements);
        document.querySelectorAll(".filters button").forEach(function(btn) {
            btn.classList.remove("active");
        });
        boutonAppartements.classList.add("active");
    });

    // Gestion du bouton Hotelresto, ajout/suppression class active
    const boutonHotelresto = document.querySelector(".btn-hotelresto");
    boutonHotelresto.addEventListener("click", function() {
        const worksHotelresto = worksToDisplay.filter(function(work) {
            return work.category.id === 3;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksHotelresto);
        document.querySelectorAll(".filters button").forEach(function(btn) {
            btn.classList.remove("active");
        });
        boutonHotelresto.classList.add("active");
    });
}

async function getWorksModal(){
    const works = await fetch('http://localhost:5678/api/works');
    let worksToDisplay = await works.json();
    console.log(works.status);
    console.log(worksToDisplay);
    generateGallery2(worksToDisplay);
}

// Fonction génération projet
function generateGallery(works){
    for (let i = 0; i < works.length ; i++){
        const work = works[i];
        // Récupération de l'élément du DOM qui accueillera les gallery
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise figure
        const workElement = document.createElement("figure");
        // Création d’une balise img avec la source et son titre
        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.alt = work.imageTitle;
        // Création d’une balise figcaption avec récupération du contenu 
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        // On rattache la balise article a la section gallery
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
    }
}
// Fonction génération projet dans la modale
function generateGallery2(works){
    console.log(works.length)
    const divGallery = document.querySelector(".modale_gallery");
    divGallery.innerText = "";
    for (let i = 0; i < works.length ; i++){
        const work = works[i];
        console.log("TESTBOUCLE");
        // Récupération de l'élément du DOM qui accueillera les gallery
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise figure
        const workElement = document.createElement("figure");
        // Création d’une balise img avec la source et son titre
        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.alt = work.imageTitle;
        // Création d’une balise figcaption avec récupération du contenu 
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        document.querySelector(".gallery").innerText = "";
        // On rattache la balise article a la section gallery
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);

    }
}
getWorks();



// Affichage du mode éditeur
if (window.sessionStorage.getItem("token") !== null) {
    // Afficher black bar
    const blackbar = document.querySelector(".black-bar");
    const zoneEdition = document.createElement("div");
    zoneEdition.className = "editor";
    const logoEdition = document.createElement("i");
    logoEdition.className = "fa-regular fa-pen-to-square";
    const modeEdition = document.createElement("p");
    modeEdition.innerText = "Mode Édition";
    const boutonPublier = document.createElement("button");
    boutonPublier.innerText = "publier les changements";
    blackbar.appendChild(zoneEdition);
    zoneEdition.appendChild(logoEdition);
    zoneEdition.appendChild(modeEdition);
    zoneEdition.appendChild(boutonPublier);
    // Changement du bouton "login" en "logout"
    const loginHeader = document.querySelector("#loginButton");
    loginHeader.innerText = "logout"
    loginHeader.addEventListener("click", function(event) {
        event.preventDefault();
        window.sessionStorage.removeItem("token");
        window.location.replace("./index.html");
})

    // afficher bouton en mode editeur
    // Création du bouton modifier sous la photo principale
        const changePhoto = document.querySelector("#intro-photo");
        const iconchangePhoto = document.createElement("i");
        iconchangePhoto.className = "fa-regular fa-pen-to-square";
        const pchangePhoto = document.createElement("p");
        pchangePhoto.innerText = "modifier"
        const boutonchangePhoto = document.createElement("button");
        boutonchangePhoto.className = "btn-admin"
        boutonchangePhoto.appendChild(iconchangePhoto);
        boutonchangePhoto.appendChild(pchangePhoto);
        changePhoto.appendChild(boutonchangePhoto);
        // afficher la modale photo
        boutonchangePhoto.onclick = function() {
        modalPhoto.style.display = "block";
}
        // fermer la modale photo
        var span1 = document.getElementsByClassName("closePhoto")[0];
        span1.onclick = function() {
        modalPhoto.style.display = "none";
}
        window.onclick = function(event) {
        if (event.target == modalPhoto) {
        modalPhoto.style.display = "none";
    }
}


// afficher bouton en mode editeur
// Création du bouton modifier du text
            const changeText = document.querySelector("#text");
            const iconchangeText = document.createElement("i");
            iconchangeText.className = "fa-regular fa-pen-to-square";
            const pchangeText = document.createElement("p");
            pchangeText.innerText = "modifier"
            const boutonchangeText = document.createElement("button");
            boutonchangeText.className = "btn-admin"
            boutonchangeText.appendChild(iconchangeText);
            boutonchangeText.appendChild(pchangeText);
            changeText.appendChild(boutonchangeText);
                    // afficher la modale text
                    boutonchangeText.onclick = function() {
            modalText.style.display = "block";
    }
            // fermer la modale photo
            var span2 = document.getElementsByClassName("closeText")[0];
            span2.onclick = function() {
            modalText.style.display = "none";
    }
            window.onclick = function(event) {
            if (event.target == modalText) {
            modalText.style.display = "none";
        }
    }
    
            

    // afficher bouton en mode editeur
        // Création du bouton modifier des projets
        const changeProjet = document.querySelector("#projet");
        const iconchangeProjet = document.createElement("i");
        iconchangeProjet.className = "fa-regular fa-pen-to-square";
        const pchangeProjet = document.createElement("p");
        pchangeProjet.innerText = "modifier";
        const boutonchangeProjet = document.createElement("button");
        boutonchangeProjet.className = "btn-admin"
        boutonchangeProjet.appendChild(iconchangeProjet);
        boutonchangeProjet.appendChild(pchangeProjet);
        changeProjet.appendChild(boutonchangeProjet);
        // afficher la modale projet
        boutonchangeProjet.onclick = function() {
            getWorksModal();
            modalProjet.style.display = "block";
}
        // fermer la modale
        var span = document.getElementsByClassName("closeProjet")[0];
        span.onclick = function() {
            modalProjet.style.display = "none";
}
        window.onclick = function(event) {
        if (event.target == modalProjet) {
            modalProjet.style.display = "none";
    }
}

document.querySelector(".gallery").innerText = "";






    // ne pas afficher les filtres
    const afficherFilters = document.getElementById("filters")
    afficherFilters.style.display = "none" 
}






  