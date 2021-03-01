const Article = require('../models/Article');

exports.getAllArticles = (req, res, next) => {
    Article.find(function(result) {
        if (!result) {
            return res.status(404).json({ error });
        } else {
            return res.status(200).json({ result });
        }
    })
}