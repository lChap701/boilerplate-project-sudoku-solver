/**
 * Module for solvung Sudoku puzzles
 * @module ./controllers/sudoku-solver
 *
 */
class SudokuSolver {
  /**
   * Make sure the puzzle can be solved
   * @param {String} puzzleString   Represents the entire puzzle
   *
   */
  validate(puzzleString) {}

  /**
   * Checks if the value entered is in the puzzle at the specified row and column
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the specified row (A - I)
   * @param {Number} column         Represents the specified column (1 - 9)
   * @param {Number} value          Represents the value to look for
   *
   */
  checkRowPlacement(puzzleString, row, column, value) {}

  /**
   * Checks if the value entered is in the puzzle at the specified row and column
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the specified row (A - I)
   * @param {Number} column         Represents the specified column (1 - 9)
   * @param {Number} value          Represents the value to look for
   *
   */
  checkColPlacement(puzzleString, row, column, value) {}

  /**
   * Checks if the value entered is in the puzzle at the specified row and column
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the specified row (A - I)
   * @param {Number} column         Represents the specified column (1 - 9)
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
