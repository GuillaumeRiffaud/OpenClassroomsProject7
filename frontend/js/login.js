let user = "";

class LogInPage {
    static display() {
        HtmlContent.fillWith("main", `<h2>Connexion</h2>
                                    <form id="loginForm" validate>
                                        <div>
                                            <label>Adresse email <input type="email" id="userEmail" required /></label>
                                        </div>
                                        <div>
                                            <label>Mot de passe <input type="password" id="userPassword" required /></label>
                                        </div>
                                        <button id="logInButton" type="submit">Connexion</button>
                                    </form>
                                    <a href="#" id="goToSignUp">Nouveau membre ?</a>`);
        document.getElementById("goToSignUp").addEventListener("click", (event) => {
            event.preventDefault();
            HtmlContent.clear("main");
            SignUpPage.display();
        })
        document.getElementById("logInButton").addEventListener("click", (event) => {
            event.preventDefault();
            user = {
                email: document.getElementById("userEmail").value,
                password: document.getElementById("userPassword").value,
            }
            LogInPage.logInAttempt();
        })
    }
    static logInAttempt() {
        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                    reject(this.status);
                }
            }
            request.open("POST", "http://localhost:3000/api/auth/login");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(user));
        })

        .then(function(response) {
                console.log("Utilisateur connecté!");
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Connexion échouée. " + error);
                console.error(error);
                LogInPage.display();
            });
    }
}