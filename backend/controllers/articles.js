const Article = require('../models/Article');
const fs = require('fs');

exports.getAllArticles = (req, res, next) => {
    Article.find(function(result) {
        if (!result) {
            return res.status(404).json({ error });
        } else {
            return res.status(200).json({ result });
        }
    });
}

exports.getOneArticle = (req, res, next) => {
    Article.findOne(req.params.id, function(result) {
        if (!result) {
            return res.status(404).json({ error });
        } else {
            return res.status(200).json({ result });
        }
    });
}

exports.postNewArticle = (req, res, next) => {
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
    const articleObject = req.file ? {
        ...req.body,
        imageUrl: `images/${req.file.filename}`
    } : {...req.body };
    Article.updateOne(articleObject, function(result) {
        if (!result) {
            return res.status(201).json({ message: 'Article modifié !' })
        } else {
            return res.status(400).json({ error: result });
        }
    });
}