// Declaring Variables and requring Express
const express = require("express");
const router = express.Router();
// Get Data from Dummy Database and Error handler
const company = require("../Data/company");
const error = require("../Utilities/error");
// Routing paths plus CRUD operations on request and exporting at the end of the file
router
  .route("/")
  .get((req, res) => {
    res.json(company);
  })
  .post((req, res, next) => {
    if (req.body.employeeid && req.body.jobtitle) {
      if (
        company.find(
          (c) =>
            c.employeeid &&
            c.jobtitle == req.body.employeeid &&
            req.body.jobtitle
        )
      ) {
        next(error(409, "The position has been filled"));
      }

      const companys = {
        id: company[companys.length - 1].id + 1,
        employeeid: req.body.employeeid,
        companyname: req.body.companyname,
        dept: req.body.dept,
        jobtitle: req.body.jobtitle,
        role: req.body.role,
      };

      company.push(companys);
      res.json(company[company.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const companys = company.find((p) => p.id == req.params.id);
    if (companys) res.json(companys);
    else next();
  })
  .patch((req, res, next) => {
    const companys = company.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          company[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (companys) res.json(companys);
    else next();
  })
  .delete((req, res, next) => {
    const companys = company.find((p, i) => {
      if (p.id == req.params.id) {
        company.splice(i, 1);
        return true;
      }
    });

    if (companys) res.json(companys);
    else next();
  });

module.exports = router;
