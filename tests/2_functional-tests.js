const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

const puzzleObj = require("../controllers/puzzle-strings");
let puzzles = puzzleObj.puzzlesAndSolutions;

chai.use(chaiHttp);

suite("Functional Tests", () => {
  /* My tests */
  suite("Testing /api/check", () => {
    const PATH = "/api/check";
    const PUZZLE =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("1)  All Valid Placements Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "A4",
        value: "2",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "valid",
            "response should have the property 'valid'"
          );

          assert.propertyVal(
            res.body,
            "valid",
            true,
            "response should have the property 'valid' equal to 'true'"
          );
        });
    });

    test("2)  Single Placement Conflict Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "A7",
        value: "2",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "valid",
            "response should have the property 'valid'"
          );

          assert.propertyVal(
            res.body,
            "valid",
            false,
            "response should have the property 'valid' equal to 'false'"
          );

          assert.property(
            res.body,
            "conflict",
            "response should have the property 'conflict'"
          );

          assert.isArray(
            res.body.conflict,
            `${JSON.stringify(res.body.conflict)} sholud be an array`
          );

          assert.equal(
            res.body.conflict[0],
            "region",
            `${JSON.stringify(res.body.conflict)} should contain 'region'`
          );
        });
    });

    test("3)  Multiple Placement Conflicts Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "a1",
        value: "8",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "conflict",
            "response should have the property 'conflict'"
          );

          assert.isArray(
            res.body.conflict,
            `${JSON.stringify(res.body.conflict)} sholud be an array`
          );

          assert.equal(
            res.body.conflict[0],
            "column",
            `${JSON.stringify(res.body.conflict)} should contain 'column'`
          );

          assert.equal(
            res.body.conflict[1],
            "region",
            `${JSON.stringify(res.body.conflict)} should contain 'region'`
          );
        });
    });

    test("4)  All Placement Conflicts Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "h9",
        value: "3",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "conflict",
            "response should have the property 'conflict'"
          );

          assert.isArray(
            res.body.conflict,
            `${JSON.stringify(res.body.conflict)} sholud be an array`
          );

          assert.equal(
            res.body.conflict[0],
            "row",
            `${JSON.stringify(res.body.conflict)} should contain 'row'`
          );

          assert.equal(
            res.body.conflict[1],
            "column",
            `${JSON.stringify(res.body.conflict)} should contain 'column'`
          );

          assert.equal(
            res.body.conflict[2],
            "region",
            `${JSON.stringify(res.body.conflict)} should contain 'region'`
          );
        });
    });

    test("6)  Missing Required Fields Test", () => {
      chai
        .request(server)
        .post(PATH)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");
          assert.property(
            res.body,
            "error",
            "response should have a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Required field(s) missing",
            "response should have a property of 'error' equal to 'Required field(s) missing'"
          );
        });
    });

    test("7)  Invalid Puzzle Characters Test", () => {
      const data = {
        puzzle: ".".repeat(40) + "a" + "1".repeat(40),
        coordinate: "h9",
        value: "3",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");
          assert.property(
            res.body,
            "error",
            "response should have a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Invalid characters in puzzle",
            "response should have a property of 'error' equal to 'Invalid characters in puzzle'"
          );
        });
    });

    test("8)  Invalid Puzzle Length Test", () => {
      const data = {
        puzzle: ".",
        coordinate: "h9",
        value: "3",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");
          assert.property(
            res.body,
            "error",
            "response should have a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Expected puzzle to be 81 characters long",
            "response should have a property of 'error' equal to 'Expected puzzle to be 81 characters long'"
          );
        });
    });

    test("9)  Invalid Coordinates Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "z0",
        value: "3",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");
          assert.property(
            res.body,
            "error",
            "response should have a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Invalid coordinate",
            "response should have a property of 'error' equal to 'Invalid coordinate'"
          );
        });
    });

    test("10)  Invalid Placement Value Test", () => {
      const data = {
        puzzle: PUZZLE,
        coordinate: "h9",
        value: "0",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");
          assert.property(
            res.body,
            "error",
            "response should have a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Invalid value",
            "response should have a property of 'error' equal to 'Invalid value'"
          );
        });
    });
  });

  suite("Testing /api/solve", () => {
    const PATH = "/api/solve";

    test("1)  Solving Valid Puzzle String Test", () => {
      const INDEX = Math.floor(Math.random() * puzzles.length);
      const data = {
        puzzle: puzzles[INDEX][0],
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "solution",
            "response should have the property 'solution'"
          );

          assert.propertyVal(
            res.body,
            "solution",
            puzzles[INDEX][1],
            `response should have the property 'solution' that equals '${puzzles[INDEX][1]}'`
          );
        });
    });

    test("2)  No Puzzle String Test", () => {
      chai
        .request(server)
        .post(PATH)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have the property 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Required field missing",
            "response should have the property 'error' that equals 'Required field missing'"
          );
        });
    });

    test("3)  Puzzle String with Invalid Characters Test", () => {
      const data = {
        puzzle: "a".repeat(79) + "1" + ".",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have the property 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Invalid characters in puzzle",
            "response should have the property 'error' that equals 'Invalid characters in puzzle'"
          );
        });
    });

    test("4)  Puzzle String with Invalid Length Test", () => {
      const data = {
        puzzle: "5",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have the property 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Expected puzzle to be 81 characters long",
            "response should have the property 'error' that equals 'Expected puzzle to be 81 characters long'"
          );
        });
    });

    test("5)  Unsolvable Puzzle String Test", () => {
      const data = {
        puzzle:
          "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have the property 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Puzzle cannot be solved",
            "response should have the property 'error' that equals 'Puzzle cannot be solved'"
          );
        });
    });
  });
});
