const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const Passport_Google = require("../../models/passportGoogleModel");
const Passport_Github = require("../../models/passportGithubModel");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.LOGIN_GOOGLE_CLIENT_ID,
      clientSecret: process.env.LOGIN_GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, callback) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        image: profile.photos[0].value,
      };
      try {
        let user = await Passport_Google.findOne({ googleId: profile.id });

        if (user) {
          callback(null, profile);
        } else {
          user = await Passport_Google.create(newUser);
          callback(null, profile);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.LOGIN_GITHUB_CLIENT_ID,
      clientSecret: process.env.LOGIN_GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, callback) => {
      const newUser = {
        id: profile.id,
        nodeId: profile.nodeId,
        username: profile.username,
        profileUrl: profile.profileUrl,
        image: profile.photos[0].value,
      };
      try {
        let user = await Passport_Github.findOne({ googleId: profile.id });

        if (user) {
          callback(null, profile);
        } else {
          user = await Passport_Github.create(newUser);
          callback(null, profile);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
