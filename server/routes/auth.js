import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

export default router;