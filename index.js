// Declaring Variables
const express = require("express");
const bodyParser = require("body-parser");
// These are now route imports, not database imports!
const users = require("./Routes/users");
const company = require("./Routes/company");
// Getting error handler
const error = require("./Utilities/error");
// Declaring port and app method
const app = express();
const port = 3000;
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// Logging Middleware
 app.use((req, res, next) => {
   const time = new Date();

   console.log(`-----
     ${time.toLocaleTimeString()}: Received a ${req.method} request to ${
     req.url
   }.`);
   if (Object.keys(req.body).length > 0) {
     console.log("Containing the data:");
     console.log(`${JSON.stringify(req.body)}`);
   }
   next();
 });
// Use our Routes
   app.use("/api/users", users);
   app.use("/api/company", company);
// Landing route for get 
app.get("/", (req, res) => {
  res.send(
    "Welcome to Thugs Inc. a new startup company who is going to change the game... "
  );
});
// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});
// Error-handling middleware.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});
// Port Listener
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
