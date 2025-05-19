import { ColorMap, ColorStrip } from './types';
import fs from 'fs';

// The parsing function makes a lot of assumptions about the structure of the JSON files.

export const colorStripHeaders = [
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
    text: 'Border',
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

export const jsonToColorMap = (filePath: any): ColorMap => {
  const colors = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const m: ColorMap = {
    file: filePath,
    colors: [],
  };

  Object.entries(colors).forEach(([_, colorCollection]: [any, any]) => {
    Object.entries(colorCollection).forEach(([colorStripName, strip]: [any, any]) => {
      const colorStrip: ColorStrip = {
        name: colorStripName,
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
