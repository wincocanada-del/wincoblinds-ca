import seed from './seed.json' with { type: 'json' };
import { upgradeCollections, upgradeHomeCopy } from './collections.mjs';
import { upgradeInteriors } from './interiors.mjs';

const defaultNavigation = [
  { label: 'Products', url: 'products.html' },
  { label: 'Services', url: 'services.html' },
  { label: 'About', url: 'about.html' },
  { label: 'Contact', url: 'contact.html' },
];

function sameMenu(item, original) {
  return item.label === original.label && item.url === original.url &&
    !item.hidden && JSON.stringify(item.children) === JSON.stringify(original.children);
}

// Apply to an in-memory publication, editable draft, or restored version.
// The first editor save persists the version so future edits are kept verbatim.
export function upgradeSite(data) {
  if (data.designVersion >= 3) return data;
  if (data.designVersion === 2) {
    upgradeHomeCopy(data);
  } else {
    if (data.navigation.length === seed.navigation.length &&
        data.navigation.every((item, i) => sameMenu(item, seed.navigation[i]))) {
      data.navigation = structuredClone(defaultNavigation);
    }
    upgradeCollections(data);
    upgradeInteriors(data);
  }
  data.designVersion = 3;
  return data;
}
