const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/:id', auth.withoutBody, commentCtrl.getAllComments);
router.post('/', auth.withBody, commentCtrl.postNewComment);
router.put('/:id', auth.withoutBody, commentCtrl.modifyComment);
router.delete('/:id', auth.withoutBody, commentCtrl.deleteComment);


module.exports = router;