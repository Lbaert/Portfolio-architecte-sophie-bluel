// Envoyer la requête
async function getWorks(){
    const works = await fetch('http://localhost:5678/api/works');
    let worksToDisplay = await works.json();

    console.log(works.status);
    console.log(worksToDisplay);
    generateGallery(worksToDisplay);

    // Gestion du bouton All
    const boutonAll = document.querySelector(".btn-all")
    boutonAll.addEventListener("click", function() {
        const worksAll = worksToDisplay.filter(function(work) {
            return work.category.id === 1 || work.category.id === 2 || work.category.id === 3;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksAll);
    });

    // Gestion du bouton Objets
    const boutonObjets = document.querySelector(".btn-objets");
    boutonObjets.addEventListener("click", function() {
        const worksObjets = worksToDisplay.filter(function(work) {
            return work.category.id === 1;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksObjets);
    });

    // Gestion du bouton Appartements
    const boutonAppartements = document.querySelector(".btn-appartements");
    boutonAppartements.addEventListener("click", function() {
        const worksAppartements = worksToDisplay.filter(function(work) {
            return work.category.id === 2;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksAppartements);
    });

    // Gestion du bouton Hotelresto
    const boutonHotelresto = document.querySelector(".btn-hotelresto");
    boutonHotelresto.addEventListener("click", function() {
        const worksHotelresto = worksToDisplay.filter(function(work) {
            return work.category.id === 3;
        });
        document.querySelector(".gallery").innerText = "";
        generateGallery(worksHotelresto);
    });
}

// Fonction génération projet
function generateGallery(works){
    for (let i = 0; i < works.length ; i++){
        const boucle = works[i];
        // Récupération de l'élément du DOM qui accueillera les gallery
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise figure
        const workElement = document.createElement("figure");
        // Création d’une balise img avec la source et son titre
        const imgElement = document.createElement("img");
        imgElement.src = boucle.imageUrl;
        imgElement.alt = boucle.imageTitle;
        // Création d’une balise figcaption avec récupération du contenu 
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = boucle.title;

        // On rattache la balise article a la section gallery
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
    }
}

getWorks();
