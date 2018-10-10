import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const beforeJSON = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/before.json'));
const afterJSON = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/after.json'));

const beforeYAML = yaml.safeLoad(fs.readFileSync('./__tests__/__fixtures__/before.yml', 'utf-8'));
const afterYAML = yaml.safeLoad(fs.readFileSync('./__tests__/__fixtures__/after.yml', 'utf-8'));

const genDiff = (file1, file2) => {

  const parseCheck = (file) => {
    switch (path.extname(file)) {
      case '.json':
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
      case '.yml':
        return yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
      default:
        return;
    }
  }
  console.log(parseCheck(file2))
  const diff = (before, after) => {
    const aa = Object.entries(before).map(([key, value]) => {
      if (_.has(after, key)) {
        if (value === after[key]) {
          return `    ${key}: ${value}`;
        }

        return `  + ${key}: ${after[key]},  - ${key}: ${value}`.split(',');
      }

      return `  - ${key}: ${value}`;
    });

    const bb = Object.entries(after).map(([key, value]) => (!_.has(before, key) ? `  + ${key}: ${value}` : ''));

    const result = _.concat('{', aa, bb.filter(x => x), '}', '');
    const resultStr = _.flatten(result).join('\n');

    return resultStr;
  };

  return diff(parseCheck(file1), parseCheck(file2));
};

export default genDiff;
