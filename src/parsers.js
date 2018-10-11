import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsersList = new Map([
  ['.json', JSON.parse],
  ['.yml', yaml.safeLoad],
]);

export default (file) => {
  const parser = parsersList.get(path.extname(file));
  return parser(fs.readFileSync(file, 'utf-8'));
};
