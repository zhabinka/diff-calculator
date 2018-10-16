import _ from 'lodash';

const buildAst = (before, after) => {
  const keysUnion = _.union(Object.keys(before), Object.keys(after));

  const ast = keysUnion.map((key) => {
    if (_.has(after, key) && !_.has(before, key)) {
      return {
        key,
        type: 'added',
        value: after[key],
      };
    }
    if (!_.has(after, key) && _.has(before, key)) {
      return {
        key,
        type: 'deleted',
        value: before[key],
      };
    }
    if (_.has(after, key) && _.has(before, key) && before[key] === after[key]) {
      return {
        key,
        type: 'unchanged',
        value: before[key],
      };
    }
    if (before[key] instanceof Object && after[key] instanceof Object) {
      return {
        key,
        type: 'nest',
        children: buildAst(before[key], after[key]),
      };
    }
    return {
      key,
      type: 'changed',
      valueBefore: before[key],
      valueAfter: after[key],
    };
  });

  return ast;
};

export default buildAst;
