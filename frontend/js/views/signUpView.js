class SignUpView {
    static display() {
        HtmlContent.fillWith("main", `<div class="connectionPortal"><h2>Inscription</h2>
                                <form id="signUpForm" validate>
                                    <div>
                                        <label>Nom d'utilisateur</br><input class="input--text" type="text" id="userName" required /></label>
                                    </div>
                                    <div>
                                        <label>Adresse email</br><input class="input--text" type="email" id="userEmail" required /></label>
                                    </div>
                                    <div>
                                        <label>Mot de passe</br><input class="input--text" type="password" id="userPassword" required /></label>
                                    </div>
                                    <button id="signUpButton" type="submit">Inscription</button>
                                </form>
                                <a href="#" id="goToLogin">Déjà membre ?</a></div>`);
        document.getElementById("goToLogin").addEventListener("click", (event) => {
            event.preventDefault();
            HtmlContent.clear("main");
            LogInView.display();
        })
        document.getElementById("signUpButton").addEventListener("click", (event) => {
            event.preventDefault();
            UserController.signUpAttempt();
        })
    }

}