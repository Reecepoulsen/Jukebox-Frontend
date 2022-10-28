import { Router } from 'express';
// const jwt = require('jsonwebtoken');
// const { body } = require('express-validator');
// const { response } = require('express');

// const User = require('../models/user');
import isAuth from '../middleware/is-auth.js';
import { signup, login, connectSpotify, authorizeSpotify, logout } from '../controllers/auth.js';

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/connectSpotify", connectSpotify);

router.get("/authorizeSpotify", authorizeSpotify);

router.put('/logout', isAuth, logout);

export default router;