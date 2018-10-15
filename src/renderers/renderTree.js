const stringify = (value, depth) => {
  if (value instanceof Object) {
    const output = Object.entries(value).map(([key, value]) => f.unchange({ key, value }, depth + 2));

    return ['{']
      .concat(output, `${'  '.repeat(depth + 2)}}`)
      .join('\n');
  }

  return value;
};

const f = {
  nest: (node, depth, func) => `${'  '.repeat(depth)}    ${node.key}: ${func(node.children, depth + 2)}`,
  add: (node, depth) => `${'  '.repeat(depth)}  + ${node.key}: ${stringify(node.value, depth)}`,
  delete: (node, depth) => `${'  '.repeat(depth)}  - ${node.key}: ${stringify(node.value, depth)}`,
  unchange: (node, depth) => `${'  '.repeat(depth)}    ${node.key}: ${stringify(node.value, depth)}`,
  change: (node, depth) => {
    const { key, type, valueBefore, valueAfter}  = node;
    // eslint-disable-next-line
    return `${'  '.repeat(depth)}  - ${key}: ${stringify(valueBefore, depth)}` + '\n' + `${'  '.repeat(depth)}  + ${key}: ${stringify(valueAfter, depth)}`;
  },
};

const renderTree = (ast) => {
  const iter = (nodesList, depth) => {
    const output = nodesList.map((node) => f[node.type](node, depth, iter));

    return ['{']
      .concat(output, `${'  '.repeat(depth)}}`)
      .join('\n');
  };

  return iter(ast, 0);
};

export default renderTree;
