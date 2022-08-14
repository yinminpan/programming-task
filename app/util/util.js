const fs = require("fs");
const EventEmitter = require("events");
const readline = require("readline");

/**
 * Reads a stream of log lines and returns a stream of stats.
 * @param {string} filePath - The path to the log file.
 * @returns {EventEmitter} - A stream of stats.
 */
function readFromFile(filePath) {
  const et = new EventEmitter(); // create event emitter
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }
    const readableStream = fs.createReadStream(filePath); // create readable stream
    const rl = readline.createInterface(readableStream); // create readline interface

    rl.on("line", (input) => {
      et.emit("data", input);
    });
    rl.on("close", () => {
      readableStream.close();
      et.emit("end");
    });
    // await once(rl, "close");
    return et;
  } catch (err) {
    et.emit("error", err);
    return et;
  }
}

/**
 * Group array elements by key.
 * @param {array} array - The array to be grouped.
 * @param {string} key - The key to group by.
 * @returns {array} - The grouped array.
 */
function groupArrayByKey(array, key) {
  return array.reduce((obj, arr) => {
    const count = obj[arr]?.count || 0; // get count from object or set to 0

    // add to object
    return Object.assign(obj, {
      [arr]: { [key]: arr, count: count + 1 },
    });
  }, {});
}

module.exports = {
  readFromFile,
  groupArrayByKey,
};
