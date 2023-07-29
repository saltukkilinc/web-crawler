const { JSDOM } = require("jsdom");

const crawlPage = async (url) => {
  try {
    const res = await fetch(url);
    if(res.status > 399) {
      console.log(`there is an error in fetch: ${res.status} in ${url}`);
      return;
    }

    const contentType = res.headers.get("content-type");
    if(!contentType.includes("text/html")) {
      console.log(`there is an error in content type: ${contentType} in ${url}`);
      return;
    
    }
    
    console.log(await res.text());
  } catch (e) {
    console.log(`there is an error in fetch: ${e.message} in ${url}`);
  }
};

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
