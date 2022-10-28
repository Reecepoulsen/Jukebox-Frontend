import { Router } from 'express';
import isAuth from '../middleware/is-auth.js';
import refSpotify from '../middleware/refSpotify.js';
import { getProfile, getUser } from '../controllers/profile.js';

const router = Router();

router.get("/", isAuth, refSpotify, getProfile);

router.get("/user", isAuth, getUser);

// router.get("/build", isAuth, refSpotify, buildProfile);

export default router;