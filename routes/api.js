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
    let conflicts = [];

    // Gets the data that was submitted
    let puzzle = req.body.puzzle;
    let row = req.body.coordinate.split("")[0];
    let col = req.body.coordinate.split("")[1];
    let value = req.body.value;

    // Validates the data and stores the result
    let rowChkRes = solver.checkRowPlacement(puzzle, row, parseInt(col), value);
    let colChkRes = solver.checkColPlacement(puzzle, row, parseInt(col), value);
    let regChkRes = solver.checkRegionPlacement(
      puzzle,
      row,
      parseInt(col),
      value
    );

    // Checks the results of the row validation
    if (typeof rowChkRes === String) {
      res.json({ error: rowChkRes });
    } else if (!rowChkRes) {
      conflicts.push("row");
    }

    // Checks the results of the column validation
    if (typeof colChkRes === String) {
      res.json({ error: colChkRes });
    } else if (!colChkRes) {
      conflicts.push("column");
    }

    // Checks the results of the region validation
    if (typeof regChkRes === String) {
      res.json({ error: regChkRes });
    } else if (!regChkRes) {
      conflicts.push("region");
    }

    // Checks if any conflicts were found during validation
    if (conflicts.length > 0) res.json({ valid: false, conflict: conflicts });

    res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    res.json(solver.solve(req.body.puzzle));
  });
};
