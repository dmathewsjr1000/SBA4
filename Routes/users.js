// Declaring Variables and requring Express

const express = require("express");
const router = express.Router();

const users = require("../Data/users");
const error = require("../Utilities/error");

// Routing pand and exporting at the end of the file

router
    .route("/")
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res, next) => {
        if (req.body.name && req.body.username && req.body.email) {
            if (users.find((u) => u.username == req.body.username)) {
                next(error(409, "Username Already Taken"));
            }

            const user = {
                id: users[users.length - 1].id + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
            };

            users.push(user);
            res.json(users[users.length - 1]);
        }else next(error(400, "Insufficient Data"));
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