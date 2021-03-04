class CommentController {
    static loadAll(article) {
        RequestModel.filelessRequest("GET", "/comments/" + article.id, 200, "", true)
            .then(function(response) {
                let comments = JSON.parse(response).result;
                CommentView.displayAll(comments);
            })
            .catch(function(error) {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", "<div>Chargement des commentairess échoué. " + JSON.parse(error) + "</div>");
            });
    }

    static modifyComment(comment) {
        console.log("Modification de ce commentaire:", comment);
    }

    static deleteComment(comment) {
        console.log("Suppression de ce commentaire:", comment);
    }
}