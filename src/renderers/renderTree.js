import _ from 'lodash';

const indent = (level, tab = '  ') => tab.repeat(level);

const stringify = (node, depth) => {
  if (node instanceof Object) {
    const output = Object.entries(node)
      .map(([key, value]) => f.unchange({ key, value }, depth + 2));

    return `{\n${output.join('\n')}\n${indent(depth + 2)}}`;
  }

  return node;
};

const f = {
  nest: (node, depth, func) => `${indent(depth)}    ${node.key}: ${func(node.children, depth + 2)}`,
  add: (node, depth) => `${indent(depth)}  + ${node.key}: ${stringify(node.value, depth)}`,
  delete: (node, depth) => `${indent(depth)}  - ${node.key}: ${stringify(node.value, depth)}`,
  unchange: (node, depth) => `${indent(depth)}    ${node.key}: ${stringify(node.value, depth)}`,
  change: (node, depth) => {
    const { key, valueBefore, valueAfter } = node;

    const before = `${indent(depth)}  - ${key}: ${stringify(valueBefore, depth)}`;
    const after = `${indent(depth)}  + ${key}: ${stringify(valueAfter, depth)}`;

    return [before, after];
  },
};

const renderTree = (ast) => {
  const iter = (nodesList, depth) => {
    const output = nodesList.map(node => f[node.type](node, depth, iter));

    return `{\n${_.flatten(output).join('\n')}\n${indent(depth)}}`;
  };

  return iter(ast, 0);
};

export default renderTree;
