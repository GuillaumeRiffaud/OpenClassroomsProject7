class ArticleView {
    static displayInterface() {
        HtmlContent.clear("header");
        HtmlContent.fillWith("header",
            `<h1>
                <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
            </h1>
            <a href="index.html" class="home">🏠 Accueil</a>
            <nav>
                <a href="#" id="profileButton">⚙️Paramètres de compte</a>
                <button id="disconnectButton" onclick="UserController.logout();">Se déconnecter</button>
            </nav>`);
        ArticleController.loadAll();

        document.getElementById("profileButton").addEventListener("click", () => {
            HtmlContent.clear("main");
            HtmlContent.clear("header");
            HtmlContent.fillWith("header",
                `<h1>
                <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
                </h1>
                <a href="index.html" class="home">🏠 Accueil</a>
                <nav>
                    <a href="#" id="profileButton">⚙️Paramètres de compte</a>
                    <button id="disconnectButton" onclick="UserController.logout();">Se déconnecter</button>
                </nav>`);
            UserView.displayForms();
        });

    }
    static displayAllArticles(articles) {
        const section = document.createElement('section');
        section.setAttribute("id", "articlesList");
        section.setAttribute("class", "articlesList");
        document.getElementById('main').appendChild(section);
        HtmlContent.fillWith("main",
            `<button class="newArticleButton" id="newArticleButton">✏️ Rédiger un article</button>`);
        if (articles && articles.length > 0) { // réponse serveur avec des articles
            for (const article of articles) { // affiche les infos de chaque article
                HtmlContent.fillWith("articlesList",
                    `<article class="article article--clickable" id="article${article.id}"></article>`);
                HtmlContent.fillWith("article" + article.id, `
                        <h2>${article.title}</h2>
                        <div id="articleContainer${article.id}">
                        <div class="article__info">Rédigé: le ${DateDisplay.basic(article.creationDate)}</br>
                        Par: ${article.name}</div>
                        </div>`);
                if (article.imageUrl) {
                    HtmlContent.fillWith("articleContainer" + article.id, `<img src="${APIURL}/${article.imageUrl}" alt="L'image associée à cet article" />`);
                }
                HtmlContent.fillWith("articleContainer" + article.id, `<p>${article.content.replaceAll('\n','</br>')}</p>`);
                HtmlContent.fillWith("article" + article.id, `<div class="article__range">233 Likes / ${article.commentCount} Commentaire(s)</div>`);
            }
            articles.forEach((item, index, array) => { // rend chaque article cliquable pour accéder à sa page unique
                if (document.getElementById("article" + item.id)) {
                    document.getElementById("article" + item.id).addEventListener("click", () => {
                        HtmlContent.clear("main");
                        ArticleController.getOne(item.id);
                    });
                }
            });


        } else { // réponse serveur sans article
            HtmlContent.fillWith("articlesList",
                `<div>Aucun article à afficher.</div>`);
        }
        document.getElementById("newArticleButton").addEventListener("click", () => {
            HtmlContent.clear("main");
            ArticleView.displayNewArticleForm();
        });

    }

    static displayOneArticle(article) {
        HtmlContent.fillWith("main", `<article class="article" id="article"></article>`);
        if (article.imageUrl) {
            HtmlContent.fillWith("article", `<img src="${APIURL}/${article.imageUrl}" alt="L'image associée à cet article" />`);
        }

        HtmlContent.fillWith("article", `
                <h2>${article.title}</h2>
                <p class="article__info">Rédigé par ${article.name} le ${DateDisplay.basic(article.creationDate)}</p>
                <p>${article.content.replaceAll('\n','</br>')}</p>
                <div class="article__range">233 Likes / ${article.commentCount} Commentaire(s)</div>
                
        `);
        if (article.authorId == sessionStorage.getItem("userId")) {
            HtmlContent.fillWith("article", `
                <button id="modifyArticleButton">✏️ Modifier l'article</button>
                <button id="deleteArticleButton">🗑️ Supprimer l'article</button>`);
            document.getElementById('modifyArticleButton').addEventListener('click', () => {
                HtmlContent.clear("main");
                HtmlContent.fillWith("main", `
                    <form id='modifyArticleForm'><div>
                            <label>Titre de l'article</br><input class="input--text" type="text" id="title" name="title" value="${article.title}" required /></label>
                        </div>
                        <div>
                            <label>Contenu de l'article</br><textarea type="text" id="content" name="content" required>${article.content}</textarea></label>
                        </div>
                        <label for="image">Joindre une image</br></label>
                        <input class="input--image" type="file" id="image" name="image" accept="image/png, image/jpeg">
                        </br>
                        <input type="submit" value="Modifier l'article">
                    </form>`);
                document.getElementById('modifyArticleForm').addEventListener("submit", (event) => {
                    event.preventDefault();
                    ArticleController.modifyArticle(article.id);
                });
            });
            document.getElementById('deleteArticleButton').addEventListener("click", (event) => {
                event.preventDefault();
                ArticleController.deleteArticle(article.id);
            });
        }
        const section = document.createElement('section');
        section.setAttribute("id", "commentsList");
        section.setAttribute("class", "commentsList");
        document.getElementById('main').appendChild(section);
        CommentController.loadAll(article);
    }

    static displayNewArticleForm() {
        HtmlContent.clear("main");
        HtmlContent.fillWith("main",
            `<h2>Nouvel article</h2>
        <form id="newArticleForm">
            <div>
               <label>Titre de l'article</br><input class="input--text" type="text" id="title" name="title" required /></label>
            </div>
            <div>
                <label>Contenu de l'article</br><textarea type="text" id="content" name="content" required></textarea></label>
            </div>
            <label for="image">Joindre une image</br></label>
            <input class="input--image" type="file" id="image" name="image" accept="image/png, image/jpeg">
            </br>
            <input id="submitArticle" type="submit" value="Publier l'article">
        </form>
            `);
        document.getElementById('newArticleForm').addEventListener("submit", (event) => {
            event.preventDefault();
            ArticleController.submitArticle();
        });
    }

}