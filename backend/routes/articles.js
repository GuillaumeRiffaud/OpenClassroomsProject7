const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

router.get('/', auth, articleCtrl.getAllArticles);


module.exports = router;