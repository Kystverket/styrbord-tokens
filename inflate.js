import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'node:path/posix';

async function run() {
  const tokens = JSON.parse(await readFile('tokens.json', 'utf-8'));

  const persistSet = async ([setName, setTokens]) => {
    const fileName = `design-tokens/${setName}.json`;
    const dirName = dirname(fileName);
    try {
      await mkdir(dirName, { recursive: true });
    } catch (e) {
      // do nothing, dir already exists
    }
    await writeFile(fileName, JSON.stringify(setTokens, null, 2), 'utf-8');
  };

  await Promise.all(Object.entries(tokens).map(persistSet));
}

run();
