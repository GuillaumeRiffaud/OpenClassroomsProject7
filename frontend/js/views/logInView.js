class LogInView {
    static display() {
        HtmlContent.fillWith("main",
            `<h2>Connexion</h2>
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
            SignUpView.display();
        })
        document.getElementById("logInButton").addEventListener("click", (event) => {
            event.preventDefault();
            LogInController.logInAttempt();
        })
    }

}