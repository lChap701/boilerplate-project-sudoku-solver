const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const puzzleObj = require("../controllers/puzzle-strings");
let puzzles = puzzleObj.puzzlesAndSolutions;

suite("UnitTests", () => {
  /* My Tests */
  suite("Puzzle String Tests", () => {
    test("1)  Valid Length Test", () => {
      const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)][0];
      const MESSAGE = solver.validate(puzzle);
      assert.equal(
        MESSAGE,
        "valid",
        `'valid' should have been returned, not '${MESSAGE}'`
      );
    });
  });
});
