const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Set app
const app = express();

//1 Middleware
// Set security HTTP headers
app.use(helmet());
// Set cors
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// 2 handler
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const bookRouter = require("./routes/bookRoutes");
const imageLocalRouter = require("./routes/imageLocalRoutes");
const imageGoogleRouter = require("./routes/imageGoogleRoutes");
// 3 routers
app.use("/api/auths", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/books", bookRouter);
app.use("/api/imageLocals", imageLocalRouter);
app.use("/api/imageGoogles", imageGoogleRouter);

// 4 server
module.exports = app;
