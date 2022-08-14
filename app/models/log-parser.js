const EventEmitter = require("events");
const { once } = require("events");
const { HTTP_LOG_REGEX } = require("../util/constant");

class LogParser extends EventEmitter {
  #lineNumber = 0; // current line number
  #countedIPAddresses = []; // array of objects with counted IP addresses
  #countedURLs = []; // array of objects with counted URLs
  #failedLines = []; // array of objects with log lines that failed to parse

  constructor() {
    super();
  }

  async startParse(stream) {
    try {
      stream.on("data", this.#parseLineHandler.bind(this)); // parse log by line

      // stream.on("end", () => {
      //   this.emit("end");
      // });
      await once(stream, "end"); // wait for stream to end
    } catch (err) {
      this.emit("error", err);
    }
  }

  /**
   * Parse log line and increment count for URL or IP address.
   * @param {string} line - The line to be parsed.
   */
  #parseLineHandler(line) {
    this.#lineNumber++; // increment line number

    const match = HTTP_LOG_REGEX().LOG.exec(line);
    // if line is not a valid log line, add to failed lines array
    if (!match || !match.groups) {
      this.#failedLines.push({
        line: this.#lineNumber,
        log: line,
        error: "Invalid log line",
      });
      return;
    }

    const { URL, IP } = match.groups;

    this.#countedIPAddresses.push(IP); // Add to counted IP addresses array
    this.#countedURLs.push(URL); // Add to counted URLs array

    this.emit("progress");
  }

  /**
   * Get private properties
   */
  get lineNumber() {
    return this.#lineNumber;
  }
  get countedIPAddresses() {
    return this.#countedIPAddresses;
  }
  get countedURLs() {
    return this.#countedURLs;
  }
  get failedLines() {
    return this.#failedLines;
  }
}

module.exports = {
  LogParser,
};
