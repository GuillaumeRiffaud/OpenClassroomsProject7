const jwt = require('jsonwebtoken');


exports.withBody = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        const userId = decodedToken.userId;
        if (!req.body.userId || req.body.userId != userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error || 'Requête non authentifiée !' });
    }
};

exports.withoutBody = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_TOKEN_KEY);
        next();
    } catch (error) {
        res.status(403).json({ error: error || 'Requête non authentifiée !' });
    }
};