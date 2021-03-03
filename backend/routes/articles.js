const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, articleCtrl.getAllArticles);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.post('/', auth, multer, articleCtrl.postNewArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);


module.exports = router;