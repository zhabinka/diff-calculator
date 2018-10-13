import _ from 'lodash';
import formatData from './format';
import render from './render';

const set = (before, after, operation) => ({ before, after, operation });

const diff = (before, after) => {
  const keysUnion = _.union(Object.keys(before), Object.keys(after));
  const ast = keysUnion.map((key) => {
    if (before[key] instanceof Object && after[key] instanceof Object) {
      return {
        key,
        type: 'nested',
        children: diff(before[key], after[key]),
      };
    }
    if (_.has(before, key) && _.has(after, key)) {
      const operation = (before[key] === after[key] ? 'identity' : 'replace');

      return {
        key,
        type: 'single',
        value: set(before[key], after[key], operation),
      };
    }
    const operation = (_.has(after, key) ? 'add' : 'delete');

    return {
      key,
      type: 'single',
      value: set(before[key], after[key], operation),
    };
  });

  return ast;
};

const genDiff = (file1, file2) => {
  const ast = diff(formatData(file1), formatData(file2));

  return render(ast);
};

export default genDiff;
