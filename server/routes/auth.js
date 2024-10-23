import express from "express";
import passport from "passport";
import "../auth/auth.js";

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:5173',
        failureRedirect: 'http://localhost:5173/auth/error'
    })
);


export default router;