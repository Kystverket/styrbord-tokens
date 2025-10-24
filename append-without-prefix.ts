import fs from 'fs';

const inputFiles = ['dist/kystverket.css'];
const spacingCss = fs.readFileSync('spacing.css', 'utf-8');

const mainFn = async (inputFile: string) => {
  const css = fs.readFileSync(inputFile, 'utf-8');
  const outLines: string[] = [];

  outLines.push(css);
  outLines.push(spacingCss);

  fs.writeFileSync(inputFile, outLines.join('\n'), 'utf-8');
};

inputFiles.forEach((inputFile) => {
  mainFn(inputFile);
});
