const database = require('../config/database');

class User {

    static save(name, email, password) {
        database.query('INSERT INTO users SET name = ?, email = ?, password = ?', [name, email, password], (error) => {
            if (error) {
                return error;
            }
            callback()
        });
    }
}

module.exports = User;