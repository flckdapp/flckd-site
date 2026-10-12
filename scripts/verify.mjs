import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
const captures = [];
const interactions = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/hosting/', '/privacy/', '/press/', '/404.html']) {
      await page.goto(`http://localhost:4322${route}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(async image => {
          image.loading = 'eager';
          await image.decode();
        }));
      });
      const structure = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll('h1').length,
        missingImages: [...document.images].filter(image => image.naturalWidth === 0).length,
      }));
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const slug = route === '/' ? 'home' : route.replaceAll('/', '').replace('.html', '');
      await page.screenshot({ path: `.qa/${slug}-${width}.png`, fullPage: true });
      captures.push({ route, width, ...structure, violations: accessibility.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map(node => node.target) })) });
    }
  }
  await page.goto('http://localhost:4322/');
  await page.getByRole('link', { name: 'Join the beta', exact: true }).click();
  assert.equal(new URL(page.url()).hash, '#get-flckd');
  assert.equal(await page.getByRole('link', { name: 'Join the beta on TestFlight' }).getAttribute('href'), 'https://testflight.apple.com/join/PmRqmMvb');
  for (const summary of await page.locator('.faq-list summary').all()) {
    await summary.click();
    assert.equal(await summary.evaluate(element => element.parentElement.open), true);
  }
  await page.locator('.faq-list').screenshot({ path: '.qa/faq-open.png' });
  interactions.push('App CTA and all five FAQ disclosures work.');

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Self-hosting' }).click();
  await page.getByText('View the Compose file', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy compose.yml' }).click();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /127\.0\.0\.1:8642:8642/);
  await page.getByRole('button', { name: 'Copy Start the server' }).click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'docker compose up -d');
  const composeDownload = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Compose file' }).click();
  assert.equal((await composeDownload).suggestedFilename(), 'compose.yml');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  interactions.push('Hosting navigation, Compose disclosure, code copy and Compose download work.');

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Press kit', exact: true }).click();
  await page.getByRole('button', { name: 'Copy Short description' }).click();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /^You’re Flocked/);
  const zipDownload = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download press kit', exact: true }).click();
  assert.equal((await zipDownload).suggestedFilename(), 'flckd-press-kit.zip');
  for (const file of ['flckd-app-icon.png', 'flckd-camera-map.png', 'flckd-routing.png', 'flckd-alerts.png', 'flckd-fact-sheet.txt']) {
    const response = await context.request.get(`http://localhost:4322/press/${file}`);
    assert.equal(response.status(), 200);
    assert.ok((await response.body()).length > 100);
  }
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new DOMException('Denied', 'NotAllowedError'); }; });
  await page.getByRole('button', { name: 'Copy Short description' }).click();
  await page.getByRole('status').filter({ hasText: 'Clipboard unavailable' }).waitFor();
  interactions.push('Press text copy, ZIP and individual downloads work; clipboard denial shows recovery text.');

  await page.goto('http://localhost:4322/');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#main');
  interactions.push('Keyboard skip link works.');
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const plainPage = await noJs.newPage();
  await plainPage.goto('http://localhost:4322/press/');
  assert.equal(await plainPage.getByRole('link', { name: 'Download press kit', exact: true }).count(), 1);
  assert.equal(await plainPage.getByRole('button', { name: 'Copy Short description' }).isVisible(), false);
  interactions.push('No-JavaScript press content and downloads remain accessible.');
  await noJs.close();
  await writeFile('.qa/verification.json', JSON.stringify({ captures, interactions, errors }, null, 2));
  console.log(JSON.stringify({ captures, interactions, errors }, null, 2));
  assert.ok(captures.every(capture => !capture.overflow && capture.h1 === 1 && capture.missingImages === 0 && capture.violations.length === 0));
  assert.equal(errors.length, 0);
} finally {
  await browser.close();
}
