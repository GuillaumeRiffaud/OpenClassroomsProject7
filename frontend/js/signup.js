class SignUpPage {
    static display() {
        HtmlContent.fillWith("main", `<h2>Inscription</h2>
                                <form id="signUpForm" validate>
                                    <div>
                                        <label>Nom d'utilisateur <input type="text" id="userName" required /></label>
                                    <div>
                                        <label>Adresse email <input type="email" id="userEmail" required /></label>
                                    </div>
                                    <div>
                                        <label>Mot de passe <input type="password" id="userPassword" required /></label>
                                    </div>
                                    <button id="signUpButton" type="submit">Inscription</button>
                                </form>
                                <a href="#" id="goToLogin">Déjà membre ?</a>`);
        document.getElementById("goToLogin").addEventListener("click", (event) => {
            event.preventDefault();
            HtmlContent.clear("main");
            LogInPage.display();
        })
        document.getElementById("signUpButton").addEventListener("click", (event) => {
            event.preventDefault();
            user = {
                name: document.getElementById("userName").value,
                email: document.getElementById("userEmail").value,
                password: document.getElementById("userPassword").value,
            }
            SignUpPage.signUpAttempt();
        })
    }
    static signUpAttempt() {
        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                    reject(this.error);
                }
            }
            request.open("POST", "http://localhost:3000/api/auth/signup");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(user));
        })

        .then(function(response) {
                console.log("Utilisateur inscrit!");
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Inscription échouée." + error);
                SignUpPage.display();
            });
    }
}