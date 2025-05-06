import fs from 'fs';
import { stringify } from 'querystring';

type ColorStrip = {
  name: string;
  colors: string[];
};
type ColorMap = {
  file: string;
  colors: ColorStrip[];
};

const stripHeaders = [
  {
    span: 2,
    text: 'Background',
  },
  {
    span: 4,
    text: 'Surface',
  },
  {
    span: 3,
    text: 'Surface',
  },
  {
    span: 2,
    text: 'Text',
  },
  {
    span: 5,
    text: 'Base',
  },
];

const inputFiles = [
  'design-tokens/primitives/modes/color-scheme/light/kystverket.json',
  'design-tokens/primitives/modes/color-scheme/light/global.json',
  'design-tokens/primitives/modes/color-scheme/dark/kystverket.json',
  'design-tokens/primitives/modes/color-scheme/dark/global.json',
];

const createColorMap = (inputFile): ColorMap => {
  const colors = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const outLines: string[] = [];

  const m: ColorMap = {
    file: inputFile,
    colors: [],
  };

  Object.entries(colors).forEach(([collectionName, colorCollection]) => {
    Object.entries(colorCollection).forEach(([stripName, strip]) => {
      const colorStrip: ColorStrip = {
        name: stripName,
        colors: [],
      };
      for (let i = 1; i <= 16; i++) {
        const color = strip[String(i)];
        if (color) {
          colorStrip.colors.push(color['$value']);
        }
      }
      m.colors.push(colorStrip);
    });
  });

  return m;
};

const colorMapToHtml = (colorMap: ColorMap): string => {
  const outLines: string[] = [];
  outLines.push('<div>');
  outLines.push('<h2>' + colorMap.file + '</h2>');
  outLines.push('<div>');
  outLines.push('<table>');

  outLines.push('<tr>');
  outLines.push('<td></td>');
  stripHeaders.forEach((header) => {
    outLines.push(
      '<td colspan="' +
        header.span +
        '" style="padding: 8px; text-align: center; font-family: monospace; border-left: 1px solid #000;border-right: 1px solid #000;">' +
        header.text +
        '</td>',
    );
  });
  outLines.push('</tr>');

  colorMap.colors.forEach((colorStrip) => {
    outLines.push(
      '<td style="padding: 8px 0px; text-align: center; font-family: monospace; min-width: 72px; border-top: 1px solid #000;">' +
        colorStrip.name +
        '</td>',
    );
    colorStrip.colors.forEach((color) => {
      outLines.push(
        '<td style="width: 72px; height: 64px; background-color: ' + color + '; border: 1px solid #000;"></td>',
      );
    });
    outLines.push('</tr>');
    outLines.push('<tr>');
    outLines.push('<td></td>');
    colorStrip.colors.forEach((color) => {
      outLines.push('<td style="padding: 8px 16px; font-family: monospace;">' + color + '</td>');
    });
    outLines.push('</tr>');
  });
  outLines.push('</table>');
  outLines.push('</div>');
  outLines.push('</div>');
  return outLines.join('\n');
};

const colorMaps: ColorMap[] = inputFiles.map((inputFile) => createColorMap(inputFile));

const endHtml =
  '<html><head><link href="https://cdn.jsdelivr.net/npm/skeleton-css@2.0.4/css/normalize.min.css" rel="stylesheet"></head><body style="padding: 16px;"><h1>Fargekart for styrbord-tokens</h1>' +
  colorMaps.map((cm) => colorMapToHtml(cm)) +
  '</body></html>';

fs.mkdirSync('static', { recursive: true });
fs.writeFileSync('static/index.html', endHtml, 'utf-8');
