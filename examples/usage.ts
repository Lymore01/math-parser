import { MyParser } from '../src/parser/index';

const output = new MyParser('((1 + 2) * (3 + 4))');
console.log(output.generateAST());
