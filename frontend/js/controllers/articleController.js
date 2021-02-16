class ArticleController { // non fonctionnel, à faire
    static loadAll() {
        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

                    reject(request.responseText);
                }
            }
            request.open("GET", "http://localhost:3000/api/article");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(user));
        })

        .then(function(response) {
                let sessionToken = JSON.parse(response).token;
                sessionStorage.setItem("sessionToken", sessionToken);
                HtmlContent.clear("main");
                ArticleView.displayAll();
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Connexion échouée. " + JSON.parse(error).error);
                LogInView.display();
            });
    }
}