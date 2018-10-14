import _ from 'lodash';

const buildAst = (before, after) => {
  const keysUnion = _.union(Object.keys(before), Object.keys(after));

  const ast = keysUnion.map((key) => {
    if (before[key] instanceof Object && after[key] instanceof Object) {
      return {
        key,
        type: 'nested',
        children: buildAst(before[key], after[key]),
      };
    }
    if (_.has(after, key) && !_.has(before, key)) {
      return {
        key,
        type: 'add',
        value: after[key],
      };
    }
    if (!_.has(after, key) && _.has(before, key)) {
      return {
        key,
        type: 'delete',
        value: before[key],
      };
    }
    if (_.has(after, key) && _.has(before, key)) {
      return (before[key] === after[key]
        ? { key, type: 'unchange', value: before[key] }
        : { key, type: 'change', value: [before[key], after[key]] });
    }

    return null;
  });

  return ast;
};

export default buildAst;
