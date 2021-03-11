class ArticleController { // non fonctionnel, à faire
    static loadAll() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };

        RequestModel.filelessRequest("GET", "/articles", 200, JSON.stringify(userInfo), true)

        .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                let articles = JSON.parse(response).result;
                ArticleView.displayAllArticles(articles);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Chargement des articles échoué.</div>");
                console.log(error);
            });
    }

    static getOne(ArticleId) {
        RequestModel.filelessRequest("GET", "/articles/" + ArticleId, 200, "", true)

        .then(function(response) {
                LoadingScreen.stop();
                let article = JSON.parse(response).result;
                ArticleView.displayOneArticle(article);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.fillWith("main", "<div class='message message--error'>Chargement de l'article échoué.</div>");
                console.log(error);
            });
    }

    static submitArticle() {
        let formData = new FormData(document.getElementById("newArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));
        formData.append("userId", sessionStorage.getItem("userId"));

        RequestModel.withFileRequest("POST", "/articles", 201, formData, true)
            .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message'>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Erreur lors de l'envoi de l'article.</div>");
                console.log(error);
            });
    }

    static modifyArticle(articleId) {
        let formData = new FormData(document.getElementById("modifyArticleForm"));
        formData.append("authorId", sessionStorage.getItem("userId"));
        formData.append("userId", sessionStorage.getItem("userId"));
        formData.append("id", articleId);

        RequestModel.withFileRequest("PUT", "/articles/" + articleId, 201, formData, true)
            .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message'>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Erreur lors de la modification de l'article.</div>");
                console.log(error);
            });
    }
    static deleteArticle(articleId) {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "/articles/" + articleId, 200, JSON.stringify(userInfo), true)
            .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message'>" + JSON.parse(response).message + "</div>");
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Erreur lors de la suppression de l'article.</div>");
                console.log(error);
            });
    }
}