export const site = {
  name: 'You’re Flocked',
  shortName: 'FLCKD',
  github: 'https://github.com/flckdapp/flckd',
  privacy: 'https://github.com/flckdapp/flckd/blob/main/PRIVACY.md',
  hosting: 'https://github.com/flckdapp/flckd/blob/main/server/README.md',
  tiles: 'https://tiles.flckd.app',
  issues: 'https://github.com/flckdapp/flckd/issues',
  discussions: 'https://github.com/flckdapp/flckd/discussions/categories/q-a',
  build: 'https://github.com/flckdapp/flckd#building',
  testflight: 'https://testflight.apple.com/join/PmRqmMvb',
  description: 'You’re being watched. You’re Flocked maps nearby cameras, gives you a heads-up, and plans routes past fewer of them. For iPhone, with privacy built in.',
} as const;

const appStoreUrl = import.meta.env.PUBLIC_APP_STORE_URL;
if (appStoreUrl && !/^https:\/\/apps\.apple\.com\//u.test(appStoreUrl)) {
  throw new TypeError('PUBLIC_APP_STORE_URL must be an https://apps.apple.com/ URL.');
}

export const appLink = appStoreUrl || site.testflight;
export const appLinkLabel = appStoreUrl ? 'Download for iPhone' : 'Join the beta on TestFlight';
export const isBeta = !appStoreUrl;
