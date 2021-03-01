class LogInView {
    static display() {
        HtmlContent.clear("header");
        HtmlContent.fillWith("header",
            `<h1>
            <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
        </h1>`);
        HtmlContent.fillWith("main",
            `<h2>Connexion</h2>
            <form id="loginForm" validate>
                <div>
                    <label>Adresse email</br><input type="email" id="userEmail" required /></label>
                </div>
                <div>
                    <label>Mot de passe</br><input type="password" id="userPassword" required /></label>
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
            UserController.logInAttempt();
        })
    }

}