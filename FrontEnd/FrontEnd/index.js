                          /// 1st gallery ///

// Fonction asynchrone pour récupérer les travaux à afficher
async function getWorks() {
  const works = await fetch('http://localhost:5678/api/works'); // Appel à l'API pour récupérer les travaux
  let worksToDisplay = await works.json(); // Conversion de la réponse en JSON
  console.log(works.status); // Affichage du statut de la requête dans la console
  console.log(worksToDisplay); // Affichage des travaux récupérés dans la console
  generateGallery(worksToDisplay); // Génération de la galerie avec les travaux récupérés

///

                          /// Filtres ///

// Gestion du bouton "All", ajout/suppression de la classe "active"
const boutonAll = document.querySelector(".btn-all");
boutonAll.addEventListener("click", function() {
    // Filtrage des travaux à afficher pour la catégorie "All"
    const worksAll = worksToDisplay.filter(function(work) {
        return work.category.id === 1 || work.category.id === 2 || work.category.id === 3;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksAll);
    // Suppression de la classe "active" pour tous les boutons
    document.querySelectorAll("#filters button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonAll.classList.add("active"); // Ajout de la classe "active" au bouton "All"
});

// Gestion du bouton "Objets", ajout/suppression de la classe "active"
const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    // Filtrage des travaux à afficher pour la catégorie "Objets"
    const worksObjets = worksToDisplay.filter(function(work) {
        return work.category.id === 1;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksObjets);
    // Suppression de la classe "active" pour tous les boutons
    document.querySelectorAll(".filters button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonObjets.classList.add("active"); // Ajout de la classe "active" au bouton "Objets"
});

// Gestion du bouton "Appartements", ajout/suppression de la classe "active"
const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function() {
    // Filtrage des travaux à afficher pour la catégorie "Appartements"
    const worksAppartements = worksToDisplay.filter(function(work) {
        return work.category.id === 2;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksAppartements);
    // Suppression de la classe "active" pour tous les boutons
    document.querySelectorAll(".filters button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonAppartements.classList.add("active"); // Ajout de la classe "active" au bouton "Appartements"
});

// Gestion du bouton "Hotelresto", ajout/suppression de la classe "active"
const boutonHotelresto = document.querySelector(".btn-hotelresto");
boutonHotelresto.addEventListener("click", function() {
    // Filtrage des travaux à afficher pour la catégorie "Hotelresto"
    const worksHotelresto = worksToDisplay.filter(function(work) {
        return work.category.id === 3;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksHotelresto);
    // Suppression de la classe "active" pour tous les boutons
    document.querySelectorAll(".filters button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonHotelresto.classList.add("active"); // Ajout de la classe "active" au bouton "Hotelresto"
});
}

///

// Fonction génération projet
function generateGallery(works) {
    for (let i = 0; i < works.length; i++) {
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

        // Ajoute un gestionnaire d'événements pour fermer la modale sur la croix
        const span = document.getElementsByClassName("closeProjet")[0];
        span.onclick = function() {
            modalProjet.style.display = "none";
        };
    }
}
getWorks();

////////
////////

                          /// Mode éditeur ///

// Affichage du mode éditeur
if (window.sessionStorage.getItem("token") !== null) {
// Afficher la barre noire
const blackbar = document.querySelector(".black-bar");
  
// Création de la zone d'édition
const zoneEdition = document.createElement("div");
zoneEdition.className = "editor";
  
// Création de l'icône pour le mode édition
const logoEdition = document.createElement("i");
logoEdition.className = "fa-regular fa-pen-to-square";
  
// Création du texte pour le mode édition
const modeEdition = document.createElement("p");
modeEdition.innerText = "Mode Édition";
  
// Création du bouton "Publier les changements"
const boutonPublier = document.createElement("button");
boutonPublier.innerText = "Publier les changements";
  
// Ajout des éléments à la barre noire
blackbar.appendChild(zoneEdition);
zoneEdition.appendChild(logoEdition);
zoneEdition.appendChild(modeEdition);
zoneEdition.appendChild(boutonPublier);
  
// Changement du texte du bouton "login" en "logout"
const loginHeader = document.querySelector("#loginButton");
loginHeader.innerText = "logout";
  
// Gestion de l'événement de clic sur le bouton "logout"
loginHeader.addEventListener("click", function(event) {
    event.preventDefault();
    window.sessionStorage.removeItem("token");
    window.location.replace("./index.html");
});

// Mode éditeur pour la photo principale
const changePhoto = document.querySelector("#intro-photo");

// Création de l'icône pour le bouton de modification
const iconchangePhoto = document.createElement("i");
iconchangePhoto.className = "fa-regular fa-pen-to-square";

// Création du texte du bouton de modification
const pchangePhoto = document.createElement("p");
pchangePhoto.innerText = "modifier";

// Création du bouton de modification
const boutonchangePhoto = document.createElement("button");
boutonchangePhoto.className = "btn-admin";
boutonchangePhoto.appendChild(iconchangePhoto);
boutonchangePhoto.appendChild(pchangePhoto);

// Ajout du bouton de modification à l'élément du DOM
changePhoto.appendChild(boutonchangePhoto);

///

// Mode éditeur pour le texte
const changeText = document.querySelector("#text");

// Création de l'icône pour le bouton de modification
const iconchangeText = document.createElement("i");
iconchangeText.className = "fa-regular fa-pen-to-square";

// Création du texte du bouton de modification
const pchangeText = document.createElement("p");
pchangeText.innerText = "modifier";

// Création du bouton de modification
const boutonchangeText = document.createElement("button");
boutonchangeText.className = "btn-admin";
boutonchangeText.appendChild(iconchangeText);
boutonchangeText.appendChild(pchangeText);

// Ajout du bouton de modification à l'élément du DOM
changeText.appendChild(boutonchangeText);

///

// Mode éditeur pour les projets
const changeProjet = document.querySelector("#projet");

// Création de l'icône pour le bouton de modification
const iconchangeProjet = document.createElement("i");
iconchangeProjet.className = "fa-regular fa-pen-to-square";

// Création du texte du bouton de modification
const pchangeProjet = document.createElement("p");
pchangeProjet.innerText = "modifier";

// Création du bouton de modification
const boutonchangeProjet = document.createElement("button");
boutonchangeProjet.className = "btn-admin";
boutonchangeProjet.appendChild(iconchangeProjet);
boutonchangeProjet.appendChild(pchangeProjet);

// Ajout du bouton de modification à l'élément du DOM
changeProjet.appendChild(boutonchangeProjet);

// Fonction pour afficher la modale projet lors du clic sur le bouton de modification
boutonchangeProjet.onclick = function() {
    getWorksModal();
    modalProjet.style.display = "block";
}

// Effacement du contenu de la galerie
document.querySelector(".gallery").innerText = "";

// Cacher les filtres
const afficherFilters = document.getElementById("filters");
afficherFilters.style.display = "none";
}

////////
////////

                          /// 2nd gallery ///

// Fonction asynchrone pour récupérer les travaux à afficher dans la modale
async function getWorksModal() {
  const works = await fetch('http://localhost:5678/api/works'); // Appel à l'API pour récupérer les travaux
  let worksToDisplay = await works.json(); // Conversion de la réponse en JSON
  console.log(works.status); // Affichage du statut de la requête dans la console
  console.log(worksToDisplay); // Affichage des travaux récupérés dans la console
  generateGallery2(worksToDisplay); // Génération de la galerie dans la modale en utilisant les travaux récupérés
}

///

let galleryGenerated = false; // Variable pour suivre si la galerie a été générée

function generateGallery2(works) {
  if (galleryGenerated) {
    return; // Si la galerie a déjà été générée, arrêtez l'exécution de la fonction
  }

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    // Récupération de l'élément du DOM qui accueillera les galeries
    const divGallery = document.querySelector(".modale_gallery");
    // Création d'une balise figure
    const workElement = document.createElement("figure");
    workElement.classList.add("gallery-item"); // Ajoute une classe pour le positionnement CSS

    // Création d'une balise img avec la source et son titre
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.alt = work.imageTitle;

    // Création d'une balise pour le conteneur de bouton d'édition
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Création du bouton de déplacement
    const moveButton = document.createElement("button-hover");
    moveButton.classList.add("move-button");
    moveButton.innerHTML = "<i class='fa-solid fa-arrows-up-down-left-right'></i>"; // Ajoute l'icône Font Awesome

    // Création d'une balise figcaption avec récupération du contenu
    const captionElement = document.createElement("figcaption");
    captionElement.innerText = "éditer";

    // Création du bouton de suppression
    const deleteElement = document.createElement("button");
    deleteElement.className = "edit-button"
    deleteElement.innerHTML = "<i class='fas fa-trash'></i>"; // Ajoute l'icône Font Awesome
    deleteElement.id = `delete_${work.id}`

    // On rattache les éléments à la section gallery
    divGallery.appendChild(workElement);
    workElement.appendChild(imgElement);
    workElement.appendChild(buttonContainer);
    buttonContainer.appendChild(moveButton);
    workElement.appendChild(captionElement);
    workElement.appendChild(deleteElement);
  }

  galleryGenerated = true; // Définir la variable à true pour indiquer que la galerie a été générée

////////
////////

  // Ajoute un gestionnaire d'événements pour fermer les modales lorsqu'on clique en dehors de celle-ci
  window.onclick = function(event) {
    if (event.target == modale1) {
      modale1.style.display = "none";
    } else if (event.target == modale2) {
      modale2.style.display = "none";
    }
  };

////////
////////

  /////////////////////////// j'arrive pas afficher la modale2 apres avoir submit 
                          /// Ajouter une photo ///

// Récupération du bouton "Ajouter une photo"
const addPhotoButton = document.getElementById("add_photo");

// Récupération des modales
const modale2 = document.getElementById("modale2");
const modale1 = document.getElementById("modalProjet");

// Ajout d'un écouteur d'événement de clic sur le bouton "Ajouter une photo"
addPhotoButton.addEventListener("click", function() {
  // Affichage de la modale2 et masquage de la modale1
  modale2.style.display = "block";
  modale1.style.display = "none";
});

// Formulaire pour ajouter une photo
document.querySelector("#form_photo").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Vérifier si une catégorie est sélectionnée
  const categorie = categorie_form.value;
  if (categorie === "") {
    alert("Veuillez sélectionner une catégorie.");
    return;
  }

  // Affichage de la modale2 pour montrer le chargement
  modale2.style.display = "block";

  // Préparation des données à envoyer
  let infosPhoto = new FormData();
  infosPhoto.append('image', photo_form.files[0]);
  infosPhoto.append('title', titre_form.value);
  infosPhoto.append('category', categorie);
  const token = window.sessionStorage.getItem("token");
  const options = {
    method: 'POST',
    body: infosPhoto,
    headers: {
      "Accept": "aplication/json",
      "Authorization": `Bearer ${token}`
    }
  };
  delete options.headers['Content-Type'];

  // Envoi de la requête pour ajouter la photo
  await fetch('http://localhost:5678/api/works', options);

  // Réinitialisation des champs et des aperçus
  titre_form.value = "";
  const cache = document.querySelector("#apercuPhotoDiv");
  cache.setAttribute("style", "display: none");
  const cache2 = document.querySelector("#apercuPhoto");
  cache2.src = "";
  const target = document.querySelector("#modale2");
  //target.style.display = "none";
  const target2 = document.querySelector(".gallery");
  target2.innerText = "";

  // Mise à jour de la galerie principale
  works = await fetch('http://localhost:5678/api/works').then(works => works.json());
  generateGallery(works);

  // Mise à jour de la galerie dans la modale2
  const target3 = document.querySelector(".modale_gallery");
  target3.innerText = "";
  generateGallery2(works);

  // Réattacher les écouteurs d'événements pour les boutons de suppression
  deleteWork();
});

// Fermer modale2
var span2 = document.getElementsByClassName("closeProjet2")[0];
span2.onclick = function() {
  modale2.style.display = "none";
}

// Retour modale2
const retour = document.querySelector("#retour");
retour.addEventListener("click", function(event) {
  event.preventDefault();
  modale2.style.display = "none";
  modale1.style.display = "block";
  photo_form.value = "";
  const cache = document.querySelector("#apercuPhotoDiv");
  cache.setAttribute("style", "display: none");
  titre_form.value = "";
});

// Gestion de l'aperçu photo
const preview = document.querySelector("#photo_form");
preview.addEventListener("change", function(e) {
  if (e.target.files.length === 0 || e.target.files[0].size > 4194304) {
    return;
  }
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  document.querySelector("#apercuPhoto").src = url;
  const cache = document.querySelector("#apercuPhotoDiv");
  cache.style.display = "block";
});

// Vérification de la limite de taille de l'image (4 Mo)
let uploadLimit = document.querySelector("#photo_form");
uploadLimit.onchange = function() {
  if (photo_form.files[0].size > 4194304) {
    alert("Fichier trop volumineux");
    photo_form.value = "";
  }
};

////////
////////

//////////////////////////////je narrive pas a faire en sorte que la modale reste ouverte apres suppression
                          /// Supprimer une photo ///
function deleteWork() {
  // Sélectionner tous les boutons de suppression
  const deleteButtons = document.getElementsByClassName("edit-button");

  // Parcourir les boutons de suppression
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];

    // Ajouter un écouteur d'événements "click" à chaque bouton de suppression
    deleteButton.addEventListener("click", async function(e) {
      e.preventDefault();

      // Récupérer l'ID de la photo à partir de l'attribut "id" du bouton
      const id = deleteButton.id.split("_")[1];

      // Récupérer le jeton d'authentification
      const token = window.sessionStorage.getItem("token");

      try {
        // Envoyer une requête DELETE pour supprimer la photo correspondante
        await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
          }
        });

        // Récupérer les données de la galerie mise à jour
        const works = await fetch("http://localhost:5678/api/works").then((response) => response.json());

        // Générer la nouvelle galerie en utilisant les données mises à jour
        const target = document.querySelector(".gallery");
        target.innerText = "";
        generateGallery(works);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

// Attacher les écouteurs d'événements pour les boutons de suppression lors du chargement de la page
deleteWork();
}
