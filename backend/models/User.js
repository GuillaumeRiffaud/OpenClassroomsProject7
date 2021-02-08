const database = require('../config/database');

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
    static findOne(email, callback) {
        database.query('SELECT * FROM users WHERE email = ?', [email], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result[0]);
            }
        })
    }
}

module.exports = User;