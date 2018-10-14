import formatData from './format';
import render from './renderers';
import buildAst from './buildAst';

const genDiff = (file1, file2, outputFormat) => {
  const dataBefore = formatData(file1);
  const dataAfter = formatData(file2);
  const ast = buildAst(dataBefore, dataAfter);

  return render(ast, outputFormat);
};

export default genDiff;
