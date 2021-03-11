class UserController {
    static logInAttempt() {
        let user = {
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
        }
        RequestModel.filelessRequest("POST", "/auth/login", 200, JSON.stringify(user), false)


        .then(function(response) {
                LoadingScreen.stop();
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                let username = JSON.parse(response).username;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("username", username);
                HtmlContent.clear("main");
                ArticleView.displayInterface();
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>" + JSON.parse(error).error + "</div>");
                LogInView.display();
            });
    }

    static signUpAttempt() {
        let user = {
            name: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
        };
        RequestModel.filelessRequest("POST", "/auth/signup", 201, JSON.stringify(user))

        .then(function(response) {
                LoadingScreen.stop();
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                HtmlContent.clear("main");
                ArticleView.displayInterface();
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>" + JSON.parse(error).error + "</div>");
                SignUpView.display();
            });
    }


    static modifyEmail() {
        let userNewInfo = {
            userId: sessionStorage.getItem("userId"),
            newEmail: document.getElementById("userNewEmail").value,
            password: document.getElementById("userPassword").value,
        };
        RequestModel.filelessRequest("PUT", "/auth/modify", 200, JSON.stringify(userNewInfo), true)

        .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                <p class='message'>${JSON.parse(response).message}</p>`);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>" + JSON.parse(error).error + "</div>");
                UserView.displayForms();
            });

    }

    static checkPasswords() {
        if (document.getElementById("userNewPassword1").value !== (document.getElementById("userNewPassword2").value)) {
            HtmlContent.clear("main");
            HtmlContent.fillWith("main", "<p class='message message--error'>Erreur: les mots de passe ne correspondent pas!</p>");
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
        RequestModel.filelessRequest("PUT", "/auth/modify", 200, JSON.stringify(userNewInfo), true)

        .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                    <p class='message'>${JSON.parse(response).message}</p>`);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>" + JSON.parse(error).error + "</div>");
            });
    }

    static logout() {
        sessionStorage.removeItem("sessionToken");
        sessionStorage.removeItem("userId");
        HtmlContent.clear("main");
        HtmlContent.clear("header");
        LogInView.display();
    }

    static delete() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "/auth/delete", 200, JSON.stringify(userInfo), true)

        .then(function(response) {
                LoadingScreen.stop();
                sessionStorage.removeItem("sessionToken");
                HtmlContent.clear("main");
                HtmlContent.clear("header");
                HtmlContent.fillWith("header",
                    `<h1>
                    <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
                    </h1>`);
                HtmlContent.fillWith("main", `<div class='message'>
                        <p>${JSON.parse(response).message}</p>
                        <a href="index.html">Retour à la page de connexion.</a>
                        </div>`);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>" + JSON.parse(error).error + "</div>");
            });
    }
}