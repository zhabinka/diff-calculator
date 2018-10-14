import renderPlane from './renderPlain';
import renderTree from './renderTree';
import renderJSON from './renderJSON';

const renderList = {
  plain: renderPlane,
  tree: renderTree,
  json: renderJSON,
};

export default (ast, type) => renderList[type](ast);
