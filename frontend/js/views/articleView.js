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
                        <p>${article.content}</p>
                        </article>`);
            }
        } else { // réponse serveur sans article
            HtmlContent.fillWith("articlesList",
                `<div>Aucun article à afficher.</div>`);
        }

    }
    static displayNewArticleForm() {
        HtmlContent.clear("main");
        HtmlContent.fillWith("main",
            `<h2>Nouvel article</h2>
        <form id="newArticleForm" onsubmit="ArticleController.submitArticle();" enctype="multipart/form-data">
            <div>
               <label>Titre de l'article</br><input type="text" id="articleTitle" required /></label>
            </div>
            <div>
                <label>Contenu de l'article</br><textarea type="text" id="articleContent" required></textarea></label>
            </div>
            <label for="articleImage">Joindre une image</br></label>
            <input type="file" id="articleImage" name="articleImage" accept="image/png, image/jpeg">
            </br>
            <input id="submitArticle" type="submit" value="Publier l'article">
        </form>
            `);
    }

}