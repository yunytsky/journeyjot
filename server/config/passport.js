import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
      scope: ["profile", "email"]
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({googleId: profile.id}).then((user) => {
        if (user) {
          return done(null, user);
        }else{
          new User({googleId: profile.id, username: profile.displayName}).save().then(newUser => {
            return done(null, newUser);
          })
        }
      })
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log('serialize user')
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  console.log(userId)
  User.findById(userId).then((user) => {
    done(null, user);
  })
});
