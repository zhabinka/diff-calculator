import _ from 'lodash';
import parsers from './parsers';

const genDiff = (file1, file2) => {
  const diff = (before, after) => {
    const keysUnion = _.union(Object.keys(before), Object.keys(after));

    const compareKeys = key => (before[key] === after[key]
      ? `    ${key}: ${after[key]}`
      : `  + ${key}: ${after[key]},  - ${key}: ${before[key]}`.split(','));

    const result = keysUnion.map((el) => {
      if (_.has(before, el) && _.has(after, el)) {
        return compareKeys(el);
      }

      return _.has(after, el) ? `  + ${el}: ${after[el]}` : `  - ${el}: ${before[el]}`;
    });

    // const resultToString = _.concat('{', _.flatten(result), '}', '').join('\n');
    // return resultToString;

    return ['{']
      .concat(_.flatten(result), '}', '')
      .join('\n');
  };

  return diff(parsers(file1), parsers(file2));
};

export default genDiff;
