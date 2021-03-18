const APIURL = "http://localhost:3000";

class Homepage {
    static determine() {
        if (!sessionStorage.getItem("sessionToken")) {
            LogInView.display();
        } else {
            ArticleView.displayInterface();
        }
    }
}

class LoadingScreen {
    static show() {
        document.getElementById("loadingScreen").setAttribute("class", "loading");
    }
    static stop() {
        document.getElementById("loadingScreen").setAttribute("class", "loading--stop");
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

class DateDisplay {
    static basic(timestamp) {
        const options = {
            dateStyle: 'full',
            timeStyle: 'short',
        };
        let readableDate = new Intl.DateTimeFormat('fr-FR', options).format(new Date(timestamp));
        return readableDate;
    }
    static relative(timestamp) {
        const intervalInSeconds = (Date.now() - Date.parse(timestamp)) / 1000;
        let interval = Math.floor(intervalInSeconds / 31536000);
        let intervalType = '';
        if (interval >= 1) {
            intervalType = 'année';
        } else {
            interval = Math.floor(intervalInSeconds / 2592000);
            if (interval >= 1) {
                intervalType = 'mois';
            } else {
                interval = Math.floor(intervalInSeconds / 86400);
                if (interval >= 1) {
                    intervalType = 'jour';
                } else {
                    interval = Math.floor(intervalInSeconds / 3600);
                    if (interval >= 1) {
                        intervalType = "heure";
                    } else {
                        interval = Math.floor(intervalInSeconds / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = Math.floor(intervalInSeconds);
                            intervalType = "seconde";
                        }
                    }
                }
            }
        }
        if (interval > 1 && intervalType != 'mois') {
            intervalType += 's';
        }

        return interval + ' ' + intervalType;

    }
}