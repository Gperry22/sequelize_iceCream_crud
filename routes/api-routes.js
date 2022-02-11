// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const router = require("express").Router();
// Requiring our models
var db = require("../models");
const middleware = require("../middleware/apiRouteTest");
const colors = require("colors");

// Routes
// =============================================================

// GET route for getting all of the IceCreams
router.get("/api/iceCreams", middleware, function (req, res) {
  // findAll returns all entries for a table when used with no options

  db.IceCream.findAll({}).then(function (dbIceCream) {
    console.log(
      `Step 3: Leaving the database and return to the promise for the ${req.method} Method on the ${req.path} Route`
        .blue
    );

    // We have access to the IceCreams as an argument inside of the callback function
    res.json(dbIceCream);
  });
});

// POST route for saving a new IceCream
router.post("/api/IceCreams", middleware, function (req, res) {
  console.log(`The information you sent from the Client req is`.green);
  console.log(req.body);
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property
  db.IceCream.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  }).then(function (dbIceCream) {
    console.log(
      `Step 3: Leaving the database and return to the promise for the ${req.method} Method on the ${req.path} Route`
        .blue
    );

    // We have access to the new IceCream as an argument inside of the callback function
    res.json(dbIceCream);
  });
});

// DELETE route for deleting IceCreams. We can get the id of the IceCream to be deleted from
// req.params.id
router.delete("/api/delete/:id", middleware, function (req, res) {
  // We just have to specify which IceCream we want to destroy with "where"

  console.log(req.params.id);
  db.IceCream.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbIceCream) {
    console.log(
      `Step 3: Leaving the database and return to the promise for the ${req.method} Method on the ${req.path} Route`
        .blue
    );

    res.json(dbIceCream);
  });
});

// PUT route for updating IceCreams. We can get the updated IceCream data from req.body
router.put("/api/IceCreams/:id", middleware, function (req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update

  db.IceCream.update(
    {
      price: req.body.price,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(function (dbIceCream) {
    console.log(
      `Step 3: Leaving the database and return to the promise for the ${req.method} Method on the ${req.path} Route`
        .blue
    );

    res.json(dbIceCream);
  });
});

module.exports = router;
