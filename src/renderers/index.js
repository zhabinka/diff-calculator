import renderPlane from './renderPlain';
import renderTree from './renderTree';

const renderList = {
  plain: renderPlane,
  tree: renderTree,
  json: ast => JSON.stringify(ast, null, ' '),
};

export default (ast, type) => renderList[type](ast);
