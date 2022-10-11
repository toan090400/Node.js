const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "683496945369-g5d5867bakeoq2ujf4ml62llgg1abg7s.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      // console.log(profile);
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
