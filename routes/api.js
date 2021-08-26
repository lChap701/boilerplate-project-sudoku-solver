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
    let msgSent = false;

    // Gets the data that was submitted
    let puzzle = req.body.puzzle;
    let row = req.body.coordinate.split("")[0];
    let col = req.body.coordinate.split("")[1];
    col = col == undefined || col == "" ? -1 : parseInt(col);
    let value = req.body.value;

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
      msgSent = true;
    }

    // Checks the results of the row validation
    if (typeof rowChkRes === "string" && !msgSent) {
      res.json({ error: rowChkRes });
      msgSent = true;
    } else if (!rowChkRes && !msgSent) {
      conflicts.push("row");
    }

    // Checks the results of the column validation
    if (typeof colChkRes === "string" && !msgSent) {
      res.json({ error: colChkRes });
      msgSent = true;
    } else if (!colChkRes && !msgSent) {
      conflicts.push("column");
    }

    // Checks the results of the region validation
    if (typeof regChkRes === "string" && !msgSent) {
      res.json({ error: regChkRes });
      msgSent = true;
    } else if (!regChkRes && !msgSent) {
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
