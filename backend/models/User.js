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
}

module.exports = User;