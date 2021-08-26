const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

const puzzleObj = require("../controllers/puzzle-strings");
let puzzles = puzzleObj.puzzlesAndSolutions;

chai.use(chaiHttp);

suite("Functional Tests", () => {
  /* My tests */
  //suite("Testing /api/check");

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
