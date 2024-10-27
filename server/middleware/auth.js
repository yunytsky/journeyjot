import passport from "passport";
import "../config/passport.js";
export const isAuthenticated = (req, res, next) => {
    req.user ? next() : res.status(401).json({ error: true, message: "Unauthorized" });
}


