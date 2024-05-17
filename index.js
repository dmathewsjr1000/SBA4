// Declaring Variables
const express = require("express");
const bodyParser = require("body-parser");

// These are now route imports, not database imports!
const users = require("./Routes/users");
const companys = require("./Routes/company");

const error = require("./Utilities/error");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// app.use((req, res, next) => {
//   const time = new Date();

//   console.log(`-----
//     ${time.toLocaleTimeString()}: Received a ${req.method} request to ${
//     req.url
//   }.`);
//   if (Object.keys(req.body).length > 0) {
//     console.log("Containing the data:");
//     console.log(`${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// Use our Routes
  // app.use("/users", users);
  // app.use("/company", company);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Thugs Inc. a new startup who is going to change the game... "
  );
});

app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
