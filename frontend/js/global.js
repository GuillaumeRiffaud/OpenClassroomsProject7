class HtmlContent {
    static clear(id) {
        document.getElementById(id).innerHTML = "";
    }
    static fillWith(id, content) {
        document.getElementById(id).innerHTML += content;
    }
}