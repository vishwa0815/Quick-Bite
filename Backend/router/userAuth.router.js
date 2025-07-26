const express = require('express');
const { register, login, logout, getprofile } = require('../controllers/userAuth.controller');
const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.get('/profile',getprofile);


module.exports = authRouter;