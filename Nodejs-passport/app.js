const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport"); // v0.5
// Set app
const app = express();

// Set cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["passport"],
    // maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const passportStrategy = require("./public/middleware/passport");
// 2 handler
const authRouter = require("./routes/authRoutes");
// 3 routers
app.use("/auth", authRouter);

// 4 server
module.exports = app;
