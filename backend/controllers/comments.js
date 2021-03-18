const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAllComments = (req, res, next) => {
    Comment.find(req.params.id, function(result) {
        if (!result) {
            return res.status(404).json({ error });
        } else {
            return res.status(200).json({ result });
        }
    });
}

exports.postNewComment = (req, res, next) => {
    if (!req.body.content || !req.body.userId || !req.body.articleId) {
        return res.status(400).json({ error: 'Bad request !' });
    }
    let commentObject = {...req.body };
    Comment.save(commentObject, function(result) {
        if (!result) {
            return res.status(201).json({ message: 'Commentaire envoyé !' })
        } else {
            return res.status(400).json({ error: result });
        }
    });
}

exports.modifyComment = (req, res, next) => {
    if (!req.body.content || !req.body.userId || !req.body.articleId) {
        return res.status(400).json({ error: 'Bad request !' });
    }
    Comment.findOne(req.params.id, function(comment) {
        if (!comment) {
            return res.status(404).json({ error });
        } else {
            User.findOne("id", req.body.userId, function(user) {
                if (user.admin != 1 && comment.authorId != req.body.userId) {
                    return res.status(400).json({ error: "Vous n'êtes pas l'auteur !" });
                } else {
                    Comment.updateOne(req.params.id, req.body.content, function(result) {
                        if (!result) {
                            return res.status(201).json({ message: 'Commentaire modifié !' })
                        } else {
                            return res.status(400).json({ error: result });
                        }
                    });
                }
            });
        }
    });
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne(req.params.id, function(comment) {
        if (!comment) {
            return res.status(404).json({ error });
        } else {
            User.findOne("id", req.body.userId, function(user) {
                if (user.admin != 1 && comment.authorId != req.body.userId) {
                    return res.status(400).json({ error: "Vous n'êtes pas l'auteur !" });
                } else {
                    Comment.deleteOne(req.params.id, function(result) {
                        if (!result) {
                            res.status(200).json({ message: "Commentaire supprimé !" });
                        } else {
                            return res.status(400).json({ error: 'Une erreur est survenue !' });
                        }
                    });
                }
            });
        }
    });
}