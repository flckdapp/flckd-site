import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--remote-debugging-port=9333'] });
const scores = [];
try {
  for (const preset of ['mobile', 'desktop']) {
    for (const route of ['/', '/hosting/', '/privacy/', '/press/']) {
      const result = await lighthouse(`http://localhost:4322${route}`, {
        port: 9333,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        ...(preset === 'desktop' ? { preset: 'desktop' } : {}),
      });
      if (!result) throw new Error('Lighthouse did not return a result.');
      const slug = route === '/' ? 'home' : route.replaceAll('/', '');
      await writeFile(`.qa/lighthouse-${slug}-${preset}.json`, result.report);
      scores.push({ route, preset, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, category.score * 100])), failedAudits: Object.values(result.lhr.audits).filter(audit => audit.score !== null && audit.score < 1).map(audit => ({ id: audit.id, title: audit.title, score: audit.score, displayValue: audit.displayValue })) });
    }
  }
  await writeFile('.qa/lighthouse-summary.json', JSON.stringify(scores, null, 2));
  console.log(JSON.stringify(scores, null, 2));
} finally {
  await browser.close();
}
