import renderPlane from './renderPlain';
import renderTree from './renderTree';

const renderList = {
  plain: renderPlane,
  tree: renderTree,
};

export default (ast, type) => renderList[type](ast);
