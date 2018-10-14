const stringify = (value, depth) => {
  if (value instanceof Object) {
    const output = Object.entries(value).map(([key, val]) => f.unchange(key, val, depth + 2));

    return ['{']
      .concat(output, `${'  '.repeat(depth + 2)}}`)
      .join('\n');
  }

  return value;
};

const f = {
  add: (key, value, depth) => `${'  '.repeat(depth)}  + ${key}: ${stringify(value, depth)}`,
  delete: (key, value, depth) => `${'  '.repeat(depth)}  - ${key}: ${stringify(value, depth)}`,
  unchange: (key, value, depth) => `${'  '.repeat(depth)}    ${key}: ${stringify(value, depth)}`,
  change: (key, value, depth) => {
    const [before, after] = value;
    // eslint-disable-next-line
    return `${'  '.repeat(depth)}  - ${key}: ${stringify(before, depth)}` + '\n' + `${'  '.repeat(depth)}  + ${key}: ${stringify(after, depth)}`;
  },
};

const renderTree = (ast) => {
  const iter = (nodesList, depth) => {
    const output = nodesList.map((node) => {
      if (node.type === 'nested') {
        return `${'  '.repeat(depth)}    ${node.key}: ${iter(node.children, depth + 2)}`;
      }
      const { key, type, value } = node;

      return f[type](key, value, depth);
    });

    return ['{']
      .concat(output, `${'  '.repeat(depth)}}`)
      .join('\n');
  };

  return iter(ast, 0);
};

export default renderTree;
