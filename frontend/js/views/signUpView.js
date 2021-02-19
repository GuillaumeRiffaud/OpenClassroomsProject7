class SignUpView {
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
            LogInView.display();
        })
        document.getElementById("signUpButton").addEventListener("click", (event) => {
            event.preventDefault();
            UserController.signUpAttempt();
        })
    }

}