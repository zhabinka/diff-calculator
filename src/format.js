import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const getFormat = file => path.extname(file);
const getData = file => fs.readFileSync(file, 'utf-8');

export default file => parsers(getData(file), getFormat(file));
