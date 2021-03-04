const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

exports.signup = (req, res, next) => {
    if (!req.body.name || !req.body.password || !emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Format incorrect !' });
    }
    if (req.body.password.length < 4) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 4 caractères !' });
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.save(req.body.name, req.body.email, hash, function(result) {
                if (!result) {
                    return res.status(201).json({ message: 'Utilisateur créé !' })
                } else {
                    return res.status(400).json({ error: 'Compte existant déjà !' });
                }
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    if (!req.body.password || !emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Format incorrect !' });
    }
    User.findOne('email', req.body.email, function(result) {
        if (!result) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        } else {
            bcrypt.compare(req.body.password, result.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        username: result.name,
                        userId: result.id,
                        token: jwt.sign({ userId: result.id },
                            'NOT_A_SECRET_ENOUGH_TOKEN_FOR_PROD', { expiresIn: '24h' }
                        )
                    });
                })

            .catch(error => {
                console.log(error);
                res.status(501).json({ error });
            });
        }
    })
};

exports.modify = (req, res, next) => {
    if (!req.body.password || (req.body.newEmail && !emailRegex.test(req.body.newEmail))) {
        return res.status(400).json({ error: 'Format incorrect !' });
    }
    User.findOne('id', req.body.userId, function(result) {
        if (!result) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        } else {
            bcrypt.compare(req.body.password, result.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    if (req.body.newEmail) {
                        User.updateOne('email', req.body.newEmail, req.body.userId, function(result) {
                            if (!result) {
                                return res.status(200).json({ message: 'Email modifié !' })
                            } else {
                                return res.status(400).json({ error: 'Une erreur est survenue !' });
                            }
                        });
                    }
                    if (req.body.newPassword) {
                        bcrypt.hash(req.body.newPassword, 10)
                            .then(hash => {
                                User.updateOne('password', hash, req.body.userId, function(result) {
                                    if (!result) {
                                        res.status(200).json({ message: "Mot de passe modifié !" });
                                    } else {
                                        return res.status(400).json({ error: 'Une erreur est survenue !' });
                                    }
                                })
                            })
                            .catch(error => res.status(500).json({ error }));
                    }
                })

            .catch(error => {
                console.log(error);
                res.status(501).json({ error });
            });
        }
    })
};

exports.delete = (req, res, next) => {
    User.findOne('id', req.body.userId, function(result) {
        if (!result) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        } else {
            User.deleteOne(req.body.userId, function(result) {
                if (!result) {
                    res.status(200).json({ message: "Compte utilisateur supprimé !" });
                } else {
                    return res.status(400).json({ error: 'Une erreur est survenue !' });
                }
            })
        }
    })
};