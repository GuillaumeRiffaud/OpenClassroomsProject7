class UserController {
    static logInAttempt() {
        let user = {
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
        }
        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                    reject(request.responseText);
                }
            }
            request.open("POST", "http://localhost:3000/api/auth/login");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(user));
        })

        .then(function(response) {
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                HtmlContent.clear("main");
                ArticleView.displayAll();
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
        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                    reject(request.responseText);
                }
            }
            request.open("POST", "http://localhost:3000/api/auth/signup");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(user));
        })

        .then(function(response) {
                let sessionToken = JSON.parse(response).token;
                let userId = JSON.parse(response).userId;
                sessionStorage.setItem("sessionToken", sessionToken);
                sessionStorage.setItem("userId", userId);
                HtmlContent.clear("main");
                ArticleView.displayAll();
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
        new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                        resolve(request.responseText);

                    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                        reject(request.responseText);
                    }
                }
                request.open("PUT", "http://localhost:3000/api/auth/modify");
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("sessionToken"));
                request.send(JSON.stringify(userNewInfo));
            })
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
        new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                        resolve(request.responseText);

                    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                        reject(request.responseText);
                    }
                }
                request.open("PUT", "http://localhost:3000/api/auth/modify");
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("sessionToken"));
                request.send(JSON.stringify(userNewInfo));
            })
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
        new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                        resolve(request.responseText);

                    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                        reject(request.responseText);
                    }
                }
                request.open("DELETE", "http://localhost:3000/api/auth/delete");
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("sessionToken"));
                request.send(JSON.stringify(userInfo));
            })
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