const f = {
  identity: (key, before, after, depth) => `${'  '.repeat(depth)}    ${key}: ${before}`,
  add: (key, before, after, depth) => `${'  '.repeat(depth)}  + ${key}: ${after}`,
  delete: (key, before, after, depth) => `${'  '.repeat(depth)}  - ${key}: ${before}`,
  // eslint-disable-next-line
  replace: (key, before, after, depth) => `${'  '.repeat(depth)}${f.delete(key, before, after)}` + '\n' + `${'  '.repeat(depth)}${f.add(key, before, after)}`,
};

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const output = Object.entries(value).map(([key, val]) => f.identity(key, val, val, depth + 2));

    return ['{']
      .concat(output, `${'  '.repeat(depth + 2)}}`)
      .join('\n');
  }

  return value;
};

const render = (ast) => {
  const iter = (data, depth) => {
    const output = data.map((el) => {
      if (el.type === 'nested') {
        return `${'  '.repeat(depth)}    ${el.key}: ${iter(el.children, depth + 2)}`;
      }

      const {
        operation,
        before,
        after,
      } = el.value;

      return f[operation](el.key, stringify(before, depth), stringify(after, depth), depth);
    });

    return ['{']
      .concat(output, `${'  '.repeat(depth)}}`)
      .join('\n');
  };

  return iter(ast, 0);
};

export default render;
