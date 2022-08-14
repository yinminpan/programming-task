/* eslint-disable jest/require-hook */
const { readFromFile } = require("./app/util/util.js");
const { LogParser } = require("./app/models/log-parser.js");
const { Analytics } = require("./app/models/analytics.js");

(async () => {
  const stream = readFromFile("./data/programming-task-example-data.log"); // read file from path
  const logEt = new LogParser(); // parse log
  await logEt.startParse(stream); // start parsing
  const analytics = new Analytics(logEt); // get analytics results

  // Display results in console
  console.log(`------------------------------------------------------`);
  console.log(`The number of unique IP addresses`);
  console.log(`\t${analytics.getNumberOfUniqueIPAddresses()}`);

  console.log(`------------------------------------------------------`);
  console.log("The top 3 most visited URLs");
  for (const item of analytics.getTopThreeMostVisitedUrls()) {
    console.log(`\t${item.URL}\t[${item.count} visit(s)]`);
  }

  console.log(`------------------------------------------------------`);
  console.log("The top 3 most active IP addresses");
  for (const item of analytics.getTopThreeMostActiveIPAddresses()) {
    console.log(`\t${item.IP}\t[${item.count} request(s)]`);
  }
  console.log(`------------------------------------------------------`);
})();
