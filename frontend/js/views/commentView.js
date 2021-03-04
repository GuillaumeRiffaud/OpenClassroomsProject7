class CommentView {
    static displayAll(comments) {
        if (comments && comments.length > 0) { // réponse serveur avec des articles
            for (const comment of comments) {
                HtmlContent.fillWith("commentsList",
                    `<div id="comment${comment.id}">
                        <p>${comment.content}</p>
                        <p>Commenté: ${comment.creationDate}</p>
                        <p>Par: ${comment.name}</p>
                        </div>
                        `);
                if (comment.authorId == sessionStorage.getItem("userId")) {
                    HtmlContent.fillWith("commentsList", `
                                <button id="modifyCommentButton${comment.id}">Modifier le commentaire</button>
                                <button id="deleteCommentButton${comment.id}">Supprimer le commentaire</button>`);

                }
            }
            comments.forEach((item, index, array) => {
                if (document.getElementById("modifyCommentButton" + item.id)) {
                    document.getElementById('modifyCommentButton' + item.id).addEventListener('click', () => {
                        HtmlContent.clear("commentsList");
                        HtmlContent.fillWith("commentsList", `
                            <form id='modifyCommentForm'><div>
                                <div>
                                    <label>Commentaire :</br><textarea type="text" id="content" name="content" required>${item.content}</textarea></label>
                                </div>
                                </br>
                                <input id="submitModifiedComment" type="submit" value="Modifier le commentaire">
                            </form>`);
                        document.getElementById('submitModifiedComment').addEventListener("click", (event) => {
                            event.preventDefault();
                            CommentController.modifyComment(item);
                        });
                    });
                    document.getElementById('deleteCommentButton' + item.id).addEventListener("click", (event) => {
                        event.preventDefault();
                        CommentController.deleteComment(item);
                    });
                }
            })

        } else { // réponse serveur sans article
            HtmlContent.fillWith("commentsList",
                `<div>Aucun commentaire, soyez le premier à commenter !</div>`);
        }
    }
}