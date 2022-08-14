const { groupArrayByKey } = require("../util/util");

class Analytics {
  constructor(logParser) {
    if (!logParser) {
      throw new Error("A valid logParser input is required.");
    }

    this.IPAddressesByGroup = groupArrayByKey(
      logParser.countedIPAddresses,
      "IP"
    ); // array of objects with counted IP addresses
    this.URLsByGroup = groupArrayByKey(logParser.countedURLs, "URL"); // array of objects with counted URLs
  }

  /**
   * Get number of unique IP addresses.
   * @return {number} - The number of unique IP addresses.
   */
  getNumberOfUniqueIPAddresses() {
    return Object.keys(this.IPAddressesByGroup).length;
  }

  /**
   * Get top three most visited URLs.
   * @return {array} - Array of objects with top three most visited URLs.
   */
  getTopThreeMostVisitedUrls() {
    const topThreeMostVisitedUrls = Object.values(this.URLsByGroup)
      .sort((a, b) => b.count - a.count) // sort by numbers in descending order
      .splice(0, 3); // take the top 3

    return topThreeMostVisitedUrls;
  }

  /**
   * Get top three most active IP addresses.
   * @return {array} - Array of objects with top three most active IP addresses.
   */
  getTopThreeMostActiveIPAddresses() {
    const topThreeMostActiveIPAddresses = Object.values(this.IPAddressesByGroup)
      .sort((a, b) => b.count - a.count) // sort by numbers in descending order
      .splice(0, 3); // take the top 3

    return topThreeMostActiveIPAddresses;
  }
}

module.exports = {
  Analytics,
};
