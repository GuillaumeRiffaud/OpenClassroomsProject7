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
        })
    }
}

module.exports = Comment;