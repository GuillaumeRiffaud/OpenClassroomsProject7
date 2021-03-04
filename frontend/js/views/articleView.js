class ArticleView {
    static displayInterface() {
        HtmlContent.clear("header");
        HtmlContent.fillWith("header",
            `<h1>
                <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
            </h1>
            <a href="#" id="profileButton">⚙️Paramètres de compte</a>
            <button id="disconnectButton" onclick="UserController.logout();">Se déconnecter</button>`);
        HtmlContent.fillWith("main",
            `<button id="newArticleButton">Rédiger un article</button>`);

        const section = document.createElement('section');
        section.setAttribute("id", "articlesList");
        document.getElementById('main').appendChild(section);
        ArticleController.loadAll();

        document.getElementById("profileButton").addEventListener("click", () => {
            HtmlContent.clear("main");
            HtmlContent.clear("header");
            HtmlContent.fillWith("header", `
                    <h1>
                        <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
                    </h1>
                    <button id="disconnectButton" onclick="UserController.logout();" >Se déconnecter</button>`);
            UserView.displayForms();
        });

        document.getElementById("newArticleButton").addEventListener("click", () => {
            HtmlContent.clear("main");
            ArticleView.displayNewArticleForm();
        });
    }
    static displayAllArticles(articles) {
        if (articles && articles.length > 0) { // réponse serveur avec des articles
            for (const article of articles) {
                HtmlContent.fillWith("articlesList",
                    `<article id="article${article.id}">
                        <h2>${article.title}</h2>
                        <div>Rédigé: ${article.creationDate}</div>
                        <div>Par: ${article.name}</div>`);
                if (article.imageUrl) {
                    HtmlContent.fillWith("articlesList", `<img src="${APIURL}/${article.imageUrl}" alt="L'image associée à cet article" width="100" height="100" />`);
                }
                HtmlContent.fillWith("articlesList", `<p>${article.content}</p>
                        </article>`);
            }
            articles.forEach((item, index, array) => {
                if (document.getElementById("article" + item.id)) {
                    document.getElementById("article" + item.id).addEventListener("click", () => {
                        HtmlContent.clear("main");
                        ArticleController.getOne(item.id);
                    });
                }
            })


        } else { // réponse serveur sans article
            HtmlContent.fillWith("articlesList",
                `<div>Aucun article à afficher.</div>`);
        }

    }

    static displayOneArticle(article) {
        if (article.imageUrl) {
            HtmlContent.fillWith("main", `<img src="${APIURL}/${article.imageUrl}" alt="L'image associée à cet article" width="100" height="100" />`);
        }
        HtmlContent.fillWith("main", `
                <article><h2>${article.title}</h2>
                <p>${article.content}</p>
                <p>Rédigé par ${article.name} le ${article.creationDate}</p>
        `);
        if (article.authorId == sessionStorage.getItem("userId")) {
            HtmlContent.fillWith("main", `
                <button id="modifyArticleButton">Modifier l'article</button>
                <button id="deleteArticleButton">Supprimer l'article</button>`);
            document.getElementById('modifyArticleButton').addEventListener('click', () => {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                    <form id='modifyArticleForm'><div>
                            <label>Titre de l'article</br><input type="text" id="title" name="title" value="${article.title}" required /></label>
                        </div>
                        <div>
                            <label>Contenu de l'article</br><textarea type="text" id="content" name="content" required>${article.content}</textarea></label>
                        </div>
                        <label for="image">Joindre une image</br></label>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg">
                        </br>
                        <input id="submitModifiedArticle" type="submit" value="Modifier l'article">
                    </form>`);
                document.getElementById('submitModifiedArticle').addEventListener("click", (event) => {
                    event.preventDefault();
                    ArticleController.modifyArticle(article.id);
                });
            });
            document.getElementById('deleteArticleButton').addEventListener("click", (event) => {
                event.preventDefault();
                ArticleController.deleteArticle(article.id);
            });
        }
    }

    static displayNewArticleForm() {
        HtmlContent.clear("main");
        HtmlContent.fillWith("main",
            `<h2>Nouvel article</h2>
        <form id="newArticleForm">
            <div>
               <label>Titre de l'article</br><input type="text" id="title" name="title" required /></label>
            </div>
            <div>
                <label>Contenu de l'article</br><textarea type="text" id="content" name="content" required></textarea></label>
            </div>
            <label for="image">Joindre une image</br></label>
            <input type="file" id="image" name="image" accept="image/png, image/jpeg">
            </br>
            <input id="submitArticle" type="submit" value="Publier l'article">
        </form>
            `);
        document.getElementById('submitArticle').addEventListener("click", (event) => {
            event.preventDefault();
            ArticleController.submitArticle();
        });
    }

}