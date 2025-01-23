const { execFileSync } = require("node:child_process");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const domain = "https://www.whitehouse.gov";
const dloadPath = process.env.CASABLANCA_DLOAD_PATH;
const staticPath = process.env.CASABLANCA_STATIC_PATH;

function yieldToMain() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

async function savePageContent(url) {
  execFileSync("./click-save.sh");
  const fileExists = await waitForFile(dloadPath);
  if (!fileExists) {
    return console.error(`Error saving url: ${url}`);
  }
  const relPath = staticPath + url.replace(domain, "");
  try {
    fs.mkdirSync(relPath, { recursive: true });
  } catch (err) {
    return console.error(`Error making dir ${relPath}: ${err.message}`);
  }
  console.log(`Created dir: ${relPath}`);
  try {
    const dstPath = `${relPath}index.html`;
    fs.renameSync(dloadPath, dstPath);
    console.log(`Saved: ${dstPath}`);
  } catch (err) {
    console.error(`Error moving file: ${err}`);
  }
}

function waitForFile(filePath, timeout = 30000, checkInterval = 1000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const checkFile = () => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          // File exists
          resolve(true);
        } else if (Date.now() - start >= timeout) {
          resolve(false);
        } else {
          setTimeout(checkFile, checkInterval);
        }
      });
    };

    checkFile();
  });
}

async function translatePageToSpanish(page) {
  execFileSync("./click-translate.sh");
  await yieldToMain(); // ugh
}

async function crawlPage(browser, url, visited) {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 963,
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle0" }); //domcontentloaded

  await translatePageToSpanish(page);
  await savePageContent(url);

  visited.add(url);

  const links = await page.$$eval("a", (anchors) =>
    anchors
      .map((anchor) => anchor.href)
      .filter((href) => {
        if (
          href.startsWith("https://www.whitehouse.gov") &&
          !href.endsWith("#top") &&
          !href.endsWith("#wp--skip-link--target")
        ) {
          return true;
        }
        return false;
      }),
  );

  await page.close();

  return links.filter((link) => !visited.has(link));
}

async function startCrawling(startUrl) {
  const chromeEndpoint = process.argv[2];
  console.log(`Connecting to ${chromeEndpoint}`);
  const browser = await puppeteer.connect({
    browserWSEndpoint: chromeEndpoint,
  });

  const visited = new Set();
  const stack = [startUrl];

  while (stack.length) {
    const currentUrl = stack.pop();
    if (!visited.has(currentUrl)) {
      try {
        const foundLinks = await crawlPage(browser, currentUrl, visited);
        stack.push(...foundLinks);
      } catch (error) {
        console.error(`Failed to process ${currentUrl}:`, error);
      }
    }
  }
  await browser.disconnect();
}

const startUrl = "https://www.whitehouse.gov/";
startCrawling(startUrl);
