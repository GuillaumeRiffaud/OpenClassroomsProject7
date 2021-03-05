class CommentController {
    static loadAll(article) {
        RequestModel.filelessRequest("GET", "/comments/" + article.id, 200, "", true)
            .then(function(response) {
                let comments = JSON.parse(response).result;
                CommentView.displayAll(article.id, comments);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Chargement des commentaires échoué. " + JSON.parse(error).error + "</div>");
            });
    }

    static submitComment(articleId) {
        let newComment = {
            content: document.getElementById("newCommentContent").value,
            articleId: articleId,
            userId: sessionStorage.getItem("userId"),
        }
        RequestModel.filelessRequest("POST", "/comments", 201, JSON.stringify(newComment), true)
            .then(function(response) {
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Envoi du commentaire échoué. " + JSON.parse(error).error + "</div>");
            });
    }

    static modifyComment(articleId, comment) {
        let modifiedComment = {
            content: document.getElementById("modifiedCommentContent").value,
            articleId: articleId,
            userId: sessionStorage.getItem("userId"),
        }
        RequestModel.filelessRequest("PUT", "/comments/" + comment.id, 201, JSON.stringify(modifiedComment), true)
            .then(function(response) {
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Modification du commentaire échouée. " + JSON.parse(error).error + "</div>");
            });
    }

    static deleteComment(articleId, comment) {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "/comments/" + comment.id, 200, JSON.stringify(userInfo), true)
            .then(function(response) {
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Suppression du commentaire échouée. " + JSON.parse(error).error + "</div>");
            });
    }
}