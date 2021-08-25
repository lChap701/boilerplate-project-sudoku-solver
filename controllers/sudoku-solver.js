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
   * @returns Returns a message that determines if the puzzle contains 81 valid characters
   */
  validate(puzzleString) {
    if (puzzleString === undefined || puzzleString.trim().length === 0)
      return "Required field missing";
    if (puzzleString.trim().length !== 81)
      return "Expected puzzle to be 81 characters long";

    if (!puzzleString.includes(".") || !/[1-9]+/g.test(puzzleString))
      return "Invalid characters in puzzle";

    return "valid";
  }

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   * @returns Returns an object containing message(s) that determine if the user was correct
   */
  checkRowPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return { error: "Required field(s) missing" };
    return { vaild: true };
  }

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   * @returns Returns an object containing message(s) that determine if the user was correct
   */
  checkColPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return { error: "Required field(s) missing" };
    return { vaild: true };
  }

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {Number} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {Number} value          Represents the value to look for
   *
   * @returns Returns an object containing message(s) that determine if the user was correct
   */
  checkRegionPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return { error: "Required field(s) missing" };
    return { vaild: true };
  }

  /**
   * Attempts to solve the puzzle
   * @param {String} puzzleString   Represents the entire puzzle
   *
   * @returns Returns an object containing the solution to the puzzle or an error message
   */
  solve(puzzleString) {
    console.log(puzzleString);
    const message = this.validate(puzzleString);
    console.log(message);

    // Checks if the puzzle contains valid characters
    if (message === "valid") {
      const solution = this.solveSuduko(this.createGrid(puzzleString));

      // Checks if a solution was found
      if (solution) {
        console.log(solution);
        return { solution: solution };
      } else {
        return { error: "Puzzle cannot be solved" };
      }
    } else {
      return { error: message };
    }
  }

  /**
   * Creates a 9x9 grid
   * @param {String} puzzleString   Represents the entire puzzle as a string
   *
   * @returns Returns a 9x9 grid based on the string version of the puzzle
   */
  createGrid(puzzleString) {
    let grid = [];

    for (let row = 0; row < 9; row++) {
      let values = []; // starts a new row of values after each row is finished
      for (let col = 0; col < 9; col++) values.push(puzzleString[col]);
      console.log(values);
      grid.push(values);
    }

    console.log(grid);

    return grid;
  }

  /**
   * Finds the solution for the current puzzle (if it exists)
   * @see Original: {@link https://www.geeksforgeeks.org/sudoku-backtracking-7/}
   *
   * @param {String[]} grid     Represents the entire puzzle
   * @param {Number} row        Represents all rows of the puzzle
   * @param {Number} column     Represents all columns of the puzzle
   *
   * @returns Returns the solution that was found or null when nothing was found
   */
  solveSuduko(grid, row, col) {
    // Ends execution once the last row and col is reached
    if (row == 9 - 1 && col == 9) return grid;

    // Checks if a new row is reached
    if (col == 9) {
      row++;
      col = 0;
    }

    // Checks if the column already has a value
    if (grid[row][col] != ".") return solveSuduko(grid, row, col + 1);

    // Checks if a valid value is used, assigns new values to columns,
    // and determines if the puzzle has been solved
    for (let num = 1; num < 10; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (solveSuduko(grid, row, col + 1)) return grid;
      }

      // Removes assigned value since it is invalid
      grid[row][col] = ".";
    }

    return null;
  }

  /**
   * Checks if current value in the puzzle is "safe" to change
   * @see Original: {@link https://www.geeksforgeeks.org/sudoku-backtracking-7/}
   *
   * @param {String[]} grid     Represents the entire puzzle
   * @param {Number} row        Represents all rows of the puzzle
   * @param {Number} column     Represents all columns of the puzzle
   * @param {Number} num        Represents the number to check for
   *
   * @returns Returns a boolean value to check if the value should be changed
   */
  isSafe(grid, row, col, num) {
    // Checks for the same number in the current region/grid
    for (let i = 0; i < 9; i++) if (grid[row][i] == num) return false;
    for (let i = 0; i < 9; i++) if (grid[i][col] == num) return false;

    // Checks for the same number in the 3x3 grid
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let x = 0; x < 3; x++)
        if (grid[i + startRow][x + startCol] == num) return false;

    return true;
  }
}

module.exports = SudokuSolver;
