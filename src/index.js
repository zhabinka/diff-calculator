import _ from 'lodash';
import fs from 'fs';

const genDiff = (before, after) => {
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

  // Вывод строки в файл для сравнения с тестовым результатом
  fs.writeFileSync('./src/resultStr.txt', _.flatten(result).join('\n'), 'utf-8');

  return resultStr;
};

export default genDiff;
