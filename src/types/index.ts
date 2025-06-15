export type BinaryOperationTokenType = '+' | '-' | '*' | '/' | '^';

export type TokenType =
  | BinaryOperationTokenType
  | 'NUMBER'
  | '('
  | ')'
  | 'COMMENT'
  | 'ERROR';

export interface Token<T extends TokenType = TokenType> {
  type: T;
  value: string;
}
