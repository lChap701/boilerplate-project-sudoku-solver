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

    if (!/^[1-9.]+$/g.test(puzzleString)) return "Invalid characters in puzzle";

    return "valid";
  }

  /**
   * Checks if the value entered is in the puzzle at the row of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {String} value          Represents the value to look for
   *
   * @returns Returns a message or boolean value that determines if the user was correct
   */
  checkRowPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return "Required field(s) missing";
    if (
      parseInt(value) < 1 ||
      parseInt(value) > 9 ||
      typeof parseInt(value) === NaN
    )
      return "Invalid value";

    let rowNum = this.rowAsNum(row.toLocaleUpperCase());
    console.log(rowNum);

    if (rowNum < 0 || typeof column !== Number || column <= 0)
      return "Invalid coordinate";

    let grid = this.createGrid(puzzleString);

    for (let i = column - 1; i < 9; i++)
      if (grid[rowNum][i] == parseInt(value)) return true;

    return false;
  }

  /**
   * Checks if the value entered is in the puzzle at the column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {String} value          Represents the value to look for
   *
   * @returns Returns a message or boolean value that determines if the user was correct
   */
  checkColPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return "Required field(s) missing";
    if (
      parseInt(value) < 1 ||
      parseInt(value) > 9 ||
      typeof parseInt(value) === NaN
    )
      return "Invalid value";

    let rowNum = this.rowAsNum(row.toLocaleUpperCase());
    console.log(rowNum);

    if (rowNum < 0 || typeof column !== Number || column <= 0)
      return "Invalid coordinate";

    let grid = this.createGrid(puzzleString);

    for (let i = rowNum; i < 9; i++)
      if (grid[i][column - 1] == parseInt(value)) return true;

    return false;
  }

  /**
   * Checks if the value entered is in the puzzle at the row and column of the specified region
   * @param {String} puzzleString   Represents the entire puzzle
   * @param {String} row            Represents the row of the specified region
   * @param {Number} column         Represents the column of the specified region
   * @param {String} value          Represents the value to look for
   *
   * @returns Returns a message or boolean value that determines if the user was correct
   */
  checkRegionPlacement(puzzleString, row, column, value) {
    if (value.trim().length == 0) return "Required field(s) missing";

    if (
      parseInt(value) < 1 ||
      parseInt(value) > 9 ||
      typeof parseInt(value) === NaN
    )
      return "Invalid value";

    let rowNum = this.rowAsNum(row.toLocaleUpperCase());
    console.log(rowNum);

    if (rowNum < 0 || typeof column !== Number || column <= 0)
      return "Invalid coordinate";

    let grid = this.createGrid(puzzleString);
    let checkRow = rowNum - (rowNum % 3);
    let col = column - 1;
    let checkCol = col - (col % 3);
    console.log(checkRow);
    console.log(checkCol);

    for (let i = checkRow; i < 3; i++)
      for (let x = checkRow; x < 3; x++)
        if (grid[i][x] == parseInt(value)) return true;

    return false;
  }

  /**
   * Converts the row (as a letter) to a number
   * @param {String} letter   Represents the row as a letter
   *
   * @returns Returns the row number or an error message
   */
  rowAsNum(letter) {
    switch (letter) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
      case "I":
        return 8;
      default:
        return -1;
    }
  }

  /**
   * Attempts to solve the puzzle
   * @param {String} puzzleString   Represents the entire puzzle
   *
   * @returns Returns an object containing the solution to the puzzle or an error message
   */
  solve(puzzleString) {
    const message = this.validate(puzzleString);

    // Checks if the puzzle contains valid characters
    if (message === "valid") {
      let grid = this.createGrid(puzzleString);
      let solution = this.solveSuduko(grid);

      // Checks if a solution was found
      if (solution) {
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
   * @see {@link https://www.youtube.com/watch?v=6XDcvG2ZCRc}
   *
   * @param {String} puzzleString   Represents the entire puzzle as a string
   *
   * @returns Returns a 9x9 grid based on the string version of the puzzle
   */
  createGrid(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let row = -1;
    let col = 0;

    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) row++;
      if (col % 9 == 0) col = 0;

      grid[row][col] = puzzleString[i] === "." ? 0 : parseInt(puzzleString[i]);
      col++;
    }

    return grid;
  }

  /**
   * Converts the grid value back to a string
   * @see {@link https://www.youtube.com/watch?v=6XDcvG2ZCRc}
   *
   * @param {Number[]} grid   Represents the grid to convert
   *
   * @returns Returns a string version of the grid
   */
  gridToString(grid) {
    return grid.flat().join("");
  }

  /**
   * Finds the solution for the current puzzle (if it exists)
   * @see Original: {@link https://www.geeksforgeeks.org/sudoku-backtracking-7/}
   *
   * @param {Number[]} grid     Represents the entire puzzle
   * @param {Number} row        Represents all rows of the puzzle
   * @param {Number} col        Represents all columns of the puzzle
   *
   * @returns Returns the solution that was found or null when nothing was found
   */
  solveSuduko(grid, row = 0, col = 0) {
    // Ends execution once the last row and col is reached
    if (row == 9 - 1 && col == 9) return this.gridToString(grid);

    // Checks if a new row is reached
    if (col == 9) {
      row++;
      col = 0;
    }

    // Checks if the column already has a value
    if (grid[row][col] != 0) return this.solveSuduko(grid, row, col + 1);

    // Checks if a valid value is used, assigns new values to columns,
    // and determines if the puzzle has been solved
    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.solveSuduko(grid, row, col + 1))
          return this.gridToString(grid);
      }

      // Removes assigned value since it is invalid
      grid[row][col] = 0;
    }

    return false;
  }

  /**
   * Checks if current value in the puzzle is "safe" to change
   * @see Original: {@link https://www.geeksforgeeks.org/sudoku-backtracking-7/}
   *
   * @param {Number[]} grid     Represents the entire puzzle
   * @param {Number} row        Represents all rows of the puzzle
   * @param {Number} col        Represents all columns of the puzzle
   * @param {Number} num        Represents the number to check for
   *
   * @returns Returns a boolean value to check if the value should be changed
   */
  isSafe(grid, row, col, num) {
    // Checks for the same number in the current region/grid
    for (let i = 0; i <= 8; i++) if (grid[row][i] == num) return false;
    for (let i = 0; i <= 8; i++) if (grid[i][col] == num) return false;

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
