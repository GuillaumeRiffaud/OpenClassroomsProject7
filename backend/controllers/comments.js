const Comment = require('../models/Comment');

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
            if (comment.authorId == req.body.userId) { // on vérifie que l'auteur connu du commentaire soit bien l'initiateur de la requête
                Comment.updateOne(req.params.id, req.body.content, function(result) {
                    if (!result) {
                        return res.status(201).json({ message: 'Commentaire modifié !' })
                    } else {
                        return res.status(400).json({ error: result });
                    }
                });
            } else {
                return res.status(400).json({ error: 'Bad request !' });
            }
        }
    });
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne(req.params.id, function(comment) {
        if (!comment) {
            return res.status(404).json({ error });
        } else {
            if (comment.authorId == req.body.userId) {
                Comment.deleteOne(req.params.id, function(result) {
                    if (!result) {
                        res.status(200).json({ message: "Commentaire supprimé !" });
                    } else {
                        return res.status(400).json({ error: 'Une erreur est survenue !' });
                    }
                })
            } else {
                return res.status(400).json({ error: 'Bad request !' });
            }
        }
    })
}