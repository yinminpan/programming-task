const { Analytics } = require("../analytics");
const { LogParser } = require("../log-parser");
const { readFromFile } = require("../../util/util");

describe("analytics", () => {
  it("should get correct results", async () => {
    expect.assertions(3);
    const stream = readFromFile(
      "./app/models/__tests__/mock-data/mock-data-nobug.log"
    );
    const logParser = new LogParser();
    await logParser.startParse(stream);
    const analytics = new Analytics(logParser);

    expect(analytics.getNumberOfUniqueIPAddresses()).toBe(11);
    expect(analytics.getTopThreeMostVisitedUrls()).toStrictEqual([
      { URL: "/faq/", count: 2 },
      { URL: "/docs/manage-websites/", count: 2 },
      { URL: "/intranet-analytics/", count: 1 },
    ]);
    expect(analytics.getTopThreeMostActiveIPAddresses()).toStrictEqual([
      { IP: "168.41.191.40", count: 4 },
      { IP: "177.71.128.21", count: 3 },
      { IP: "50.112.00.11", count: 3 },
    ]);
  });

  it("should throw an error when logParser is invalid as input", async () => {
    expect.assertions(1);
    expect(() => {
      new Analytics("");
    }).toThrow("A valid logParser input is required.");
  });
});
