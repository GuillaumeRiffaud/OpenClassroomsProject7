const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const fs = require('fs');

exports.getAllArticles = (req, res, next) => {
    Article.find(function(result) {
        if (!result) {
            return res.status(404).json({ error: "Une erreur est survenue, impossible de charger les articles !" });
        } else {
            return res.status(200).json({ result });
        }
    });
}

exports.getOneArticle = (req, res, next) => {
    Article.findOne(req.params.id, function(result) {
        if (!result) {
            return res.status(404).json({ error: "Une erreur est survenue, chargement de l'article impossible !" });
        } else {
            Comment.count(req.params.id, function(comments) {
                result.commentCount = comments.count;
                return res.status(200).json({ result });
            });
        }
    });
}

exports.postNewArticle = (req, res, next) => {
    if (!req.body.title || !req.body.content || !req.body.authorId || !req.body.userId) {
        return res.status(400).json({ error: 'Bad request !' });
    }
    const articleObject = req.file ? {
        ...req.body,
        imageUrl: `images/${req.file.filename}`
    } : {...req.body };
    Article.save(articleObject, function(result) {
        if (!result) {
            return res.status(201).json({ message: 'Article créé !' })
        } else {
            return res.status(400).json({ error: result });
        }
    });
}

exports.modifyArticle = (req, res, next) => {
    if (!req.body.title || !req.body.content || !req.body.authorId || !req.body.userId || !req.body.id) {
        return res.status(400).json({ error: 'Bad request !' });
    }
    Article.findOne(req.params.id, function(article) { // on va chercher l'article dans la base de données
        if (!article) {
            return res.status(404).json({ error: 'Article non trouvé !' });
        } else {
            User.findOne("id", req.body.userId, function(user) {
                if (user.admin != 1 && article.authorId != req.body.userId) {
                    return res.status(400).json({ error: "Vous n'êtes pas l'auteur !" });
                } else {
                    if (article.imageUrl || req.file) { // si l'article possède une image, on  la supprime
                        fs.unlink(`${article.imageUrl}`, () => {});
                    }
                    const articleObject = req.file ? {
                        ...req.body,
                        imageUrl: `images/${req.file.filename}`
                    } : {...req.body };
                    Article.updateOne(articleObject, function(result) {
                        if (!result) {
                            return res.status(201).json({ message: 'Article modifié !' })
                        } else {
                            return res.status(400).json({ error: 'Une erreur est survenue !' });
                        }
                    });

                }
            });
        }
    });
}

exports.deleteArticle = (req, res, next) => {
    Article.findOne(req.params.id, function(article) {
        if (!article) {
            return res.status(404).json({ error });
        } else {
            User.findOne("id", req.body.userId, function(user) {
                if (user.admin != 1 && article.authorId != req.body.userId) {
                    return res.status(400).json({ error: "Vous n'êtes pas l'auteur !" });
                } else {
                    Comment.deleteByArticleId(req.params.id, function(result) {
                        if (result) {
                            return res.status(400).json({ error: 'Une erreur est survenue lors de la suppression des commentaires !' });
                        }
                    });
                    if (article.imageUrl) { // s'il y a une image, on la supprime
                        fs.unlink(`${article.imageUrl}`, () => {});
                    }
                    Article.deleteOne(req.params.id, function(result) {
                        if (!result) {
                            res.status(200).json({ message: "Article supprimé !" });
                        } else {
                            return res.status(400).json({ error: "Une erreur est survenue lors de la suppression de l'article !" });
                        }
                    });

                }
            });
        }
    });
}