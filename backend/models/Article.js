const database = require('../config/database');

class Article {
    static find(callback) {
        database.query('SELECT * FROM articles', (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        })
    }
}

module.exports = Article;