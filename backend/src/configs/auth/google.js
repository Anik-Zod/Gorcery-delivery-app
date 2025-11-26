import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Get email safely
        const email = profile.emails?.[0]?.value || null;

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            image: profile.photos?.[0]?.value || ""
          });
        }

        return done(null,  user );
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Not required for JWT, but Passport requires them
passport.serializeUser((data, done) => done(null, data));
passport.deserializeUser((data, done) => done(null, data));
