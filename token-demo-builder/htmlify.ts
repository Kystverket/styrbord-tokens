import { ColorMap } from './types';
import { colorStripHeaders } from './color.util';

const colorMapToHtml = (colorMap: ColorMap): string => {
  const out: string[] = [];
  out.push('<div>');
  out.push('<h3>' + colorMap.file + '</h3>');
  out.push('<div>');
  out.push('<table>');

  out.push('<tr>');
  out.push('<td></td>');
  colorStripHeaders.forEach((header) => {
    out.push(
      '<td colspan="' +
        header.span +
        '" style="padding: 8px; text-align: center; font-family: monospace; border-left: 1px solid #000;border-right: 1px solid #000;">' +
        header.text +
        '</td>',
    );
  });
  out.push('</tr>');

  colorMap.colors.forEach((colorStrip) => {
    out.push(
      '<td style="padding: 8px 0px; text-align: center; font-family: monospace; min-width: 72px; border-top: 1px solid #000;">' +
        colorStrip.name +
        '</td>',
    );
    colorStrip.colors.forEach((color) => {
      out.push('<td style="width: 72px; height: 64px; background-color: ' + color + '; border: 1px solid #000;"></td>');
    });
    out.push('</tr>');
    out.push('<tr>');
    out.push('<td></td>');
    colorStrip.colors.forEach((color) => {
      out.push('<td style="padding: 8px 16px; font-family: monospace;">' + color + '</td>');
    });
    out.push('</tr>');
  });
  out.push('</table>');
  out.push('</div>');
  out.push('</div>');
  return out.join('\n');
};

export const htmlify = (colorMaps: ColorMap[]): string => {
  const out: string[] = [];
  out.push('<!DOCTYPE html>');
  out.push('<html lang="en">');
  out.push('<head>');
  out.push('<meta charset="UTF-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  out.push('<title>styrbord-tokens</title>');
  out.push('<link href="https://cdn.jsdelivr.net/npm/skeleton-css@2.0.4/css/normalize.min.css" rel="stylesheet">');
  out.push('<style>');
  out.push('body { padding: 16px; }');
  out.push('</style>');
  out.push('</head>');
  out.push('<body>');
  out.push('<h1>styrbord-tokens</h1>');
  out.push(...colorMaps.map((cm) => colorMapToHtml(cm)));
  out.push('</body>');
  out.push('</html>');

  return out.join('\n');
};
