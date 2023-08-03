const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/render-page', async (req, res) => {
  const url = req.query.url; // Assuming you pass the URL as a query parameter

  try {
    const browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser window
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for running in AWS EC2 or similar environments
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until the page finishes loading

    // Optional: You can perform additional actions here, such as clicking buttons or filling forms

    // Take a screenshot of the page
    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error(`Error rendering the page: ${error.message}`);
    return res.status(500).send('Error rendering the page.');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
