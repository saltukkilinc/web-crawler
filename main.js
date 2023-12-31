const {crawlPage} = require('./crawl.js');

// process.argv = [node, file, website] terminale bir websitesi yazdığımızda sorgulama yapmamızı sağlar.



async function main() {
  if(process.argv.length <3) {
    console.log("no website provided")
    process.exit(1);
  }
  if(process.argv.length > 3) {
    console.log("too many arguments");
    process.exit(1);
  };

  const baseURL = process.argv[2];

  console.log(`started crawling of the website ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  for(const page of Object.entries(pages)) {
    console.log(page);
  }
}


main()

// yarn start www.google.com
// 3 argüman sabittir.Birincisi kullandığın interpreter program (node.js), ikincisi file üçüncüsü ise website ın kendisi 2. indekse denkgeliyor.

// yarn start https://wagslane.dev