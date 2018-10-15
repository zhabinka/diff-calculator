import _ from 'lodash';

const stringify = (node, depth) => {
  if (node instanceof Object) {
    const output = Object.entries(node)
      .map(([key, value]) => f.unchange({ key, value }, depth + 2));

    return ['{']
      .concat(output, `${'  '.repeat(depth + 2)}}`)
      .join('\n');
  }

  return node;
};

const f = {
  nest: (node, depth, func) => `${'  '.repeat(depth)}    ${node.key}: ${func(node.children, depth + 2)}`,
  add: (node, depth) => `${'  '.repeat(depth)}  + ${node.key}: ${stringify(node.value, depth)}`,
  delete: (node, depth) => `${'  '.repeat(depth)}  - ${node.key}: ${stringify(node.value, depth)}`,
  unchange: (node, depth) => `${'  '.repeat(depth)}    ${node.key}: ${stringify(node.value, depth)}`,
  change: (node, depth) => {
    const { key, valueBefore, valueAfter } = node;

    const before = `${'  '.repeat(depth)}  - ${key}: ${stringify(valueBefore, depth)}`;
    const after = `${'  '.repeat(depth)}  + ${key}: ${stringify(valueAfter, depth)}`;

    return [before, after];
  },
};

const renderTree = (ast) => {
  const iter = (nodesList, depth) => {
    const output = nodesList.map(node => f[node.type](node, depth, iter));

    return ['{']
      .concat(_.flatten(output), `${'  '.repeat(depth)}}`)
      .join('\n');
  };

  return iter(ast, 0);
};

export default renderTree;
