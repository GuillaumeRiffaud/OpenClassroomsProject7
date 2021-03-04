const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth.withoutBody, articleCtrl.getAllArticles);
router.get('/:id', auth.withoutBody, articleCtrl.getOneArticle);
router.post('/', multer, auth.withBody, articleCtrl.postNewArticle);
router.put('/:id', multer, auth.withBody, articleCtrl.modifyArticle);
router.delete('/:id', auth.withBody, articleCtrl.deleteArticle);


module.exports = router;