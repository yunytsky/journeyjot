import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import "../config/passport.js";
import { logout, returnUser } from "../controllers/auth.js";

dotenv.config();
const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: `${process.env.FE_DOMAIN}/journeys`,
        failureRedirect: `${process.env.FE_DOMAIN}/auth/error`
    })
);

router.get('/success', returnUser);

router.get('/logout', logout);

export default router;