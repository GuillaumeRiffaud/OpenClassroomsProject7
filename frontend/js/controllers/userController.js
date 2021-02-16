class UserController {
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
                request.open("PUT", "http://localhost:3000/api/auth/modify/");
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
}