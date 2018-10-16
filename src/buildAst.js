import _ from 'lodash';

const nodeList = [
  {
    type: 'nest',
    check: (key, before, after) => _.isObject(before[key]) && _.isObject(after[key]),
    f: (key, type, before, after, func) => ({ key, type, children: func(before[key], after[key]) }),
  },
  {
    type: 'added',
    check: (key, before, after) => _.has(after, key) && !_.has(before, key),
    f: (key, type, before, after) => ({ key, type, value: after[key] }),
  },
  {
    type: 'deleted',
    check: (key, before, after) => !_.has(after, key) && _.has(before, key),
    f: (key, type, before) => ({ key, type, value: before[key] }),
  },
  {
    type: 'unchanged',
    check: (key, before, after) => _.has(after, key) && _.has(before, key)
      && before[key] === after[key],
    f: (key, type, before) => ({ key, type, value: before[key] }),
  },
  {
    type: 'changed',
    check: (key, before, after) => _.has(after, key) && _.has(before, key)
      && before[key] !== after[key],
    f: (key, type, before, after) => ({
      key, type, valueBefore: before[key], valueAfter: after[key],
    }),
  },
];

const buildAst = (before, after) => {
  const keysUnion = _.union(Object.keys(before), Object.keys(after));

  const ast = keysUnion.map((key) => {
    const { type, f } = nodeList.find(el => el.check(key, before, after));

    return f(key, type, before, after, buildAst);
  });

  return ast;
};

export default buildAst;
