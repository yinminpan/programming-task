const EventEmitter = require("events");
const { LogParser } = require("../log-parser.js");
const { readFromFile } = require("../../util/util.js");

describe("logParser", () => {
  it("should read and parse log line from stream data and store in correct properties", async () => {
    expect.assertions(6);

    const stream = readFromFile(
      "./app/models/__tests__/mock-data/mock-data-nobug.log"
    );
    const logParser = new LogParser();
    await logParser.startParse(stream);

    expect(logParser.lineNumber).toBe(23);
    expect(logParser.countedIPAddresses).toHaveLength(23);
    expect(logParser.countedIPAddresses).toStrictEqual([
      "177.71.128.21",
      "168.41.191.40",
      "168.41.191.41",
      "168.41.191.40",
      "177.71.128.21",
      "168.41.191.9",
      "168.41.191.40",
      "168.41.191.34",
      "177.71.128.21",
      "50.112.00.28",
      "50.112.00.11",
      "72.44.32.11",
      "72.44.32.10",
      "168.41.191.9",
      "168.41.191.43",
      "168.41.191.43",
      "168.41.191.40",
      "168.41.191.34",
      "72.44.32.10",
      "79.125.00.21",
      "50.112.00.11",
      "72.44.32.10",
      "50.112.00.11",
    ]);
    expect(logParser.countedURLs).toHaveLength(23);
    expect(logParser.countedURLs).toStrictEqual([
      "/intranet-analytics/",
      "/faq/",
      "/this/page/does/not/exist/",
      "/blog/category/meta/",
      "/blog/2018/08/survey-your-opinion-matters/",
      "/docs/manage-users/",
      "/blog/category/community/",
      "/faq/",
      "/docs/manage-websites/",
      "/faq/how-to-install/",
      "/asset.js",
      "/to-an-error",
      "/",
      "/docs/",
      "/moved-permanently",
      "/temp-redirect",
      "/docs/manage-websites/",
      "/faq/how-to/",
      "/translations/",
      "/newsletter/",
      "/hosting/",
      "/download/counter/",
      "/asset.css",
    ]);
    expect(logParser.failedLines).toHaveLength(0);
  });

  it("should record failed lines when either log line, URL or IP address is not valid", async () => {
    expect.assertions(6);

    const stream = readFromFile(
      "./app/models/__tests__/mock-data/mock-data-bug.log"
    );
    const logParser = new LogParser();
    await logParser.startParse(stream);

    expect(logParser.lineNumber).toBe(27);
    expect(logParser.countedIPAddresses).toHaveLength(23);
    expect(logParser.countedIPAddresses).toStrictEqual([
      "177.71.128.21",
      "168.41.191.40",
      "168.41.191.41",
      "168.41.191.40",
      "177.71.128.21",
      "168.41.191.9",
      "168.41.191.40",
      "168.41.191.34",
      "177.71.128.21",
      "50.112.00.28",
      "50.112.00.11",
      "72.44.32.11",
      "72.44.32.10",
      "168.41.191.9",
      "168.41.191.43",
      "168.41.191.43",
      "168.41.191.40",
      "168.41.191.34",
      "72.44.32.10",
      "79.125.00.21",
      "50.112.00.11",
      "72.44.32.10",
      "50.112.00.11",
    ]);
    expect(logParser.countedURLs).toHaveLength(23);
    expect(logParser.countedURLs).toStrictEqual([
      "/intranet-analytics/",
      "/faq/",
      "/this/page/does/not/exist/",
      "/blog/category/meta/",
      "/blog/2018/08/survey-your-opinion-matters/",
      "/docs/manage-users/",
      "/blog/category/community/",
      "/faq/",
      "/docs/manage-websites/",
      "/faq/how-to-install/",
      "/asset.js",
      "/to-an-error",
      "/",
      "/docs/",
      "/moved-permanently",
      "/temp-redirect",
      "/docs/manage-websites/",
      "/faq/how-to/",
      "/translations/",
      "/newsletter/",
      "/hosting/",
      "/download/counter/",
      "/asset.css",
    ]);
    expect(logParser.failedLines).toHaveLength(4);
  });

  it("should not emit a progress event for failed lines", async () => {
    expect.assertions(0);

    const stream = readFromFile(
      "./app/models/__tests__/mock-data/mock-data-bug.log"
    );
    const logParser = new LogParser();
    await logParser.startParse(stream);

    let count = 0;
    logParser.on("progress", () => count++);
    logParser.on("end", () => expect(count).toBe(23));
  });
  it("should not emit an error event for invalid stream input", async () => {
    expect.assertions(1);

    const etEmit = jest.fn();
    jest
      .spyOn(EventEmitter.prototype, "emit")
      .mockImplementation((event, input) => {
        input = "error message";
        if (event === "error") {
          etEmit("error", input);
        }
      });

    const logParser = new LogParser("");
    await logParser.startParse();
    expect(etEmit).toHaveBeenCalledWith("error", "error message");
  });
});
