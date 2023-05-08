//envoi formulaire login
function login() {
    const login = document.querySelector("#loginForm");
    login.addEventListener("submit", (event) => {
        //ne pas rafraichir la page
        event.preventDefault();
        //infos de login
        const loginInfo = {
            email: email.value,
            password: password.value
        };
        //conversion en JSON de loginInfo
        const chargeUtile = JSON.stringify(loginInfo);
        //vérification des infos envoyées
        console.log(loginInfo); 
        //envoi de la demande de connexion
        fetch('http://localhost:5678/api/users/login', { 
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: chargeUtile
        //séparation du status et du token
        }).then(response => response.json().then(rep => ({status: response.status, body: rep}))) 
        .then(data => {
            //vérification du code server
            console.log(data.status); 
            if (data.status === 200) {
                //stocker le token
                window.sessionStorage.setItem("token", data.body.token);
                console.log(data.body.token);
                window.location.replace("./index.html");
            }else{
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
        });
    });
};

login();





