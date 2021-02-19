const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup, userCtrl.login);
router.post('/login', userCtrl.login);
router.put('/modify', auth, userCtrl.modify);
router.delete('/delete', auth, userCtrl.delete);

module.exports = router;