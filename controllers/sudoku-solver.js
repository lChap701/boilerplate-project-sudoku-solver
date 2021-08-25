/**
 * Module for solvung Sudoku puzzles
 * @module ./controllers/sudoku-solver
 *
 */
class SudokuSolver {
  /**
   * Make sure the puzzle has 81 valid characters
   * @param {String} puzzleString   Represents the entire puzzle
   *
   */
  validate(puzzleString) {}

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   */
  checkRowPlacement(puzzleString, row, column, value) {}

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   */
  checkColPlacement(puzzleString, row, column, value) {}

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   */
  checkRegionPlacement(puzzleString, row, column, value) {}

  /**
   * Solves the puzzle
   * @param {String} puzzleString   Represents the entire puzzle
   *
   */
  solve(puzzleString) {}
}

module.exports = SudokuSolver;
