class ArticleController { // non fonctionnel, à faire
    static loadAll() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("GET", "/articles", 200, JSON.stringify(userInfo), true)

        .then(function(response) {
                let articles = JSON.parse(response).result;
                ArticleView.displayAllArticles(articles);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Chargement des articles échoué. " + JSON.parse(error) + "</div>");
            });
    }

    static getOne(ArticleId) {
        RequestModel.filelessRequest("GET", "/articles/" + ArticleId, 200, "", true)

        .then(function(response) {
                let article = JSON.parse(response).result;
                ArticleView.displayOneArticle(article);
            })
            .catch(function(error) {
                HtmlContent.fillWith("main", "<div>Chargement de l'article échoué. " + JSON.parse(error) + "</div>");
            });
    }

    static submitArticle() {
        let formData = new FormData(document.getElementById("newArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));
        formData.append("userId", sessionStorage.getItem("userId"));

        RequestModel.withFileRequest("POST", "/articles", 201, formData, true)
            .then(function(response) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(error) + "</div>");
            });
    }

    static modifyArticle(articleId) {
        let formData = new FormData(document.getElementById("modifyArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));
        formData.append("userId", sessionStorage.getItem("userId"));
        formData.append("id", articleId);

        RequestModel.withFileRequest("PUT", "/articles/" + articleId, 201, formData, true)
            .then(function(response) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(error) + "</div>");
            });
    }
    static deleteArticle(articleId) {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "/articles/" + articleId, 200, JSON.stringify(userInfo), true)
            .then(function(response) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>" + JSON.parse(error) + "</div>");
            });
    }
}