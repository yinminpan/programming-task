const EventEmitter = require("events");
const readline = require("readline");
const { readFromFile, groupArrayByKey } = require("../util");

describe("readFromFile", () => {
  let rl;
  let etEmit;

  beforeAll(() => {
    rl = jest.fn();
    etEmit = jest.fn();

    jest.spyOn(readline, "createInterface").mockImplementation(() => {
      return {
        on: (event, cb) => {
          if (event === "line") {
            rl("line");
            etEmit("data", "text");
          }
          if (event === "close") {
            rl("close");
            etEmit("end");
          }
          cb(() => {});
        },
      };
    });

    jest
      .spyOn(EventEmitter.prototype, "emit")
      .mockImplementation((event, input) => {
        if (event === "data") {
          input = "text";
          etEmit("data", input);
        }
        if (event === "end") {
          etEmit("end");
        }
        if (event === "error") {
          input = "error message";
          etEmit("error", input);
        }
      });
  });

  it("should read log file and add log line to data event", () => {
    expect.assertions(5);

    readFromFile("./data/programming-task-example-data.log");
    expect(rl).toHaveBeenCalledTimes(2);
    expect(rl).toHaveBeenCalledWith("line");
    expect(rl).toHaveBeenCalledWith("close");
    expect(etEmit).toHaveBeenCalledWith("data", "text");
    expect(etEmit).toHaveBeenCalledWith("end");
  });

  it("should throw an error and add to erro event when reading invalid file", () => {
    expect.assertions(1);

    readFromFile("./invalide-path.log");
    expect(etEmit).toHaveBeenCalledWith("error", "error message");
  });
});

describe("groupArrayByKey", () => {
  it("should group array elements by key", () => {
    expect.assertions(1);

    const array = [
      "green",
      "white",
      "white",
      "white",
      "red",
      "black",
      "white",
      "red",
      "black",
      "white",
      "black",
      "red",
    ];
    const result = groupArrayByKey(array, "colour");
    expect(result).toStrictEqual({
      green: { colour: "green", count: 1 },
      white: { colour: "white", count: 5 },
      red: { colour: "red", count: 3 },
      black: { colour: "black", count: 3 },
    });
  });
});
