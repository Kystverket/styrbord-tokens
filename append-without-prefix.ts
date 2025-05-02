import fs from 'fs';

const inputFiles = ['dist/kystverket.css'];

const mainFn = async (inputFile) => {
  const css = fs.readFileSync(inputFile, 'utf-8');
  const outLines: string[] = [];

  css.split('\n').forEach((line) => {
    outLines.push(line);
    if (line.includes('--ds-')) {
      const newLine = line.replaceAll('--ds-', '--');
      outLines.push(newLine);
    }
  });

  fs.writeFileSync(inputFile, outLines.join('\n'), 'utf-8');
};

inputFiles.forEach((inputFile) => {
  mainFn(inputFile);
});
