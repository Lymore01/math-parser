import getTokens from '../lib/getTokens';
import type { Token } from '../types';

interface Parser {
  cursor: number;
  parseExpr: () => number;
  parseTerm: () => number;
  parseFactor: () => number;
  evaluateExpression: () => number;
}

export class MyParser implements Parser {
  public cursor: number = 0;
  public tokens: Token[];
  constructor(protected expression: string) {
    this.tokens = getTokens(expression);
  }

  private peek(): Token | null {
    return this.tokens[this.cursor] || null;
  }

  private consume(expectedType: string): Token {
    if (this.peek()?.type === expectedType) {
      return this.tokens[this.cursor++];
    } else {
      throw new Error('Unexpected token');
    }
  }

  parseExpr(): number {
    let value = this.parseTerm();

    while (this.peek()?.type === '+' || this.peek()?.type === '-') {
      let op = this.consume(this.peek()?.type || '').type;
      let right = this.parseTerm();

      if (op === '+') value += right;
      else value -= right;
    }

    return value;
  }

  parseTerm(): number {
    let value = this.parseFactor();

    while (this.peek()?.type === '*' || this.peek()?.type === '/') {
      let op = this.consume(this.peek()?.type || '').type;
      let right = this.parseFactor();

      if (op === '*') value *= right;
      else value /= right;
    }

    return value;
  }

  parseFactor(): number {
    if (this.peek()?.type === 'NUMBER') {
      return parseInt(this.consume('NUMBER').value);
    }
    if (this.peek()?.type === '(') {
      this.consume('(');
      let value = this.parseExpr();
      this.consume(')');
      return value;
    }
    throw new Error('Invalid factor');
  }

  evaluateExpression(): number {
    return this.parseExpr();
  }

  //   AST support
  public generateAST(): any {
    this.cursor = 0;
    return this.buildAST();
  }

  private buildAST(): any {
    return this.buildExpr();
  }

  private buildExpr(): any {
    let node = this.buildTerm();

    while (this.peek()?.type === '+' || this.peek()?.type === '-') {
      const op = this.consume(this.peek()!.type);
      const right = this.buildTerm();
      node = { type: 'BinaryExpr', op: op.type, left: node, right };
    }

    return node;
  }

  private buildTerm(): any {
    let node = this.buildFactor();

    while (this.peek()?.type === '*' || this.peek()?.type === '/') {
      const op = this.consume(this.peek()!.type);
      const right = this.buildFactor();
      node = { type: 'BinaryExpr', op: op.type, left: node, right };
    }

    return node;
  }

  private buildFactor(): any {
    const token = this.peek();
    if (token?.type === 'NUMBER') {
      return { type: 'Literal', value: Number(this.consume('NUMBER').value) };
    }
    if (token?.type === '(') {
      this.consume('(');
      const expr = this.buildExpr();
      this.consume(')');
      return expr;
    }
    throw new Error('Invalid factor');
  }
}
