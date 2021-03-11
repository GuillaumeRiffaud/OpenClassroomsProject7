class CommentView {
    static displayAll(articleId, comments) {
        HtmlContent.fillWith("commentsList", `
            <form id="newCommentForm" validate>
                <div>
                    <label>Ajouter un commentaire :</br><textarea type="text" id="newCommentContent" name="newCommentContent" required></textarea></label>
                </div>
                <button>Envoyer</button>
            </form>`);
        if (comments && comments.length > 0) { // réponse serveur avec des commentaires
            for (const comment of comments) { // met en page les informations de chaque commentaire
                HtmlContent.fillWith("commentsList",
                    `<div class="comment" id="comment${comment.id}">
                        <p>${comment.content.replaceAll('\n','</br>')}</p>
                        <p class="comment__info">Il y a ${DateDisplay.relative(comment.creationDate)}.</br>
                        Par: ${comment.name}</p>
                        </div>
                        `);
                if (comment.authorId == sessionStorage.getItem("userId")) { // boutons de modif et suppr uniquement si utilisateur = auteur
                    HtmlContent.fillWith("comment" + comment.id, `
                                <button id="modifyCommentButton${comment.id}">Modifier le commentaire</button>
                                <button id="deleteCommentButton${comment.id}">Supprimer le commentaire</button>`);

                }
            }
            comments.forEach((item, index, array) => { // chaque bouton de modification doit être créé avec son listener unique trouvé via l'id
                if (document.getElementById("modifyCommentButton" + item.id)) {
                    document.getElementById('modifyCommentButton' + item.id).addEventListener('click', () => {
                        HtmlContent.clear("commentsList");
                        HtmlContent.fillWith("commentsList", `
                            <form id='modifyCommentForm' validate><div>
                                <div>
                                    <label>Commentaire :</br><textarea type="text" id="modifiedCommentContent" name="modifiedCommentContent" required>${item.content}</textarea></label>
                                </div>
                                </br>
                                <button id="submitModifiedComment">Modifier le commentaire</button>
                            </form>`);
                        document.getElementById('modifyCommentForm').addEventListener("submit", (event) => { // envoi du commentaire modifié
                            event.preventDefault();
                            CommentController.modifyComment(articleId, item);
                        });
                    });
                    document.getElementById('deleteCommentButton' + item.id).addEventListener("click", (event) => { // suppression
                        event.preventDefault();
                        CommentController.deleteComment(articleId, item);
                    });
                }
            })

        } else { // réponse serveur sans article
            HtmlContent.fillWith("commentsList",
                `<div>Aucun commentaire, soyez le premier à commenter !</div>`);
        }
        document.getElementById('newCommentForm').addEventListener("submit", (event) => { // envoi du commentaire
            event.preventDefault();
            CommentController.submitComment(articleId);
        });
    }
}