import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URL,
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
      console.log("profile:", profile)
  return done(null, {email:profile.emails[0].value, fullName: profile.displayName, avatar: profile.photos[0].value});
}));

export default passport;
