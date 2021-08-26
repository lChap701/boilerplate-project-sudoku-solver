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
    let conflicts = [];

    // Gets the data that was submitted
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
      return;
    }

    if (coordinate.length != 2) {
      res.json({ error: "Invalid coordinate" });
      return;
    }

    let row = coordinate.split("")[0];
    let col = coordinate.split("")[1];

    // Validates the data and stores the result
    let puzzleChkRes = solver.validate(puzzle);
    let rowChkRes = solver.checkRowPlacement(puzzle, row, parseInt(col), value);
    let colChkRes = solver.checkColPlacement(puzzle, row, parseInt(col), value);
    let regChkRes = solver.checkRegionPlacement(
      puzzle,
      row,
      parseInt(col),
      value
    );

    // Checks the results of the puzzle validation
    if (puzzleChkRes !== "valid") {
      res.json({ error: puzzleChkRes });
      return;
    }

    // Checks the results of the row validation
    if (typeof rowChkRes === "string") {
      res.json({ error: rowChkRes });
      return;
    } else if (!rowChkRes) {
      conflicts.push("row");
    }

    // Checks the results of the column validation
    if (typeof colChkRes === "string") {
      res.json({ error: colChkRes });
      return;
    } else if (!colChkRes) {
      conflicts.push("column");
    }

    // Checks the results of the region validation
    if (typeof regChkRes === "string") {
      res.json({ error: regChkRes });
      return;
    } else if (!regChkRes) {
      conflicts.push("region");
    }

    // Checks if any conflicts were found during validation
    if (conflicts.length > 0) {
      res.json({ valid: false, conflict: conflicts });
    } else {
      res.json({ valid: true });
    }
  });

  app.route("/api/solve").post((req, res) => {
    res.json(solver.solve(req.body.puzzle));
  });
};
