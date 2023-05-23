// Envoi du formulaire de connexion
function login() {
    const login = document.querySelector("#loginForm");
    login.addEventListener("submit", (event) => {
        // Ne pas rafraîchir la page
        event.preventDefault();
        
        // Récupération des informations de connexion
        const loginInfo = {
            email: email.value,
            password: password.value
        };

        // Conversion des informations en JSON
        const chargeUtile = JSON.stringify(loginInfo);

        // Vérification des informations envoyées
        console.log(loginInfo);

        // Envoi de la demande de connexion
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: chargeUtile
        })
        .then(response => response.json().then(rep => ({status: response.status, body: rep})))
        .then(data => {
            // Vérification du code de réponse du serveur
            console.log(data.status);
            if (data.status === 200) {
                // Stockage du token dans la session
                window.sessionStorage.setItem("token", data.body.token);
                console.log(data.body.token);
                window.location.replace("./index.html");
            } else {
                // Affichage d'une alerte en cas d'erreur d'identifiant ou de mot de passe
                alert("Erreur dans l'identifiant ou le mot de passe");
            }
        });
    });
}

// Appel de la fonction de connexion au chargement de la page
login();






