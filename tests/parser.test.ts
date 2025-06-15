import { MyParser } from '../src/parser/index';

describe('MyParser', () => {
  test('handles basic addition', () => {
    const parser = new MyParser('2 + 3');
    expect(parser.evaluateExpression()).toBe(5);
  });

  test('handles basic subtraction', () => {
    const parser = new MyParser('7 - 4');
    expect(parser.evaluateExpression()).toBe(3);
  });

  test('handles multiplication', () => {
    const parser = new MyParser('3 * 4');
    expect(parser.evaluateExpression()).toBe(12);
  });

  test('handles division', () => {
    const parser = new MyParser('12 / 3');
    expect(parser.evaluateExpression()).toBe(4);
  });

  test('handles mixed precedence: 2 + 3 * 4', () => {
    const parser = new MyParser('2 + 3 * 4');
    expect(parser.evaluateExpression()).toBe(14);
  });

  test('handles parentheses: (2 + 3) * 4', () => {
    const parser = new MyParser('(2 + 3) * 4');
    expect(parser.evaluateExpression()).toBe(20);
  });

  test('handles nested parentheses: ((1 + 2) * (3 + 4))', () => {
    const parser = new MyParser('((1 + 2) * (3 + 4))');
    expect(parser.evaluateExpression()).toBe(21);
  });

  test('throws error on invalid input', () => {
    expect(() => new MyParser('2 + * 3').evaluateExpression()).toThrow();
  });

  test('handles whitespaces gracefully (if lexer does)', () => {
    const parser = new MyParser(' 2 + 3 ');
    expect(parser.evaluateExpression()).toBe(5);
  });
});
