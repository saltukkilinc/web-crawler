const { JSDOM } = require("jsdom");

const crawlPage = async (baseUrl, currentUrl, pages) => {
  const baseUrlObject = new URL(baseUrl);
  const currentUrlObject = new URL(currentUrl);
  if (baseUrlObject.hostname !== currentUrlObject.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentUrl}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentUrl)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getUrlsFromHtml(htmlBody, baseUrl)
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseUrl, nextURL, pages)
  }

  return pages
}

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
        console.log(`There is an error: ${e.message}`);
      }
    } else {
      try {
        const newURLObject = new URL(link.href);
        urls.push(newURLObject.href);
      } catch (e) {
        console.log(`There is an error: ${e.message}`);
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
  crawlPage,
};
