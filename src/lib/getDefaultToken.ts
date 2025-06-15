//! DEPRECATED
import matcher from './matcher';

export default function getDefaultToken(token: string, text?: string) {
  if (matcher(token, /^\d+$/)) {
    return { type: 'NUMBER' as const, value: token };
  }

  if (matcher(token, /\+/)) {
    return { type: '+' as const, value: token };
  }

  if (matcher(token, /-/)) {
    return { type: '-' as const, value: token };
  }

  if (matcher(token, /\*/)) {
    return { type: '*' as const, value: token };
  }

  if (matcher(token, /\//)) {
    return { type: '/' as const, value: token };
  }

  if (matcher(token, /\^/)) {
    return { type: '^' as const, value: token };
  }

  if (matcher(token, /\(/)) {
    return { type: '(' as const, value: token };
  }

  if (matcher(token, /\)/)) {
    return { type: ')' as const, value: token };
  }

  if (matcher(token, /#|\/\//)) {
    return { type: 'COMMENT' as const, value: token };
  }

  return { type: 'ERROR' as const, value: token };
}
