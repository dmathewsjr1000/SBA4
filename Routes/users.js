// Declaring Variables and requring Express
const express = require("express");
const router = express.Router();
// Get Data from Dummy Database and Error handler
const users = require("../Data/users");
const error = require("../Utilities/error");
// Routing paths plus CRUD operations on request and exporting at the end of the file
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.lastnamename) {
      if (
        users.find(
          (u) => u.name && u.lastname == req.body.name && req.body.lastname
        )
      ) {
        next(error(409, "Name already exist in DB"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        lastname: req.body.lastnamename,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

module.exports = router;
