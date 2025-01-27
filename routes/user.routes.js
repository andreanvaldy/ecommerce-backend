const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/Register', userController.register);
router.post('/Login', userController.login);

module.exports = router;
