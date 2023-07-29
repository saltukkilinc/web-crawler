const { test, expect } = require("@jest/globals");
const { normalizeURL, getUrlsFromHtml } = require("./crawl.js");
// import  normalizeURL  from "./crawl.js";
// import { test, expect } from "@jest/globals";

test("normalizeURL protocol", () => {
  const input = "https://blog.boot.dev/path";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL slash", () => {
  const input = "https://blog.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL capital", () => {
  const input = "https://BLOG.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("getUrlfromHTML absolute", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path/">Boot.dev</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev/path/";

  const output = getUrlsFromHtml(inputHtml, inputBaseURL);

  const expected = ["https://blog.boot.dev/path/"];
  expect(output).toEqual(expected);
});

test("getUrlfromHTML relative", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="/path/">Boot.dev</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";

  const output = getUrlsFromHtml(inputHtml, inputBaseURL);

  const expected = ["https://blog.boot.dev/path/"];
  expect(output).toEqual(expected);
});

test("getUrlfromHTML multiple", () => {
  const inputHtml = `
  <html>
    <body>
    <a href="https://blog.boot.dev/path1/">Boot.dev link 1</a>
    <a href="/path2/">Boot.dev link 2</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";

  const output = getUrlsFromHtml(inputHtml, inputBaseURL);

  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
  expect(output).toEqual(expected);
});

test("getUrlfromHTML invalid", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="invalid">Boot.dev</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";

  const output = getUrlsFromHtml(inputHtml, inputBaseURL);

  const expected = [];
  expect(output).toEqual(expected);
});
