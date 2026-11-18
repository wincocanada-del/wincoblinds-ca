import legacy from './templates.json' with { type: 'json' };
import { collectionTemplates } from './collections.mjs';
import { interiorTemplates } from './interiors.mjs';

export const templates = { ...legacy.templates, ...collectionTemplates, ...interiorTemplates };
