const database = require('../config/database');
const sanitizeHtml = require('sanitize-html');

class Comment {
    static find(articleId, callback) {
        database.query(`SELECT comments.id, comments.articleId, comments.authorId, comments.creationDate, comments.content, users.name FROM comments 
                            INNER JOIN users
                                ON comments.authorId = users.id
                        WHERE comments.articleId = ?
                        ORDER BY comments.creationDate`, [articleId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }
    static save(commentObject, callback) {
        database.query('INSERT INTO comments SET articleId = ?, authorId = ?, content = ?', [commentObject.articleId,
                commentObject.userId,
                sanitizeHtml(commentObject.content, { allowedTags: [], allowedAttributes: {} }),
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static findOne(commentId, callback) {
        database.query(`SELECT * FROM comments WHERE id = ?`, [commentId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result[0]);
            }
        });
    }
    static updateOne(commentId, content, callback) {
        database.query('UPDATE comments SET content = ? WHERE id = ?', [sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} }),
                commentId
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static deleteOne(commentId, callback) {
        database.query('DELETE FROM comments WHERE id= ?', [commentId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteByArticleId(articleId, callback) {
        database.query('DELETE FROM comments WHERE articleId= ?', [articleId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteByUserId(userId, callback) {
        database.query('DELETE FROM comments WHERE authorId= ?', [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static count(articleId, callback) {
        database.query('SELECT COUNT(*) AS count FROM comments WHERE articleId = ?', [articleId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result[0]);
            }
        });
    }
}

module.exports = Comment;