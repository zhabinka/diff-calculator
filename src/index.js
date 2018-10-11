import _ from 'lodash';
import parsers from './parsers';

const genDiff = (file1, file2) => {
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

  return diff(parsers(file1), parsers(file2));
};

export default genDiff;
