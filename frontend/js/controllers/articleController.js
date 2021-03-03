class ArticleController { // non fonctionnel, à faire
    static loadAll() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        JSON.stringify(userInfo);
        RequestModel.filelessRequest("GET", "/articles", 200, userInfo, true)

        .then(function(response) {
                let articles = JSON.parse(response).result;
                ArticleView.displayAllArticles(articles);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Chargement des articles échoué. " + JSON.parse(error).error);
            });
    }

    static getOne(ArticleId) {
        RequestModel.filelessRequest("GET", "/articles/" + ArticleId, 200, "", true)

        .then(function(response) {
                let article = JSON.parse(response).result;
                ArticleView.displayOneArticle(article);
            })
            .catch(function(error) {
                HtmlContent.fillWith("main", "Chargement de l'article échoué. " + JSON.parse(error).error);
            });
    }

    static submitArticle() {
        let formData = new FormData(document.getElementById("newArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));

        RequestModel.withFileRequest("POST", "/articles", 201, formData, true)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static modifyArticle(articleId) {
        let formData = new FormData(document.getElementById("modifyArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));
        formData.append("id", articleId);
        console.log(formData);

        RequestModel.withFileRequest("PUT", "/articles/" + articleId, 201, formData, true)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}