"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

/**
 * Module that handles most of the routing
 * @param {*} app   Represents the entire application
 *
 */
module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log(req.body);
    //req.body.puzzle
    //req.body.coordinate.split("")[0]
    //req.body.coordinate.split("")[1]
    //req.body.value
  });

  app.route("/api/solve").post((req, res) => {
    res.json(solver.solve(req.body.puzzle));
  });
};
