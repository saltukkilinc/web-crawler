const normalizeURL = (urlString) => {
  const newURLObject = new URL(urlString);
  const hostPath = `${newURLObject.hostname}${newURLObject.pathname}`;
  if(hostPath.endsWith('/')) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

// export default normalizeURL;

module.exports = {
  normalizeURL
}