const express = require("express");
const morgan = require("morgan");

// Set app
const app = express();

// Set data json
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// 2 handler
const itemRouter = require("./routes/itemRoutes");
// 3 routers
app.use("/item", itemRouter);

// 4 server
module.exports = app;
