class CommentController {
    static loadAll(article) {
        RequestModel.filelessRequest("GET", "/comments/" + article.id, 200, "", true)
            .then(function(response) {
                LoadingScreen.stop();
                let comments = JSON.parse(response).result;
                CommentView.displayAll(article.id, comments);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.fillWith("main", "<div class='message message--error'>Chargement des commentaires échoué.</div>");
                console.log(error);
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
                LoadingScreen.stop();
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Envoi du commentaire échoué.</div>");
                console.log(error);
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
                LoadingScreen.stop();
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Modification du commentaire échouée.</div>");
                console.log(error);
            });
    }

    static deleteComment(articleId, comment) {
        let userInfo = {
            userId: sessionStorage.getItem("userId"),
        };
        RequestModel.filelessRequest("DELETE", "/comments/" + comment.id, 200, JSON.stringify(userInfo), true)
            .then(function(response) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                ArticleController.getOne(articleId);
            })
            .catch(function(error) {
                LoadingScreen.stop();
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div class='message message--error'>Suppression du commentaire échouée.</div>");
                console.log(error);
            });
    }
}