const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

exports.signup = (req, res, next) => {
    if (!req.body.name || !req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Veuillez renseigner tous les champs !' });
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Adresse email invalide !' });
    }
    if (req.body.password.length < 8) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères !' });
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.save(req.body.name, req.body.email, hash, function(result) {
                if (!result) {
                    User.findOne('email', req.body.email, function(result) {
                        if (!result) {
                            return res.status(404).json({ error: 'Utilisateur non trouvé !' });
                        } else {
                            return res.status(201).json({
                                message: 'Utilisateur créé !',
                                username: result.name,
                                userId: result.id,
                                token: jwt.sign({ userId: result.id },
                                    'NOT_A_SECRET_ENOUGH_TOKEN_FOR_PROD', { expiresIn: '24h' }
                                )
                            });
                        }
                    });

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
                            .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors du cryptage mot de passe !' }));
                    }
                })

            .catch(error => {
                console.log(error);
                res.status(501).json({ error: 'Une erreur est survenue !' });
            });
        }
    })
};

exports.delete = (req, res, next) => {
    User.findOne('id', req.body.userId, function(result) {
        if (!result) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        } else {
            Article.findByUserId(req.body.userId, function(articles) { // on cherche les articles liés à l'utilisateur
                if (articles) {
                    for (let article of articles) { // s'il y en a, on les supprime
                        if (article.imageUrl) { // si l'article possède une image, on  la supprime
                            fs.unlink(`${article.imageUrl}`, (error) => {
                                if (error) {
                                    return res.status(400).json({ error: "Une erreur est survenue lors de la suppression des images" });
                                }
                            });
                        }
                    }
                    Article.deleteByUserId(req.body.userId, function(error) {
                        if (error) {
                            return res.status(400).json({ error: "Une erreur est survenue lors de la suppression des articles" });
                        }
                    });
                }
            });
            Comment.deleteByUserId(req.body.userId, function(error) {
                if (error) {
                    return res.status(400).json({ error: "Une erreur est survenue lors de la suppression des commentaires !" });
                }
            });
            User.deleteOne(req.body.userId, function(result) {
                if (!result) {
                    res.status(200).json({ message: "Compte utilisateur supprimé !" });
                } else {
                    return res.status(400).json({ error: "Une erreur est survenue lors de la suppression de l'utilisateur !" });
                }
            })
        }
    })
};