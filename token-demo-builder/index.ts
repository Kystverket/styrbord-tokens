import fs from 'fs';
import { globSync as glob } from 'glob';
import { ColorMap } from './types';
import { jsonToColorMap } from './color.util';
import { htmlify } from './htmlify';

// Parse and convert JSON files to ColorMap objects
const colorMaps: ColorMap[] = glob('design-tokens/primitives/modes/color-scheme/**/*.json').map((filePath) =>
  jsonToColorMap(filePath),
);

// Generate HTML file based on the ColorMap objects
fs.mkdirSync('static', { recursive: true });
fs.writeFileSync('static/index.html', htmlify(colorMaps), 'utf-8');
