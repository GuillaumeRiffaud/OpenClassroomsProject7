class ArticleView {
    static displayAll() {
        HtmlContent.fillWith("header",
            `<a href="#" id="profileButton">⚙️Paramètres de compte</a>
            <button id="disconnectButton">Se déconnecter</button>`);
        HtmlContent.fillWith("main",
            `<p>Chargement des articles...</p>
            <div>Rédiger un article</div>`);
        // ArticleController.loadAll();
        document.getElementById("profileButton").addEventListener("click", () => {
            HtmlContent.clear("main");
            HtmlContent.clear("header");
            HtmlContent.fillWith("header", `
                <h1>
                    <a href="index.html"><img src="images/icon100x100.png" alt="logo de Groupomania" />Groupomania</a>
                </h1>
                <button id="disconnectButton">Se déconnecter</button>`);
            UserView.displayForms();
        });
    }
}