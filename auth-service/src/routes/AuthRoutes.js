const express = require('express');
const { register, login, validateToken } = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validateToken', validateToken);

module.exports = router;