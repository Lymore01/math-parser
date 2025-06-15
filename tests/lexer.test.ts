import getTokens from '../src/lib/getTokens';

describe('Lexer Tests', () => {
  test('basic arithmetic: 1+2', () => {
    expect(getTokens('1+2')).toEqual([
      { type: 'NUMBER', value: '1' },
      { type: '+', value: '+' },
      { type: 'NUMBER', value: '2' },
    ]);
  });

  test('expression with spaces and parentheses', () => {
    expect(getTokens(' (3 * 4) ')).toEqual([
      { type: '(', value: '(' },
      { type: 'NUMBER', value: '3' },
      { type: '*', value: '*' },
      { type: 'NUMBER', value: '4' },
      { type: ')', value: ')' },
    ]);
  });

  test('multi-digit numbers', () => {
    expect(getTokens('12+34')).toEqual([
      { type: 'NUMBER', value: '12' },
      { type: '+', value: '+' },
      { type: 'NUMBER', value: '34' },
    ]);
  });

  test('exponentiation and minus', () => {
    expect(getTokens('2 ^ 3 - 1')).toEqual([
      { type: 'NUMBER', value: '2' },
      { type: '^', value: '^' },
      { type: 'NUMBER', value: '3' },
      { type: '-', value: '-' },
      { type: 'NUMBER', value: '1' },
    ]);
  });

  test('division and error character', () => {
    expect(getTokens('8 / @')).toEqual([
      { type: 'NUMBER', value: '8' },
      { type: '/', value: '/' },
      { type: 'ERROR', value: '@' },
    ]);
  });

  test('comment tokens', () => {
    expect(getTokens('//')).toEqual([
      { type: 'COMMENT', value: '/' },
      { type: 'COMMENT', value: '/' },
    ]);
  });
});
