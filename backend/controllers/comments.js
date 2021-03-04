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