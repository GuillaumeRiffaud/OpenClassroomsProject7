class Homepage {
    static determine() {
        if (!sessionStorage.getItem("sessionToken")) {
            LogInView.display();
        } else {
            ArticleView.displayInterface();
        }
    }
}

class HtmlContent {
    static clear(id) {
        document.getElementById(id).innerHTML = "";
    }
    static fillWith(id, content) {
        document.getElementById(id).innerHTML += content;
    }
}