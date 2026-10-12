import sharp from 'sharp';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const press = fileURLToPath(new URL('../public/press/', import.meta.url));
const images = fileURLToPath(new URL('../public/images/', import.meta.url));
const screenshots = [
  ['flckd-camera-map.png', 'camera-map'],
  ['flckd-routing.png', 'routing'],
  ['flckd-alerts.png', 'alerts'],
];

for (const [source, name] of screenshots) {
  await sharp(press + source).resize({ width: 660 }).webp({ quality: 76, effort: 6 }).toFile(`${images}${name}.webp`);
  await sharp(press + source).resize({ width: 400 }).webp({ quality: 64, effort: 6 }).toFile(`${images}${name}-400.webp`);
}
await sharp(press + 'flckd-app-icon.png').resize({ width: 128 }).webp({ quality: 90 }).toFile(`${images}app-icon.webp`);

const bundle = ['flckd-app-icon.png', ...screenshots.map(([source]) => source), 'flckd-fact-sheet.txt'];
const zip = spawnSync('zip', ['-q', '-j', 'flckd-press-kit.zip', ...bundle], { cwd: press, stdio: 'inherit' });
if (zip.error) throw zip.error;
if (zip.status !== 0) throw new Error(`zip exited with ${zip.status}`);
console.log(`derived ${screenshots.length * 2 + 1} images and the press kit from public/press/`);
