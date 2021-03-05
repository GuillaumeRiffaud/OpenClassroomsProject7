const database = require('../config/database');

class Comment {
    static find(id, callback) {
        database.query(`SELECT comments.id, comments.authorId, comments.creationDate, comments.content, users.name FROM comments 
                            INNER JOIN users
                                ON comments.authorId = users.id
                        WHERE comments.articleId = ?
                        ORDER BY comments.creationDate`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }
    static save(commentObject, callback) {
        database.query('INSERT INTO comments SET articleId = ?, authorId = ?, content = ?', [commentObject.articleId, commentObject.userId, commentObject.content], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static findOne(id, callback) {
        database.query(`SELECT * FROM comments WHERE id = ?`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result[0]);
            }
        });
    }
    static updateOne(id, content, callback) {
        database.query('UPDATE comments SET content = ? WHERE id = ?', [content, id],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static deleteOne(id, callback) {
        database.query('DELETE FROM comments WHERE id= ?', [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Comment;