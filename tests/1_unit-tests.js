const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const puzzleObj = require("../controllers/puzzle-strings");
let puzzles = puzzleObj.puzzlesAndSolutions;

suite("UnitTests", () => {
  /* My Tests */
  suite("Validate Puzzle String Tests", () => {
    test("1)  Valid Length Test", () => {
      const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)][0];
      const MESSAGE = solver.validate(puzzle);
      assert.equal(
        MESSAGE,
        "valid",
        `'valid' should have been returned, not '${MESSAGE}'`
      );
    });

    test("2)  Invalid Characters Test", () => {
      const PUZZLE = "a".repeat(80) + ".";
      const MESSAGE = solver.validate(PUZZLE);
      assert.equal(
        MESSAGE,
        "Invalid characters in puzzle",
        `'Invalid characters in puzzle' should have been returned, not '${MESSAGE}'`
      );
    });

    test("3)  Invalid Length Test", () => {
      const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)][1][0];
      const MESSAGE = solver.validate(puzzle);
      assert.equal(
        MESSAGE,
        "Expected puzzle to be 81 characters long",
        `'Expected puzzle to be 81 characters long' should have been returned, not '${MESSAGE}'`
      );
    });
  });

  suite("Row Placement Tests", () => {
    const PUZZLE =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("1)  Valid Row Placement Test", () => {
      const RES = solver.checkRowPlacement(PUZZLE, "A", 1, "7");
      assert.equal(RES, true, `'true' should have been returned, not '${RES}'`);
    });

    test("2)  Invalid Row Placement Test", () => {
      const RES = solver.checkRowPlacement(PUZZLE, "Z", 1, "5");
      assert.equal(
        RES,
        "Invalid coordinate",
        `'Invalid coordinate' should have been returned, not '${RES}'`
      );
    });
  });

  suite("Column Placement Tests", () => {
    const PUZZLE =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("1)  Valid Column Placement Test", () => {
      const RES = solver.checkColPlacement(PUZZLE, "B", 3, "1");
      assert.equal(RES, true, `'true' should have been returned, not '${RES}'`);
    });

    test("2)  Invalid Column Placement Test", () => {
      const RES = solver.checkColPlacement(PUZZLE, "B", 0, "9");
      assert.equal(
        RES,
        "Invalid coordinate",
        `'Invalid coordinate' should have been returned, not '${RES}'`
      );
    });
  });

  suite("Region Placement Tests", () => {
    const PUZZLE =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("1)  Valid Region Placement Test", () => {
      const RES = solver.checkRegionPlacement(PUZZLE, "A", 3, "9");
      assert.equal(RES, true, `'true' should have been returned, not '${RES}'`);
    });

    test("2)  Invalid Region Placement Test", () => {
      const RES = solver.checkRegionPlacement(PUZZLE, "A", 1, "9");
      assert.equal(
        RES,
        false,
        `'false' should have been returned, not '${RES}'`
      );
    });
  });

  suite("Solve Puzzle Tests", () => {
    test("1)  Valid Puzzles Tests", () => {
      puzzles.forEach((puzzle) => {
        let message = solver.solve(puzzle[1]);
        assert.property(
          message,
          "solution",
          `${JSON.stringify(message)} should have a property of 'solution'`
        );
      });
    });

    test("2)  Invalid Puzzles Tests", () => {
      let puzzle =
        "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let message = solver.solve(puzzle);
      assert.property(
        message,
        "error",
        `${JSON.stringify(message)} should have a property of 'error'`
      );

      assert.propertyVal(
        message,
        "error",
        "Puzzle cannot be solved",
        `${JSON.stringify(
          message
        )} should have a property of 'error' equal to 'Puzzle cannot be solved'`
      );
    });

    test("3)  Solvable Puzzles Tests", () => {
      puzzles.forEach((puzzle) => {
        let message = solver.solve(puzzle[0]);
        assert.property(
          message,
          "solution",
          `${JSON.stringify(message)} should have a property of 'solution'`
        );

        assert.propertyVal(
          message,
          "solution",
          puzzle[1],
          `${JSON.stringify(
            message
          )} should have a property of 'solution' that equals ${JSON.stringify(
            puzzle[1]
          )}`
        );
      });
    });
  });
});
