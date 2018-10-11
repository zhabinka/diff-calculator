import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (file) => {
  const parser = parsersList[path.extname(file)];
  return parser(fs.readFileSync(file, 'utf-8'));
};
