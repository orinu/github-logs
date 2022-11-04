puppeteer = require("puppeteer");
const path = require("path");

const takeScreenshot = async (url, id) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
      networkIdleTimeout: 1000 * 3,
    });
    await page.screenshot({
      path: path.resolve(__dirname, `./images/${id}.png`),
      fullPage: true,
    });
    await browser.close();
    console.log(`Screenshot of PR id number: ${id} has been saved`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = takeScreenshot;
