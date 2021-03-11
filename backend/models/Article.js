const { createPool } = require('mysql');
const database = require('../config/database');
const Comment = require('../models/Comment');

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
        });
    }

    static findByUserId(userId, callback) {
        database.query(`SELECT * FROM articles WHERE authorId = ?`, [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
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
        });
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
    static deleteOne(articleId, callback) {
        database.query('DELETE FROM articles WHERE id= ?', [articleId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteByUserId(userId, callback) {
        database.query('DELETE FROM articles WHERE authorId= ?', [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Article;