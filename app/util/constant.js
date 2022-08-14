const HTTP_LOG_REGEX = () => {
  const IP = /(?<IP>[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
  const USER = /(?<USER>[A-z]*|-)/;
  const TIMESTAMP = /\[(?<TIMESTAMP>.*)\]/;
  const URL = /"[A-z]* (http[s]?:\/\/example.net)?(?<URL>.*) HTTP\/\d.\d"/;
  const LOG = new RegExp(
    `${IP.source} - ${USER.source} ${TIMESTAMP.source} ${URL.source}`,
    "i"
  );
  return {
    IP,
    USER,
    TIMESTAMP,
    URL,
    LOG,
  };
};

module.exports = {
  HTTP_LOG_REGEX,
};
