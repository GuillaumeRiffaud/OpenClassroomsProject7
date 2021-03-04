const database = require('../config/database');

class Article {
    static find(callback) {
        database.query(`SELECT articles.id, articles.authorId, articles.creationDate, articles.title, articles.content, articles.imageUrl, users.name FROM articles 
                            INNER JOIN users
                                ON articles.authorId = users.id
                        ORDER BY articles.creationDate DESC`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        })
    }

    static findOne(id, callback) {
        database.query(`SELECT articles.id, articles.authorId, articles.creationDate, articles.title, articles.content, articles.imageUrl, users.name FROM articles 
                            INNER JOIN users
                                ON articles.authorId = users.id
                            WHERE articles.id = ?`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result[0]);
            }
        })
    }

    static save(articleObject, callback) {
        database.query('INSERT INTO articles SET authorId = ?, title = ?, content = ?, imageUrl = ?', [articleObject.authorId, articleObject.title, articleObject.content, articleObject.imageUrl], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static updateOne(articleObject, callback) {
        database.query('UPDATE articles SET authorId = ?, title = ?, content = ?, imageUrl = ? WHERE id = ?', [articleObject.authorId, articleObject.title, articleObject.content, articleObject.imageUrl, articleObject.id],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static deleteOne(id, callback) {
        database.query('DELETE FROM articles WHERE id= ?', [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Article;