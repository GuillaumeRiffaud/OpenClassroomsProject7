class SignUpController {
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
}