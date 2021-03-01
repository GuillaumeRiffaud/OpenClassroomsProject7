class UserController {
    static logInAttempt() {
        let user = {
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
        }
        RequestModel.filelessRequest("POST", "auth/login", 200, user)

        .then(function(response) {
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                HtmlContent.clear("main");
                ArticleView.displayInterface();
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Connexion échouée. " + JSON.parse(error).error);
                LogInView.display();
            });
    }

    static signUpAttempt() {
        let user = {
            name: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
        };
        RequestModel.filelessRequest("POST", "auth/signup", 200, user)

        .then(function(response) {
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                HtmlContent.clear("main");
                ArticleView.displayInterface();
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Inscription échouée. " + JSON.parse(error).error);
                SignUpView.display();
            });
    }


    static modifyEmail() {
        let userNewInfo = {
            userId: sessionStorage.getItem("userId"),
            newEmail: document.getElementById("userNewEmail").value,
            password: document.getElementById("userPassword").value,
        };
        RequestModel.filelessRequest("PUT", "auth/modify", 200, userNewInfo, true)

        .then(function(response) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                <p>${JSON.parse(response).message}</p>`);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Connexion échouée. " + JSON.parse(error).error);
            });

    }

    static checkPasswords() {
        if (document.getElementById("userNewPassword1").value !== (document.getElementById("userNewPassword2").value)) {
            HtmlContent.clear("main");
            HtmlContent.fillWith("main", "<p>Erreur: les mots de passe ne correspondent pas!</p>");
            UserView.displayForms();
            return console.log('Modification empêchée');
        } else {
            this.modifyPassword();
        }
    }
    static modifyPassword() {
        let userNewInfo = {
            userId: sessionStorage.getItem("userId"),
            newPassword: document.getElementById("userNewPassword1").value,
            password: document.getElementById("userOldPassword").value,
        };
        RequestModel.filelessRequest("PUT", "auth/modify", 200, userNewInfo, true)

        .then(function(response) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                    <p>${JSON.parse(response).message}</p>`);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Connexion échouée. " + JSON.parse(error).error);
            });
    }

    static logout() {
        sessionStorage.removeItem("sessionToken");
        HtmlContent.clear("main");
        HtmlContent.clear("header");
        LogInView.display();
    }

    static delete() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "auth/delete", 200, userInfo, true)

        .then(function(response) {
                sessionStorage.removeItem("sessionToken");
                HtmlContent.clear("main");
                HtmlContent.clear("header");
                HtmlContent.fillWith("header",
                    `<h1>
                    <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
                    </h1>`);
                HtmlContent.fillWith("main", `
                        <p>${JSON.parse(response).message}</p>
                        <a href="index.html">Retour à la page de connexion.</a>`);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Suppression impossible. " + JSON.parse(error).error);
            });
    }
}