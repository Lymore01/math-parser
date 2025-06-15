import type { Token } from '../types/index';

export default function getTokens(text: string) {
  const tokens: Token[] = [];
  let cursor: number = 0;

  while (cursor < text.length) {
    const current = text[cursor];

    if (/\s/.test(current)) {
      cursor++;
      continue;
    }

    if (/\d/.test(current)) {
      let number = current;
      cursor++;
      while (cursor < text.length && /\d/.test(text[cursor])) {
        number += text[cursor++];
      }
      tokens.push({ type: 'NUMBER', value: number });
      continue;
    }

    if (current === '+') {
      tokens.push({ type: '+', value: current });
    } else if (current === '-') {
      tokens.push({ type: '-', value: current });
    } else if (current === '*') {
      tokens.push({ type: '*', value: current });
    } else if (current === '/') {
      if (text[cursor + 1] === '/') {
        tokens.push({ type: 'COMMENT', value: '/' });
        tokens.push({ type: 'COMMENT', value: '/' });
        cursor += 2;
        continue;
      } else {
        tokens.push({ type: '/', value: current });
      }
    } else if (current === '^') {
      tokens.push({ type: '^', value: current });
    } else if (current === '(') {
      tokens.push({ type: '(', value: current });
    } else if (current === ')') {
      tokens.push({ type: ')', value: current });
    } else {
      tokens.push({ type: 'ERROR', value: current });
    }

    cursor++;
  }

  return tokens;
}
