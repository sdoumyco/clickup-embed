const { chromium } = require('playwright');
const express = require('express');

const CLICKUP_URL = 'https://sharing.clickup.com/9010036627/b/h/8cgmfwk-3135/c7d2175c09d08cb';
const INTERVAL_MINUTES = 5; // How often to update screenshot

async function captureScreenshot() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(CLICKUP_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: './public/screenshot.png', fullPage: true });
    await browser.close();
    console.log(`Captured new screenshot at ${new Date().toLocaleString()}`);
}

// Initial capture
captureScreenshot();

// Schedule captures
setInterval(captureScreenshot, INTERVAL_MINUTES * 60 * 1000);

// Serve screenshot publicly
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running.`);
});
