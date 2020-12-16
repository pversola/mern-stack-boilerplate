const express = require('express');

const router = express.Router();

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { list, update } = require('../controllers/user');

router.get('/users', list);
router.put('/user/profile', requireSignin, update);
router.put('/admin/profile', requireSignin, adminMiddleware, update);

module.exports = router;
