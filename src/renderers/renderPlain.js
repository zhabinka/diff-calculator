import _ from 'lodash';

const getPropertyName = (property, parents) => [...parents, property].join('.');
const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const f = {
  add: (key, value, path) => `Property '${getPropertyName(key, path)}' was added with value: '${stringify(value)}'`,
  delete: (key, value, path) => `Property '${getPropertyName(key, path)}' was removed`,
  unchange: (key, value, path) => `Property '${getPropertyName(key, path)}' remains unchanged`,
  change: (key, value, path) => {
    const [before, after] = value;
    return `Property '${getPropertyName(key, path)}' was updated. From ${stringify(before)} to ${stringify(after)}`;
  },
};

const renderPlain = (ast) => {
  const iter = (nodesList, currentPath) => {
    const output = nodesList.map((node) => {
      if (node.type === 'nested') {
        return iter(node.children, [...currentPath, node.key]);
      }
      const { key, type, value } = node;

      return f[type](key, value, currentPath);
    });

    return _.flatten(output).join('\n');
  };

  return iter(ast, []);
};

export default renderPlain;
