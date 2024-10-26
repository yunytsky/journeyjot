import express from "express";
import passport from "passport";
import "../config/passport.js";
import { logout, returnUser } from "../controllers/auth.js";

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:5173/journeys',
        failureRedirect: 'http://localhost:5173/auth/error'
    })
);

router.get('/success', returnUser);

router.get('/logout', logout);

export default router;