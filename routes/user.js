const express = require('express');
const { getUser, createUser, authenticate, getUserById, refreshToken } = require('../controllers/user');
const authService = require('../services/auth');


const router = express.Router();

router.get('/', authService.authrize, getUser);
router.get('/:id', authService.authrize, getUserById);
router.post('/login', authenticate);
router.post('/signup', createUser);
router.post('/refresh-token', authService.authrize, refreshToken);

module.exports = router;