const database = require('../config/database');
const Article = require('../models/Article');
const fs = require('fs');

class User {

    static save(name, email, password, callback) {
        database.query('INSERT INTO users SET name = ?, email = ?, password = ?', [name, email, password], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static findOne(field, value, callback) {
        database.query('SELECT * FROM users WHERE ' + field + '= ?', [value], (error, user) => {
            if (error) {
                callback(error);
            } else {
                callback(user[0]);
            }
        })
    }
    static updateOne(field, value, id, callback) {
        database.query('UPDATE users SET ' + field + ' = ? WHERE id= ?', [value, id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteOne(userId, callback) {
        Article.findByUserId(userId, function(articles) { // on cherche les articles liés à l'utilisateur
            if (articles) {
                console.log('Articles qui devraient être supprimés:', articles);
                for (let article of articles) { // s'il y en a, on les supprime
                    if (article.imageUrl) { // si l'article possède une image, on  la supprime
                        fs.unlink(`${article.imageUrl}`, () => {});
                    }
                    Article.deleteOne(article.id, function(error) {
                        if (error) {
                            callback(error);
                        }
                    });

                }
            }
            database.query('DELETE FROM comments WHERE authorId = ?', [userId], (error, result) => {
                if (error) {
                    callback(error);
                }
            });
            database.query('DELETE FROM users WHERE id= ?', [userId], (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        });


    }
}

module.exports = User;