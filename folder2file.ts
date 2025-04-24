import { glob } from 'glob';
import fs from 'fs';

const folder = 'design-tokens';
const outputFile = 'tokens.json';

const mainFn = async () => {
  const files = (await glob(folder + '/**/*.json')).map((file) => {
    const keys = file
      .split('/')
      .slice(1)
      .map((key) => key.replace('.json', ''));
    return { path: file, keys };
  });
  console.log(files);

  const superFile = {};

  files.forEach((file) => {
    const { path, keys } = file;
    const fileContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    superFile[keys.join('/')] = fileContent;
  });

  fs.writeFileSync(outputFile, JSON.stringify(superFile, null, 2), 'utf-8');
};

mainFn();
