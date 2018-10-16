import _ from 'lodash';

const getPropertyName = (property, parents) => [...parents, property].join('.');
const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const f = {
  nest: (node, path, func) => func(node.children, [...path, node.key]),
  added: (node, path) => `Property '${getPropertyName(node.key, path)}' was added with value: '${stringify(node.value)}'`,
  deleted: (node, path) => `Property '${getPropertyName(node.key, path)}' was removed`,
  unchanged: () => [],
  changed: (node, path) => {
    const { key, valueBefore, valueAfter } = node;

    return `Property '${getPropertyName(key, path)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
  },
};

const renderPlain = (ast) => {
  const iter = (nodesList, currentPath) => {
    const output = nodesList.map(node => f[node.type](node, currentPath, iter));

    return _.flatten(output).join('\n');
  };

  return iter(ast, []);
};

export default renderPlain;
