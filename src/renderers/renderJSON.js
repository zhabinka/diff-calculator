import _ from 'lodash';

const stringify = (value, sign) => (_.isObject(value) ? `${sign}${JSON.stringify(value)}` : `${sign}${value}`);

const f = {
  add: (key, value) => ({ key, value: stringify(value, '+ ') }),
  delete: (key, value) => ({ key, value: stringify(value, '- ') }),
  unchange: (key, value) => ({ key, value: stringify(value, '') }),
  change: (key, value) => {
    const [before, after] = value;
    return { key, value: [stringify(before, '- '), stringify(after, '+ ')] };
  },
};

/*
 *  const defaultJSON = (ast) => {
 *    return JSON.stringify(ast, null, ' ')
 *  };
*/

const renderJSON = (ast) => {
  const iter = (nodesList) => {
    const output = nodesList.map((node) => {
      if (node.type === 'nested') {
        return iter(node.children);
      }
      const { key, type, value } = node;

      return f[type](key, value);
    });

    return output;
  };

  return iter(ast);
};

export default renderJSON;
