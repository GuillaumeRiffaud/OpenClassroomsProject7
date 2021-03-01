class ArticleController { // non fonctionnel, à faire
    static loadAll() {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("GET", "articles", 200, userInfo, true)

        .then(function(response) {
                let articles = JSON.parse(response).result;
                console.log(articles);
                ArticleView.displayAllArticles(articles);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "Chargement des articles échoué. " + JSON.parse(error).error);
            });
    }
}