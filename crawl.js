const { JSDOM } = require("jsdom");

const getUrlsFromHtml = (htmlBody, baseUrl) => {
  const urls = [];

  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      try {
        const newURLObject = new URL(`${baseUrl}${link.href}`);
        urls.push(newURLObject.href);
      } catch (e) {
        console.log(`There is an error: ${e.message}`)
      }
    } else {
      try {
        const newURLObject = new URL(link.href);
        urls.push(newURLObject.href);
      } catch (e) {
        console.log(`There is an error: ${e.message}`)
      }
    }
  }
  return urls;
};

const normalizeURL = (urlString) => {
  const newURLObject = new URL(urlString);
  const hostPath = `${newURLObject.hostname}${newURLObject.pathname}`;
  if (hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

// export default normalizeURL;

module.exports = {
  normalizeURL,
  getUrlsFromHtml,
};
